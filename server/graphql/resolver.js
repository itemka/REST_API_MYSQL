const Todo = require('../models/todo');

module.exports = {
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (err) {
      throw new Error('Fetch todos is not available')
    }
  },
  async createTasks({ todo: { title = '' } }) {
    try {
      return await Todo.create({
        title,
        done: false
      });
    } catch (err) {
      throw new Error('Title is required')
    }
  },
  async updateTasks({ id = null, done = false }) {
    try {
      const todo = await Todo.findByPk(+id);
      todo.done = done;
      await todo.save();

      return todo;
    } catch (err) {
      throw new Error('Id is required')
    }
  },
  async deleteTasks({ id = null }) {
    try {
      const todos = await Todo.findAll({ where: { id: +id } });
      await todos[0].destroy();

      return todos[0];
    } catch (err) {
      throw new Error('Id is required')
    }
  }
}