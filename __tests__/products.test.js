import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import server from "../src/server.js";
import ProductsModel from "../src/api/products/model.js";

dotenv.config();

const client = supertest(server);

const validProduct = {
  name: "A valid product",
  description: "balllablalblabl",
  price: 100,
};

const notValidProduct = {
  name: "A not valid product",
  price: 100,
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL_TEST);
  const product = new ProductsModel({ name: "test", description: "blalblabla", price: 20 });
  await product.save();
});

describe("Test APIs", () => {
  it("Should test that the env vars are set correctly", () => {
    expect(process.env.MONGODB_URL_TEST).toBeDefined();
  });
  it("Should test that POST /products returns a valid _id and 201", async () => {
    const response = await client.post("/products").send(validProduct).expect(201);
    expect(response.body._id).toBeDefined();
  });
});

//   it("Should test that GET /products returns a success status and a body", async () => {
//     const response = await client.get("/products").expect(200);
//     console.log(response.body);
//   });

//   it("Should test that POST /products with a not valid product returns a 400", async () => {
//     await client.post("/products").send(notValidProduct).expect(400);
//   });
// });
