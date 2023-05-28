<script setup>
  import { ref, onMounted, computed, watch} from 'vue'
  import Picture from './components/Picture.vue'
  import Tasks from './components/Tasks.vue'
  import Task from './components/Task.vue'

  const toDos = ref([]);
  const name = ref('');
  var showComponent =  ref(true);

  const showTasks = () => {
    showComponent.value = !showComponent.value;
    // this.showComponent.value = !this.showComponent;
  };

  const addTodo = async (input_content) => {
    if (input_content.value.trim() === ''){
      return;
    }

    const data = {
      task: input_content.value,
      isCompleted: false,
      completionTime: null
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const addTask = await fetch('http://localhost:3000/task/addTask', options);
      const responseJson = await addTask.json();
      
      if (addTask.ok && responseJson.status === 'success'){
        const taskData = responseJson.createTask;
        toDos.value.unshift(taskData);
        input_content.value = '';
      }
    } catch (error) {
      console.error(error);
    }
     
    
  };

  const updateTodo = async toDo => {
    const options = {
      method: 'PATCH',
      headers: {
        'id': toDo._id,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isCompleted: toDo.isCompleted
      })
    };

    try {
      const updateTask = await fetch('http://localhost:3000/task/updateTask', options);
      const responseJson = await updateTask.json();
      
      if (updateTask.ok && responseJson.status === 'success'){
        toDo.isCompleted = responseJson.isCompleted;
      }  
    } catch (error) {
      console.error(error);
      toDo.isCompleted = !toDo.isCompleted;
    }
    
    
  };

  const removeTodo = async (toDo) => {

    const options = {
      method: 'DELETE',
      headers: {
        'id': toDo._id
      }
    };

    try {
      const deleteTask = await fetch('http://localhost:3000/task/deleteTask', options);
      const responseJson = await deleteTask.json();
      if (deleteTask.ok && responseJson.status ==='success'){
        toDos.value = toDos.value.filter(t => t !== toDo);
      } 
    } catch (error) {
      console.error(error);
    }
    
  };

  watch(name, (newVal) => {
    localStorage.setItem('name', newVal);
  }) 

  onMounted(async ()=> {
    name.value = localStorage.getItem('name') || '';
    
    const tasks = await fetch('http://localhost:3000/task/getTasks', {
      method: 'POST'
    });
    const responseJson = await tasks.json();
    toDos.value = responseJson || [];

    // toDos.value = JSON.parse(localStorage.getItem('toDos')) || [];
  })

</script>

<template>
  <main class="app">

    <section class="greeting">
      <h2 class="title">
        What's up, <input type="text" placeholder="Name here" v-model="name">
      </h2>
      <Picture />
    </section>
    <Task :addTodo="addTodo" :showTasks="showTasks"/>

    <div v-show="showComponent">
      <Tasks :toDos="toDos" :deleteTodo="removeTodo" :updateTodo="updateTodo" />    
    </div>
    
  </main>
</template>

<style scoped>
/* When the checkbox is checked, add a blue background */

</style>
