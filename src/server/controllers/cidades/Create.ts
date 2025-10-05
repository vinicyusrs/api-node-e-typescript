import { Request, Response } from "express";

import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICidade {
  nome: string;
  estado: string;
}

interface IFilter {
  filter?: string;
  //limit?: number;
}

export const createValidation = validation((getObjetcSchema) => ({
  body: getObjetcSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      estado: yup.string().required().min(3),
    }),
  ),
  query: getObjetcSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    }),
  ),
}));

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
