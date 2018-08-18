(function() {
    'use strict';

    var params = {
        scorePlayer: 0,
        scoreComputer: 0,
        computer: 0,
        game: false,
        roundCount: 0,

        history: {
            round: 1,
            movePlayer: [],
            moveComputer: [],
            roundResult: [],
        },

        setNewGame: function(rounds) {
            this.game = true;
            this.scorePlayer = 0;
            this.scoreComputer = 0;
            this.roundCount = rounds;
        },

        randomComputer: function(rowNumber) {
            var n = parseInt(rowNumber, 10);
    
            this.computer = Math.floor(Math.random()*n);
        },
    }

    var result = document.getElementById('result');
    var resultCount = document.getElementById('resultCount');
    var roundButton = document.getElementById('newGame');
    var round = document.getElementById('round');
    var playerChoise = document.querySelectorAll('.player-move');
    var getInfo = document.getElementById('getInfo');
    var closeInfoButton = document.getElementById('closeModal');
    var closeHistoryButton = document.getElementById('closeHistory');
    var sendRounds = document.getElementById('sendRounds');
    var history = document.getElementById('history');
    var i;

    function showInfo() {
        getInfo.style.display = "block";
    };

    function hideInfo() {
        getInfo.style.display = "none";
    };

    function hideHistory() {
        //first remove gameHistory, then add empty div for next history
        
        var gameHistory = document.getElementById('gameHistory');
        var div;
        var historyContainer = document.getElementById('historyContainer');

        gameHistory.remove();
        div = document.createElement("div");
        div.setAttribute('id', 'gameHistory');
        historyContainer.appendChild(div);
        history.style.display = "none";
        params.history.round = 1;
        params.history.movePlayer = [];
        params.history.moveComputer = [];
        params.history.roundResult = [];
    };

    function newGame(event) {
        event.preventDefault();
        var rounds = document.getElementById('gameRounds').value;

        if (rounds > 0) {
            params.setNewGame(rounds);
            round.innerHTML = rounds;
            result.innerHTML = '';
            resultCount.innerHTML = '';
        }

        getInfo.style.display = "none";
    };

    function checkComputer() {
        var pick = 'Nożyce';

        if (params.computer === 0) {
            pick = 'Kamień';
        } else if (params.computer === 1) {
            pick = 'Papier';
        }

        return pick;
    };

    function checkWin() {
        var win = 'Przegrana';

        if (params.scorePlayer > params.scoreComputer) {
            win = 'Wygrana';
        } 
        else if (params.scorePlayer === params.scoreComputer) {
            win = 'Remis';
        }

        return win;
    };

    function roundUpdate() {
        params.roundCount = params.game ? (params.roundCount - 1) : 0;
        round.innerHTML = params.game ? params.roundCount : '';

        if (params.roundCount <= 0 && params.game) {
            params.game = false;
            historyShow();
        }

        params.history.round++;
    };

    function historyUpdate(roundResult, movePlayer, moveComputer) {
        params.history.movePlayer.push(movePlayer);
        params.history.moveComputer.push(moveComputer);
        params.history.roundResult.push(roundResult);
    };
    
    function addElement(text) {
        // create element with given text

        var output = document.createElement("p");
        output.innerHTML = text;

        return output;
    }

    function historyShow() {
        var historyWinner = document.getElementById('historyWinner');
        var historyScore = document.getElementById('historyScore');
        var gameHistory = document.getElementById('gameHistory');

        history.style.display = "block";
        historyWinner.innerHTML = checkWin() + '!!';
        historyScore.innerHTML = 'Wynikiem: ' + params.scorePlayer + ' - ' + params.scoreComputer;

        for (i = 0; i < params.history.round; i++) {
            gameHistory.appendChild(addElement('Runda: ' + (i + 1)));
            gameHistory.appendChild(addElement('Zagrałeś: ' + params.history.movePlayer[i] + ', komputer zagrał: ' + params.history.moveComputer[i]));
            gameHistory.appendChild(addElement('Wynik rundy: ' + params.history.roundResult[i]));
        }

        result.innerHTML = '';
        resultCount.innerHTML = '';
        params.history.round = 1;
    };

    function showRoundResult(roundResult, movePlayer, moveComputer) {
        result.innerHTML = roundResult + ': zagrałeś: ' + movePlayer + ', komputer zagrał: ' + moveComputer + '<br>' + result.innerHTML;
        resultCount.innerHTML = params.scorePlayer + '-' + params.scoreComputer + '<br>' + resultCount.innerHTML;
    };

    function playerMove() {
        var moveComputer;
        var roundResult;

        params.randomComputer(3);
        moveComputer = checkComputer();

        if ((this === stone && params.computer === 0) || (this === paper && params.computer === 1) || (this === scissors && params.computer === 2)) {
            roundResult = 'Remis';
        } else if ((this === stone && params.computer === 2) || (this === paper && params.computer === 0) || (this === scissors && params.computer === 1)) {
            params.scorePlayer++;
            roundResult = 'Wygrana';
        } else {
            params.scoreComputer++;
            roundResult = 'Przegrana';
        }
        
        showRoundResult(roundResult, this.innerHTML, moveComputer);
        params.game ? historyUpdate(roundResult, this.innerHTML, moveComputer) : '';
        roundUpdate();
    };

    roundButton.addEventListener('click', showInfo);
    closeInfoButton.addEventListener('click', hideInfo);
    closeHistoryButton.addEventListener('click', hideHistory);
    sendRounds.addEventListener('submit', newGame);

    for (i = 0; i < playerChoise.length; i++) {
        playerChoise[i].addEventListener('click', playerMove);
    }
})();
