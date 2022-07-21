<script>
import {  RouterView } from 'vue-router';
 

export default {
    components:{
      RouterView,
 
    },
    data(){
        return{
          menuNow:"home",
          email:""
        }
    },
    methods:{
      haddleRouter(menu){
        if(menu === 'login'){
          this.$router.push("/login")
        }else if(menu === 'register'){
          this.$router.push("/register")
        }else if(menu === 'borad'){
          this.$router.push('/intervention')
        }else if(menu === 'home'){
          this.$router.push('/')
        }
      }
    }
}
</script>

<template>
  <div>
    <div class="pos-f-t">
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <div class="menu-side-bar">
            <div style="text-align: center;" @click="haddleRouter('login')">
              <i class="fa fa-sign-in" style="font-size:36px; color:white"></i>
              <p style="color:white; text-align: center;">login</p>
            </div>
            <div style="text-align: center;"  @click="haddleRouter('home')">
              <i class='fas fa-home' style='font-size:36px;  color:white'></i>
              <p style="color:white; ">home</p>
            </div>
            <div style="text-align: center;"  @click="haddleRouter('borad')">
            <i class='fas fa-chart-pie' style='font-size:36px color:white' ></i>
            <!-- <font-awesome-icon icon="fa-light fa-coffee" /> -->
              <!-- <i class='fas fa-chart-pie' style="font-size:36px;  color:white"></i> -->
              <p style="color:white; ">borad</p>
            </div>
 
          </div>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
 
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600&family=Roboto&display=swap');
body{
  font-family: 'Roboto', sans-serif !important;
  margin:0;
  padding: 0;
  background-color: rgb(52, 51, 51);
 
}
 
.menu-side-bar{
  display: flex;
  justify-content: space-around;
}

.menu-side-bar >div{
  width: 100px;
  border: 1px solid white;
  border-radius: 10px;
}

.menu-side-bar >div>i{
  margin-top:15px;
}
</style>
