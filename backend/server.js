const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route to serve the index page from the correct directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

// GET route for serving the checkout page from the correct directory
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'checkout.html'));
});


// POST route to process order form data
app.post('/process-order', (req, res) => {
    const { items } = req.body;
    if (!items) {
        return res.status(400).json({ error: 'No items provided.' });
    }
    if (items.some(item => item.quantity < 1 || item.quantity > 10)) {
        return res.status(400).json({ error: 'Invalid quantity for one or more items.' });
    }


    try {
        const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);


        res.json({
            status: 'success',
            message: 'Order processed successfully',
            totalQuantity,
            totalPrice: totalPrice.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error when processing items.' });
    }
});




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
