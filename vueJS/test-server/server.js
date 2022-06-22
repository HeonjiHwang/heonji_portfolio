const router = require("express").Router();
const dbConfig = require("./db/config.js");
const queryMapper = require("./db/queryMapper.js");
const signinModule = require("./common/siginInModule.js");
const dbConn = dbConfig.init();
dbConfig.connect(dbConn);

//my-app용 express server

let testArr = [
    {idx:1, id:'admin', subject:'첫번째', cont:'첫번째 게시물 ㄱㄱ'},
    {idx:2, id:'admin', subject:'두번째', cont:'두번째 게시물 ㄱㄱ'},
    {idx:3, id:'admin', subject:'세번째', cont:'세번째 게시물 ㄱㄱ'},
    {idx:4, id:'admin', subject:'네번째', cont:'네번째 게시물 ㄱㄱ'},
    {idx:5, id:'admin', subject:'다섯번째', cont:'다섯번째 게시물 ㄱㄱ'},
]

router.get("/board", (req, res)=>{
    let {keyword} = req.query;

    if(keyword){
        let data = testArr.filter(x=>x.subject.includes(keyword));

        if(data.length > 0){
            res.json({isSuccess:true, list:JSON.stringify(data)})
        }else{
            res.json({isSuccess:false, list:[]})
        }
    }else{
        res.json({isSuccess:true, list:JSON.stringify(testArr)})
    }
})

router.get("/board/:num", (req, res)=>{
    let query = req.query;
    let data = testArr.filter(x=>x.idx.toString() === query.idx);

    if(data.length > 0)
        res.json({isSuccess:true, ...data[0]});
    else
        res.json({isSuccess:false});
})

router.post("/board", (req, res)=>{
    let {id, subject, cont, idx} = req.body;
    let returnValue = true;

    if(!idx){
        let maxIdx = Math.max(...testArr.map(x=>x.idx)) + 1;
        testArr.push({id:id, subject:subject, cont:cont, idx:maxIdx});
    }else{
        let data = testArr.filter(x=>x.idx.toString() === idx);
        if(data.length <= 0){
            returnValue = false;
        }else{
            data[0].subject = subject;
            data[0].cont = cont;
        }
    }
    
    res.send({isSuccess:returnValue});
});

router.post("/delete-board", (req, res)=>{
    let {idx} = req.body;
    let returnValue = false;
    let num = undefined;

    for(let i=0;i<testArr.length;i++){
        if(testArr[i].idx.toString() === idx){
            num = i;
            break;
        }
    }

    if(num){
        returnValue = true;
        testArr.splice(num, 1);
    }

    res.json({isSuccess:returnValue});
});


//test-app용 express server

router.post("/signin", (req, res)=>{
    console.log(req.body);
    let {user_id, user_pwd} = req.body;
    let returnValue = false;

    if(user_id === 'admin' && user_pwd === 'admin123')
        returnValue = true;

    res.send({isSuccess:returnValue});
})


//backoffice용 express server
router.post("/office/signin", (req, res)=>{
    let body = req.body;
    let ip = req.headers['x-forwarded-for'];

    console.log(body);
    let sql = queryMapper.getSignInfo(body);
    dbConn.query(sql, (err, result) => {
        if(err){
            console.error(err);
            res.json({isSuccess:false, msg:err});
            return;
        }

        let {is_valid, is_lock, failed_count, user_cd} = result[0];
        
        signinModule.setSignInInfo(dbConn, {is_valid, is_lock, failed_count, user_cd, ip}).then(returnVal => {

            //접속기록
            if(returnVal.flag)
                signinModule.setAccessInfo(dbConn, {user_cd, flag : returnVal.flag, page:'signin', ip});
            
            if(returnVal.isOK){
                res.json({isSuccess:true, data:result})
            }else{
                res.json({isSuccess:false, data:returnVal.msg})
            }

        })
    });
});

module.exports = router;