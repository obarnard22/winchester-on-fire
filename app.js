// THIS IMPORT HAS SIDE EFFECTS - configures dotenvx, sets values in process.env
import "@dotenvx/dotenvx/config";

import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";

import { COOKIE_SECRET, LOGIN_TOKEN_COOKIE } from "./src/constants.js";
import { generate_uuid } from "./src/utils.js";

import loginRouter from "./src/routes/login.js";
import indexRouter from "./src/routes/index.js";

const app = express();

// configures handlebars HTML templating
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// middleware
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

// routes
app.use("/login", loginRouter);
app.use("/", indexRouter);

app.listen(3000);
