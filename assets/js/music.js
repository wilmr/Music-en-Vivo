var billboard = document.querySelector("#billboard-container");
var rank = [];

var getBillboard = function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "26541ea5b6dmshc516d2014468a79p12614ajsnecbfc71c931f",
      "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
    },
  };

  fetch(
    "https://billboard-api2.p.rapidapi.com/artist-100?range=1-10&date=2019-05-11",
    options
  ).then(function (response) {
    response.json().then(function (data) {
      var charts = data.content;

      for (var i = 1; i <= 10; i++) {
        rank.push(charts[i].artist);
      }
      var number = Math.floor(Math.random() * 10) + 1;
      var randomName = rank[number];
      console.log(randomName);
    });
  });
};

getBillboard();
