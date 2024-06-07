import supabase from './supabaseClient';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function storeOTP(email) {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes
    console.log(otp);
    await supabase
        .from('otps')
        .insert([{ email, otp, expires_at: expiresAt }]);
    return otp;
}

async function verifyOTP(email, otp) {
    const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('email', email)
        .eq('otp', otp)
        .single();

    if (error || !data || new Date(data.expires_at) < new Date()) {
        return { error: 'OTP is invalid or has expired' };
    }

    const user = await createUser(email); // Assume createUser handles sign up/logic
    const { token, refreshToken } = generateTokens(user.id);
    return { user, token, refreshToken };
}

function generateTokens(userId) {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { token, refreshToken };
}

async function createUser(email) {
    const { user, error } = await supabase.auth.signUp({
        email,
        password: crypto.randomBytes(12).toString('hex') // Generates a random password
    });
    return user;
}

export { storeOTP, verifyOTP, generateTokens };
