import React, { Component } from 'react';

import Cell from './Cell/';
import styles from './styles.module.css';

class Game extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  changeTurn = () => {
    const { turn } = this.state;
    const newTurn = turn === 'X' ? 'O' : 'X';

    this.setState({
      turn: newTurn,
    })
  }

  checkWinner = () => {
    const { cells, turn } = this.state;
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winningLines.forEach(line => {
      if (cells[line[0]].value !== null &&
        cells[line[0]].value === cells[line[1]].value &&
        cells[line[0]].value === cells[line[2]].value) {

        this.setState({
          winner: turn,
        });
        return;
      }
    });

    this.changeTurn();
  }

  chunkArray = (myArray, chunkSize) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  getInitialState = () => {
    return {
      cells: [
        { id: 0, value: null },
        { id: 1, value: null },
        { id: 2, value: null },
        { id: 3, value: null },
        { id: 4, value: null },
        { id: 5, value: null },
        { id: 6, value: null },
        { id: 7, value: null },
        { id: 8, value: null },
      ],

      turn: 'X',
      winner: null,
      steps: 0,
    }
  }

  handleClick = (e) => {
    const {
      cells,
      steps,
      turn,
      winner
    } = this.state;
    const { id } = e.target;

    const currentIndex = cells.findIndex(value => parseInt(id) === value.id);

    if (cells[currentIndex].value !== null || winner !== null || steps === 9) {
      return;
    }

    cells[currentIndex].value = turn;

    this.setState({
      cells,
      steps: steps + 1,
    }, this.checkWinner(turn));
  }

  handleReset = () => {
    const initialState = this.getInitialState();

    this.setState({
      ...initialState,
    });
  }

  render() {
    const {
      steps,
      turn,
      cells,
      winner,
    } = this.state;

    const chunks = this.chunkArray(cells, 3);

    return (
      <div className={ styles.container }>
        <button
          className={ styles.reset }
          onClick={ this.handleReset }>
          Reset
        </button>
        { chunks.map(line =>
          <div className={ styles.line } key={ chunks.indexOf(line) }>
            { line.map(({ id, value }) =>
              <Cell
                id={ id }
                key={ id }
                onClick={ this.handleClick }
                value={ value }
              />
            ) }
          </div>
        ) }
        { !winner ?
          <div className={ styles.info }>Turn: { turn } </div>
          :
          <div className={ styles.info }>{ winner } Wins!</div>
        }
        { !winner && steps === 9 &&
          <div className={ styles.info }>Draw</div>
        }
      </div>
    );
  }
}

export default Game;
