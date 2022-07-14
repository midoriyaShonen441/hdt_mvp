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
            rangeOfArray:0

        }
    },
    methods:{
 
        
        objectSentence(){
            console.log("start index ==>", this.$store.state.userAction.sentenceIndex)
            this.counting = this.$store.state.userAction.sentenceIndex;
            // console.log(this.counting);
            this.content = this.arrayOfSentence[this.counting];

            if(this.counting ===  this.rangeOfArray){
                console.log('end of range')
                this.$store.state.userAction.sentenceIndex = 0;
                console.log("index reset",this.$store.state.userAction.sentenceIndex)
                this.$store.state.userAction.dialogueNow = "Dialogue3"
            }
  
        }

    },
    beforeMount(){
   
        const ranInt = Math.floor(Math.random() * 2);

        if(this.isFirstTime === false){

            this.$store.state.objective1.firstTimeGreeting.forEach((element) => {
                this.arrayOfSentence.push(element)
            })

            this.$store.state.objective1.goalSetting.forEach((element) => {
                this.arrayOfSentence.push(element)
            })

            this.$store.state.objective2.moodCheck.forEach((element) => {
                this.arrayOfSentence.push(element)
            })

            if(ranInt === 0){
                this.$store.state.objective2.askForUpdate.forEach((element) => {
                    this.arrayOfSentence.push(element)
                })
            }else{
                this.$store.state.objective2.reviewTheHomework.forEach((element) => {
                    this.arrayOfSentence.push(element)
                })
            }

            this.$store.state.objective2.identifyIssuesOrGoalsForTheSession.forEach((element) => {
                this.arrayOfSentence.push(element)
            })
        }
        else{
            
            this.$store.state.objective2.moodCheck.forEach((element) => {
                this.arrayOfSentence.push(element)
            })

            if(ranInt === 0){
                this.$store.state.objective2.askForUpdate.forEach((element) => {
                    this.arrayOfSentence.push(element)
                })
            }else{
                this.$store.state.objective2.reviewTheHomework.forEach((element) => {
                    this.arrayOfSentence.push(element)
                })
            }

            this.$store.state.objective2.identifyIssuesOrGoalsForTheSession.forEach((element) => {
                this.arrayOfSentence.push(element)
            })
        }

        this.rangeOfArray = this.arrayOfSentence.length
        // console.log(this.arrayOfSentence)
        // console.log('range array', this.rangeOfArray);
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
.dialogue-container{
    width: 85%;
    margin: auto;
    text-align: left;
}

.msg-container{
    margin-top: 40%;
    font-size: 20px;
}
</style>