var BOARD_WIDTH = 5
var BOARD_HEIGHT = 5

var crel = document.createElement.bind(document)

var state = {}
var $board

var emptyBoard = function emptyBoard () {
  var result = []
  for (var row = 0; row < BOARD_HEIGHT; row++) {
    result.push(Array(BOARD_WIDTH))
  }
  return result
}

var initialRender = (function () {
  var hasRendered = false

  return function initialRender () {
    if (hasRendered) { return }
    hasRendered = true

    $board = crel('table')
    $board.className = 'board'

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
      }
      $board.appendChild($tr)
    }

    document.body.appendChild($board)
  }
})()

var render = function render () {
  initialRender()
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
  board: emptyBoard,
  currentTurn: false
})
