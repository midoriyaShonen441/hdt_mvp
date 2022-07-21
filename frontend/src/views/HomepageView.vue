<script>
import axios from 'axios';

export default {
    components:{

    },
    data(){
        return{
            imageBase64:""
        }
    },
    methods:{
        async fetchWordCloud(){
            
            const payload = {
                testText:"อะไรก็ได้"
            }
            const wordCloud = await axios.post("http://127.0.0.1:8773/faskapi/wordcloud", payload);
            console.log(wordCloud.data)
            this.imageBase64 = wordCloud.data         
        }
    },
    mounted(){
        this.fetchWordCloud()
    }
}
</script>

<template>
    <div class="welcome-container">
        <div class="content-contianer">
            <div class="header-title">
                <h4>Welcome to Aboutme</h4>
            </div>
            <div class="body-content">
                <div class="setting-img">
                    <img width="300" height="300" src="../components/img/homepage.jpg"/>
                    <img width="300" height="300" :src="`data:image/png;base64, ${imageBase64}`"/>
                </div>
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