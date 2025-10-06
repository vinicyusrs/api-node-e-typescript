import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError, AnyObject, Maybe } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T extends Maybe<AnyObject>>(
  objectSchema: ObjectSchema<T>,
) => ObjectSchema<T>;

type TGetAllObjectSchema = (
  getbjectSchema: TGetSchema,
) => Partial<TAllObjectSchema>;

type TAllObjectSchema = Record<TProperty, ObjectSchema<any>>;

type TValidation = (GetAllObjectSchema: TGetAllObjectSchema) => RequestHandler;

export const validation: TValidation =
  (getAllobjectSchemas) => async (req, res, next) => {
    const objectSchemas = getAllobjectSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(objectSchemas).forEach(([key, objectSchema]) => {
      try {
        objectSchema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
        // return next();
      } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (error.path === undefined) return;
          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
  };
