import { CookieOptions } from 'express';

export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 5000,
    MONGODB_STRING: process.env.MONGODB_STRING,
    CORS: {
        origin: 'http://localhost',
        credentials: true,
    },
    TOKEN_EXPIRE_TIME: '5m',
    SECRET_KEY: process.env.SECRET_KEY,
    COOKIE_OPTIONS: {
        domain: process.env.DOMAIN || 'localhost', // <- Change to your client domain
        secure: false, // <- Should be true if !development
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
    },
});
