const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const todoRoutes = require('./routes/todo');
const sequelize = require('./utils/database');

dotenv.config('./env');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(compression());

app.use('/api/todo', todoRoutes);

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${PORT}`);
});

async function start() {
  try {
    await sequelize.sync(); // if rewrite { force: true }
    console.log('> Connected to DB');

    app.listen(PORT, (err) => {
      if (err) throw err;
    
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();