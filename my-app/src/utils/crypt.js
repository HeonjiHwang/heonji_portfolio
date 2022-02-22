import crypto from 'crypto-js';
const salt = "27eebd852c1ed8d03d8a701b26fb175d";
const iv = "9a50fba6c5177e25ce253f1b716d60f4";
const cryptNum = "8842";

const Encryption = {
    encrypt:(plainText)=>{
        const iterations = 10000;

        const key512bits10000Iterations = crypto.PBKDF2(cryptNum, crypto.enc.Hex.parse(salt), {
            keysize:512/32,
            iterations
        })

        const encrypted = crypto.AES.encrypt(
            plainText, key512bits10000Iterations, {iv:crypto.enc.Hex.parse(iv)}
        )

        return encrypted.toString();
    },
    comparePwd:(encryptedText, originCrtypedText)=>{
        if(!encryptedText)
            return;

        const iterations = 10000;

        const key512bits10000Iterations = crypto.PBKDF2(cryptNum, crypto.enc.Hex.parse(salt), {
            keysize:512/32,
            iterations
        })

        const encrypted = crypto.AES.encrypt(
            originCrtypedText, key512bits10000Iterations, {iv:crypto.enc.Hex.parse(iv)}
        ).toString();
        
        return encrypted === encryptedText ? true : false;
    }
}

export default Encryption;