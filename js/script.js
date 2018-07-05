(function() {
    'use strict';

    var kamien = document.getElementById('kamien');
    var papier = document.getElementById('papier');
    var nozyce = document.getElementById('nozyce');
    var wynik = document.getElementById('wynik');
    var result = document.getElementById('result');
    var roundButton = document.getElementById('newGame');
    var round = document.getElementById('round');
    var rundCount;
    var game = false;
    var komputer;
    var winPlayer = 0;
    var winKomputer = 0;

    var newGame = function() {
        rundCount = window.prompt("Wpisz liczbę rund, którą chcesz rozegrać");
        game = true;
        round.innerHTML = rundCount;
        winPlayer = 0;
        winKomputer = 0;
        result.innerHTML = '';
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
        if(winPlayer > winKomputer) {
            return 'Wygrana';
        } 
        else if(winPlayer === winKomputer) {
            return 'Remis';
        } 
        else {
            return 'Przegrana';
        }
    };

    var playerMove = function(event) {
        komputer = randomNumber(3);

        if((this === kamien && komputer === 0) || (this === papier && komputer === 1) || (this === nozyce && komputer === 2)) {
            wynik.innerHTML = 'Remis: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            result.innerHTML = winPlayer + '-' + winKomputer + '<br>' + result.innerHTML;
        }
        else if((this === kamien && komputer === 2) || (this === papier && komputer === 0) || (this === nozyce && komputer === 1)) {
            wynik.innerHTML = 'Wygrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            winPlayer++;
            result.innerHTML = winPlayer + '-' + winKomputer + '<br>' + result.innerHTML;
        } else {
            wynik.innerHTML = 'Przegrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            winKomputer++;
            result.innerHTML = winPlayer + '-' + winKomputer + '<br>' + result.innerHTML;
        }

        rundCount = game ? (rundCount - 1) : 0;
        round.innerHTML = game ? rundCount : '';

        if(rundCount === 0 && game === true) {
            game = false;
            round.innerHTML = checkWin() + ' wynikiem: ' + winPlayer + '-' + winKomputer;
        }

    };

    kamien.addEventListener('click', playerMove);
    papier.addEventListener('click', playerMove);
    nozyce.addEventListener('click', playerMove);
    roundButton.addEventListener('click', newGame);
})();