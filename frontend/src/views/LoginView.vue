<script>
import axios from "axios";

export default {
    data(){
        return{
            isEmail:""
        }
    },
    methods:{
        async haddleLogin(){
            const userLogin = axios.post("")
        }
    },mounted(){

    }
}
</script>

<template>
    <div class="login-component">
        <div class="page-title">
            <h2><b>Login</b></h2>
        </div>
        <div class="login-box-content">
            
                <div class="login-user-email">
                    <input class="input-email" type="email" placeholder='Enter your email.' required/>
                </div>
                <div class="btn-content">
                    <button class="login-btn-email" @click="haddleLogin">login</button>
                </div>

        </div>
    </div>
</template>

<style scoped>
.page-title{
    color: white;
    margin-top: 5vh;
    text-align: center;
    margin-bottom: 10vh;
}
.login-box-content{
    margin: auto;
    text-align: center;
    width: 85%;
    height: 40vh;
    background: white;
    border-radius: 30px;
}

.login-user-email{
    padding-top: 100px;
}

.login-btn-email{
    font-size: 15px;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: rgb(194, 222, 240);
}

.input-email{
    text-indent: 10px;
    height: 50px;
    width: 250px;
    border: 1px solid rgb(172, 172, 172);
    border-radius: 4px;
}

.btn-content{
    padding-top: 45px;
}

</style>