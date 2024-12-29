require("dotenv").config();
const express = require("express");
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 8080;

const { usersRouter } = require("./routers/usersRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use('/api/users', usersRouter);
// app.use('/api/libraries', librariesRouter);
// app.use('/api/books', booksRouter);
// app.use('/api/libraries/:libraryId/books', librariesBooksRouter);

app.use((req, res) => {
    res.status(400).send("Page wasn't found");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});