import "./style";
import { Component } from "preact";

export default class App extends Component {
  state = {
    turn: false,
    tiles: [3, 5, 7],
    played: false,
    selectedColumn: -1,
    selectedTiles: []
  };

  componentDidMount() {}

  renderTiles(tileCount, columnIndex, enabled) {
    let { selectedColumn } = this.state;
    return (
      <div
        className={`tileColumn ${
          selectedColumn === columnIndex ? "selected" : ""
        }`}
      >
        {Array.from(Array(tileCount)).map((ignore, tileNumber) => {
          return (
            <span
              className={
                selectedColumn === columnIndex &&
                this.state.selectedTiles.includes(tileNumber)
                  ? "selected"
                  : ""
              }
              style={
                this.state.turnPlayed &&
                selectedColumn === columnIndex &&
                this.state.selectedTiles.includes(tileNumber)
                  ? { opacity: "0" }
                  : null
              }
              onClick={
                enabled
                  ? e => this.tileSelected(tileNumber, columnIndex, e)
                  : null
              }
            />
          );
        })}
      </div>
    );
  }

  tileSelected(rowIndex, columnIndex, e) {
    if (
      columnIndex === this.state.selectedColumn &&
      this.state.selectedTiles.includes(rowIndex)
    ) {
      let selectedTiles = this.state.selectedTiles.filter(
        tileNumber => tileNumber !== rowIndex
      );
      this.setState({
        selectedTiles
      });

      if (!selectedTiles.length) {
        this.setState({
          selectedColumn: -1
        });
      }
    } else {
      this.setState({
        selectedColumn: columnIndex,
        selectedTiles: [...this.state.selectedTiles, rowIndex]
      });
    }
  }

  renderButtons() {
    return (
      <div class="buttons">
        <input
          type="button"
          value="Submit"
          disabled={!this.state.selectedTiles.length}
          onClick={e => this.turnPlayed(e)}
        />
        <input type="button" value="Clear" onClick={e => this.turnReset()} />
      </div>
    );
  }

  turnPlayed() {
    let { tiles, selectedColumn, selectedTiles } = this.state;
    tiles[selectedColumn] -= selectedTiles.length;
    this.setState({
      turnPlayed: true,
      tiles: [...tiles]
    });
    this.turnReset();
  }

  turnReset() {
    this.setState({
      turnPlayed: false,
      selectedColumn: -1,
      selectedTiles: []
    });
  }

  render() {
    let { turn, tiles, played, selectedColumn, selectedTiles } = this.state;

    return (
      <div className="gamecontainer">
        {tiles.map((tileCount, index) => {
          if (selectedColumn === -1 || selectedColumn === index) {
            return this.renderTiles(tileCount, index, true);
          } else {
            return this.renderTiles(tileCount, index, false);
          }
        })}
        {this.renderButtons()}
      </div>
    );
  }
}
