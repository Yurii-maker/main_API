import dotenv from 'dotenv';

dotenv.config();

export const config = {
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'asd',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'qwe',
    PORT: process.env.PORT || 5500,
    SALT: process.env.SALT,
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
    SECRET_FORGOT_KEY: process.env.SECRET_FORGOT_KEY || 'dsa',
    FORGOT_TOKEN_LIFE: process.env.FORGOT_TOKEN_LIFE,
};
