/*-------------------------------- Constants --------------------------------*/
const winningArrays = [
  [0, 1, 2, 3], [3, 4, 5, 6], [7, 8, 9, 10], [10, 11, 12, 13], [14, 15, 16, 17], 
  [17, 18, 19, 20], [21, 22, 23, 24], [24, 25, 26, 27], [28, 29, 30, 31], 
  [31, 32, 33, 34], [35, 36, 37, 38], [38, 39, 40, 41], [0, 7, 14, 21], 
  [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24], [4, 11, 18, 25], 
  [5, 12, 19, 26], [6, 13, 20, 27], [14, 21, 28, 35], [15, 22, 29, 36], 
  [16, 23, 30, 37], [17, 24, 31, 38], [18, 25, 32, 39], [19, 26, 33, 40], 
  [20, 27, 34, 41], [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], 
  [17, 25, 33, 41], [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], 
  [20, 26, 32, 38], [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], 
  [13, 19, 25, 31], [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], 
  [10, 18, 26, 34], [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], 
  [3, 11, 19, 27], [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], 
  [6, 12, 18, 24], [36, 37, 38, 39], [37, 38, 39, 40], [29, 30, 31, 32], 
  [30, 31, 32, 33], [22, 23, 24, 25], [23, 24, 25, 26], [15, 16, 17, 18], 
  [16, 17, 18, 19], [8, 9, 10, 11], [9, 10, 11, 12], [1, 2, 3, 4], 
  [2, 3, 4, 5], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], 
  [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
]
// console.log(winningArrays)

const player1 = 1
const player2 = -1
/*-------------------------------- Variables --------------------------------*/
let playerTurn, message, winner, numOfTurns, board, circleColor, circle, status


/*------------------------ Cached Element References ------------------------*/
const resetBtn = document.querySelector('#reset-button')
const boardCircles = document.querySelector('.board')
const messages = document.querySelector('#message')
const circles = document.querySelectorAll('.circle')
const startBtn = document.querySelector('#start-button')



// const result = document.querySelectorAll()
// const startButton = document.querySelectorAll()


/*----------------------------- Event Listeners -----------------------------*/

// boardCircles.forEach(circle => circle.addEventListener('click', boardClick))

resetBtn.addEventListener('click', init)
boardCircles.addEventListener('click', handleClick)

// startButton.addEventListener('click' ())

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

  playerTurn = 1
  numOfTurns = 0
  winner = 0

  messages.textContent = "Welcome to Connect Four! Click the button to start the game"
  resetBtn.setAttribute('hidden', true)
  startBtn.removeAttribute('hidden')

  getWinner()
  render()
  // getWinner()
  

}

function handleClick (event){
  const id = event.target.id.replace('cir','')
  if (board[id] === null){
    board[id] = playerTurn
    playerTurn *= -1
    numOfTurns += 1
startBtn.setAttribute('hidden', true)
resetBtn.removeAttribute('hidden')
console.log(event.target.id)
  getWinner()
  render()
}
}
// function clickingBoard(){

// }

function getWinner(){
  for (let i = 0; i < winningArrays.length; i++){
    const a = winningArrays[i][0]
    const b = winningArrays[i][1]
    const c = winningArrays[i][2]
    const d = winningArrays[i][3]
      if(board[a]+board[b]+board[c]+board[d] === 4){
        message = 'Player 1 wins!'
      }
      else if(board[a]+board[b]+board[c]+board[d] === -4){
        message = 'Player 2 wins!'
      }

    if (numOfTurns === 42 && winner === null){
        message = "Oh tootles its a tie!"
    } 
  }
}

function render() {
    board.forEach((cir, idx) =>{
      if (cir === 1) {
        circleColor = 'pink'
      } else if (cir === -1) {
        circleColor = 'cyan'
      } else if (cir === null){
        circleColor = 'white'
      }
      circles[idx].style.backgroundColor = circleColor
    })
    if (playerTurn === 1 && !winner){
      message = "Player 1 turn"
    } else if (playerTurn === -1 && !winner){
      message = "Player 2 turn"
    }
    
      messages.textContent = message
      getWinner()
      console.log("render invoked")
      
}