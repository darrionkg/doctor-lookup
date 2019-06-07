// require('exports-loader?file!./bootstrap/js/dist/.js')
import $ from 'jquery';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log("Success");
    }, function(error) {
      console.log("fail");
    });
});