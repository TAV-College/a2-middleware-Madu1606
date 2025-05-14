const router = require("express").Router();
const { addBook, getAllBooks, getBookById } = require("../models/books");
const verifyToken = require("../middlewares/auth");

router.get("/books", async (req, res) => {
    const books = await getAllBooks();
    res.json({books})
});

router.get("/books/:id", async (req, res) => {
    const bid = req.params.id;
    const book = await getBookById(bid);
    res.send(book);
});

router.post("/books", verifyToken, async (req, res) => {
    const author = req.body.author;
    const isbn = req.body.isbn;
    const title = req.body.title;
    const book = await addBook({author, isbn, title});
    res.json({msg: "book added", book})
})

module.exports = router;