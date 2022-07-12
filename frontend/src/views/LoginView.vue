<script>
export default {
    data(){
        return{
            isEmail:""
        }
    },
    methods:{

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
            <div class="">
                <div class="login-user-email">
                    <input/>
                </div>
                <div class="btn-content">
                    <button>login</button>
                </div>
            </div> 
        </div>
    </div>
</template>

<style scoped>
.page-title{
    margin-top: 5vh;
    text-align: center;
    margin-bottom: 10vh;
}
.login-box-content{
    margin: auto;
    width: 95%;
    height: 40vh;
    background: white;
    border-radius: 30px;
}
</style>