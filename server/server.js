const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

require('./mongoDB/connection');

app.use(cors());
app.use(express.json());

const socket = require('socket.io');
const server = app.listen(port, () =>
  console.log(`Listening on port ${port} (http://localhost:${port})`)
);

app.post('/auth/login', (req, res) => require('./mongoDB/auth/login')(req, res));

app.post('/find/products', (req, res) => require('./mongoDB/find/products')(req, res));

// app.post('/:where/:what', (req, res) => {
//   try {
//     require(`./mongoDB/${req.params.where}/${req.params.what}`)(req, res)
//   } catch (err) {
//     console.log(`Error on require module ${req.params.where}/${req.params.what}: ${err}`)
//   }
// });

// register
// remind-password
// images
// select
// from now token verify, but only for change calls

const io = socket(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (client) => {
  console.log(client.id, client.handshake.query.user_ID, new Date())
});
