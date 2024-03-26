import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get("/quotes", (req, res) => {
    const url = "https://zenquotes.io/api/quotes";
    fetch(url)
        .then((res) => res.json())
        .then((data) => res.send(data));
});

api.use("/api/", router);

export const handler = serverless(api);