<script setup>

    const props = defineProps(['toDos', 'deleteTodo', 'updateTodo']);

</script>

<template>
    <section class="todo-list">
      <div class="list">
        <div v-for="toDo in toDos" :class="`todo-item ${toDo.isCompleted && 'done'}`">
          <label class="container">
            <input type="checkbox" v-model="toDo.isCompleted" @change="updateTodo(toDo)" />
            <span class="checkmark"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="toDo.task" @change="updateTodo(toDo)">
          </div>

          <div class="actions" @click="deleteTodo(toDo)">
            <span>&#8942;</span>
            <span>&#8942;</span>
          </div>

        </div>
      </div>
    </section>
</template>

<style scoped>
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: -3px;
  left: 0;
  border-radius: 10px;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border: 1px solid #A4957A;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #A4957A;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.actions:hover span {
  background-color: #ccc;
  cursor: pointer;
}

</style>
