// require('exports-loader?file!./bootstrap/js/dist/.js')
import $ from 'jquery';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
    // $.ajax({
    //     url: `https://api.betterdoctor.com/2016-03-01/doctors?name=bob&location=45.5155%2C%20-122.6793%2C%20100&user_location=45.5155%2C%20-122.6793&skip=0&limit=10&user_key=${process.env.apiKey}`,
    //     type: 'GET',
    //     data: {
    //       format: 'json'
    //     },
    //     success: function(response) {
    //       console.log("Success")
    //     },
    //     error: function() {
    //       console.log("There was an error processing your request. Please try again.");
    //     }
      // });
    const API_KEY = process.env.exports.apiKey;
    console.log(API_KEY);
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = 'https://api.betterdoctor.com/2016-03-01/doctors?name=bob&location=45.5155%2C%20-122.6793%2C%20100&user_location=45.5155%2C%20-122.6793&skip=0&limit=10&user_key=' + API_KEY;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log("Success");
    }, function(error) {
      console.log("fail");
    });
});