<script setup>
import { ref, onMounted} from 'vue';

  const gender = ref('');
  const picture = ref('');

  onMounted(async ()=> {
    const res = await fetch('https://randomuser.me/api/?gender=male');
    const {results} = await res.json();

    picture.value = results[0].picture.large;
    gender.value = results[0].gender;
  })

</script>

<template>
  <img
    :class="gender"
    v-bind:src="picture"
    />
</template>

<style scoped>
img {
    border-radius: 50%;
    border: 5px #333 solid;
    margin-bottom: 1rem;
  }

.male {
  border-color: steelblue;
  background-color: steelblue;
}

.female {
  border-color: pink;
  background-color: pink;
  color: #333;
}
</style>
