import './setup/db'

import { server } from './setup/server'
import { UserModel } from './models/user'

server.get('/', (req, res) => {
  try {
    res.send('Servidor ON!');
  } catch (error) {
    res.send(500, error)
  }
})

server.get('/users', async (req, res) => {
  try {
    console.log('users entrou!');
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    res.send(500, error)
  }
})


server.start(() => console.log('Started server'))

