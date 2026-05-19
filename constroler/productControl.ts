import { METHODS, type IncomingMessage, type ServerResponse } from "node:http";
import { readProduct } from "../service/productservice";
import type { Product } from "../type/producttype";

export const productControler = (req: IncomingMessage, res: ServerResponse) => {
  //get all product
  const method = req.method;
  const url = req.url;
  const urlParts = url?.split("/");
  const id = urlParts
    ? urlParts[1] === "products"
      ? Number(urlParts[2])
      : null
    : null;
  console.log(id);

  if (req.url === "/products" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This is products Route .Product Got Succesfully ",
        data: readProduct(),
      }),
    );
  } else if (method === "GET" && id !== null) {
    const data = readProduct();
    const products = data.products;

    const product = products.find((p: Product) => p.id === id);

    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify(product));
  }
};
