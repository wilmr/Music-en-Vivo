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
  document.getElementById("togglePlay").onclick = function () {
    player.togglePlay();
  };
  container.append(player);
};

fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
  method: "GET",
  headers: {
    Authorization: `Bearer BQD80VMxbL_y8O1x82iiMEis61m-OdS0W2hNepUo2i6ASClHxhBqWqs-mcje8zwCymP_EUSIBrDRUmIMPIDTcsrFG99mYaMK18LZwoqbKADUZYSlvTwoXARP8ExYOxfMk81Hip7d1479KWDE9MOTOJNljFlf7t2krYjKEpLZvx8SA0uyXPk1_NsrR3whg-RuEro1YB5Yp298RvND7xM`,
  },
})
  // .then((response) => response.json())
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

player.connect();
