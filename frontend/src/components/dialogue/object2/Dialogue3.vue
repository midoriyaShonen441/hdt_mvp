<script>
import VoiceAnimation from '../../VoiceAnimation.vue'

export default {
    components:{
        VoiceAnimation
    },
    data(){
        return{
            arrayOfSentence: [],
            countObject:0,
            isStart:false,
            isFirstTime: false,
            content:"",
            counting:0,
            
            selectionMood: ""
        }
    },
    methods:{

        findEmotionMode(){ 
            // console.log("component Dialogue3 !!")
            const countsDup = {};
            const setMood = this.$store.state.storeUserArray.arrayMood
 
            const convertArray = [].concat.apply([], setMood);
            convertArray.forEach(function (x) { countsDup[x] = (countsDup[x] || 0) + 1; });
            
            const wrapingEmotion = {
                Angry: (countsDup.Angry === undefined) ? 0: countsDup.Angry,
                Fear: ( countsDup.Fear === undefined) ? 0: countsDup.Fear,
                Disgust: (countsDup.Disgust === undefined) ?  0: countsDup.Disgust,
                Happy:(countsDup.Happy === undefined) ?  0:countsDup.Happy,
                Sad: (countsDup.Sad === undefined) ?  0: countsDup.Sad,
                Suprise: (countsDup.Suprise === undefined) ? 0: countsDup.Suprise,
                Neutral: (countsDup.Neutral === undefined) ? 0: countsDup.Neutral
            }

            const anxiety = wrapingEmotion.Angry + wrapingEmotion.Fear + wrapingEmotion.Disgust;
            const joy = wrapingEmotion.Suprise + wrapingEmotion.Happy;
            const Relax = wrapingEmotion.Neutral;
            const Depress = wrapingEmotion.Sad;

            if(anxiety >= joy && anxiety >= Relax && anxiety >= Depress){
                this.selectionMood = "anxiety"
            }else if(Depress > anxiety && Depress > joy && Depress > Relax){
                this.selectionMood = "depress"
            }else if(joy > anxiety && joy > Relax && joy > Depress){
                this.selectionMood = "joy"
            }else if(Relax > anxiety && Relax > joy && Relax > Depress ){
                this.selectionMood = "relax"
            }

            if(this.selectionMood === 'depress'){
                const ranInt = Math.floor(Math.random() * 2);
                if(ranInt === 0){
                    this.$store.state.objective3.selfAwareness.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)     
                    });                 
                }else{
                    this.$store.state.objective3.resilience.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)     
                    });                        
                }
            }else if(this.selectionMood === 'anxiety'){
                const ranInt = Math.floor(Math.random() * 2);
                if(ranInt === 0){
                    this.$store.state.objective3.problemSolving.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)     
                    });
                }else{
                    this.$store.state.objective3.motivationInterview.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)     
                    });
                }
            }else if(this.selectionMood === 'relax' || this.selectionMood === 'joy'){
                this.$store.state.objective3.motivationInterview.forEach((element) => {
                    this.arrayOfSentence.push(element.topic);
                })
            }
            // console.log(wrapingEmotion,  this.selectionMood);
            // console.log(this.arrayOfSentence);
            this.content = this.arrayOfSentence[this.counting];
        },
        
        objectSentence(){
            this.counting = this.$store.state.userAction.sentenceIndex;
            this.content = this.arrayOfSentence[this.counting];
        }

    },
    created(){
        this.findEmotionMode();
    },
    updated(){
        this.objectSentence()
    }
}
</script>

<template>
    <div class="dialogue-container">
        <div class="msg-container">
            {{this.content}}
        </div>

        <div class="set-animation" v-if="this.$store.state.userAction.isStartRec === true">
            <VoiceAnimation/>
        </div>

    </div>
</template>

<style >
 
</style>