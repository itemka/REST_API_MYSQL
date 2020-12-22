const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const todoRoutes = require('./routes/todo');

dotenv.config('./env');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(compression());

app.use('/api/todo', todoRoutes);

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${PORT}`);
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`> Ready on http://localhost:${PORT}`);
});
