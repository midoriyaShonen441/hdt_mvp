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

        }
    },
    methods:{
        getRandomInt(){
            // const maxNum = 2; 
            // const isNum = Math.floor(Math.random() * maxNum)
            // console.log("isNum ===>",isNum)
        },
        
        objectSentence(){
            // console.log()
            this.counting = this.$store.state.userAction.sentenceIndex;
            this.content = this.arrayOfSentence[this.counting];
            // console.log("===>",this.content);
        }

    },
    mounted(){
   
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
        // console.log(this.arrayOfSentence)
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

<style scoped>
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