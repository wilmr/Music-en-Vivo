var container = document.querySelector("#music-container");

window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    "BQD80VMxbL_y8O1x82iiMEis61m-OdS0W2hNepUo2i6ASClHxhBqWqs-mcje8zwCymP_EUSIBrDRUmIMPIDTcsrFG99mYaMK18LZwoqbKADUZYSlvTwoXARP8ExYOxfMk81Hip7d1479KWDE9MOTOJNljFlf7t2krYjKEpLZvx8SA0uyXPk1_NsrR3whg-RuEro1YB5Yp298RvND7xM";
  const player = new Spotify.Player({
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });
  container.append(player);
};

fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
  method: "GET",
  headers: {
    Authorization: `Bearer BQD80VMxbL_y8O1x82iiMEis61m-OdS0W2hNepUo2i6ASClHxhBqWqs-mcje8zwCymP_EUSIBrDRUmIMPIDTcsrFG99mYaMK18LZwoqbKADUZYSlvTwoXARP8ExYOxfMk81Hip7d1479KWDE9MOTOJNljFlf7t2krYjKEpLZvx8SA0uyXPk1_NsrR3whg-RuEro1YB5Yp298RvND7xM`,
  },
})
  // .then((response) =>  response.json())
  .then(function (response) {
    return response.json();
  })
  .then(({ beats }) => {
    beats.forEach((beat, index) => {
      console.log(`Beat ${index} starts at ${beat.start}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Ready
player.addListener("ready", ({ device_id }) => {
  console.log("Ready with Device ID", device_id);
});

// Not Ready
player.addListener("not_ready", ({ device_id }) => {
  console.log("Device ID has gone offline", device_id);
});

player.addListener("initialization_error", ({ message }) => {
  console.error(message);
});

player.addListener("authentication_error", ({ message }) => {
  console.error(message);
});

player.addListener("account_error", ({ message }) => {
  console.error(message);
});

player.connect();
