import { log } from "console";
import { createServer, IncomingMessage, Server } from "http";
import { routeHandeler } from "./routes/route";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandeler(req, res);
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000 hi");
});
