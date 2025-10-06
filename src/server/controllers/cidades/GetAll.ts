import { Request, Response } from "express";

import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  page?: number;
  limite?: number;
  filter?: string;
}
export const getAllValidation = validation((getObjetcSchema) => ({
  query: getObjetcSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limite: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    }),
  ),
  /*   query: getObjetcSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    }),
   ),*/
}));

// da para usar RequestHandler aqui tambem
export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  /*   if (req.body.nome === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).send("Informe o atributo nome");
  }
   */
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Caxias do Sul",
    },
  ]);
};
