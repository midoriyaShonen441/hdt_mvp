const avgCalculate = (correctArray, worngArray, avgCorrect, stdCorrect) => {

    let newArray = []
    const rangeOfWorng = worngArray.length;

    const convertTime = avgCorrect + 600; 

    if(convertTime > 10000){
        const replyData = {
            data: correctArray,
        }    
        return replyData
    }else{
        for(let i = 0; i < rangeOfWorng; i++){
            newArray.push(convertTime);
        }
    
        const setNewArray = correctArray.concat(newArray)
    
        const replyData = {
            data: setNewArray,
        }   
        return replyData;
    }
}

module.exports = avgCalculate