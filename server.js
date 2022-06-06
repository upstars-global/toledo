const express = require("express");
const app = express();
const port = 3000;

const test = require("./index");

app.use(express.json());
app.get("/start", async(req, res) => {
    test().then((a, b, c, d) => {
        console.log("complete");
    }).catch((err, a, b, c) => {
        console.log("error");
    }).finally(() => {
        res.send("Test complete!");
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
