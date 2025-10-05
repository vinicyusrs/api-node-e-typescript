import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

interface IFilter {
  filter?: string;
}

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.query, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

// da para usar RequestHandler aqui tambem
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const data = req.body.nome;

  /*   if (req.body.nome === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).send("Informe o atributo nome");
  }
   */
  console.log(req.body);
  return res.send("Create");
};
