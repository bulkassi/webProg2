import express, { Request, Response } from 'express'
const app = express()
const port = 3000

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    console.log(req.body)
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
