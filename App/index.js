require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const fileupload = require('express-fileupload')


const connectDatabase = require('../App/database/database.js');
const error = require('./middleware/error.js');
const user = require('./routes/userroute.js')
const category = require('./routes/categoryroute.js')
const product = require('./routes/productsroute.js')
const sale = require('./routes/saleroute.js')
const expense = require('./routes/expenseroute.js')
// const expense = require('./routes/expenseroute.js')
const investment = require('./routes/investmentroute.js')


app.use(fileupload())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connect to mongodb database
connectDatabase();


// all routes to api
app.use('/api/v1', user)
app.use('/api/v1', category)
app.use('/api/v1', product)
app.use('/api/v1', sale)
app.use('/api/v1', expense)
app.use('/api/v1', investment)


// catch error
app.use(error)

// start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 4000');
})