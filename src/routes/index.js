import express from "express";

import { LOGIN_TOKEN_COOKIE } from "../constants.js";

const router = express.Router();

router.get("/", (req, res) => {
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

export default router;
