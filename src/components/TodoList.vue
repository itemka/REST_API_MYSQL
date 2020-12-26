<template>
  <div>
    <nav>
      <div class="nav-wrapper blue darken-4 row">
        <a href=""><i class="icon material-icons col">menu</i></a>
        <a href="" class="left brand-logo col s10">{{ msg }}</a>
      </div>
    </nav>
    <div class="row">
      <div class="col s12">
        <div class="card-panel grey darken-4">
          <span class="white-text">
            <p class="flow-text">{{ date(new Date()) }}</p>
            <p class="flow-text">{{ todos.length }} task(s)</p>
            <br />
            <div class="input-field s12">
              <input
                v-on:keyup.enter="addTodo"
                v-model="todoTitle"
                id="newTodo"
                type="text"
                class="validate white-text"
              />
              <label class="active" for="newTodo">Enter new task</label>
            </div>
          </span>
        </div>
      </div>
      <div class="col s12">
        <div v-if="todos.length === 0" class="white-text">
          The list is empty
        </div>
        <ul
          v-else
          v-for="(todo, i) in todos"
          :key="todo.id + i"
          class="card-panel grey darken-4 white-text text-darken-2"
        >
          <li class="row">
            <label class="col s1 offset-s1">
              <input
                type="checkbox"
                class="filled-in"
                :class="{ done: todo.done }"
                v-model="todo.done"
                @click="handleCheckbox(todo.id)"
              />
              <span />
            </label>
            <div class="col s9">
              <div>{{ capitalize(todo.title) }}</div>
              <blockquote>
                Created at: {{ date(todo.createdAt, true) }} (updated at:
                {{ date(todo.updatedAt, true) }})
              </blockquote>
            </div>
            <div class="col s2">
              <a
                @click="removeTodo(todo.id)"
                class="btn-floating btn-middle waves-effect waves-right red"
              >
                <i class="material-icons">clear</i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../utils/api";

export default {
  name: "TodoList",
  props: {
    msg: String,
  },
  data: () => ({
    show: true,
    todoTitle: "",
    todos: [],
  }),
  async created() {
    try {
      const {
        data: { todos = [] },
      } = await API.getTasks();

      this.todos = todos;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async addTodo() {
      try {
        const title = this.todoTitle.trim();

        if (!title) return;

        const {
          data: { todo = {} },
        } = await API.createTasks({ title });

        this.todos.push({ ...todo });
        this.todoTitle = "";
      } catch (err) {
        console.log(err);
      }
    },
    async removeTodo(id) {
      try {
        const { status = 500 } = await API.deleteTasks(id);

        if (status === 204) {
          this.todos = this.todos.filter((todo) => todo.id !== id);
        }
      } catch (err) {
        console.log(err);
      }
    },
    date(value, withTime = false) {
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        ...(withTime && {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }).format(new Date(value));
    },
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    async handleCheckbox(id) {
      try {
        const idx = this.todos.findIndex((todo) => todo.id === id);
        const updatedTodo = await API.updateTasks(id, {
          done: !this.todos[idx].done,
        });
        this.todos[idx] = updatedTodo;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
li {
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>