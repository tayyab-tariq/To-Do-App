<template>
    <div v-if="showConfirmBox" class="confirm-box">
      <div class="confirm-box-content">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="confirm-box-buttons">
          <button @click="confirm">OK</button>
          <button @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const showConfirmBox = ref(false);
      const title = ref('');
      const message = ref('');
      let resolve;
      let reject;
  
      const openConfirmBox = (titleValue, messageValue) => {
        title.value = titleValue;
        message.value = messageValue;
        showConfirmBox.value = true;
  
        return new Promise((_resolve, _reject) => {
          resolve = _resolve;
          reject = _reject;
        });
      };
  
      const confirm = () => {
        showConfirmBox.value = false;
        resolve();
      };
  
      const cancel = () => {
        showConfirmBox.value = false;
        reject();
      };
  
      return {
        showConfirmBox,
        title,
        message,
        openConfirmBox,
        confirm,
        cancel,
      };
    },
  };
  </script>
  
  <style scoped>
  .confirm-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .confirm-box-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
  }
  
  .confirm-box-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  
  .confirm-box-buttons button {
    margin-left: 10px;
  }
  </style>