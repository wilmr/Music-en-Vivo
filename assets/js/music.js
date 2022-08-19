var musicContainer = document.querySelector("#music-Container");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1adbee6575msh71d2516c62383c1p144addjsn4d6d5a676fff",
    "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
  },
};

fetch(
  "https://billboard-api2.p.rapidapi.com/artist-100?range=1-100&date=2019-05-11",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
