import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.post("/login", (req, res) => {
    const identifier = req.body.identifier;
    console.log(`got login! identifier: ${identifier}`);
    res.send(`hello ${identifier}`);
    // res.render("login", { layout: "login.handlebars" });
});

app.get("/", (req, res) => {
    res.render("login", { layout: "login.handlebars" });
});

app.listen(3000);
