const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Set up simple data handling array

var userData = [];

// LOAD ROUTES
// Look @ the '/name-set' is what you put in the Webhook at the end of your API Call url.
// That's how this app knows what function to call.

app.get('/getData', getData)
app.get('/getExternalData', getExternalData)
app.post('/handleData', handleData)
app.post('/errors', function (req, res) {
  console.error(req.body);
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
console.log("This NodeJS is acting as a temporary server/database.")
console.log("To use your webhooks, use this URL as an example: http://localhost:8081/getData")
console.log("Pay careful attention to which webhooks require which API Method.")


// This function responds with collected data so far (NOT optimised)
function getData(req, res) {
  res.json(userData);
}

// User might say "What product has the first product ID?"
// Handle data from an API
function getExternalData(req, res, bodyParser) {

    var options = { method: 'GET',
      url: 'https://services.odata.org/V3/Northwind/Northwind.svc/Products',
      qs: { '$format': 'json', orderby: 'ProductID', '$top': '10' },
      headers: 
      { 'Postman-Token': 'e3f7d3d3-b8fc-4517-864d-58a179520ec9',
        'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);


    // In Node.JS we must parse the JSON response so that this app knows what it is (JSON), and how to handle it. 
    var dataPrep = JSON.parse(body);

    // Access data points using the dot notation for working with JSON data
    var productName = dataPrep.value[0].ProductName

    // Pass API data to the user
    res.json({
      replies: [
        { type: 'text', content: `The product with ID01 is: ` + productName },
      ],
    });
      console.log("Here's the full data set for the first product:")
      console.log(dataPrep.value[0]);
    });

}

// User will send a JSON message, under JSON tag 'data'
// {"data": "Hi, my message is this..."}
// Handling the message with a chatbot is as below
function handleData(req, res) {

  var incomingData = req.body;
  var userMessage = incomingData.data;
  userData.push(userMessage);
  console.log(userData);

  res.json({
    response: "Thanks for you message! it was... interesting. Why did you need to tell me '" + userMessage + "'?"
  });

};