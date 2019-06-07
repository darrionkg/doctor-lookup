// require('exports-loader?file!./bootstrap/js/dist/.js')
import $ from 'jquery';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { DoctorFinder } from './functions';

function getDoctorInfo(body, option) {
  $('#result').text(`The doctors with the name ${option} include... First Name: ${body.data[0].profile.first_name} Last name: ${body.data[0].profile.last_name} Address: ${body.data[0].practices[0].visit_address["street"]}. ${body.data[0].practices[0].visit_address["city"]}, ${body.data[0].practices[0].visit_address["state"]} Phone Number: ${body.data[0].practices[0].phones[0].number} Accepting New Patients: ${body.data[0].practices[0].accepts_new_patients} <a href="${body.data[0].profile["image_url"]}"> Pic Of Me</a> `);
}

$(document).ready(function() {
  let find = new DoctorFinder();
  $("#nameForm").submit(function(event) {
    event.preventDefault();
    let option = $("#name").val();
    let optionType = $("#optionType1").val();
    let options = find.addToOptions(option, optionType);
    
    let promise = find.connectToApi(options);
    
    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      getDoctorInfo(body, option);
    }, function(error) {
      $("#result").text(`Sorry, no doctors have the name ${option} in your area.`);
    });
  });

  $("#practiceForm").submit(function(event) {
    event.preventDefault();
    let option = $("#practice").val();
    let optionType = $("#optionType2").val();
    let options = find.addToOptions(option, optionType);

    let promise = find.connectToApi(options);

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('#result').text(`The doctors that practice ${option} are ${body.data.doctors[0].first_name}`);
    }, function(error) {
      // $("#result").text(`Sorry, no doctors practice ${option} in your area.`);
      $("#errorMessage").text(`There was an error processing your request: ${error.message}`);
    });
  });
});