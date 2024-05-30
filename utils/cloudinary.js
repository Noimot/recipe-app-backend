const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

cloudinary.config({
  cloud_name: process.env.ClOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;