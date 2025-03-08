import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// ������� ��������
app.get('/', (req: Request, res: Response) => {
    res.render('layout', { body: 'index', title: 'Main' });
});

// �������� � ��������
app.get('/about', (req: Request, res: Response) => {
    res.render('layout', { body: 'about', title: 'About' });
});

// �������� ������: �����
app.get('/products/pen', (req: Request, res: Response) => {
    const product = {
        name: 'Pen',
        description: 'Blue gel pen',
        price: 10,
    };
    res.render('layout', { body: 'product', product, title: product.name });
});

// �������� ������: �������
app.get('/products/notebook', (req: Request, res: Response) => {
    const product = {
        name: 'Textbook',
        description: 'Green textbook, 48 pages',
        price: 15,
    };
    res.render('layout', { body: 'product', product, title: product.name });
});

// ������������ ��������
app.get('/page', (req: Request, res: Response) => {
    const username = req.query.user || 'Guest';
    res.render('layout', { body: 'dynamic', username, title: 'Hi, ' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});