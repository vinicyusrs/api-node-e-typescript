import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number, string } from "yup";

describe("Cidades - Create", () => {
  it("Cria Registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Caxias do Sul",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tenta criar um registro com nome muito curto", async () => {
    const res1 = await testServer.post("/cidades").send({ nome: "Ca" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
