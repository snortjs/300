import express from 'express';
import storage from './memory_storage'
import cors from 'cors'

const app = express() // instanciranje aplikacije
const port = 3000 // port na kojem će web server slušati
app.use(cors())
app.get('/posts',(req,res)=>{

    let postovi=storage.posts

    let query=req.query
    if(query.title){
        postovi=postovi.filter(e=>{
            e.title.indexOf(query.title)>=0
        })
    }
    if(query.createdBy){
        postovi=postovi.filter(a=>{
            a.createdBy.indexOf(query.createdBy)>=0
        })
    }
    if(query._any){
        let pretraga=query._any
        let pojmovi=pretraga.split(" ")
        postovi=postovi.filter(post=>{
            let podaci=post.title+post.createdBy
            console.log("ree "+podaci)
            let rezultat=pojmovi.every(pojam=>{
                return podaci.indexOf(pojam)>=0
            })
            return rezultat
        })
    }
    res.json(postovi)
})
app.listen(port, () => console.log(`Slušam na portu ${port}!`))