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

        
        objectSentence(){
            // console.log()
            this.counting = this.$store.state.userAction.sentenceIndex;
            this.content = this.arrayOfSentence[this.counting];
            // console.log("===>",this.content);
        }

    },
    mounted(){
 
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