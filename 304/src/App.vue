<template>
<div>
  <h1>304</h1>
  <p>1€={{oof}}kn<br>1btc={{bigoof}}€<br>Ukupno:{{oof*bigoof}}</p>
  </div>
</template>
<script type="text/javascript">
export default{
  data(){
    return{
    oof:'',
    bigoof:''
    }
  },
  mounted(){
    fetch("https://api.exchangeratesapi.io/latest?symbols=HRK")
    .then((response)=>{
      return response.json()
    })
    .then((json)=>{
      console.log(json.rates.HRK)
      this.oof=Number(json.rates.HRK)
    })

    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((response)=>{
      return response.json()
    })
    .then((json)=>{
      console.log(json.bpi.EUR.rate)
      this.bigoof=json.bpi.EUR.rate_float;   
    })
}
}
</script>