const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Check your console for the name!");
});
server.listen(4000, () => {
  console.log(`My name Is ${"Ajeet KumR jha"}`);
});
