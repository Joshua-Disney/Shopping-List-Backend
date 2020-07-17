require("dotenv").config();

const { http, server } = require("./api/server.js");

server.get("/", (req, res) => {
  res.send("Code me!");
});

const port = process.env.PORT || 4000;
http.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
