import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import water from './constant/Water.json'

const solidityInfo = {
    provider : undefined,
    WATERADDR : "0xDFfA9AE6017adCC5F3d467699898f6A518c16D52",
    async geContract(){
        this.provider = new ethers.providers.JsonRpcProvider("https://matic-mainnet.chainstacklabs.com");
        
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const signer = this.provider.getSigner();
        const waterContract = new ethers.Contract(this.WATERADDR, water.abi, this.provider);

        console.log(connection, signer, waterContract)

        //solidity와 연결하는 코드
        let transaction = await waterContract.fetchMyGrounds();

        console.log(transaction)
    }
}

export default solidityInfo;