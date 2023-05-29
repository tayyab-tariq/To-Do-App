<script setup>
  import { ref, onMounted, computed, watch} from 'vue'
  import Picture from './components/Picture.vue'
  import Tasks from './components/Tasks.vue'
  import Task from './components/Task.vue'
  import API_BASE_URL from '../config';

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

    const endpoint = '/task/addTask';
    const url = `${API_BASE_URL}${endpoint}`;

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
      const addTask = await fetch(url, options);
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

    const endpoint = '/task/updateTask';
    const url = `${API_BASE_URL}${endpoint}`;

    const options = {
      method: 'PATCH',
      headers: {
        'id': toDo._id,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isCompleted: toDo.isCompleted,
        task: toDo.task,
      })
    };

    try {
      const updateTask = await fetch(url, options);
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

    const endpoint = '/task/deleteTask';
    const url = `${API_BASE_URL}${endpoint}`;
    
    const options = {
      method: 'DELETE',
      headers: {
        'id': toDo._id
      }
    };

    try {
      const deleteTask = await fetch(url, options);
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

    const endpoint = '/task/getTasks';
    const url = `${API_BASE_URL}${endpoint}`;

    name.value = localStorage.getItem('name') || '';
    
    const tasks = await fetch(url, {
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
.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Add this line to vertically center the content */
  gap: 20px;
}

.title {
  margin-bottom: 20px;
  margin-top: -30%; /* Adjust the margin-top value to move the title upwards */
}

</style>
