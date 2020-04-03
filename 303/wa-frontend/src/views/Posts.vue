<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
  data() {
    return {
      store,
      cards: [],
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  created() {
    this.fetchPosts()
  },
  name: "posts",
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm
      let pretraga=async(term)=>{
        let response=await fetch(`http://localhost:3000/posts?title=${term}`)
        let data=await response.json()
        return data  
      }
      let terms=term.split(" ")
      console.log(terms)
      let promises=terms.map(e=> pretraga(e)) //ispis svih polja (promise)
      console.log("promises",promises)
      let results=await Promise.all(promises) //ispis sta se nalazi u svim poljima
      console.log("results",results)
      let rezultat=results.reduce((final,e)=>final.concat(e), []) //spoji sva polja u jedno polje (lista)
      console.log(rezultat)
      let data=rezultat 
      let finalni={}
      data.forEach(post=>finalni[post.id]=post)
      console.log(finalni)
      data=Object.values(finalni) //vrati samo vrijednosti iz objekta u listu
          console.log("Podaci s backenda", data)
          this.cards = data.map(doc => {
            return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
          })
    },
    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    }
  },
  components: {
    InstagramCard
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>
