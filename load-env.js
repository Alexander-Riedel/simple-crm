const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const envConfig = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

const envPath = path.join(__dirname, './src/environments');

if (!fs.existsSync(envPath)) {
  fs.mkdirSync(envPath, { recursive: true });
}

fs.writeFileSync(path.join(envPath, 'env.json'), JSON.stringify(envConfig, null, 2));