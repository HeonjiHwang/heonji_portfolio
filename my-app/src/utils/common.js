const axios = require("axios");
const defaultUrl = "http://localhost:4000/api"
/**********************
 * 1. axios util
 **********************/
exports.Axios = {
    get:(url, param)=>{
        let finalURL = defaultUrl + url;
        if(param){
            let arr = [];
            for(let k in param){
                arr.push(`${k}=${param[k]}`);
            }
            let str = "?" + arr.join("&");
            finalURL += str;
        }
        try{
            return axios.get(finalURL)
        }catch(e){
            console.error(e);
        }
    },
    post:()=>{

    }
}

