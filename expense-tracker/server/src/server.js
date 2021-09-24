const http = require("http");
const app = require("./app");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, console.log(`Server is runing on port ${port}`));
