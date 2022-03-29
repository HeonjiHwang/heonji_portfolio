const {Client} = require("pg");
const errorMsg = {
    1:"client is not exist"
}

exports.pgClient = {
    client:null,
    init:()=>{
        this.client = new Client({
            user:'heonji', password:'kit2019',
            host:'localhost', port:5432,
            database:'postgres'
        });
    },  
    connect:()=>{
        if(!this.client){
            console.error(errorMsg[1]);
            return errorMsg[1];
        }
        this.client.connect(err=>{
            if(err)
                console.error("connection error", err.stack);
            else
                console.log('connect to postgresql server');
        });
    },
    sendQuery:(queryStr, callback)=>{
        if(!this.client){
            console.error(errorMsg[1]);
            return errorMsg[1];
        }
        console.log(queryStr);
        this.client.query(queryStr, callback);
    },
    close:()=>{
        this.client.end();
        this.client = null;
    }
}
