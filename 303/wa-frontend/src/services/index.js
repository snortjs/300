import axios from 'axios'

let service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

let posts = {
    async getAll(searchTerm) {
        let response = await service.get(`/posts?_any=${searchTerm}`) //samo je tu drugacije od videa
        let data = response.data.map(doc => {
            return {
                id: doc.id,
                url: doc.source,
                email: doc.createdBy,
                title: doc.title,
                posted_at: Number(doc.postedAt)
            }
        })
        return data
    }
}
let Posts = { //od streama u cetvrtak
    async getAll(searchTerm) {
        searchTerm = searchTerm.split(' ');
        console.log(searchTerm)
        let spaghetti = searchTerm.map(e => {
            return service.get(`posts?title=${e}`);
        })
        let meaningoflife = await Promise.all(spaghetti);
        let returnBack = {}
        meaningoflife.forEach(e => {
            e.data.forEach(doc => {
                let temp = {
                    id: doc.id,
                    url: doc.source,
                    email: doc.createdBy,
                    title: doc.title,
                    posted_at: Number(doc.postedAt)
                };
                returnBack[doc.id] = temp
            })
        })
        return returnBack;
    }
}
export { service, Posts }