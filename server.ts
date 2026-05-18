import { log } from "console";
import { createServer, IncomingMessage, Server } from "http";

const server : Server = createServer((req : IncomingMessage , res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    // console.log("Received a GET request to the root path");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is root path" }));
  }
  else if (url?.startsWith("/products") && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is All products " }));
  }
  else{
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
