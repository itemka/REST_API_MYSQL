<template>
  <div class="app">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <TodoList msg="Todo list" />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style scoped>
.app {
  background-color: #4c4d4c;
}
</style>