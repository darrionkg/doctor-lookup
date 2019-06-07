// require('exports-loader?file!./bootstrap/js/dist/.js')
import $ from 'jquery';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { DoctorFinder } from './functions';

$(document).ready(function() {
  let find = new DoctorFinder();
  $("#nameForm").submit(function(event) {
    event.preventDefault();
    let option = $("#name").val();
    let optionType = $("#optionType1").val();
    let options = find.addToOptions(option, optionType);
    find.connectToApi(options);

    promise.then(function(response) {
      $('#result').text(`The doctors with the name ${option} include ${body.data.doctors[0].first_name}%`);
    }, function(error) {
      $("#result").text(`Sorry, no doctors have the name ${option} in your area.`);
    });
  });

  $("#practiceForm").submit(function(event) {
    event.preventDefault();
    let option = $("#practice").val();
    let optionType = $("#optionType2").val();

    promise.then(function(response) {
      $('#result').text(`The doctors that practice ${option} are ${body.data.doctors[0].first_name}`);
    }, function(error) {
      $("#result").text(`Sorry, no doctors practice ${option} in your area.`);
    });
  });
});