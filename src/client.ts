import WebSocket from "ws";
import readline from "node:readline";

const ws = new WebSocket("ws://localhost:8080");
const rl = readline.createInterface({ input: process.stdin });

ws.on("open", () => console.log("connected - type a line, hit enter"));
rl.on("line", (line) => ws.send(line));
ws.on("message", (data) => console.log("echo:", data.toString()));
ws.on("close", () => { console.log("server closed the connection"); process.exit(0); });
