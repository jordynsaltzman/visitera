# <img src="client/src/images/Visitera.png" height="50px">

[Go to the deployed application!](https://visitera.now.sh/)
_Disclaimer: The backend is deployed on Heroku which can be slow to load, so please allow a minute for the markers to populate._

Visitera is a personal travel log application built with a React front-end, a Node/Express backend, and a MongoDB database. It also uses Mapbox Maps SDK to embed a customized map, and a geocoder component to search for places using Mapbox Geocoding API.

I love to travel and wanted a way to keep track of the places I have been. With Visitera, users can double click anywhere on the map and add a new marker with information about their trip. Once added, users can click on their markers to view details that display in a popup.

Right now, you are required to enter an API key in order to add travels because I did not want everyone to be able to contribute their data. In the future, I would either like to have different colored markers for each user to add their own travel experiences, each with their own API key, or I will implement user login instead.

## Usage

- Use the dropdown menu or click a marker to view a log entry
- Use the search bar to navigate to a specific area of the map
- Double click to add a new marker
- Complete the form to add a log entry

## Preview

![Screenshot](client/src/images/visitera-add-marker.JPG)
![Screenshot](client/src/images/visitera-view-entry.JPG)

## Known Issues

1. This application is currently not very mobile friendly. I plan to make it more responsive in the near future.
2. There is a strange issue with the map markers appearing overtop of the popups depending on the order the data was added, described [here.](https://github.com/mapbox/mapbox-gl-js/issues/3109) I have not yet successfully debugged this. 

## TODO

- [x] Setup Server
  - [x] Install Dependencies
  - [x] Install / Setup Linter
  - [x] Setup Express App
  - [x] Setup Not Found and Error Middlewares
- [x] Model DB
  - What data will be stored?
- [x] Setup Mongoose Model(s)
- [x] POST /logs
  - Create a new log entry
- [x] GET / logs
  - List all log entries
- [x] Setup Client
- [x] Create form to add a new entry
- [x] Setup Map SDK on client
- [x] List all log entries on map
- [x] DEPLOY!

## License

MIT License

Copyright (c) 2020 Jordyn Saltzman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
