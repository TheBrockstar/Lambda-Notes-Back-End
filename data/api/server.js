/// ---- Node Dependencies ----
const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
const morgan = require('morgan');
const cors = require('cors');

/// ---- Instantiate Server ----
const server = express();

/// ---- Instantiate Database ----
const db = knex(knexConfig.development);

/// ---- Connect Middleware to Server ----
server.use(express.json(), cors(), morgan('combined'), helmet());

///// ---------- CRUD Endpoints ----------




// --- Export Server ---
module.exports = server;