var BOARD_WIDTH = 7
var BOARD_HEIGHT = BOARD_WIDTH

var crel = document.createElement.bind(document)

var state = {}
var $board, $tds

var emptyBoard = function emptyBoard () {
  var result = []
  for (var row = 0; row < BOARD_HEIGHT; row++) {
    result.push(Array(BOARD_WIDTH))
  }
  return result
}

var handleBoardClick = function (event) {
  var $td = event.target
  if ($td.tagName !== 'TD') { return }

  var row = parseInt($td.dataset.row, 10)
  var col = parseInt($td.dataset.col, 10)

  if (state.board[row][col] !== undefined) { return }
  for (var y = row + 1; y < BOARD_HEIGHT; y++) {
    if (state.board[y][col] === undefined) { return }
  }

  state.board[row][col] = state.currentTurn

  setState({
    board: state.board,
    currentTurn: !state.currentTurn
  })
}

var initialRender = (function () {
  var hasRendered = false

  return function initialRender () {
    if (hasRendered) { return }
    hasRendered = true

    $board = crel('table')
    $board.className = 'board'

    $tds = emptyBoard()

    for (var row = 0; row < BOARD_HEIGHT; row++) {
      var $tr = crel('tr')
      for (var col = 0; col < BOARD_WIDTH; col++) {
        var $td = crel('td')
        $td.dataset.row = row
        $td.dataset.col = col

        var $circle = crel('div')
        $circle.className = 'circle'
        $td.appendChild($circle)

        $tr.appendChild($td)

        $tds[row][col] = $td
      }
      $board.appendChild($tr)
    }

    $board.addEventListener('click', handleBoardClick, false)

    document.body.appendChild($board)
  }
})()

var render = function render () {
  initialRender()

  for (var row = 0; row < BOARD_HEIGHT; row++) {
    for (var col = 0; col < BOARD_WIDTH; col++) {
      var $td = $tds[row][col]

      $td.classList.toggle('placed', typeof state.board[row][col] === 'boolean')
      $td.classList.toggle('player-true', state.board[row][col] === true)
      $td.classList.toggle('player-false', state.board[row][col] === false)
    }
  }
}

var setState = function setState (s) {
  for (var key in s) {
    if (s.hasOwnProperty(key)) {
      state[key] = s[key]
    }
  }
  render()
}

setState({
  board: emptyBoard(),
  currentTurn: false
})
