// active function //
require("dotenv").config();
require("./connection/connection").connect();

// import lib //
const express  = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const json2csv = require('json2csv').parse;
// const multer  = require('multer');
// const imageToBase64 = require("image-to-base64");


// import middleware // 
const auth = require("./middleware/auth");

// import database model // 
const userAdmin = require('./model/userAdmin');
const IATmodel = require("./model/IATmodel");
const IATAdminSelection = require("./model/IATAdminSelection");
const normalUserSign = require("./model/normalUserSign");
const userDscore = require("./model/userDscore");

// config backend // 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT
const hashRound = process.env.saltRounds 

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './image_storage')
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'file-' + Date.now() + '.' +
//         file.originalname.split('.')[file.originalname.split('.').length-1])}
// })

// const upload = multer({ 
//     storage: storage, 
//     limits:{
//         fileSize:3670016
//     }
// })

// app.post("/testimg",upload.single('fileupload'), async (req, res) =>{

// })



app.get('/backend_iat/debug', async (req, res) => {
    res.send("ok")
});


app.post("/backend_iat/register", async (req, res) => {
    const {username, password}  = req.body;
    // console.log("hashRound==>",hashRound)
    const convertRound = parseInt(hashRound)
    try{
        const hashPassword = bcrypt.hashSync(password, convertRound);
        console.log("hashPassword ==>",hashPassword)
        userAdmin.create({
            username: username,
            password: hashPassword
        })
        res.sendStatus(200)
    }catch(err){
        console.log("error api register ==> ", err);
        res.sendStatus(500)
    }
})

app.post("/backend_iat/login", async (req, res) => {
    const {username, password} = req.body; 
    try{
        const isLogin = await userAdmin.findOne({username})
        
        if(isLogin && (await bcrypt.compare(password, isLogin.password))){
            // console.log("login")
            const getToken = jwt.sign(
                {user_id: isLogin._id},
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            )
            const payload = {
                username: username,
                token: getToken
            }
            res.send(payload)

        }else{
            // console.log("cannot login")
            res.sendStatus(401)
        }
    }catch(err){
        console.log("error api login ==> ", err);
        res.sendStatus(500)
    }
})

app.post("/backend_iat/creataiat", auth,async (req, res) => {

    const {
        runner, 
        btn_left,
        btn_right,
        attribute_pratice_name,
        attribute_test_name,
        target_pratice_name,
        target_test_name,
        target_pratice, 
        target_test, 
        attribute_pratice,
        attribute_test,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7
    } = req.body

    try{

        IATmodel.create({
            runner:runner, 
            btn_left:btn_left,
            btn_right:btn_right,
            attribute_pratice_name:attribute_pratice_name,
            attribute_test_name:attribute_test_name,
            target_pratice_name:target_pratice_name,
            target_test_name:target_test_name,
            target_pratice:target_pratice, 
            target_test:target_test, 
            attribute_pratice:attribute_pratice,
            attribute_test:attribute_test,
            d1:d1,
            d2:d2,
            d3:d3,
            d4:d4,
            d5:d5,
            d6:d6,
            d7:d7
        });

        IATAdminSelection.create({
            runner:runner,
            is_selection: false
        })

        res.sendStatus(200)

    }catch(err){
        console.log("error api creataiat ==> ", err);
        res.sendStatus(500)
    }

});


app.get("/backend_iat/findingiat", auth,async (req, res) => {
    try{
        const listIAT = await  IATmodel.find({});
        res.send(listIAT);
    }catch(err){
        console.log("error api findingiat ==> ", err);
        res.sendStatus(500);
    }
});

app.post("/backend_iat/iatquerydata" , async (req, res) => {
    const {runner} = req.body;
    // console.log(runner)
    try{
        const dataRunner = await IATmodel.findOne({runner:runner});
        res.send(dataRunner)
    }catch(err){
        console.log("error api iatquerydata ==> ", err);
        res.sendStatus(500)
    }
    

})

app.get("/backend_iat/iatselected", async (req, res) => {
    try{
        const fetchRunner = await IATAdminSelection.findOne({is_selection:true});
        // console.log("fetchRunner ==> ",fetchRunner)
        const listIAT = await  IATmodel.findOne({runner:fetchRunner.runner});
        
        res.send(listIAT)
    }catch(err){
        console.log("err in api iatselected: "+ err);
        res.sendStatus(500);
    }
})

app.post("/backend_iat/useiat", async (req, res) => {
    const {runner} = req.body
    try{
        const replyIAT = await IATmodel.findOne({runner});
        res.send(replyIAT);
    }catch(err){
        console.log("err in api useiat: "+ err);
        res.sendStatus(500);
    }
})

app.put("/backend_iat/updateselection", auth, async (req, res) => {
    const {runner, isSelection} = req.body;
    const runnerQuery = {runner:runner};
    try{
        await IATAdminSelection.updateOne(runnerQuery, {is_selection:isSelection});
        await IATAdminSelection.updateMany({
            runner:{
                $ne:runner
            }
        },
        {
            $set:{
                is_selection:false
            }
        },
        )
        res.sendStatus(200)
    }catch(err){
        console.log("err in api updateselection: "+ err);
        res.sendStatus(500)
    }
})


app.post("/backend_iat/usersign", async (req, res) => {

    const {
        firstname, 
        lastname, 
        phonenum, 
        male, 
        birthday,
        selectPersonal } = req.body

    let gender = male? "M" : "F"

    try{
        await normalUserSign.create({
            firstname: firstname,
            lastname: lastname,
            phone_num: phonenum,
            sex: gender,
            birthday: birthday,
            personalities: selectPersonal
        });
        res.sendStatus(200)
    }catch(err){
        console.log("err in api usersign: "+ err);
        res.sendStatus(500)
    }
});


app.post("/backend_iat/analysis", async (req, res) => {
    
    const {
        firstname,
        lastname,
        phonenum,
        gender,
        birthday,
        personalities,
        iatReply
    } = req.body

    // console.log("array of IAT: ",iatReply);

    const avgCalculate = require("./calculateFunction/avgCalculate")

    const stdCalulate = require("./calculateFunction/stdCalulate")
    const DscoreFunc = require("./calculateFunction/cal_Dscore")


    let arrayOfWorngD3 = [];
    let arrayOfWorngD4 = [];
    let arrayOfWorngD6 = [];
    let arrayOfWorngD7 = [];

    let arrayOfCorrectD3 = [];
    let arrayOfCorrectD4 = [];
    let arrayOfCorrectD6 = [];
    let arrayOfCorrectD7 = [];

    try{
        // console.log(iatReply);

        iatReply.forEach((element) => {

            if(element.typeCal === "b3"){
                if(element.milliseconds >= 10000 ){
      
                }else if(element.isCorrect === false){
                    arrayOfWorngD3.push(element.milliseconds)
                }else{
                    arrayOfCorrectD3.push(element.milliseconds);
                }
                
            }else if(element.typeCal === "b4" ){
                if(element.milliseconds >= 10000 ){
  
                }else if(element.isCorrect === false){
                    arrayOfWorngD4.push(element.milliseconds)
                }else{
                    arrayOfCorrectD4.push(element.milliseconds);
                }
            }else if(element.typeCal === "b6"){
                if(element.milliseconds >= 10000 ){
   
                }else if(element.isCorrect === false){
                    arrayOfWorngD6.push(element.milliseconds)
                }else{
                    arrayOfCorrectD6.push(element.milliseconds);
                }
            }else if(element.typeCal === "b7"){
                if(element.milliseconds >= 10000 ){
      
                }else if(element.isCorrect === false){
                    arrayOfWorngD7.push(element.milliseconds)
                }else{
                    arrayOfCorrectD7.push(element.milliseconds);
                }
            }

        });

        const concatArrayCorrect = arrayOfCorrectD3.concat(arrayOfCorrectD4, arrayOfCorrectD6, arrayOfCorrectD7);
        const correctAvg = avgCalculate(concatArrayCorrect);
        const correctStd = stdCalulate(concatArrayCorrect);
        
        const DscoreMethod3 = DscoreFunc(arrayOfCorrectD3, arrayOfWorngD3, correctAvg, correctStd)
        const DscoreMethod4 = DscoreFunc(arrayOfCorrectD4, arrayOfWorngD4, correctAvg, correctStd)
        const DscoreMethod5 = DscoreFunc(arrayOfCorrectD6, arrayOfWorngD6, correctAvg, correctStd)
        const DscoreMethod6 = DscoreFunc(arrayOfCorrectD7, arrayOfWorngD7, correctAvg, correctStd)

        const replayDscore = {
            D3:DscoreMethod3,
            D4:DscoreMethod4,
            D6:DscoreMethod5,
            D7:DscoreMethod6
        }

        try{


            await userDscore.create({
                firstname:firstname,
                lastname:lastname,
                phonenum:phonenum,
                gender:gender,
                birthday:birthday,
                personalities:personalities,
                dscore_method3:DscoreMethod3,
                dscore_method4:DscoreMethod4,
                dscore_method5:DscoreMethod5,
                dscore_method6:DscoreMethod6,
                result:iatReply
            });
            
            // const replyRsult = {
            //     result: sendD
            // }
            res.send(replayDscore)

        }catch(err){
            console.log("err in api analysis: "+ err);
            res.sendStatus(500)
        }

        // console.log(Dscore)
        // res.send(sendD)
    }catch(err){
        console.log("err in api analysis: "+ err);
        res.sendStatus(500)
    }

});

app.get("/backend_iat/dashboard", async (req, res) => {
    let arrayUserData = [];

    try{
        const userData = await userDscore.find({});
        // console.log("userData ==> ",userData[0].result)
        

        userData.forEach((arrayResult) => {
            arrayResult.result.forEach((element) => {
                const setData = {
                    firstname: arrayResult.firstname,
                    lastname: arrayResult.lastname,
                    gender: arrayResult.gender,
                    personalities: arrayResult.personalities,
                    dscore: arrayResult.dscore,
                    blockType: element.typeCal,
                    runnerName: element.runnerName, 
                    contentLeft: element.contentLeft,
                    contentRight: element.contentRight,
                    wordShow: element.wordShow,
                    userSelect: element.userSelect, 
                    isCorrect: element.isCorrect,
                    milliseconds: element.milliseconds
                }

                arrayUserData.push(setData);
            })
        })

        const arrayData = {
            listData: arrayUserData
        }
    
        res.send(arrayData);

    }catch(err){
        console.log(`Error in api backend_iat/dashboard: ${err}`);
        res.sendStatus(500);
    }

    

});

app.post("/backend_iat/download", async (req, res) => {
    const {typeFile} = req.body;

    let arrayUserData = [];

    try{
        const userData = await userDscore.find({});
        // console.log("userData ==> ",userData[0].result)

        userData.forEach((arrayResult) => {
            arrayResult.result.forEach((element) => {
                const setData = {
                    firstname: arrayResult.firstname,
                    lastname: arrayResult.lastname,
                    gender: arrayResult.gender,
                    personalities: arrayResult.personalities,
                    dscore: arrayResult.dscore,
                    blockType: element.typeCal,
                    runnerName: element.runnerName, 
                    contentLeft: element.contentLeft,
                    contentRight: element.contentRight,
                    wordShow: element.wordShow,
                    userSelect: element.userSelect, 
                    isCorrect: element.isCorrect,
                    milliseconds: element.milliseconds
                }

                arrayUserData.push(setData);
            })
        })

    }catch(err){
        console.log(`Error in api backend_iat/dashboard: ${err}`);
        res.sendStatus(500);
    }

    if(typeFile === "json"){
        const arrayData = {
            listData: arrayUserData
        }
        res.send(arrayData)
    }else if(typeFile === "excel"){
        // console.log("jsonDatav", jsonData)
        const workSheet = XLSX.utils.json_to_sheet(arrayUserData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
        XLSX.writeFile(workBook, "./result/emotion.xlsx");
        const file = `${__dirname}/result/emotion.xlsx`;
        console.log("backend action", file)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", 'attachment; filename=emotion.xlsx');
        res.download(file, "emotion.xlsx", (err) => {
            if(err){
                console.log("download error:", err)
            }else{
                console.log("download!")
            }
        });
    }else if(typeFile === "csv"){
        const csvString = json2csv(arrayUserData);
        // console.log(csvString);
        res.setHeader('Content-disposition', 'attachment; filename=shifts-report.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csvString);
    }
    
});


app.listen(port, () => {
    console.log(`app running on port: ${port} ==> http://localhost:${port}`)
})