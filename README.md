# Hands on with APIs

This repo coexists with a presentation on APIs.
It contains the files and code needed to follow along.
You can find the code snippets used and required in this README.

## Installation 

Use the download button above to add this repo to your dev folder. If you don't have one, create it in the same folder as your Documents, Downloads and Images folders.


## 01. Getting Data - NASA

We will <em>Get</em> (**Read**) data from NASA to inspect within Postman. 
Select one from this options here [NASA RSS Feeds](https://www.nasa.gov/content/nasa-rss-feeds  
)

## 02. Getting Data - OData

We will <em>Get</em> (**Read**) data from an OData demo source to inspect within Postman. 
We will use [Northwind OData Service](https://services.odata.org/V3/Northwind/Northwind.svc/)

First, we'll inspect the XML document we receive, and in the next step will add parameters to work in JSON, add filters and more.

## 03. Working with OData - URI Queries

Using the [Northwind OData service for products]( https://services.odata.org/V3/Northwind/Northwind.svc/Products), add the below parameters in Postman to augment your API call.

Should you want to copy the URL:

```https://services.odata.org/V3/Northwind/Northwind.svc/Products```

Add these filters and watch what happens to your request:

Parameter | Value
:---: | :---:
$format | json
$top | 5
$orderby | UnitPrice

OData supports a wealth of filters and URI conventions - see [Section 04](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/#QueryStringOptions) of the OData documentation.

## 04. Adding API calls into a front-end app

Copy and paste this Code Snippet into the <em>exercise.html</em> file at the designated location to bring OData to the front-end.

```javascript
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);

        var dataFromAPI = JSON.parse(this.responseText);
        productData = dataFromAPI;
        console.log(productData);

        }
    });
xhr.open("GET", "https://services.odata.org/V3/Northwind/Northwind.svc/Products(9)?$format=json");
xhr.send();
```

## 05. Posting Data

You can send any data you want to this application: https://labstesting.eu.ngrok.io/handleData

This is an app running on my local machine, and the webhook at the end defines how your data will be handle. The target is a simple NodeJS application, acting as a server. 

Your data can be any message, but should be formatted:

```javascript
{
    "data": {
        "YourFirstNameHere": "Whatever your message is within these quotes."
}
```

## Overtime: The NodeJS App

You will see the NodeJS App code also in this repo - the <em>node_modules</em> folder, the <em>start.js, package.json</em> files and more.

To run it on your machine, first you need to open a new Terminal window in VS Code and install the Node dependencies.

With the root folder open in VS Code, in the top app bar click `Terminal > New Terminal`

Now, in the Terminal window that has appeared at the bottom of the screen, run the following command (you must have already installed [NodeJS](https://nodejs.org/en/download/) to your machine):
```
npm install
```

This installs and updates all dependencies in the <em>node_modules</em> folder. 

Once that's done, run the following command in the same Terminal window:
```
npm start
```

You'll get some text appear that your app is running on `Port 8081.`

Now, locally, you can run the above Post/Get exercise on your machine with the following URLs:
```javascript
http://localhost:8081/getData
http://localhost:8081/getExternalData
http://localhost:8081/handleData
```

To stop the NodeJS app, use the **<em>break</em>** command, a common standard to kill processes in any terminal window. This is a keyboard shortcut:
`ctrl + C`