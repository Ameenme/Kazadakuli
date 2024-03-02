const readline = require('readline');

// Function to initialize the game board

function initializeBoard() {

    return [

        [' ', ' ', ' '],

        [' ', ' ', ' '],

        [' ', ' ', ' ']

    ];

}

// Function to display the current state of the board

function displayBoard(board) {

    console.log('\n  1 2 3');

    for (let i = 0; i < 3; i++) {

        process.stdout.write(`${i + 1} `);

        for (let j = 0; j < 3; j++) {

            process.stdout.write(board[i][j]);

            if (j < 2) process.stdout.write('|');

        }

        console.log();

        if (i < 2) console.log('  -----');

    }

    console.log();

}

// Function to check if the given move is valid

function isValidMove(board, row, col) {

    return board[row][col] === ' ';

}

// Function to check if the game is over

function isGameOver(board) {

    // Check rows

    for (let i = 0; i < 3; i++) {

        if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {

            return true;

        }

    }

    // Check columns

    for (let j = 0; j < 3; j++) {

        if (board[0][j] !== ' ' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {

            return true;

        }

    }

    // Check diagonals

    if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {

        return true;

    }

    if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {

        return true;

    }

    // Check for tie

    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {

            if (board[i][j] === ' ') {

                return false;

            }

        }

    }

    return true;

}

// Function to get user input for the next move

function getNextMove(player) {

    const rl = readline.createInterface({

        input: process.stdin,

        output: process.stdout

    });

    return new Promise((resolve) => {

        rl.question(`Player ${player}, enter your move (row column): `, (input) => {

            rl.close();

            const [row, col] = input.split(' ').map(val => parseInt(val) - 1);

            resolve({ row, col });

        });

    });

}

// Function to start the game

async function startGame() {

    let currentPlayer = 'X';

    let board = initializeBoard();

    let gameOver = false;

    while (!gameOver) {

        displayBoard(board);

        const { row, col } = await getNextMove(currentPlayer);

        if (isValidMove(board, row, col)) {

            board[row][col] = currentPlayer;

            if (isGameOver(board)) {

                displayBoard(board);

                console.log(`Player ${currentPlayer} wins!`);

                gameOver = true;

            } else if (currentPlayer === 'X') {

                currentPlayer = 'O';

            } else {

                currentPlayer = 'X';

            }

        } else {

            console.log('Invalid move. Try again.');

        }

    }

}

// Start the game

startGame();