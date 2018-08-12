// @ts-check
// import * as io from "/node_modules/socket.io-client/dist/socket.io.js";

window.onload = function() {
  let registerButton = document.getElementById("registerbutton");
  let playButton = document.getElementById("playbutton");
  let leaveButton = document.getElementById("leavebutton");
  let connectionInProgress = false;

  if (registerButton) {
    registerButton.addEventListener("click", async () => {
      if (connectionInProgress) {
        return;
      }

      let name = document.getElementById("playername").value;

      if (name) {
        connectionInProgress = true;

        let response = await fetch("/api/register", {
          method: "post",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          credentials: "same-origin",
          body: JSON.stringify({ name })
        });

        connectionInProgress = false;
        let responseJson = await response.json();
        responseJson.success && window.location.reload();
      } else {
        alert("Please enter your name");
      }
    });
  }

  if (playButton) {
    playButton.addEventListener("click", async e => {
      try {
        if (connectionInProgress) {
          return;
        }

        connectionInProgress = true;
        let response = await fetch("/api/validate", {
          method: "post",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          credentials: "same-origin"
        });

        let responseJson = await response.json();
        connectionInProgress = false;
        if (responseJson.allowConnection) {
          response = await fetch("/api/play", {
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
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  }

  if (leaveButton) {
    leaveButton.addEventListener("click", async () => {
      try {
        if (connectionInProgress) {
          return;
        }

        connectionInProgress = true;
        await fetch("/api/leave", {
          method: "post",
          credentials: "same-origin"
        });
        connectionInProgress = false;

        // let responseJson = await response.json();
        window.location.reload();
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  }
};
