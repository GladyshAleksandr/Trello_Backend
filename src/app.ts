import express from 'express'
import { } from 'dotenv/config'
import cors from 'cors'
import routes from './routes/routes'


const app = express()

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use('/', routes)


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT
        }`)
})