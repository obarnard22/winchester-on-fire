// THIS IMPORT HAS SIDE EFFECTS - configures dotenvx, sets values in process.env
import "@dotenvx/dotenvx/config";

import * as crypto from "crypto";

import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";

console.log(`Hello ${process.env.HELLO}`);

const COOKIE_SECRET = "FmrSjmxvJiwFbPRQrt-lnA";
const LOGIN_TOKEN_COOKIE = "loginToken";

function generate_uuid() {
    return crypto.randomBytes(128 / 8).toString("base64url");
}

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(
    session({
        genid: generate_uuid,
        secret: COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(cookieParser(COOKIE_SECRET));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.post("/login", (req, res) => {
    const identifier = req.body.identifier;
    if (identifier === "mark") {
        // TODO create login token

        // TODO cookie options
        res.cookie(LOGIN_TOKEN_COOKIE, "loggedin", { signed: true });
        res.redirect("/");
    } else {
        req.session.login = {
            errorMessage: "that user does not exist",
            identifier,
        };
        res.redirect("/login");
    }
});

app.get("/login", (req, res) => {
    let login = req.session.login ?? {};
    req.session.login = null;
    res.render("login.handlebars", {
        layout: "login.handlebars",
        ...login,
    });
});

app.post("/logout", (req, res) => {
    // TODO invalidate login token

    // TODO correct cookie options
    res.cookie(LOGIN_TOKEN_COOKIE, "", { signed: true });
    res.redirect("/login");
});

app.get("/", (req, res) => {
    let login_token = req.signedCookies[LOGIN_TOKEN_COOKIE];
    if (login_token) {
        // TODO check cookie in db
        if (login_token === "loggedin") {
            // TODO:
            // if staff, show logging page.
            // if audit, show audit page
            res.render("dashboard.handlebars", {
                layout: "logged-in.handlebars",
                title: "Dashboard",
                name: "Mark Marker",
            });
            return;
        }
    }

    // otherwise not logged in

    // TODO correct cookie options
    res.cookie(LOGIN_TOKEN_COOKIE, "", { signed: true });
    res.redirect("/login");
});

app.listen(3000);
