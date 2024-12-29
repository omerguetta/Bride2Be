require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 8080;

const { usersRouter } = require("./routers/usersRouter");

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // ה-URL של צד הלקוח
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // מתודות שמותרות
    credentials: true // אם את משתמשת ב-cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// Routes
app.use('/api/users', usersRouter);
// app.use('/api/libraries', librariesRouter);
// app.use('/api/books', booksRouter);
// app.use('/api/libraries/:libraryId/books', librariesBooksRouter);

// Error handler for 404
app.use((req, res) => {
    res.status(400).send("Page wasn't found");
});

// Start server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
