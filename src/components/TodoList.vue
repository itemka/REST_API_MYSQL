<template>
  <div>
    <nav>
      <div class="nav-wrapper blue darken-4 row">
        <a href=""><i class="icon material-icons col">menu</i></a>
        <a href="" class="left brand-logo col s10">{{ msg }}</a>
      </div>
    </nav>
    <div class="row">
      <div class="col s10 offset-s1">
        <div class="card-panel teal">
          <span class="white-text">
            <p class="flow-text">{{ date(new Date()) }}</p>
            <br />
            <div class="input-field s12">
              <input
                v-on:keyup.enter="addTodo"
                v-model="todoTitle"
                id="newTodo"
                type="text"
                class="validate"
              />
              <label class="active" for="newTodo">Enter new task</label>
            </div>
          </span>
        </div>
      </div>
      <div class="col s10 offset-s1">
        <div v-if="todos.length === 0" class="white-text">
          The list is empty
        </div>
        <ul
          v-else
          v-for="(todo, i) in todos"
          :key="i"
          class="card-panel brown darken-1 white-text text-darken-2"
        >
          <li class="row">
            <label class="col s1 offset-s1">
              <input
                type="checkbox"
                class="filled-in"
                :class="{ done: todo.done }"
              />
              <span />
            </label>
            <div class="col s5">
              <div>{{ capitalize(todo.title) }}</div>
              <blockquote>Added {{ date(todo.date) }}</blockquote>
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
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();

      if (!title) return;

      this.todos.push({
        title,
        id: Math.random(),
        done: false,
        date: new Date(),
      });
      this.todoTitle = "";
    },
    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    date(value) {
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(value));
    },
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>