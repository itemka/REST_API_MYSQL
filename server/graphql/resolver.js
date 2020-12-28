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
  }
}