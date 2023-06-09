<script setup>
  import { ref, onMounted, computed, watch} from 'vue'
  import Picture from './components/Picture.vue'
  import Tasks from './components/Tasks.vue'
  import Task from './components/Task.vue'
  import API_BASE_URL from '../config';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import { getAllTasks, updateTask, addTask, removeTask } from './modules/toDoApi.js';


  const toDos = ref([]);
  const name = ref('');
  var showComponent =  ref(true);

  const showTasks = () => {
    showComponent.value = !showComponent.value;
    // this.showComponent.value = !this.showComponent;
  };

  const addTodo = async (input_content) => {
    if (input_content.value.trim() === ''){
      toast.error('Please Enter a Task', {
          autoClose: 1500,
        });
      return;
    }

    try {
      const response = await addTask(input_content.value);
      
      if (response.status === 'success'){
        const taskData = response.createTask;
        toDos.value.unshift(taskData);
        input_content.value = '';
        toast.success('Success', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error('Server Error', {
          autoClose: 1500,
        });
      console.error(error);
    }
     
    
  };

  const updateTodo = async toDo => {

    try {
      const responseJson = await updateTask(toDo);
      
      if (responseJson.status === 'success'){
        toDo.isCompleted = responseJson.isCompleted;
        toast.success('Record Updated', {
          autoClose: 1000,
        });
      }  
    } catch (error) {
      toast.error('Server Error', {
          autoClose: 1500,
        });
      console.error(error);
      toDo.isCompleted = !toDo.isCompleted;
    }
    
    
  };

  const removeTodo = async (toDo) => {

    if (window.confirm('Are you sure?')) {
      try {
        const responseJson = await removeTask(toDo);
        if (responseJson.status ==='success'){
          toDos.value = toDos.value.filter(t => t !== toDo);
          toast.success('Record Deleted', {
          autoClose: 1000,
        });
        } 
      } catch (error) {
        toast.error('Server Error', {
          autoClose: 1500,
        });
        console.error(error);
      }
    }
    
  };

  watch(name, (newVal) => {
    localStorage.setItem('name', newVal);
  }) 

  onMounted(async ()=> {

    const endpoint = '/task/getTasks';
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await getAllTasks();

    toDos.value = response || [];
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
