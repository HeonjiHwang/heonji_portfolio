// import Web3 from 'web3';

//import detectEthereumProvider from "@metamask/detect-provider";

const checkMetaMaskApp = {
    eth:undefined,
    isInstalled(){
        return new Promise((resolve)=>{
            if(window.ethereum && window.ethereum.isMetaMask){
                this.eth = window.ethereum;
                resolve(true);
            }else{
                resolve(false);
            }
        })
    },
    async getAccount(){
        if(!this.eth) return;

        const accounts = await this.eth.request({method : 'eth_requestAccounts'});
        console.log(accounts);
    },
    setAccount(){
        
    }
}

export default checkMetaMaskApp;