import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { storeOTP, verifyOTP } from './auth.js';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = await storeOTP(email);
    res.json({ message: 'OTP sent', otp }); // For testing, usually you wouldn't send OTP back!
});

app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const result = await verifyOTP(email, otp);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.cookie('token', result.token, { httpOnly: true });
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, path: '/refresh-token' });
    res.json({ user: result.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
