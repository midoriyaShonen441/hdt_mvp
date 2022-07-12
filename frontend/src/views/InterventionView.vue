<script>
    const builder = CY.loader()
        .licenseKey("dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868")
        .addModule(CY.modules().FACE_EMOTION.name)
        .load()

    export default {
        data(){
            return{
                isCamera: false,
                isAction: false
            }
        },
        methods:{
            cameraAction(){
                if(!this.isCamera){
                    this.isCamera = true;
                    this.cameraModelAction();
                }else{
                    this.isCamera = false
                    this.cameraModelAction();
                }
            },
            async myMed(){
                const arrayData = await localStorage.getItem("cameraEmotion");
                console.log("arrayData ===> ",parse.JSON(arrayData));
            },
 
            cameraModelAction(){

                let collectArray = [];

                builder.then(({start}) => {
                    if(this.isCamera){
                        start();
                    }
                });

                window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
                    // console.log("evt.detail.output.dominantEmotion ===> ",evt.detail.output);
                    if(evt.detail.output.dominantEmotion !== undefined){
                        console.log("evt.detail.output.dominantEmotion ===> ",evt.detail.output.dominantEmotion);

                        const warping = {
                            dominantEmotion: evt.detail.output.dominantEmotion,
                            angry: evt.detail.output.emotion.Angry,
                            disgust: evt.detail.output.emotion.Disgust,
                            fear: evt.detail.output.emotion.Fear,
                            happy: evt.detail.output.emotion.Happy,
                            neutral: evt.detail.output.emotion.Neutral,
                            sad: evt.detail.output.emotion.Sad,
                            surprise: evt.detail.output.emotion.Surprise
                        }
                        collectArray.push(warping);
                        if(collectArray.length === 21){
                            builder.then(({stop}) => {
                                localStorage.setItem("cameraEmotion", JSON.stringify(warping));
                                stop();
                                this.isCamera = false;
                            })
                        }
                    }else{
                        console.log("passing")
                    }
                    
                });
            }   
        }
    }

    
</script>

<template>
    <div>
        <div class="home-component">
            <div class="page-title">
                <h1>SCG Nexter Living</h1>
            </div>
            <div class="hamburger-container">

            </div>

            <div class="main-frame">
                <div class="content-haddle">
                    <div class="text-container">
                        <h3>If you are already press start</h3>
                        <h3>and don't forget for allow camera.</h3>
                    </div>
                </div>
                <div class="btn-voice-action">
                    <button class="on-of-cam" v-if="!isCamera" @click="cameraAction">Start</button>
                    <!-- <button @click="myMed">Median</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoed>

.content-haddle{
    margin-top: 10vh;
    text-align: center;
}
.on-of-cam{
    font-size: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: 1px solid rgb(190, 190, 190)
}
.page-title{
    color: white;
    text-align: center;
}

.main-frame{
    border: 1px solid rgb(249, 249, 249);
    width: 85%;
    height: 85vh;
    background: white;
    margin: auto;
    border-radius: 20px;
}

.btn-voice-action{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: calc(5vh + 10px)
}
</style>