<template>
<div>
 <h1>305</h1>
  1€={{oof}}kn<br>1BTC={{bigoof}} €<br>Ukupno:{{oof*bigoof}}
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
  async mounted(){
    let smrk=await fetch("https://api.exchangeratesapi.io/latest?symbols=HRK")
    let odg=await smrk.json()
      .then(a=>{
        this.oof=Number(a.rates.HRK)
      })
    console.log(odg)

    let why=await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    let mjo=await why.json()
      .then(a=>{
        this.bigoof=a.bpi.EUR.rate_float
      })
   /* fetch("https://api.exchangeratesapi.io/latest?symbols=HRK")
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
    })*/
}
}
</script>