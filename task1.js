const http = require("http");
const fs = require("fs");
const port = 4000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      '<html><head><title>message</title></head><body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form></body></html>'
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];

      fs.writeFileSync("message.txt", message, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Message saved successfully.");
      });

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.write("<html>This Is Node Js</html>");
  res.end();
});

server.listen(port, () => {
  console.log(`Server Is Listening On Port: ${port}`);
});
