import { WebSocketServer, type RawData } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let nextId = 1;
let live = 0;

wss.on("connection", (ws) => {
  const id = nextId++;
  live++;
  console.log(`#${id} connected (${live} live)`);

  ws.on("message", (data: RawData) => {
    ws.send(data); // exact same bytes straight back
  });

  ws.on("close", () => {
    live--;
    console.log(`#${id} disconnected (${live} live)`);
  });

  ws.on("error", (err: Error) => console.error(`#${id} error: ${err.message}`));
});

console.log("listening on :8080");
