<template>
  <div class="iat-board-container">
    <div class="title-iat-container">
      <div class="title-iat">
        {{runner}}
      </div>
    </div>

    <div class="set-is-pages" v-if="isFinsh === false && isStart === true">
      Block Done: {{isCountingPages}} / 7
    </div>

    <div class="content-iat-container" v-if="isFinsh === false">
      <div class="set-content">
        <div class="content-container">
          <div class="set-text">
          {{isWord}}
          </div>
        </div>
      </div>
    </div>

    <div class="d-score-content" v-if="showResult === true">
      <div class="title-d-score">
        D-score: {{dScore}}
      </div>
      <div class="target-attibute">
        <div class="test-set">
          <div class="title-pratice">{{iatData.target_pratice_name}}</div>
          <div v-for="(data, index) in targetTest" :key="index">
            {{data}}
          </div>
          <div class="title-test">{{iatData.attribute_test_name}}</div>
          <div v-for="(data, index) in attributeTest" :key="index">
            {{data}}
          </div>
        </div>
        <div class="pratice-set">
          <div class="title-pratice">{{iatData.target_pratice_name}}</div>
          <div v-for="(data, index) in targetPratice" :key="index">
            {{data}}
          </div>
          <div class="title-test">{{iatData.attribute_pratice_name}}</div>
          <div v-for="(data, index) in attributePratice" :key="index">
            {{data}}
          </div>
        </div>
      </div>
    </div>

    <div class="footer-iat-container" v-if="isStart === true && isFinsh === false">

      <div v-if="isType === 'b1'">
        <button class="btn-ok" @click="btnSelection('left',isWord)">{{targetPraticeName}}</button>
        <button class="btn-nope" @click="btnSelection('right',isWord)">{{targetTestName}}</button>
      </div>

      <div v-if="isType === 'b2'">
        <button class="btn-ok" @click="btnSelection('left',isWord)">{{attributePraticeName}}</button>
        <button class="btn-nope" @click="btnSelection('right',isWord)">{{attributeTestName}}</button>
      </div>

      <div  v-if="isType === 'b3' || isType ==='b4'">
        <button class="btn-ok" @click="btnSelection('left',isWord)">
          <div>{{targetPraticeName}}</div>
          <div>-or-</div>
          <div>{{attributePraticeName}}</div>
        </button>
        <button class="btn-nope" @click="btnSelection('right',isWord)">
          <div>{{targetTestName}}</div>
          <div>-or-</div>
          <div>{{attributeTestName}}</div>
        </button>
      </div>

      <div v-if="isType === 'b5'">
        <button class="btn-ok" @click="btnSelection('left',isWord)">{{targetTestName}}</button>
        <button class="btn-nope" @click="btnSelection('right',isWord)">{{targetPraticeName}}</button>
      </div>

      <div  v-if="isType === 'b6' || isType ==='b7'">
        <button class="btn-ok" @click="btnSelection('left',isWord)">
          <div>{{targetTestName}}</div>
          <div>-or-</div>
          <div>{{attributePraticeName}}</div>
        </button>
        <button class="btn-nope" @click="btnSelection('right',isWord)">
          <div>{{targetPraticeName}}</div>
          <div>-or-</div>
          <div>{{attributeTestName}}</div>
        </button>
      </div>
    </div>

    <div class="footer-iat-container-result" v-if="isFinsh === true && showResult === false">
      <button class="btn-nope" @click="btnCalResult">ดูผลลัพท์</button>
    </div>

    <div class="footer-iat-container-result" v-if="showResult === true">
      <button class="btn-nope" @click="haddleRecover">ทำใหม่</button>
    </div>

    <div class="footer-iat-container-start" v-if="isStart === false">
      <button class="btn-nope" @click="btnStart">เริ่มต้น</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { settingAPI } from '../settingAPI';

const sendAPI = settingAPI();

export default {
  components:{

  },
  data(){
    return{
      runner: "",
      iatData:{},
      targetPratice:[],
      targetTest:[],
      attributePratice:[],
      attributeTest:[],
      timingCount: 10,
      switchType:false,
      isFinsh: false,
      isStart: false,
      indexCount: 0,
      isRound: 10,
      setTime:0,
      dScore:0,
      showResult: false,
      isResult:[],
      isType:"b1",

      isCompareAttrubuteAndTest: false,
      isWord:"",
      isSubWord:"",

      compareIsWord: "",
      compareIsSubWord:"",

      targetPraticeName:"",
      targetTestName:"",
      attributePraticeName:"",
      attributeTestName:"",
      isCountingPages:1,
      

    }
  },
  methods:{

    async fetchIATData(){
      try{

        const selectionRunner = await axios.get(`${sendAPI}/iatselected`);
        this.runner = selectionRunner.data.runner
        const payload = {
          runner: selectionRunner.data.runner
        }
        
        const selectionIat = await axios.post(`${sendAPI}/useiat`,payload);

        this.iatData = selectionIat.data
        // console.log("this.iatData ===> ", this.iatData)
        this.targetPratice = selectionIat.data.target_pratice
        this.targetTest = selectionIat.data.target_test
        this.attributePratice = selectionIat.data.attribute_pratice
        this.attributeTest = selectionIat.data.attribute_test
        this.targetPraticeName = selectionIat.data.target_pratice_name
        this.targetTestName = selectionIat.data.target_test_name
        this.attributePraticeName = selectionIat.data.attribute_pratice_name
        this.attributeTestName = selectionIat.data.attribute_test_name

        // console.log(this.targetPraticeName,this.targetTestName,  this.attributePraticeName, this.attributeTestName)

      }catch(err){

      }
    },
    btnSelection(evt, contentLeft, contentRight){
      if(this.isType === "b1"){
        console.log('b1')
        if(this.indexCount >= 10){
          this.isType = "b2"
          this.indexCount = 0;
          this.isCountingPages += 1
        }

        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b1",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        // console.log("targetPratice ==> ",this.targetPratice)
        // console.log("targetTest ===> ", this.targetTest)
        // console.log("attributePratice ===> ",this.attributePratice)
        // console.log("attributeTest ===> ",this.attributeTest)

        const setArray = this.targetPratice.concat(this.targetTest)
        const targetPraticeElement =  setArray[Math.floor(Math.random()*setArray.length)];
        this.isWord = targetPraticeElement;

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.isType === "b2"){
        console.log('b2')
        if(this.indexCount >= 10){
          this.isType = "b3"
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = true
          this.isCountingPages += 1
        }

        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b2",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        // const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];
        // console.log(this.targetPratice)
        // console.log(this.targetTest)
        // console.log(this.attributePratice)
        // console.log(this.attributeTest)
        const setArray = this.attributePratice.concat(this.attributeTest)
        // console.log(setArray)
        const attributeTestElement = setArray[Math.floor(Math.random()*setArray.length)];
        this.isWord = attributeTestElement;



        // this.isPratice = attributePraticeElement;
        // this.isTest = attributeTestElement;

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.isType === "b3"){
        console.log('b3')
        if(this.indexCount >= 20){
          this.isType = "b4"
          this.indexCount = 0
          this.isCountingPages += 1
        }

        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b3",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const setArray = this.targetPratice.concat(this.attributePratice, this.targetTest, this.attributeTest);
        this.isWord = setArray[Math.floor(Math.random()*setArray.length)];

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.isType === "b4"){
        console.log('b4')

        if(this.indexCount >= 40){
          this.isType = "b5"
          this.switchType = true
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = false
          this.isCountingPages += 1
        }
        // console.log("D4")
        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b4",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const setArray = this.targetPratice.concat(this.attributePratice, this.targetTest, this.attributeTest);
        this.isWord = setArray[Math.floor(Math.random()*setArray.length)];

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b5"){
        console.log('b5')
        if(this.indexCount >= 10){
          this.isType = "b6"
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = true;
          this.isCountingPages += 1
        }

        this.isSubWord = "";
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b5",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });
        
         const setArray = this.targetPratice.concat(this.targetTest)
        const targetPraticeElement =  setArray[Math.floor(Math.random()*setArray.length)];
        this.isWord = targetPraticeElement;

        // this.isPratice = targetPraticeElement;
        // this.isTest = targetTestElement; 

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b6"){
        console.log('b6')
        if(this.indexCount >= 20){
          this.isType = "b7"
          this.indexCount = 0
          this.isCountingPages += 1
        }

        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b6",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const setArray = this.targetPratice.concat(this.attributePratice, this.targetTest, this.attributeTest);
        this.isWord = setArray[Math.floor(Math.random()*setArray.length)];

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b7"){
        console.log('b7')
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b7",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const setArray = this.targetPratice.concat(this.attributePratice, this.targetTest, this.attributeTest);
        this.isWord = setArray[Math.floor(Math.random()*setArray.length)];

        this.setTime = performance.now();
        this.indexCount += 1;

        if(this.indexCount >= 40){
          this.isFinsh = true;
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = false;
        }
        
      }

    },
    btnStart(){

      this.isStart = true;
      this.btnSelection();

    },
    async btnCalResult(){

      const personalData = localStorage.getItem("user_sign_iat");
      const convertData = JSON.parse(personalData);
      


      const payload = {
        firstname: convertData.firstname,
        lastname: convertData.lastname,
        phonenum: convertData.phonenum,
        gender: convertData.male ? "M" : "F",
        birthday: convertData.birthday,
        personalities: convertData.personalities,
        iatReply: this.isResult
      }

      console.log(payload)

      try{
        const resultReplyBack  =  await axios.post(`${sendAPI}/analysis`, payload);
        this.dScore =  Math.round(resultReplyBack.data.Dscore * 100) / 100;
        this.showResult = true;
        
      }catch(err){
        console.log(err);
      }

    },
    haddleRecover(){
      this.$router.go()
    }

  },
  computed:{

  },
  mounted(){
    this.fetchIATData();
    // this.btnSelection();
    // console.log(this.isStart)
    // if(this.isStart === true){
        // console.log(this.isStart)
        window.addEventListener("keypress", e => {
        const getKey = String.fromCharCode(e.keyCode)
        console.log(getKey);
        if(getKey === "a" || getKey === "A"){
          this.btnSelection('left',this.isWord)
        }else if(getKey === "l" || getKey === "L"){
          this.btnSelection('right',this.isWord)
        }

      });
    // }

  },
  updated(){
 
    // setTimeout(() => {
    //   if(this.timingCount > 0){
    //      this.timingCount = this.timingCount -1
    //   }
    // },1000);
  }
}
</script>

<style scoped>
.iat-board-container{
  width: 80%;
  margin: auto;
  margin-top: 50px;
}


.time-out{
  margin: auto;
  text-align: center;
  margin-top: 25px;
  font-weight: bold;
  font-size: 20px;
}

.content-iat-container{
  /* display: flex;
  justify-content: space-around; */
  margin: auto;
  text-align: center;
}

.set-header-contiainer{

  margin-bottom: 50px;
}

.set-object-header{
  display:flex;
  justify-content: space-around;
}
  
.title-iat{
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 60px;
  color: grey;
}

.footer-iat-container > div{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.d-score-content{
  margin: auto;
  text-align: center;
  
}

.set-is-pages{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: grey;
}

.content-container{
  margin-left: 50px;
  margin-right: 50px;
}
.title-d-score{
  font-weight: bold;
  font-size: 20px;
}

.target-attibute{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  margin-bottom: 30px;
}

.set-text{
  font-size: 30px;
  font-weight: bold;
  margin-top: 150px;
  margin-bottom: 150px;
}

.title-test{
  text-align: center;
  font-weight: bold;
}
.title-pratice, .title-test{
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom: 2px solid grey
}

.footer-iat-container-result , .footer-iat-container-start{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.btn-ok{
  width: 120px;
  height: 60px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.btn-nope{
  width: 120px;
  height: 60px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}
</style>