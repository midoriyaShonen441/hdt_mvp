const avgCalculate = require("./avgCalculate")
const stdCalulate = require("./stdCalulate")
const methodD3 = require("./D3_score_method")
const methodD4 = require("./D4_score_method")
const methodD5 = require("./D5_score_method")
const methodD6 = require("./D6_score_method")
const calDpracticeDtest = require("./cal_Dpractice_Dtest")

const DscoreFunc = (arrayOfCorrect,arrayOfWorng, correctAvg, correctStd ) => {


        
    const newArrayB3 = methodD3(arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);
    const newArrayB4 = methodD4(arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);
    const newArrayB6 = methodD5(arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);
    const newArrayB7 = methodD6(arrayOfCorrect, arrayOfWorng, correctAvg, correctStd);

    const setConcatB7_B4 = newArrayB7.concat(newArrayD4)
    const setConcatB6_B3 = newArrayB6.concat(newArrayD3)
 
    const meanB3 = avgCalculate(newArrayB3)
    const meanB4 = avgCalculate(newArrayB4)
    const meanB6 = avgCalculate(newArrayB6)
    const meanB7 = avgCalculate(newArrayB7)
        
    const stdB7_B4 = stdCalulate(setConcatB7_B4)
    const stdB6_B3 = stdCalulate(setConcatB6_B3)

    const DPractice = calDpracticeDtest(meanB6, meanB3, stdB6_B3)
    const DTest = calDpracticeDtest(meanB7, meanB4, stdB7_B4)

    const Dscore = (DPractice + DTest) / 2;
    const sendD = {
        Dscore: Dscore
    }

    return sendD


}

module.exports = DscoreFunc