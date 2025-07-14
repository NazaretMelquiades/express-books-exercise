const express = require('express')
const books = require('./data/books.json')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//ejercicio 1
app.get('/all', (req, res) => {
    res.status(200).json(books);
})

//ejercicio 2
app.get('/first', (req, res) => {
    if (books.length > 0) {
        res.status(200).json(books[0]); // Solo el primer libro
    } else {
        res.status(404).json({ message: "No books found" });
    }
});

//ejercicio 3
app.get('/last', (req, res) => {
    if (Array.isArray(books) && books.length > 0) {
        const lastBook = books[books.length - 1];
        res.json(lastBook);
    } else {
        res.status(404).json({ error: 'No books found' });
    }
});

//ejercicio 4
app.get('/middle', (req, res) => {
    if (Array.isArray(books) && books.length > 50) {
        const lastBook = books[50];
        res.json(lastBook);
    } else {
        res.status(404).json({ error: 'No books found' });
    }
});

//ejercicio 5
app.get("/author/dante-alighieri", (req, res) => {
    const book = books.find(book => book.author.toLowerCase() === "dante alighieri");

    if (book) {
        res.status(200).json(book.title); // Solo el string
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

//ejercicio 6
app.get('/country/charles-dickens', (req, res) => {
    const book = books.find(book => book.author.toLowerCase() === "charles dickens");
    if (book) {
        res.status(200).json(book.country);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

//ejercicio 7
app.get('/year&pages/cervantes', (req, res) => {
    const book = books.find(book => book.author.toLowerCase() === "miguel de cervantes");
    if (book) {
        res.status(200).json({ pages: book.pages, year: book.year });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

//ejercicio 8 
app.get('/country/count/spain', (req, res) => {
    const count = books.filter(book => book.country === 'Spain').length;
    res.json(count);
});

//ejercicio 9
app.get('/country/at-least/germany', (req, res) => {
    for (let i = 0; i < books.length; i++) {
        if (books[i].country === 'Germany') {
            return res.json(true);
        }
    }
    res.json(false); //
});

//ejercicio 10
app.get('/pages/all-greater/200', (req, res) => {
    let allGreater = true;

    for (let i = 0; i < books.length; i++) {
        if (books[i].pages <= 200) {
            allGreater = false;
        }
    }

    res.json(allGreater);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})