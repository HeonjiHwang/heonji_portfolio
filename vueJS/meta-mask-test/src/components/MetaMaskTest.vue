<script setup>
  import {ethers} from 'ethers';
  import {ref} from 'vue';
  import solidityInfo from '../util/solidityInfo';
  
  let result = ref(0);
  let grounds = ref([]);

  const onCheck = () =>{
    let account = process.env.VUE_APP_MATAMASK_ACCOUNT;
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let balanceEth = 0, usd = 0;

    provider.getBalance(account).then((balance)=>{ 
      console.log(balance);
      balanceEth = ethers.utils.formatEther(balance);
    })


    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum").then((res)=>{
      if(res.status !== 200){
        return;
      }
      
      res.json().then((data)=>{
        let currentPrice = data[0].current_price;
        usd = currentPrice * balanceEth;

        result.value = balanceEth + 'ETH  ' + usd + 'USD'
      })
    })
  }

  const getGround = ()=>{
    solidityInfo.geContract();
  }
</script>

<template>
  <div>
    <button @click="onCheck">확인</button><br>
    <span>{{result}}</span><br>
    <button @click="getGround">내 그라운드</button> <br>
    <span v-for="(ground, idx) in grounds" :key="idx">
      {{ground}}
    </span>
  </div>
</template>
