// --- Bring In Server ---
const server = require('./api/server');

// --- Server Port ---
const port = 7777;

server.listen(port, () => {console.log(`-- Server active on port ${port} --`)})