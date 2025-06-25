const { Router } = require("express");

const indexRouter = Router();

const messages = [
    {
        text: 'Hi there!',
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
]


indexRouter.get("/", (req, res) => res.render("index", { title: "Mini Messaeboard", messages: messages}));

indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", (req, res) => {
    const newMsg = {
        text: req.body.messageContent,
        user: req.body.messageName,
        added: new Date()
    }

    messages.push(newMsg);
    res.redirect("/");
})

module.exports = indexRouter;