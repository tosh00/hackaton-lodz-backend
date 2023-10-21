import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '1234';
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0.vuikinr'
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.vuikinr.mongodb.net/?retryWrites=true&w=majority`;


const SERVER_PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3001;


export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}