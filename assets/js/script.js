
// selecting dom elements
var nameInput = document.querySelector('#name-input');
var randInput = document.querySelector('#random-input');
var eventCardTemplate = document.querySelector('[event-card-template]');
var eventCardContainer = document.querySelector('[data-event-card-container]'); 
var saveEvent = document.querySelector('[event-save]');
//empty array to save search data
var eventData = []; 


// fetch Top 10 Billboard artist information from Billboard API
var getRandomArtist = function() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6541ea5b6dmshc516d2014468a79p12614ajsnecbfc71c931f',
            'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
        }
    };
    
    fetch('https://billboard-api2.p.rapidapi.com/artist-100?range=1-100&date=2019-05-11', options)
        .then(response => response.json())
        .then(response => {
            // locate the data we need and put into variable
            var data = response.content;
            // empty array to fill with 10 artists
            var names = [];
            // fill array
            for ( var i = 1; i <= 10; i++) {
                names.push(data[i].artist);
            }

            // get a random artist name for the top 10 list
            var randomNum = Math.floor(Math.random() * 10) + 1;
            getEvents(names[randomNum]);
        })
        .catch(err => console.error(err));
}

var getEvents = function(artist) {
    //format the ticketmaster api url
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=dyhifNOGUwqv8SJfmm8DTGalg7i9uGS7&keyword=" + artist + "&locale=*&classificationName=music";
    
    // make api request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            // locate the data we need
            var event = data._embedded.events;
            // iterate through array
            for (var i = 0; i < event.length; i++) {
                // cloneNode needed for template in HTML for dynamic content
                const card = eventCardTemplate.content.cloneNode(true).children[0];
                // connect all the DOM elements
                const header = card.querySelector("[event-name]");
                const date = card.querySelector("[event-date]");
                const venue = card.querySelector("[event-venue-name]");
                const img = card.querySelector("[event-img]");
                const url = card.querySelector("[event-url]");      

                // populate the selected elements 
                header.textContent = event[i].name;
                date.textContent = event[i].dates.start.localDate;
                venue.textContent = event[i]._embedded.venues[0].name;
                img.src = event[i].images[0].url;
                url.href = event[i].url;

                // apprend to the card template created in HTML
                eventCardContainer.append(card); 
                // push the data from the api to an empty array of objects             
                eventData.push(
                    { 
                        "name": event[i].name, 
                        "date": event[i].dates.start.localDate,
                        "venue": event[i]._embedded.venues[0].name,
                        "img": event[i].images[1].url,
                        "url": event[i].url
                    }
                );
            };
            console.log(eventData);

            // save the data to Local Storage
            localSave(eventData);
        });
    });
};

// function to save data to local storage
var localSave = function(savedEventData) {
    // serialize the data into a string to be saved
    var eventData_serailized = JSON.stringify(savedEventData);
    // save to local storage
    localStorage.setItem( "savedEvents", eventData_serailized);
    console.log(localStorage);

}


// event listener to search bar, listens for "enter keypress"
nameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            var value = event.target.value;
            //call api for artist events matching searchbar input
            getEvents(value);

            //clears search bar input 
            event.currentTarget.value = ''; 
        };
        
});


// event listener for Top 10 button, listens for "click"
randInput.addEventListener("click", (event) => {
    event.preventDefault();

    //call api for top 10 list
    getRandomArtist();
})





