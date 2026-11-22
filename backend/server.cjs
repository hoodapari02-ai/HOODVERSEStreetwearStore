const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "HOODVERSE backend is running successfully!",
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "HOODVERSE API is healthy",
    });
});

// Store information
app.get("/api/store", (req, res) => {
    res.json({
        name: "HOODVERSE",
        description: "Premium streetwear fashion store",
        currency: "INR",
        freeShippingAbove: 2999,
        support: "Customer support available",
    });
});

// Contact form API
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email and message are required.",
        });
    }

    res.json({
        success: true,
        message: "Thank you for contacting HOODVERSE!",
        data: {
            name,
            email,
            message,
        },
    });
});

// Order API
app.post("/api/orders", (req, res) => {
    const { items, customer } = req.body;

    if (!items || !customer) {
        return res.status(400).json({
            success: false,
            message: "Order items and customer information are required.",
        });
    }

    res.status(201).json({
        success: true,
        message: "Order received successfully!",
        orderId: `HV-${Date.now()}`,
        items,
        customer,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`HOODVERSE backend running on port ${PORT}`);
});