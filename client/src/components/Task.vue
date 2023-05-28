<script setup>
import { ref} from 'vue'
    const props = defineProps(['addTodo', 'showTasks']);
    const input_content = ref('');
    var showArrow = ref(true);

    const addTask = () => {
        props.addTodo(input_content);
    };

    const showComponent = () => {
        props.showTasks();
        showArrow.value = !showArrow.value;
    };
</script>

<template>
    <section class="create-todo">
      <form @submit.prevent="addTask">

        <div class="input-wrapper">
            <span class="triple-bar">&#8801;</span>
            <input type="text" placeholder="To do today" v-model="input_content" />
            <i :class="['arrow', { 'down': showArrow, 'left': !showArrow }]" @click="showComponent"></i>
        </div>        

        <input type="submit" value="Add Task" />
      </form>
    </section>
</template>

<style scoped>

.input-wrapper {
  position: relative;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 8px;
  height: 8px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  cursor: pointer;
}

.down {
  transform: translate(-50%, -50%) rotate(45deg);
  -webkit-transform: translate(-50%, -50%) rotate(45deg);
  transition: 0.5s;
}

.left {
  transform: translate(-50%, -50%) rotate(135deg);
  -webkit-transform: translate(-50%, -50%) rotate(135deg);
  transition: 0.5s;
}


.horizontal-triple-bar {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 18px;
  height: 2px;
  background-color: #333;
}

.triple-bar {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  font-size: 30px;
  color: #333;
  padding: 5px;
  width: 30px;
}

.input-wrapper input {
  text-indent: 20px;
}
</style>
