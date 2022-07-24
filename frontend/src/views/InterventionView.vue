<script>
import StarterDesc from '../components/StarterDesc.vue';
import Dialogue1and2 from '../components/dialogue/object1/Dialogue1and2.vue';
import Dialogue3 from '../components/dialogue/object2/Dialogue3.vue';
import Dialogue4 from '../components/dialogue/object3/Dialogue4.vue';
import EndDialogue from '../components/EndDialogue.vue';
import axios  from 'axios';
import VoiceAnimation from '../components/VoiceAnimation.vue'
import { httpAPI } from '../APIsetting';

const httpAPIs = httpAPI();
console.log(httpAPIs);

const builder = CY.loader()
    .licenseKey("dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868")
    .addModule(CY.modules().FACE_EMOTION.name)
    .load()

window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = 'th-TH'; 
// th-TH



    export default {
        components:{
            StarterDesc,
            Dialogue1and2,
            Dialogue3,
            Dialogue4,
            EndDialogue,
            VoiceAnimation
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
                isShowReset: false,
                setArrayMood: [],   
                arrayMood: [],
                isWord: [],
                isObject: [],
                isSentimentScore: [],
                myEmail:"",

                isError:"",
                isLoading:false,
                selectLang: "th-TH"
            }
        },
        methods:{
            
            testing(){
                this.$store.state.userAction.sentenceIndex = 0;
                // console.log(this.$store.state.storeUserArray);
                this.$store.state.userAction.dialogueNow = "end";
            },

            checkUserIn(){
                
                try{
                    const stringJson = localStorage.getItem("nexter_living_user");
                    const convertStingJson = JSON.parse(stringJson);

                    const isEmail = convertStingJson.email;
                    this.myEmail = isEmail

                    if(!isEmail){
                        this.$router.push("/login")
                    }

                }catch(err){
                    this.$router.push("/login")
                }
                
            },

            async cameraAction(){
                if(!(this.isActionBtn)){

                    this.isStarter = false
                    this.isCamera = true;
                    this.isActionBtn = true;
                    this.isShowReset = true;
                    this.$store.state.userAction.isStartRec = true;
                    this.recordFunction();

                }else{

                    this.isCamera = false;
                    this.isActionBtn = false;
                    this.isShowReset = false;
                    this.$store.state.userAction.isStartRec = false;
                    this.$store.state.userAction.sentenceIndex += 1;

                    this.arrayMood.push(this.setArrayMood);
                    
                    const warpingPayload = {
                        email: this.myEmail,
                        objective: this.$store.state.userAction.dialogueNow,
                        sentence: this.$store.state.userAction.setSentence,
                        question: this.$store.state.userAction.setQuestion,
                        facial: this.setArrayMood,
                        answer: this.runtimeTranscription_
                    }

                    this.isLoading = true;

                    try{

                        const responseReturn = await axios.post(`${httpAPIs}/writeEmotion`,warpingPayload);

                        if(responseReturn.data.status !== "OK"){
                            this.isError = "Cannot connect to server!";
                            this.isLoading = false;
                        }else{
                            this.sentimentScore = responseReturn.data.sentimentScore
                            this.isLoading = false;
                        }

                    }catch(err){
                        console.log(err);
                        this.isError = "Cannot connect to server!";
                        this.isLoading = false;
                    }

                    
                    this.isObject.push(this.$store.state.userAction.dialogueNow);
                    this.isSentimentScore.push(this.sentimentScore) 
                    // console.log(this.$store.state.userAction.dialogueNow);

                    const wraping = {
                        objective:  this.isObject,
                        arrayMood: this.arrayMood,
                        word: this.isWord,
                        sentimentScore: this.isSentimentScore
                    }                    

                    this.$store.state.storeUserArray = wraping;
                    // console.log("wraping ===> ",this.$store.state.storeUserArray);
                    // console.log("wraping ===> ",this.$store.state.storeUserArray.objective[0]);
                    this.setArrayMood = []

                    this.recordFunction();
                }
            },

            recordFunction(){
                
                builder.then(({start, stop}) => {
                    if(this.isCamera){
                        start();
                        // setTimeout(() => {
                        //     stop();
                        // }, 30000)
                    }else{
                        // clearTimeout(settingTime)
                        stop();
                    }
                });

                window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
                    if(evt.detail.output.dominantEmotion !== undefined){

                        // console.log(evt.detail.output.dominantEmotion);
                
                        this.setArrayMood.push(evt.detail.output.dominantEmotion);

                    }else{
                        // console.log("passing");
                    }
                });

                if(this.isRecord === true){
                    this.isWord.push(this.runtimeTranscription_);

                    // console.log("this.isRecord true ==> ",this.isRecord);
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
                    // console.log("this.isRecord false ==> ",this.isRecord)
                    recognition.addEventListener("result", event => {      
                    var text = Array.from(event.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join("");
                        // console.log("text ====> ",event.results)
                        this.runtimeTranscription_ = text;
                        this.runtimeTranscription_ = this.runtimeTranscription_ + text;
                        // console.log(this.runtimeTranscription_);
                    });
                        recognition.start();
                        this.isRecord = true;
                }
            },  

            haddleToHomePage(){
                this.isStarter = true;
                this.$store.state.userAction.dialogueNow = "Dialogue1and2";
                this.$router.push('/');
            },

            haddleReset(){
                this.runtimeTranscription_ = "";
                this.isWord = [];
                this.arrayMood = [];
                this.setArrayMood = [];
                alert("Reset!")
            },

            haddleSwitch(switchs){
                if(switchs === 0){
                    this.$store.state.isChangePages = 0
                }else if(switchs === 1){
                    this.$store.state.isChangePages = 1
                }else if(switchs === 2){
                    this.$store.state.isChangePages = 2
                }
            },
        },
        created(){
            this.checkUserIn();
            
        },
        
        updated(){
            // if(this.setArrayMood.length > 0){
            //     console.log(this.setArrayMood.length)
            // }
            
        }
    }
</script>

<template>
    <div>
        <div class="home-component">

            <div class="warping-loading-container" v-if="isLoading">
                <div class="is-loading"></div>
                <div class="loading-content">Loading...</div>
            </div>

            <div class="page-title">
                <h1>AnotherMe</h1>
                <button class="analyzing" @click="testing">Analyzing</button>
            </div>

            <div class="main-frame" v-if="isError === ''">

                    <StarterDesc v-if="isStarter"/>
                    <Dialogue1and2 v-if="this.$store.state.userAction.dialogueNow === 'Dialogue1and2'"/>
                    <Dialogue3 v-if="this.$store.state.userAction.dialogueNow  === 'Dialogue3'"/>
                    <Dialogue4 v-if="this.$store.state.userAction.dialogueNow  === 'Dialogue4'"/>
                    <EndDialogue  v-if="this.$store.state.userAction.dialogueNow  === 'end'"/>
                    <div class="user-text-in">
                        {{runtimeTranscription_}}
                    </div>
                    <div class="set-animation" v-if="this.$store.state.userAction.isStartRec === true">
                        <VoiceAnimation/>
                    </div>

                    <div class="voice-btn">
                        <div class="set-btn-line" v-if="this.$store.state.userAction.dialogueNow !== 'end'">

                            <div v-if="isShowReset">
                                <button class="mic" @click="haddleReset">Recover</button>
                            </div>

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
                                v-if="setArrayMood.length > 0"
                                >
                                Next
                                </button>

                                <button 
                                class="mic-off" 
                                @click="cameraAction"
                                v-if="setArrayMood.length === 0"
                                >
                                Next
                                </button>
                            </div>

                        </div>
                        <div class="btn-switch-result" v-if="this.$store.state.userAction.dialogueNow === 'end'">
                            <button class="btn-switch" @click="haddleSwitch(0)"></button>
                            <button class="btn-switch" @click="haddleSwitch(1)"></button>
                            <button class="btn-switch" @click="haddleSwitch(2)"></button>
                        </div>

                        <div class="finish-dialogue" v-if="this.$store.state.userAction.dialogueNow === 'end'">
                            <button class="mic" @click="haddleToHomePage" >Home</button>
                        </div>  
                                    <div class="pad-main-frame">

            </div>

                        
                    </div>
            </div>
            <div class="main-frame" v-if="isError !==''">
                <div>Cannot connect to server!</div>
            </div>

        </div>
    </div>
</template>

<style scoed>

.analyzing{
    margin-top: 10px; 
    margin-bottom: 10px;
    border: none;
    background: rgb(199, 199, 199);
    border-radius: 10px;
}

.pad-main-frame{
    padding-bottom: 60px;
}

.is-loading{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: gray;
    opacity: 0.7;    
}

.loading-content{
    position: fixed;
    z-index: 999;
    margin-top: 50%;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    width: 100%;
    height: 100%;
}

.page-title{
    color: white;
    text-align: center;
}

.page-title > h1{
    margin-top: 5vh;
    margin-bottom: 3vh;
}

.main-frame{
    border: 1px solid rgb(249, 249, 249);
    width: 85%;
    height: 100%;
    background: white;
    margin: auto;
    border-radius: 20px;
}
 

.voice-btn{
    margin-top: 10%;
    text-align: center;
}

.mic{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.mic-off{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.set-btn-line{
    display: flex;
    justify-content: space-around;
}

.user-text-in{
    width: 85%;
    margin: auto;
    text-align: left;
    margin-top: 30px;
}

.btn-switch-result{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.btn-switch{
    border: 1px solid rgb(78, 78, 78);
    background: rgb(222, 222, 222);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
}
</style>