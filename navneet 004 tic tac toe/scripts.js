
let turnCount = 0;


function startGame() {
    
    turnCount = 0;

    
    for(let i = 1; i <= 9; i += 1) {
        clearBox(i);

        
        document.getElementById('refreshBtn').style.visibility = 'hidden'; 
    }

    
    document.turn = 'X';
    
    document.winner = null;
    
    document.cat = false;

    
    setTurnMessage(document.turn + '\'s start first!');
    
    document.getElementById('turnMessage').style.color = '#6c757d';
}


function setTurnMessage(message) {
    
    document.getElementById('turnMessage').innerText = message;
}


function switchTurn() {
    
    if (checkWinner(document.turn) && document.cat === false) {
        
        document.winner = document.turn;
        
        setTurnMessage('Congratulations ' + document.turn + '\'s, you win!');
        
        document.getElementById('turnMessage').style.color = '#28a745';

       
        document.getElementById('refreshBtn').style.visibility = 'visible';
   
    } else if (document.cat === true) {
        
        setTurnMessage('Cat! Play again?');
        
        document.getElementById('turnMessage').style.color = '#16a2b8';

      
        document.getElementById('refreshBtn').style.visibility = 'visible';
    }

     
    else if (document.turn == 'X') {
       
        document.turn = 'O';
        
        setTurnMessage('It is ' + document.turn + '\'s turn');
       
        document.getElementById('turnMessage').style.color = '#0586ff';
    
    } else {
       
        document.turn = 'X';
        setTurnMessage('It is ' + document.turn + '\'s turn.');

        document.getElementById('turnMessage').style.color = '#de3241'; 
    }
}


function nextMove(square) {
    
    if (document.winner != null) {
        
        setTurnMessage(document.turn + '\'s already won!');
        
        document.getElementById('turnMessage').style.color = '#ffc904';       
  
    } else if (square.innerText == '') {
        
        square.innerText = document.turn;

        
        switchTurn();
   
    } else {
        
        setTurnMessage('Oops, pick a different square!');
        
        document.getElementById('turnMessage').style.color = '#ffc904';
    }
}


function checkWinner(move) {
    
    turnCount += 1; 

    
    let result = false;

    
    if (
       
        checkRow(1, 2, 3, move) ||
        
        checkRow(4, 5, 6, move) ||
        
        checkRow(7, 8, 9, move) ||
        
        checkRow(1, 4, 7, move) ||
        
        checkRow(2, 5, 8, move) ||
        
        checkRow(3, 6, 9, move) ||
        
        checkRow(1, 5, 9, move) ||
        
        checkRow(3, 5, 7, move)) {
        
        result = true;
    } else if(turnCount > 8 && result === false) {
        document.cat = true;
    }
    return result;
}


function checkRow(a, b, c, move) {
    
    let result = false;

    
    if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
        
        result = true;
    }
    return result;
}


function getBox(number) {
    return document.getElementById('square' + number).innerText;
}


function clearBox(number) {
    document.getElementById('square' + number).innerText = ''; 
}