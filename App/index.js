require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const fileupload = require('express-fileupload')


const connectDatabase = require('../App/database/database.js');
const error = require('./middleware/error.js');
const user = require('./routes/userroute.js')
const lostPerson = require('./routes/lostPersonRoute.js')
const foundPerson = require('./routes/foundPersonRoute.js')


app.use(fileupload())
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// connect to mongodb database
connectDatabase();


// all routes to api
app.use('/api/v1', user)
app.use('/api/v1', lostPerson)
app.use('/api/v1', foundPerson)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server Is Up And Running',
  });
})

// catch error
app.use(error)

// start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 4000');
})