// @ts-check
// import * as io from "/node_modules/socket.io-client/dist/socket.io.js";

window.onload = function() {
  let registerButton = document.getElementById("registerbutton");
  let playButton = document.getElementById("playbutton");
  let leaveButton = document.getElementById("leavebutton");

  if (registerButton) {
    registerButton.addEventListener("click", async () => {
      let playerName = document.getElementById("playername").value;

      if (playerName) {
        let response = await fetch("/register", {
          method: "post",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          credentials: "same-origin",
          body: JSON.stringify({ name: playerName })
        });

        let responseJson = await response.json();
        responseJson.success && window.location.reload();
      } else {
        alert("Please enter your name");
      }
    });
  }

  if (playButton) {
    playButton.addEventListener("click", async () => {
      let response = await fetch("/validate", {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        credentials: "same-origin"
      });

      let responseJson = await response.json();

      if (responseJson.allowConnection) {
        response = await fetch("/play", {
          method: "post",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          credentials: "same-origin"
        });

        let responseJson = await response.json();

        if (responseJson.gameId) {
          window.location.reload();
        }
      }
    });
  }

  if (leaveButton) {
    leaveButton.addEventListener("click", async () => {
      try {
        await fetch("/leave", {
          method: "post",
          credentials: "same-origin"
        });

        // let responseJson = await response.json();
        window.location.reload();
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  }
};
