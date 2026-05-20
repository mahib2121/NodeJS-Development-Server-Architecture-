import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../constroler/productControl";

export const routeHandeler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "This is root path",
      }),
    );
  }

  // ALL PRODUCT ROUTES
  else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Not Found",
      }),
    );
  }
};
