import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { DoctorFinder } from './functions';


function checkIfDoctorsExist(body, option) {
  if(body.data.length >= 1) {
    getDoctorInfo(body);
  }
  else {
    $("#result").text(`Sorry, no doctors were found with the search ${option}`)
  }
}

function getDoctorInfo(body) {
  // not sure why loop currently wont work
  body.data.forEach(function(item) {
    $('#doctorTable').append(`<tr> <td>${item.profile.first_name}</td> <td>${item.profile.last_name}</td> <td>${item.practices[0].visit_address["street"]}. ${item.practices[0].visit_address["city"]}, ${item.practices[0].visit_address["state"]}</td> <td>${item.practices[0].phones[0].number}</td> <td>${item.practices[0].accepts_new_patients}</td> <td><a href="${item.profile["image_url"]}"> Pic Of Me</a></td> </tr>`);
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
      checkIfDoctorsExist(body, option);
 
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
      checkIfDoctorsExist(body, option);

    }, function(error) {

      $("#errorMessage").text(`There was an error processing your request: ${error.message}`);
    });
  });
});
