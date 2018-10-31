// -- Loads .env Configuration --
require('dotenv').config();

// --- Bring In Server ---
const server = require('./data/api/server');

// --- Server Port ---
const port = process.env.PORT || 7777;;

const instance = server.listen(port, () => {console.log(`\n-- Server active on port ${instance.address().port} --\n`)})