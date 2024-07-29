const http = require("http");
const fs = require("fs");
const port = 4000;

const readMessagesFromFile = () => {
  try {
    const message = fs.readFileSync("messages.txt", "utf8");
    return message.trim();
  } catch (err) {
    console.error("Error reading file:", err);
    return "";
  }
};

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    let messages = readMessagesFromFile();

    if (method === "POST") {
      let body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        body = Buffer.concat(body).toString();
        const message = body.split("=")[1];
        fs.appendFile("messages.txt", message + "\n", (err) => {
          if (err) {
            console.error("Error appending to file:", err);
            return;
          }
          console.log("Message appended to file:", message);
        });
        messages = readMessagesFromFile();
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
          <html>
            <head><title>Show Input Text</title></head>
            <body>
              <h1>Show Input Text Example</h1>
              <form action="/" method="POST">
                <input type="text" name="message" placeholder="Enter your message">
                <button type="submit">Submit</button>
              </form>
              <p>${message}</p>
            </body>
          </html>
        `);
        return res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
        <html>
          <head><title>Show Input Text</title></head>
          <body>
            <h1>Show Input Text Example</h1>
            <form action="/" method="POST">
              <input type="text" name="message" placeholder="Enter your message">
              <button type="submit">Submit</button>
            </form>
            <p>${messages}</p>
          </body>
        </html>
      `);
      return res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<html><body><h1>404 Not Found</h1></body></html>");
    return res.end();
  }
});

// Start server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
