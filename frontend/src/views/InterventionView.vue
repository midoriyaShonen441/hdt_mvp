<script>
import StarterDesc from '../components/StarterDesc.vue';
import Dialogue1and2 from '../components/dialogue/object1/Dialogue1and2.vue';
import Dialogue3 from '../components/dialogue/object2/Dialogue3.vue';
import Dialogue4 from '../components/dialogue/object3/Dialogue4.vue';

    const builder = CY.loader()
        .licenseKey("dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868")
        .addModule(CY.modules().FACE_EMOTION.name)
        .load()

    window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    export default {
        components:{
            StarterDesc,
            Dialogue1and2,
            Dialogue3,
            Dialogue4
            // GoalSetting
            // VoiceDetect
            
        },
        data(){
            return{
                isCamera: false,
                isActionBtn: false,
                transcript: '',
                isRecording: false,
                runtimeTranscription_: "",
                isRecord: false,
                isStarter: true,

                arrayMood: [],
                isWord: [],
            }
        },
        methods:{
            
            testing(){
                console.log(this.$store.state.storeUserArray);
            },

            cameraAction(){
                if(!(this.isActionBtn)){
                    this.isStarter = false
                    this.isCamera = true;
                    this.isActionBtn = true;
                    this.$store.state.userAction.isStartRec = true;

                    // this.countAllRound += 1;
                    this.recordFunction();
                }else{
                    this.isCamera = false;
                    this.isActionBtn = false;
                    this.$store.state.userAction.isStartRec = false;
                    this.$store.state.userAction.sentenceIndex += 1;
                    // this.countAllRound += 1;

                    // console.log(this.titleObject)
                    this.recordFunction();
                }
            },

            recordFunction(){


                builder.then(({start, stop}) => {
                    if(this.isCamera){
                        start();
                    }else{
                        stop();
                    }
                });

                window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
                    if(evt.detail.output.dominantEmotion !== undefined){

                        console.log(evt.detail.output.dominantEmotion);
                        this.arrayMood.push(evt.detail.output.dominantEmotion);

                    }else{

                        console.log("passing");

                    }
                });

                if(this.isRecord === true){
                    this.isWord.push(this.runtimeTranscription_);
                    
                    const wraping = {
                            arrayMood: this.arrayMood,
                            word: this.isWord
                        }

                    this.$store.state.storeUserArray = wraping

                    console.log("this.isRecord true ==> ",this.isRecord);
                    recognition.stop();
                    this.runtimeTranscription_ = "";
                    this.isRecord = false;

                    recognition.addEventListener("end", () => {
                        this.runtimeTranscription_ = "";
                        recognition.stop();
                        this.isRecord = false;

                        
                    });

                }else{
                    // event current voice reco word
                    console.log("this.isRecord false ==> ",this.isRecord)
                    recognition.addEventListener("result", event => {      
                    var text = Array.from(event.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join("");
                    
                        this.runtimeTranscription_ = text;
                        this.runtimeTranscription_ = this.runtimeTranscription_ + text;
                        // this.isWord = this.runtimeTranscription_
                        console.log(this.runtimeTranscription_);
                    });
                        recognition.start();
                        this.isRecord = true;
                }
            },  
        },

        updated(){
            // console.log(this.countAllRound)
            // if(this.countAllRound <= 6 && this.countAllRound >= 0 ){
            //     this.titleObject = "Dialogue1and2";
            //     console.log(this.titleObject,"==>",this.countAllRound)
            // }else if(this.countAllRound > 6){
            //     this.titleObject = "goalSetting";
            //     console.log(this.titleObject,"==>",this.countAllRound)
            // }

        }
    }
</script>

<template>
    <div>
        <div class="home-component">
            <div class="page-title">
                <h1>SCG Nexter Living</h1>
                <button @click="testing">Debug</button>
            </div>

            <div class="main-frame">
                    <StarterDesc v-if="isStarter"/>
                    <Dialogue1and2 v-if="$store.state.userAction.dialogueNow === 'Dialogue1and2'"/>
                    <Dialogue3 v-if="$store.state.userAction.dialogueNow  === 'Dialogue3'"/>
                    <Dialogue4 v-if="$store.state.userAction.dialogueNow  === 'Dialogue4'"/>
                    <!-- <GoalSetting v-if="titleObject === 'goalSetting'"/> -->
                    <div class="voice-btn">
                        <div >
                            <div  v-if="!(isActionBtn)" @click="ToggleMic">
                                <button 
                                class="mic" 
                                @click="cameraAction"
                                >
                                Record
                            </button>
                            </div>
                            
                            <div v-if="(isActionBtn)" @click="ToggleMic"> 
                                <button 
                                class="mic" 
                                @click="cameraAction"
                                >
                                Next
                            </button>
                            </div>
                            
                        </div>             
                    </div>

            </div>
        </div>
    </div>
</template>

<style scoed>

.page-title{
    color: white;
    text-align: center;
}

.page-title > h1{
    margin-top: 5vh;
    margin-bottom: 5vh;
}

.main-frame{
    border: 1px solid rgb(249, 249, 249);
    width: 85%;
    height: 70vh;
    background: white;
    margin: auto;
    border-radius: 20px;
}


.voice-btn{
    margin-top: 5vh;
    text-align: center;
}

.mic{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>