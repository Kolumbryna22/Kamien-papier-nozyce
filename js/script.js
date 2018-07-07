(function() {
    'use strict';

    var stone = document.getElementById('stone');
    var paper = document.getElementById('paper');
    var scissors = document.getElementById('scissors');
    var result = document.getElementById('result');
    var resultCount = document.getElementById('resultCount');
    var roundButton = document.getElementById('newGame');
    var round = document.getElementById('round');
    var roundCount;
    var game = false;
    var komputer;
    var winPlayer = 0;
    var winKomputer = 0;

    var newGame = function() {
        roundCount = window.prompt("Wpisz liczbę rund, którą chcesz rozegrać");
        game = true;
        round.innerHTML = roundCount;
        winPlayer = 0;
        winKomputer = 0;
        resultCount.innerHTML = '';
    };

    var randomNumber = function(rowNumber) {
        var n = parseInt(rowNumber, 10);
        return Math.floor(Math.random()*x);
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

        if(winPlayer > winKomputer) {
            win = 'Wygrana';
        } 
        else if(winPlayer === winKomputer) {
            win = 'Remis';
        }

        return win;
    };

    var roundUpdate = function() {
        roundCount = game ? (roundCount - 1) : 0;
        round.innerHTML = game ? roundCount : '';

        if(roundCount === 0 && game === true) {
            game = false;
            round.innerHTML = checkWin() + ' wynikiem: ' + winPlayer + '-' + winKomputer;
        }
    };

    var playerMove = function(event) {
        komputer = randomNumber(3);

        if((this === stone && komputer === 0) || (this === paper && komputer === 1) || (this === scissors && komputer === 2)) {
            result.innerHTML = 'Remis: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        } else if((this === stone && komputer === 2) || (this === paper && komputer === 0) || (this === scissors && komputer === 1)) {
            result.innerHTML = 'Wygrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            winPlayer++;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        } else {
            result.innerHTML = 'Przegrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + result.innerHTML;
            winKomputer++;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        }

        roundUpdate();
    };

    stone.addEventListener('click', playerMove);
    paper.addEventListener('click', playerMove);
    scissors.addEventListener('click', playerMove);
    roundButton.addEventListener('click', newGame);
})();