
var nameInput = document.querySelector('#name-input');
var eventCardTemplate = document.querySelector('[event-card-template]');
var eventCardContainer = document.querySelector('[data-event-card-container]');
var saveEvent = document.querySelector('[event-save]');
var eventData = [];

var getEvents = function(artist) {
    //format the ticketmaster api url
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=dyhifNOGUwqv8SJfmm8DTGalg7i9uGS7&keyword=" + artist + "&locale=*&classificationName=music";
    
    // make api request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            var event = data._embedded.events;

            for (var i = 0; i < event.length; i++) {
                const card = eventCardTemplate.content.cloneNode(true).children[0];
                const header = card.querySelector("[event-name]");
                const date = card.querySelector("[event-date]");
                const venue = card.querySelector("[event-venue-name]");
                const img = card.querySelector("[event-img]");
                const url = card.querySelector("[event-url]");      
                header.textContent = event[i].name;
                date.textContent = event[i].dates.start.localDate;
                venue.textContent = event[i]._embedded.venues[0].name;
                img.src = event[i].images[0].url;
                url.href = event[i].url;
                eventCardContainer.append(card);              
                eventData.push(
                    { 
                        "name": event[i].name, 
                        "date": event[i].dates.start.localDate,
                        "venue": event[i]._embedded.venues[0].name,
                        "img": event[i].images[0].url,
                        "url": event[i].url
                    }
                );
                
            };
            console.log(eventData);
            localSave(eventData);
        });
    });
};

var localSave = function(savedEventData) {
    var eventData_serailized = JSON.stringify(savedEventData);
    localStorage.setItem( "savedEvents", eventData_serailized);
    console.log(localStorage);

}



nameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            var value = event.target.value; 
            getEvents(value);
            event.currentTarget.value = ''; 
        };
        
});




