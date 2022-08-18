const avgCalculate = (array) => {

    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n

    const replyData = {
        sumOf: mean,
    }   

    return replyData;

}

module.exports = avgCalculate