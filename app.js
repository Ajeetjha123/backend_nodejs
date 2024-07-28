const http = require("http");
const PORT = 4000;
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/home") res.end("Welcome Home");
  else if (url === "/about") res.end("Welcome to About Us page");
  else if (url === "/node") res.end("Welcome to My Node Js Project");
});
server.listen(PORT, () => {
  console.log(`Server is listing on the port ${PORT}`);
});
