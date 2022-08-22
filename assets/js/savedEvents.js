
var nameInput = document.querySelector('#name-input');
var eventCardTemplate = document.querySelector('[event-card-template]');
var eventCardContainer = document.querySelector('[data-event-card-container]');
var saveEvent = document.querySelector('[event-save]');
var savedEventData = localStorage.getItem("savedEvents");
var parsedEventData = JSON.parse(savedEventData);

// displays content based on saved local storage

for (var i = 0; i < parsedEventData.length; i++) {
    const card = eventCardTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector("[event-name]");
    const date = card.querySelector("[event-date]");
    const venue = card.querySelector("[event-venue-name]");
    const img = card.querySelector("[event-img]");
    const url = card.querySelector("[event-url]");
    header.textContent = parsedEventData[i].name;
    date.textContent = parsedEventData[i].date;
    venue.textContent = parsedEventData[i].venue;
    img.src = parsedEventData[i].img;
    eventCardContainer.append(card);
};



