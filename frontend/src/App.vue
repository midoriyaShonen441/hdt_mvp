<script>
import {  RouterView } from 'vue-router';
// import Navbar from './components/Navbar.vue';

export default {
    components:{
      // Navbar,
      RouterView,
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<template>
  <div>
    <!-- <Navbar/> -->
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600&family=Roboto&display=swap');
body{
  font-family: 'Roboto', sans-serif;
  margin:0;
  padding: 0;
  background-color: rgb(52, 51, 51);
}
</style>
