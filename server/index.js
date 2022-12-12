const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Account = require('./src/routes/account');
const Product = require('./src/routes/account');
require('./config/database');

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/account', Account);
app.use('/product', Product);

app.listen(3001, () => {
     console.log('Server is online.');
});