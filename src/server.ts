const express = require('express')
const cors = require('cors')
const PORT = 3001;
const routes = require('./routes/routes.ts');

const app = express()

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use('/', routes)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})