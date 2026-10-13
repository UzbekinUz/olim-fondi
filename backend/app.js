process.env.NODE_ENV !== 'production' ? require('dotenv').config({ path: '.env' }) : null;
const express = require('express');
const mongo = require('mongoose');
const app = express();

mongo.set('strictQuery', false);
mongo.connect(process.env.DB_CONNECTION_STRING)
    .then(() => { console.log("ulandi") })
    .catch((err) => {
        console.error("MongoDB'ga ulanib bo'lmadi:", err.message);
        process.exit(1);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(require('express-fileupload')());
app.use(require('cors')({ origin: "*" }));
app.use('/api', require('./router'));

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => console.log("Server " + PORT + "-portda ishlamoqda"));
