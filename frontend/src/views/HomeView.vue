<script >
const builder = CY.loader()
                    .licenseKey("dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868")
                    .addModule(CY.modules().FACE_EMOTION.name)
                    .load()

    export default {
        data(){
            return{
                isCamera: false,
                isToken: "dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868",
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
 
            cameraModelAction(){
                builder.then(({ start, stop, terminate }) => {
                    if(this.isCamera){
                        start();
                    }else{
                        stop();
                    }
                });

                window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
                    // console.log("evt.detail.output.dominantEmotion ===> ",evt.detail.output);
                    if(evt.detail.output.dominantEmotion !== undefined){
                        console.log("evt.detail.output.dominantEmotion ===> ",evt.detail.output.dominantEmotion);
                        // const warping = {
                        //     dominantEmotion: evt.detail.output.dominantEmotion,
                        //     angry: evt.detail.output.emotion.Angry,
                        //     disgust: evt.detail.output.emotion.Disgust,
                        //     fear: evt.detail.output.emotion.Fear,
                        //     happy: evt.detail.output.emotion.Happy,
                        //     neutral: evt.detail.output.emotion.Neutral,
                        //     sad: evt.detail.output.emotion.Sad,
                        //     surprise: evt.detail.output.emotion.Surprise
                        // }
                        // collectArray.push(warping);
                        // if(collectArray.length === 21){
                        //     localStorage.setItem("cameraEmotion", warping);
                        //     window.location.reload(false);
 
                        // }
                    }else{
                        console.log("passing")
                    }
                    
                });

            }
            
        },
        mounted(){
   

            
        },

        updated(){
                
        }
    }

    
</script>

<template>
    <div>
        <div class="home-component">
            <h1>SCG Nexter living</h1>
            <button class="on-of-cam" v-if="!isCamera" @click="cameraAction">Turn on</button>
            <button class="on-of-cam" v-if="isCamera" @click="cameraAction">Turn off</button>
        </div>
        <!-- <div>
            <div class="container-fluid">
                <div class="row">
                <canvas id="canvas" class="col-md-8"></canvas>
                <br />
                <canvas id="chart_age" width="400" height="250"></canvas>
                <div class="col-md-4">
                    <strong>MorphCast JS SDK - Age module (dev environment)</strong>
                    <div id="age_results" style="word-wrap:break-word;font-size:40px"></div>
                </div>
                </div>
                <div>
                <button id="start" onclick="onStart()" disabled>Start</button>
                <button id="stop" onclick="onStop()">Stop</button>
                <p>
                    <strong>Instructions</strong>
                    Press the start button to start the detector.
                    <br/> Press the stop button to end the detector.
                </p>
                <div>
                    <strong>LOG:</strong>
                </div>
                <div id="logs"></div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>

</style>