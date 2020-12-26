const { Router } = require('express');
const Todo = require('../models/todo');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();

    res.status(200).json({ todos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' })
  }
});

router.post('/', async (req, res) => {
  try {
    const { title = '' } = req.body;
    const todo = await Todo.create({
      title,
      done: false
    });
    
    res.status(201).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      params: { id = null },
      body: { done = false }
    } = req;
    const todo = await Todo.findByPk(+id);
    todo.done = done;
    await todo.save();

    res.status(200).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { id: +req.params.id } });
    await todos[0].destroy();

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' })
  }
});

module.exports = router;
