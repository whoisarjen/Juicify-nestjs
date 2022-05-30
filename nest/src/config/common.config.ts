export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 5000,
    MONGODB_STRING: process.env.MONGODB_STRING,
    CORS: {
        origin: 'http://localhost',
        credentials: true,
    },
    TOKEN_EXPIRE_TIME: '60s',
    SECRET_KEY: process.env.SECRET_KEY,
});
