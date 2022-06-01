import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 5000,
    MONGODB_STRING: process.env.MONGODB_STRING,
    CORS: {
        origin: 'http://localhost',
        credentials: true,
    },
    TOKEN_NAME: 'token',
    TOKEN_SETTINGS: {
        expiresIn: '1m',
    },
    REFRESH_TOKEN_NAME: 'refresh_token',
    REFRESH_TOKEN_SETTINGS: {
        expiresIn: '30d',
    },
    SECRET_KEY: process.env.SECRET_KEY,
    COOKIE_OPTIONS: {
        domain: process.env.DOMAIN || 'localhost', // <- Change to your client domain
        secure: false, // <- Should be true if !development
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
        maxAge: 31536000,
    },
    MAILER_SENDER: 'kamilOw97@gmail.com',
    MAILER_CONFIG: {
        transport: {
            host: 'localhost',
            port: 1025,
            ignoreTLS: true,
            secure: false,
            auth: {
                user: process.env.MAILDEV_INCOMING_USER,
                pass: process.env.MAILDEV_INCOMING_PASS,
            },
        },
        defaults: {
            from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
        template: {
            dir: process.cwd() + '/template/',
            adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
            options: {
                strict: true,
            },
        },
    }
});
