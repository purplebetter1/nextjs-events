import { connectDatabase, insertDocument } from '../../../helpers/db-util'



async function handler(req, res){
    if(req.method === 'POST') {
        const userEmail = req.body.email
        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address.'})
            return
        }

  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({message: 'Failed to connect to database'})
    return
  }

  try {
    await insertDocument(client, 'newsletter',{email: userEmail})
    client.close()
  } catch (error) {
    res.status(500).json({message: 'Failed to insert data'})
  }

  res.status(201).json({message: 'Signed Up'})
    }

}

export default handler
