# Project Overview

## [Live URL](https://image-gallery-bucy.onrender.com)

## Back-End Git Repo
[Image Gallery Backend Repository](https://github.com/Yeasir-Hossain/image-gallery-backend)

## Features
- Upon loading the website, a user with a session ID is created.
- Default images are loaded and stored in Redux.
- Users can select and delete multiple images.
- Default images are cleared from Redux but not from the database.
- Users can upload one image at a time.
- Users can permanently delete the images they uploaded.
- An API request class named "Terminal" is provided for simplifying API requests.
- Re-arrange items by drag and drop

## API Wrapper

#### Terminal Class
The "Terminal" class is part of the API wrapper and simplifies making API requests to the backend server. It facilitates interaction with the API and offers a clean interface for sending HTTP requests.

#### Creating an Instance
Create an instance of the "Terminal" class by providing the API server URL as a string to its constructor.

#### Making API Requests
The "Terminal" class provides a "request" method for making API requests. You can specify the request type, API name, query parameters, path parameters, and request body. The method returns the API response.

#### API Request Options
- "name" (string): The name of the API to be called.
- "queries" (object): Query string parameters for the request.
- "params" (object): URL path parameters for the request.
- "body" (object): The request body.

#### Error Handling
If an error occurs during the API request, the "request" method will throw an error that can be caught and handled using "try...catch" or ".catch()".

## Packages
- [axios](https://www.npmjs.com/package/axios)
- [notistack](https://www.npmjs.com/package/notistack) (used for toasting)
- [nprogress](https://www.npmjs.com/package/nprogress) (provides a progress bar during loading)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [dndkit](https://docs.dndkit.com/introduction/installation)

## Challenges
- The primary challenge was implementing drag and drop functionality. Existing packages mainly support column or list-based drag and drop, not grid structures.
- Implementing a placeholder box during drag and drop with item rearrangement posed further challenges.

## Solutions
- Implemented drag and drop feature using react dnd kit package.


## N.B: As the project is hosted on render it may take some time to load. According to the community posts it may take upto 1 minute. If it does so please refresh the page then it will work properly. Thanks in advance.
