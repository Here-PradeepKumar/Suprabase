const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const supabase = require('./supabaseClient');

require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Adjust depending on your frontend URL
  credentials: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Authentication route
app.post('/auth', async (req, res) => {
    const { email } = req.body;
    const { user, error } = await supabase.auth.signIn({
        email,
    }, {
        redirectTo: 'http://localhost:3000/welcome'
    });

    if (error) return res.status(401).send({ error: error.message });
    return res.status(200).send({ message: "Check your email for the login link!" });
});

// JWT middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "You are accessing a protected route", userId: req.user.id });
});

// Logout route
app.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
