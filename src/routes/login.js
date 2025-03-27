import express from "express";

import { LOGIN_TOKEN_COOKIE } from "../constants.js";

const router = express.Router();

router.get("/", (req, res) => {
    let login = req.session["login"];
    delete req.session["login"];
    res.render("login.handlebars", {
        layout: "login.handlebars",
        ...login,
    });
});

router.post("/", (req, res) => {
    const identifier = req.body.identifier;
    if (identifier === "mark") {
        // TODO create login token

        // TODO cookie options
        res.cookie(LOGIN_TOKEN_COOKIE, "loggedin", { signed: true });
        res.redirect("/");
    } else {
        req.session["login"] = {
            errorMessage: "that user does not exist",
            identifier,
        };
        res.redirect("/login");
    }
});

router.delete("/", (req, res) => {
    // TODO invalidate login token

    // TODO correct cookie options
    res.cookie(LOGIN_TOKEN_COOKIE, "", { signed: true });
    res.redirect("/login");
});

export default router;
