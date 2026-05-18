import type { IncomingMessage, ServerResponse } from "node:http";

export const productControler = (req :IncomingMessage, res :ServerResponse) => {
    
    if (req.url === "/products" && req.method === "GET") {

        const products = [
            { id: 1, name: "Product 1", price: 10 },
            { id: 2, name: "Product 2", price: 20 },
            { id: 3, name: "Product 3", price: 30 },
        ];

        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify({ message: "This is products Route .Product Got Succesfully ", data: products }));
    }   
}   