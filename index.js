const game_node = document.querySelector('#game');
const play_btn = document.querySelector('#play_btn');
const win_node = document.querySelector('#win');
const loss_node = document.querySelector('#loss');

let patterns = [];
let hasGameStarted = false;
let highlightedPatterns = []
let click_counter = 0;
let win = 0;
let loss = 0;

function buildPattern() {
    let div = document.createElement('div');
    div.style.width = '200px';
    div.style.height = '200px';
    div.style.opacity = 0.5
    return div

}

function assignColor() {

    let bgColorCombination = [
        ['red', 'green', '#ffc107', 'blue'],
        ['green', 'red', 'blue', '#ffc107'],
        ['blue', '#ffc107', 'red', 'green'],
        ['blue', 'red', 'green', '#ffc107'],
        ['red', 'green', 'blue', '#ffc107'],
        ['green', 'red', '#ffc107', 'blue'],
        ['blue', 'red', '#ffc107', 'green']

    ]

    let randomBgColorIndex = Math.floor(Math.random() * bgColorCombination.length)

    patterns.forEach((div, i) => {
        div.style.backgroundColor = bgColorCombination[randomBgColorIndex][i];
        div.setAttribute('id', i)
        game_node.appendChild(div)
    })
}


function initialize() {
    game_node.innerHTML = '';
    play_btn.removeAttribute('disabled');
    patterns = [];
    highlightedPattern = [];
    hasGameStarted = false;
    click_counter = 0

}


function buildGame(e) {

    initialize();

    for (let i = 1; i <= 4; i++) {
        patterns.push(buildPattern());
    }

    assignColor()
    showResult();
}

function showResult() {
    win_node.innerHTML = win;
    loss_node.innerHTML = loss;
}
function onPatternClick(e) {
    let id = this.getAttribute('id')

    if (highlightedPatterns[click_counter].getAttribute('id') === id) {
        click_counter++;
    } else {
        loss++
        return buildGame();
    }
    if (click_counter === 3) {
        win++;
        return buildGame();
    }
}

function wait() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 600)
    })
}
async function startPatternHighlighting() {
    let patternCombination = [
        [0, 1, 2],
        [1, 2, 0],
        [0, 2, 1],
        [2, 1, 0],
        [2, 0, 1]
    ]
    let randomIndex = Math.floor(Math.random() * patternCombination.length)
    for (let v of patternCombination[randomIndex]) {
        patterns[v].style.opacity = 1
        await wait()
        patterns[v].style.opacity = 0.5
        highlightedPatterns.push(patterns[v])

    }


}

function onPlayStarted(e) {
    hasGameStarted = true;
    play_btn.setAttribute('disabled', 1)

    startPatternHighlighting()

    patterns.forEach((div) => {
        div.addEventListener('click', onPatternClick)
    })
}

window.addEventListener('DOMContentLoaded', buildGame);
play_btn.addEventListener('click', onPlayStarted);