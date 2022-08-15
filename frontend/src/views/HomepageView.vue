<script>
import {  RouterView } from 'vue-router';
 

export default {
    components:{
      RouterView,
    },

    methods:{
      haddleRouter(menu){
        if(menu === 'tool'){
          this.$router.push("/tool")
        }
      }
    }

}
 
</script>

<template>
    <div class="welcome-container">
        <div class="content-contianer">
            <div class="header-title">
                <h4>Welcome to AnotherMe</h4>
            </div>
            <div class="body-content">
                <div class="setting-img">
                    <img width="300" height="300" src="../components/img/homepage.jpg"/>
                </div>
                <div>
                    <button class="test-button" @click="haddleRouter('tool')">
                        Using Tools
                    </button>
                </div>
                <div>
                    <button class="test-button" @click="haddleRouter('tool')">
                        IAT
                    </button>
                </div>
            </div>
            <div class="footer-container">
                <h5>Created by Nexter Living team.</h5>
            </div>
        </div>
    </div>
</template>

<style scoped>

.test-button{ 
    margin-top: 50px;
    border-radius:  0.25rem;
    background-color: rgb(54,58,63);
    color: rgb(250,252,254);
    border-width: 0.1rem;
    border-color: white;
}
.welcome-container{
    text-align: center;
    margin: auto;
    background: white;
    border-radius: 30px;
    height: 100%;
    margin-top: 10%;
    width: 85%;
}

.content-contianer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
}

.header-title{
    margin-top: 10%;
}

.body-content{
    margin-top: 15%;
}

.footer-container{
    margin-top: 40%;
    padding-bottom: 40px;
}

.setting-img{
    margin-top: 10%
}

</style>