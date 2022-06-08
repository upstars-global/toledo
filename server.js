const express = require("express");
const app = express();
const port = 3000;

const test = require("./index");
const path = require("path");
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "startpage.html"));
});
app.use(express.static("testalpa/html_report"));
app.use(express.static("testalpa"));


app.get("/report", (req, res) => {
    res.sendFile(path.join(__dirname, "testalpa/html_report/index.html"));
});

app.use(express.json());

app.get("/reference", (req, res) => {
    test("reference").then(() => {
        console.log("complete");
    }).catch((err) => {
        console.log("error");
    }).finally(() => {
        res.redirect("/");
    });
});
app.get("/start", async(req, res) => {
    test("test").then(() => {
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
