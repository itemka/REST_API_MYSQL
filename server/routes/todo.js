const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json({ data: 'get' });
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    res.json({ data: 'post' });
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    res.json({ data: 'put' });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    res.json({ data: 'delete' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
