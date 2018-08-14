(function() {
    'use strict';

    var params = {
        winPlayer: 0,
        winKomputer: 0,
        komputer: 0,
        game: false,
        roundCount: 0,

        history: {
            round: 0,
            movePlayer: '',
            moveKomputer: '',
            roundResult: '',
            gameResult: '',
        },

        setNewGame: function(rounds) {
            params.game = true;
            params.winPlayer = 0;
            params.winKomputer = 0;
        },

        randomKomputer: function(rowNumber) {
            var n = parseInt(rowNumber, 10);
    
            this.komputer = Math.floor(Math.random()*n);
        },
    }

    var result = document.getElementById('result');
    var resultCount = document.getElementById('resultCount');
    var roundButton = document.getElementById('newGame');
    var round = document.getElementById('round');
    var playerChoise = document.querySelectorAll('.player-move');
    var getInfo = document.getElementById('getInfo');
    var closeInfo = document.getElementById('closeModal');
    var sendRounds = document.getElementById('sendRounds');
    var i;

    function showInfo() {
        getInfo.style.display = "block";
    };

    function closeInfo() {
        getInfo.style.display = "none";
    };

    function newGame() {
        var rounds = document.getElementById('gameRoudns').value;

        if (rounds) {
            params.roundCount = rounds;
            params.setNewGame(rounds);
            round.innerHTML = rounds;
            result.innerHTML = '';
            resultCount.innerHTML = '';
        }
    };

    function checkKomputer() {
        var pick = 'Nożyce';

        if (params.komputer === 0) {
            pick = 'Kamień';
        } else if (params.komputer === 1) {
            pick = 'Papier';
        }

        return pick;
    };

    function checkWin() {
        var win = 'Przegrana';

        if (params.winPlayer > params.winKomputer) {
            win = 'Wygrana';
        } 
        else if (params.winPlayer === params.winKomputer) {
            win = 'Remis';
        }

        return win;
    };

    function roundUpdate() {
        params.roundCount = params.game ? (params.roundCount - 1) : 0;
        round.innerHTML = params.game ? params.roundCount : '';

        if (params.roundCount === 0 && params.game) {
            params.game = false;
            round.innerHTML = checkWin() + ' wynikiem: ' + params.winPlayer + '-' + params.winKomputer;
        }
    };

    function playerMove(event) {
        params.randomKomputer(3);

        if ((this === stone && params.komputer === 0) || (this === paper && params.komputer === 1) || (this === scissors && params.komputer === 2)) {
            result.innerHTML = 'Remis: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            resultCount.innerHTML = params.winPlayer + '-' + params.winKomputer + '<br>' + resultCount.innerHTML;
        } else if ((this === stone && params.komputer === 2) || (this === paper && params.komputer === 0) || (this === scissors && params.komputer === 1)) {
            result.innerHTML = 'Wygrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            params.winPlayer++;
            resultCount.innerHTML = params.winPlayer + '-' + params.winKomputer + '<br>' + resultCount.innerHTML;
        } else {
            result.innerHTML = 'Przegrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            params.winKomputer++;
            resultCount.innerHTML = params.winPlayer + '-' +params.winKomputer + '<br>' + resultCount.innerHTML;
        }

        roundUpdate();
    };

    roundButton.addEventListener('click', showInfo);
    closeInfo.addEventListener('click', closeInfo);
    sendRounds.addEventListener('click', newGame);

    for (i = 0; i < playerChoise.length; i++) {
        playerChoise[i].addEventListener('click', playerMove);
    }
})();
