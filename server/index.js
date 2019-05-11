const app = require("./server");
const logger = require("./config/logger");
const port = process.env.PORT;

app.listen(port, () => logger.debug(`Serving Bundles of Sage @: ${port}`));
