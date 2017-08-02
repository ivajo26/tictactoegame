import React, { Component } from 'react';
import './App.css';

function GamerX() {
  return (
    <svg aria-label="X" role="img" viewBox="0 0 128 128" visibility="visible">
      <path d="M16,16L112,112" stroke="rgb(84, 84, 84)" strokeDasharray="135.764" strokeDashoffset="0" strokeWidth=".2em"></path>
      <path d="M112,16L16,112" stroke="rgb(84, 84, 84)" strokeDasharray="135.764" strokeDashoffset="0" strokeWidth=".2em"></path>
    </svg>
  );
}

function GamerO() {
  return (
    <svg aria-label="O" role="img" viewBox="0 0 128 128" visibility="visible">
      <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16" stroke="rgb(242, 235, 211)" strokeDasharray="301.635" strokeDashoffset="0" strokeWidth=".2em" fill="transparent"></path>
    </svg>
  );
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      areasGame: {},
      winCombinations: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ],
      turn: true,
      winner: undefined,
      draw: false,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRandomPlay = this.onRandomPlay.bind(this);
  }

  onSelect(area) {
    function win(areasGame, winCombinations) {
      for (let combination in winCombinations) {
        let gamer;
        let winner = false;
        for (let a in winCombinations[combination]) {
          if (areasGame[`area${winCombinations[combination][a]}`] !== undefined) {
            if (gamer === undefined) {
              gamer = areasGame[`area${winCombinations[combination][a]}`];
            } else if (gamer === areasGame[`area${winCombinations[combination][a]}`]) {
              winner = true;
            } else {
              winner = false;
              break;
            }
          } else {
            winner = false;
            break;
          }
        }
        if (winner === true) return gamer;
      }
      return undefined;
    }
    function checkDraw(areasGame) {
      for(let area = 1; area <= 9; area++){
         if (areasGame[`area${area}`] === undefined){
           return false;
         }
      }
      return true;
    }
    let turn = this.state.turn;
    let areasGame = this.state.areasGame;
    let winCombinations = this.state.winCombinations;
    if (!areasGame.hasOwnProperty(`area${area}`)){
      areasGame[`area${area}`]= turn;
      turn= !turn;
      let winner = win(areasGame, winCombinations);
      let draw = checkDraw(areasGame);
      areasGame = (winner !== undefined || draw) ? {} : areasGame;
      this.setState({turn, areasGame, winner, draw});
    }
  }

  onRandomPlay() {
    let areasGame = this.state.areasGame;
    let freeArea = [];
    for (let area = 1; area <= 9; area++){
      if (areasGame[`area${area}`] === undefined){
        freeArea.push(area);
      }
    }
    let randomSelect = Math.floor((Math.random() * freeArea.length)+1);
    this.onSelect(randomSelect);
  }

  render(){
    let fillArea = (area) => {
      if (area !== undefined){
        return area ? (<GamerX/>) : (<GamerO/>);
      }
      return (" ");
    };
    return (
      <div className="App">
          <div>
            <button onClick={this.onRandomPlay} >Random Play</button>
            <button onClick={this.onAIPlay} >AI Play</button>
          </div>
          <div className="winner">
            { this.state.winner !== undefined && (<h1>The winner is</h1>) }
            { (this.state.draw && this.state.winner === undefined) && (<h1>Is a draw</h1>) }
            { fillArea(this.state.winner)}
          </div>
          <div className="BoardGame">
            <div className="areaGame" onClick={()=>{this.onSelect(1)}}>{ fillArea(this.state.areasGame.area1) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(2)}}>{ fillArea(this.state.areasGame.area2) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(3)}}>{ fillArea(this.state.areasGame.area3) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(4)}}>{ fillArea(this.state.areasGame.area4) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(5)}}>{ fillArea(this.state.areasGame.area5) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(6)}}>{ fillArea(this.state.areasGame.area6) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(7)}}>{ fillArea(this.state.areasGame.area7) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(8)}}>{ fillArea(this.state.areasGame.area8) }</div>
            <div className="areaGame" onClick={()=>{this.onSelect(9)}}>{ fillArea(this.state.areasGame.area9) }</div>
          </div>
      </div>
    );
  }
}

export default App;
