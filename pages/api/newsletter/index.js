import { MongoClient } from 'mongodb'

async function handler(req, res){
    if(req.method === 'POST') {
        const userEmail = req.body.email
        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address.'})
            return
        }

      const client = await MongoClient.connect('mongodb+srv://andrew123:andrew123@cluster0.lzocf.mongodb.net/Newsletter?retryWrites=true&w=majority')

        const db = client.db()
        await db.collection('emails').insertOne({email: userEmail})

        client.close()
        
        res.status(201).json({message: 'Signed Up'})
    }

}

export default handler
