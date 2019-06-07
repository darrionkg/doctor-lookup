import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { DoctorFinder } from './functions';

function getDoctorInfo(body, option) {
  // not sure why loop currently wont work
  body.data.forEach(function(item) {
    $('#result').text(`The doctors with the name ${option} include... First Name: ${item.profile.first_name} Last name: ${item.profile.last_name} Address: ${item.practices[0].visit_address["street"]}. ${item.practices[0].visit_address["city"]}, ${item.practices[0].visit_address["state"]} Phone Number: ${item.practices[0].phones[0].number} Accepting New Patients: ${item.practices[0].accepts_new_patients} <a href="${item.profile["image_url"]}"> Pic Of Me</a> `);
  });
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
      // haven't refactored yet for doctor practices. still working on by name
      getDoctorInfo(body, option);
      //$("#result").text(`Sorry, no doctors have the name ${option} in your area.`);
    }, function(error) {
      $("#errorMessage").text(`There was an error processing your request: ${error.message}`);
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
      getDoctorInfo(body, option);
      $('#result').text(`The doctors that practice ${option} are ${body.data.doctors[0].first_name}`);
    }, function(error) {
      // $("#result").text(`Sorry, no doctors practice ${option} in your area.`);
      $("#errorMessage").text(`There was an error processing your request: ${error.message}`);
    });
  });
});
