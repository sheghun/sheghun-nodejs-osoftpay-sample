const express = require("express");
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
// Set the views
app.set("views", "./views");
app.set("view engine", 'pug');
app.set("port", 3000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    // Form action
    // Where the form should be submitted
    const formAction = "https://developer.osoftpay.net/api/TestPublicPayments";
    const transactionType = 2;
    // My merchantNumber
    const merchantNumber = "g3ggdgsi1.gns4g.";
    const transactionReference = Date.now();
    const paymentItemName = "TestServiceName1";
    const siteRedirectURL = `localhost:${app.get("port")}/verify`;
    const amount = 5000;
    // Hash = merchantNumber+transactionReference+transactionType+amount+siteRedirectURL
    const hash = crypto.createHash("SHA512").update(
        `${merchantNumber}${transactionReference}${transactionType}${amount}${siteRedirectURL}`
    ).digest('hex');

    res.render('index', {
        title: 'Sheghun Nodejs Osoftpay Sample Code!',
        message: 'Sheghun Nodejs Osoftpay Sample Code!',
        formAction,
        transactionType,
        merchantNumber,
        transactionReference,
        paymentItemName,
        siteRedirectURL,
        amount,
        hash
    });
});

// Verifying and query the server.
app.post("/verify", (req, res, next) => {
    res.render("verify");
    next(err);

});

app.listen(app.get("port"), "localhost", () => {
    console.log("\x1b[33m%s\x1b[0m", "Server is running at " + app.get("port"));
});