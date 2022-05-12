<script setup>
  import Web3 from 'web3';

  const onCheck = () =>{
    const web3 = new Web3(window.ethereum);
    web3.eth.getAccounts(console.log)
  }
</script>

<template>
  <div>
    <button @click="onCheck">확인</button>
    <button @click="onSignout">로그아웃</button>
  </div>
</template>
