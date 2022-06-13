const express = require("express");
const app = express();
const port = 3000;

const command = require("../backstop/index");
const path = require("path");
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../startpage.html"));
});

const fs = require("fs");
app.get("/api/test-list", (req, res) => {
    const tests = [];
    fs.readdir(path.join(__dirname, `../backstop/test/${ req.query.project }`), null, (err, files) => {
        if (err) {
            throw err;
        }

        const index = files.indexOf(".gitkeep");
        files.splice(index, 1);
        res.setHeader("Content-Type", "application/json");
        res.send(files);
    });
});

app.get("/config.js", (req, res) => {
    const referrer = new URL(req.headers.referer);

    fs.readFile(path.join(
        __dirname,
        `../backstop/test/${ referrer.searchParams.get("project") }`,
        referrer.searchParams.get("test"),
        "report.json",
    ), { encoding: "utf8" }, (err, string) => {
    // string = string.replace(/\.\./bitmaps_reference/, "");
        res.setHeader("Content-Type", "application/javascript");
        res.send(`report(${string})`);
    });
});

app.use("/assets", express.static("assets"));
app.use("/test", express.static("backstop/test"));
app.use("/reference", express.static("backstop/reference"));

app.use(express.json());
app.get("/report/:test", (req, res) => {
    res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title><style>body {margin: 0;}iframe {width: 100%;height: 100vh;border: 0;}</style></head><body><iframe src="/report?test=${req.params.test}&project=${req.query.project}"></iframe></body></html>`);
});

app.get("/report", (req, res) => {
    res.sendFile(path.join(__dirname, "../assets/index.html"));
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
