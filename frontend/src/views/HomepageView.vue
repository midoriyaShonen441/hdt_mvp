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
                <h4>Welcome to application</h4>
            </div>
            <div class="body-content">

            </div>
            <div class="footer-container">
                <h5>Create by nexter living team.</h5>
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
    height: 70vh;
    margin-top:86px;
    width: 85%;
}

.content-contianer{
    display: grid;
    grid-template-rows: 1fr 7fr 1fr;
    grid-row-gap: 2rem;
    row-gap: 1rem;
    text-align: center;
    margin: auto;
}

.header-title{
 margin-top: 30px
}

.body-content{
 
}

.footer-container{
 
}
</style>