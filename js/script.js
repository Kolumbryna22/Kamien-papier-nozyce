(function() {
    'use strict';

    var result = document.getElementById('result');
    var resultCount = document.getElementById('resultCount');
    var roundButton = document.getElementById('newGame');
    var round = document.getElementById('round');
    var playerChoise = document.querySelectorAll('.player-move');
    var roundCount;
    var game = false;
    var komputer;
    var winPlayer = 0;
    var winKomputer = 0;
    var i;

    var newGame = function() {
        roundCount = window.prompt("Wpisz liczbę rund, którą chcesz rozegrać");
        game = true;
        round.innerHTML = roundCount;
        winPlayer = 0;
        winKomputer = 0;
        result.innerHTML = '';
        resultCount.innerHTML = '';
    };

    var randomNumber = function(rowNumber) {
        var n = parseInt(rowNumber, 10);

        return Math.floor(Math.random()*n);
    };

    var checkKomputer = function() {
        var pick = 'Nożyce';

        if (komputer === 0) {
            pick = 'Kamień';
        } else if (komputer === 1) {
            pick = 'Papier';
        }

        return pick;
    };

    var checkWin = function() {
        var win = 'Przegrana';

        if (winPlayer > winKomputer) {
            win = 'Wygrana';
        } 
        else if (winPlayer === winKomputer) {
            win = 'Remis';
        }

        return win;
    };

    var roundUpdate = function() {
        roundCount = game ? (roundCount - 1) : 0;
        round.innerHTML = game ? roundCount : '';

        if (roundCount === 0 && game === true) {
            game = false;
            round.innerHTML = checkWin() + ' wynikiem: ' + winPlayer + '-' + winKomputer;
        }
    };

    function parseToPolish(word) {
        var polishWord = 'Papier';

        if (word == 'stone') {
            polishWord = 'Kamień';
        }
        else if (word == 'scissors') {
            polishWord = 'Nożyce';
        }

        return polishWord;
    };

    var playerMove = function(choise) {
        komputer = randomNumber(3);

        if ((choise === 'stone' && komputer === 0) || (choise === 'paper' && komputer === 1) || (choise === 'scissors' && komputer === 2)) {
            result.innerHTML = 'Remis: zagrałeś: ' + parseToPolish(choise) + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        } else if (('choise' === 'stone' && komputer === 2) || (choise === 'paper' && komputer === 0) || (choise === 'scissors' && komputer === 1)) {
            result.innerHTML = 'Wygrana: zagrałeś: ' + parseToPolish(choise) + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            winPlayer++;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        } else {
            result.innerHTML = 'Przegrana: zagrałeś: ' + parseToPolish(choise) + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            winKomputer++;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        }

        roundUpdate();
    };

    roundButton.addEventListener('click', newGame);

    for (i = 0; i < playerChoise.length; i++) {
        playerChoise[i].addEventListener('click', playerMove(playerChoise[i].getAttribute('data-move')));
    }
})();
