const cors = require('cors')
const express = require('express');

const db = require('./config/connection');
const routes = require('./routes');


const cwd = process.cwd();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});
