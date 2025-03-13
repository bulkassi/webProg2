import express, { Request, Response } from 'express'
import mongoose from "mongoose"
import User from "./models/User"
const app = express()
const port = 3000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose
    .connect("mongodb://admin:1234@localhost:27017/ivtb-22?authSource=admin")
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error(err))

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

// User creation (endpoint)
app.post("/users", async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json({message: (e as Error).message})
    }
})

// User deletion (endpoint)
app.delete("/users", async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const user = await User.deleteOne(req.body);
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
