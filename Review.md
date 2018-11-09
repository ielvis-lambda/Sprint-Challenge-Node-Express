# Review Questions

## What is Node.js?
Node.js is an open-source server environment that runs on various platforms and uses Javascript on the server to communicate with a client. 

## What is Express?
Express is a middleware framework for Node.js that we can use to setup middlewares that respond to HTTP requests.

## Mention two parts of Express that you learned about this week.
The first part we learned about the express application is that it uses the homies 'req' and 'res'. These are the request object (string, body, http header, etc) and the response object that express sends when it receives that requests. Another part of Express that we learned this week was using it for basic routing (POST a user at this address for example). Another way we used it 

## What is Middleware?

Middleware is a function that receives the homies (req & res) and can modify them before passing them on or just end the response. 

## What is a Resource?
A resource is an endpoint in your request. So does the "www.mysite.com/products" resource exist or not? 

## What can the API return to help clients know if a request was successful?
HTTP Status Codes with information on whether or not the request was successful or not and why. 

## How can we partition our application into sub-applications?
Use Express Routers which are like mini-applications that can have their own middleware and routing. An example of this would be to split the server requests for users and posts into separate files and reference them in with express routers for cleaner code instead of one huge server file. 

## What is express.json() and why do we need it?
express.json() is a built-in middleware function in Express. It changes incoming requests from strings to json objects so that our code can work with the data. 
