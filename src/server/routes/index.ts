import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController } from "../controllers";

const router = Router();

router.get("/teste", (request, response) => {
  response.send("Hello, DEV!");
});

router.post("/teste", (request, response) => {
  console.log(request.body);
  console.log(request.header);
  // pesquisa de Query ?teste=55545 ?nome=vinicyus
  console.log(request.query.teste);
  // params igual no Java vem um parametro do front /teste/:id
  //  console.log(request.params.id);
  console.log(request.params);
  // cookies
  console.log(request.cookies);
  return response.status(StatusCodes.OK).json(request.body);
});

router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create,
);

export { router };
