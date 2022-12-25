import express, { Request, Response } from 'express'
import config from './config'
import morgan from 'morgan'
import db from './database/pool'
import route from './routes'

//create isntace of express to our app
const app = express()
//to pare the input date as json
app.use(express.json())
//using logger middlewares
app.use(morgan('short'))
//just normal get request for the server
app.get('/', (req: Request, res: Response): void => {
  res.json({
    message: "'Hello user'"
  })
})
//server is listening on the post to check it's running
const port= process.env.port || 3000
app.listen(config.port, () => {
  console.log(`Server is working on port ${port}`)
})

//this is just a db test connection to give me time when the connection is done
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err)
    })
})
//end point to connect routes
app.use('/api', route)

// handle anyerror related to wrong end poing
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: '404 page not found'
  })
})

export default app
