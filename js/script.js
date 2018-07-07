(function() {
    'use strict';

    var kamien = document.getElementById('kamien');
    var papier = document.getElementById('papier');
    var nozyce = document.getElementById('nozyce');
    var wynik = document.getElementById('wynik');
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

    var randomNumber = function(n) {
        var n = parseInt(n, 10);
        return Math.floor(Math.random()*n);
    };

    var checkKomputer = function() {
        var pick;

        if (komputer === 0) {
            pick = 'Kamień';
        } else if (komputer === 1) {
            pick = 'Papier';
        } else {
            pick = 'Nożyce';
        }

        return pick;
    };

    var checkWin = function() {
        var win;

        if(winPlayer > winKomputer) {
            win = 'Wygrana';
        } 
        else if(winPlayer === winKomputer) {
            win = 'Remis';
        } 
        else {
            win = 'Przegrana';
        }

        return win;
    };

    var playerMove = function(event) {
        komputer = randomNumber(3);

        if((this === kamien && komputer === 0) || (this === papier && komputer === 1) || (this === nozyce && komputer === 2)) {
            wynik.innerHTML = 'Remis: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        }
        else if((this === kamien && komputer === 2) || (this === papier && komputer === 0) || (this === nozyce && komputer === 1)) {
            wynik.innerHTML = 'Wygrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            winPlayer++;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        } else {
            wynik.innerHTML = 'Przegrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            winKomputer++;
            resultCount.innerHTML = winPlayer + '-' + winKomputer + '<br>' + resultCount.innerHTML;
        }

        roundCount = game ? (roundCount - 1) : 0;
        round.innerHTML = game ? roundCount : '';

        if(roundCount === 0 && game === true) {
            game = false;
            round.innerHTML = checkWin() + ' wynikiem: ' + winPlayer + '-' + winKomputer;
        }

    };

    kamien.addEventListener('click', playerMove);
    papier.addEventListener('click', playerMove);
    nozyce.addEventListener('click', playerMove);
    roundButton.addEventListener('click', newGame);
})();