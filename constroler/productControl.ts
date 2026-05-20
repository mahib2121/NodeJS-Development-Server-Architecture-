import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeProduct } from "../service/productservice";
import type { Product } from "../type/producttype";
import { parseBody } from "../utility/pareseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const method = req.method;
  const url = req.url;

  const urlParts = url?.split("/");

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // GET ALL PRODUCTS
  if (url === "/products" && method === "GET") {
    const data = readProduct();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Products fetched successfully",
        data,
      }),
    );
  }
  // GET SINGLE PRODUCT
  else if (method === "GET" && urlParts?.[1] === "products" && id !== null) {
    const data = readProduct();

    const product = data.products.find((p: Product) => p.id === id);

    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          message: "Product not found",
        }),
      );
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(product));
  }
  // CREATE PRODUCT
  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);

    const data = readProduct();

    const newProduct: Product = {
      id: data.products.length + 1,
      ...body,
    };

    data.products.push(newProduct);

    writeProduct(data);

    res.writeHead(201, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Product Created Successfully",
        data: newProduct,
      }),
    );
  }
  // UPDATE PRODUCT
  else if (method === "PUT" && urlParts?.[1] === "products" && id !== null) {
    const body = await parseBody(req);

    const data = readProduct();

    const index = data.products.findIndex((p: Product) => p.id === id);

    // PRODUCT NOT FOUND
    if (index === -1) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }

    // UPDATE PRODUCT
    data.products[index] = {
      ...data.products[index],
      ...body,
    };

    // SAVE UPDATED DATA
    writeProduct(data);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Product updated successfully",
        data: data.products[index],
      }),
    );
  }

  // ROUTE NOT FOUND
  else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Route not found",
      }),
    );
  }
};
