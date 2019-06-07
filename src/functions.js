export class DoctorFinder {

  constructor() {

  }

  addToOptions(userOption) {
    if(userOption != null) {
      options = "";
      options += userOption + "&";
    }
    return options;
  }

  connectToApi(options) {
  const API_KEY = process.env.exports.apiKey;
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?${options}location=or-portland&user_location=45.5206223%2C-122.6773984&skip=0&limit=10&user_key=${API_KEY}`;
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
  }
}