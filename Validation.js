const express = require('express');
const { check, validationResult, body } = require('express-validator');
const bodyParser = require("body-parser");
const { CustomValidation } = require('express-validator/src/context-items');

const app = express();

app.use(express.json());
app.use(bodyParser.json())

app.post('/login', [
    check('username').isEmail().withMessage("email not empty"),
    check('password').isLength({ min: 5 }).withMessage("password greate more 5"),
], (req, res) => {

    const { username, password,age } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (age < 18) {
        res.status(400).json({ withMessage: "baby" });
        return;
    }

    res.json({ message: 'Login successful' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});