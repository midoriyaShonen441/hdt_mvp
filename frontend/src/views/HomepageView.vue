<script>
export default {
    components:{

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
    <div class="welcome-container">
        <div class="content-contianer">
            <div class="header-title">
                <h3>Welcome to application</h3>
            </div>
            <div class="body-content">

            </div>
            <div class="footer-container">
                <h4>Create by nexter living team.</h4>
            </div>
        </div>
    </div>
</template>

<style scoped>
.welcome-container{
    text-align: center;
    margin: auto;
    background: white;
    border-radius: 30px;
    height: 80vh;
    margin-top:100px;
    width: 85%;
}

.content-contianer{
    display: grid;
    grid-template-rows: 1fr 9fr 1fr;
    grid-row-gap: 2rem;
    row-gap: 1rem;
    text-align: center;
    margin: auto;
}

.header-title{
 
}

.body-content{
 
}

.footer-container{
 
}
</style>