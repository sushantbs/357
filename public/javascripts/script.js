// @ts-check
// import * as io from "/node_modules/socket.io-client/dist/socket.io.js";

window.onload = function() {
  let registerButton = document.getElementById("registerbutton");
  let playButton = document.getElementById("playbutton");
  let leaveButton = document.getElementById("leavebutton");
  let forfeitButton = document.getElementById("forfeitbutton");

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
          body: JSON.stringify({ playerName })
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
      let response = await fetch("/leave", {
        method: "post",
        credentials: "same-origin"
      });

      let responseJson = await response.json();
      window.location.reload();
    });
  }

  if (forfeitButton) {
    forfeitButton.addEventListener("click", async () => {});
    setupGameCommunication();
  }
};

async function setupGameCommunication() {
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
    establishSocketConnection();
  }
}

async function establishSocketConnection() {
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
    let socket = io("http://localhost:3000");
    socket.on("turn", data => {
      console.log(data);
    });
    socket.on("start", data => {
      console.log(`message: ${data}`);
      new Game(data);
    });
  }
}

class Game {
  constructor(initialState = {}) {
    this.state = initialState;
    this.initializeGameLogic();
  }

  initializeGameLogic() {
    debugger;
    ["row-one", "row-two", "row-three"].forEach((row, i) =>
      document
        .querySelectorAll(`.${row} span`)
        .forEach((spanEle, j) =>
          spanEle.addEventListener("click", e => this.addTileToTurn(e, i, j))
        )
    );

    //.addEventListener("click", e => this.addTileToTurn(e));
  }

  addTileToTurn(e, x, y) {
    let element = e.currentTarget;
    state.debugger;
  }

  renderer() {}
}
