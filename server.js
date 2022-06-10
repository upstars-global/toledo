const express = require("express");
const app = express();
const port = 3000;

const command = require("./index");
const path = require("path");
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "startpage.html"));
});

const fs = require("fs");
app.get("/api/test-list", (req, res) => {
    const tests = [];
    fs.readdir(path.join(__dirname, `test${ req.query.project }/bitmaps_test`), null, (err, files) => {
        if (err) {
            throw err;
        }

        res.setHeader("Content-Type", "application/json");
        res.send(files);
    });
});

app.get("/config.js", (req, res) => {
    const referrer = new URL(req.headers.referer);

    fs.readFile(path.join(
        __dirname,
        `test${ referrer.searchParams.get("project") }/bitmaps_test`,
        referrer.searchParams.get("test"),
        "report.json",
    ), { encoding: "utf8" }, (err, string) => {
        res.setHeader("Content-Type", "application/javascript");
        res.send(`report(${string})`);
    });
});

app.use(express.static("testthor/html_report"));
app.use(express.static("testalpa/html_report"));
app.use(express.static("testthor"));
app.use(express.static("testalpa"));

app.use(express.json());
app.get("/report/:test", (req, res) => {
    res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title><style>body {margin: 0;}iframe {width: 100%;height: 100vh;border: 0;}</style></head><body><iframe src="/report?test=${req.params.test}&project=${req.query.project}"></iframe></body></html>`);
});

app.get("/report", (req, res) => {
    res.sendFile(path.join(__dirname, "testalpa/html_report/index.html"));
});


app.get("/reference", (req, res) => {
    command("reference", req.query).then(() => {
        console.log("complete");
    }).catch((err) => {
        console.log("error");
    }).finally(() => {
        res.redirect("/");
    });
});
app.get("/start", async(req, res) => {
    command("test", req.query).then(() => {
        console.log("complete");
    }).catch((err) => {
        console.log("error");
    }).finally(() => {
        res.redirect("/");
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
