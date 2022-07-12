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
            <h1>SCG Nexter living</h1>
            <button class="on-of-cam" v-if="!isCamera" @click="cameraAction">Turn on</button>
            <button @click="myMed">Median</button>
        </div>
    </div>
</template>

<style scoped>
.on-of-cam{
    margin-top: 30px;
    margin-right: 10px;
}


</style>