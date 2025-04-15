import express, { Request, Response } from 'express'
import usersRouter from './routes/user.routes'
import { connectDB } from './config/connectDB'
import swaggerUI from 'swagger-ui-express' 
import swaggerSpec from './config/openAPI'

const app = express()
const port = 3000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/users', usersRouter)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
connectDB()

app.set('view engine', 'ejs')

// Main page
app.get('/', (req: Request, res: Response) => {
    res.render('layout', { body: 'index', title: 'Main' })
})

// About page
app.get('/about', (req: Request, res: Response) => {
    res.render('layout', { body: 'about', title: 'About' })
})

// Pen page
app.get('/products/pen', (req: Request, res: Response) => {
    const product = {
        name: 'Pen',
        description: 'Blue gel pen',
        price: 10,
    }
    res.render('layout', { body: 'product', product, title: product.name })
})

// Textbook page
app.get('/products/notebook', (req: Request, res: Response) => {
    const product = {
        name: 'Textbook',
        description: 'Green textbook, 48 pages',
        price: 15,
    }
    res.render('layout', { body: 'product', product, title: product.name })
})

// Dynamic page
app.get('/page', (req: Request, res: Response) => {
    const username = req.query.user || 'Guest'
    res.render('layout', { body: 'dynamic', username, title: 'Hi, ' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
