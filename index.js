const express = require('express');
const app = express();
const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const db = require("./models");
app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use('/auth', authRouter);
app.use('/users', usersRouter);

const start = async () => {
    try {
        db.sequelize.sync().then(() => {

            app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
        });
    } catch (e) {
        console.log(e);
    }
}

start();
