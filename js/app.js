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


/*-------------------------------- Variables --------------------------------*/
let playerTurn, winner, numOfTurns, board, circleColor, player1, player2


/*------------------------ Cached Element References ------------------------*/
const resetBtn = document.querySelector('#reset-button')
const boardCircles = document.querySelector('.board')
const messages = document.querySelector('#message')
const circles = document.querySelectorAll('.circle')
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")


/*----------------------------- Event Listeners -----------------------------*/

resetBtn.addEventListener('click', init)
boardCircles.addEventListener('click', handleClick)
lightDarkBtn.addEventListener("click", toggleLightDark)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, 
    null, null, null, null, null, 
    null, null, null, null, null, 
    null, null, null, null, null, 
    null, null, null, null, null,
    null, null, null, null, null, 
    null, null, null, null, null,
    null, null, null, null, null, 
    null, null, null]

  playerTurn = 1
  numOfTurns = 0
  winner = 0

  messages.textContent = "Welcome to Connect Four!"
  resetBtn.setAttribute('hidden', true)
  render()
  
}

function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}
checkDarkPref()

function handleClick (event){
  let id = parseInt(event.target.id.replace('cir',''))
  const circleIdx = checkPlacement(id)
  board[circleIdx] = playerTurn
  
  console.log(board.length)
  console.log(id)
  playerTurn *= -1
  
  numOfTurns += 1
  // if (board[id] === null){
  //   board[id] = playerTurn
  //   playerTurn *= -1
  //   numOfTurns += 1
  // }
  if (playerTurn === 1 && !winner){
      messages.textContent = "Player 1 turn"
    } else if (playerTurn === -1 && !winner){
      messages.textContent = "Player 2 turn"
    }
resetBtn.removeAttribute('hidden')
console.log(event.target.id)
  getWinner()
  render()
}

function checkPlacement(idx){
  for(let i = idx + 35; i <= 41 && i>= 0; i-=7){
    if(board[i] === null){
      console.log(idx+35)
      return i
    }
  }
}

function getWinner(){
  for (let i = 0; i < winningArrays.length; i++){
    const a = winningArrays[i][0]
    const b = winningArrays[i][1]
    const c = winningArrays[i][2]
    const d = winningArrays[i][3]
      if(board[a]+board[b]+board[c]+board[d] === 4){
        messages.textContent = 'Player 1 wins!'
        winner = 'pink'
        confetti.start(4000)
        
      }
      else if(board[a]+board[b]+board[c]+board[d] === -4){
        messages.textContent = 'Player 2 wins!'
        winner = 'orange'
        confetti.start(4000)
        
        
      }

    if (numOfTurns === 42 && winner === null){
        messages = "Oh tootles its a tie!"
        console.log('tie')
    } 
  }
}

function render() {
    board.forEach((cir, idx) =>{
      if (cir === 1) {
        circleColor = 'pink'
      } else if (cir === -1) {
        circleColor = 'orange'
      } else if (cir === null){
        circleColor = 'white'
      }
      circles[idx].style.backgroundColor = circleColor
    })
      getWinner()
      console.log("render invoked")
}