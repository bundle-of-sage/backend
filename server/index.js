const app = require("./server");
const logger = require("./config/logger");
const port = process.env.PORT;

app.listen(port, () => console.log("listening on port", port));
