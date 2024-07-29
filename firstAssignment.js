const http = require("http");
const port = 4000;
const { handleRequest } = require("./routes/routes");

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
