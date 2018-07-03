(function() {
    'use strict';

    var kamien = document.getElementById('kamien');
    var papier = document.getElementById('papier');
    var nozyce = document.getElementById('nozyce');
    var wynik = document.getElementById('wynik');
    var result = document.getElementById('result');
    var roundButton = document.getElementById('newGame');
    var round = document.getElementById('round');
    var liczbaRund;
    var game = false;
    var komputer;
    var wygranaGracz = 0;
    var wygranaKomputer = 0;
    var wygrana;

    var newGame = function() {
        liczbaRund = window.prompt("Wpisz liczbę rund, którą chcesz rozegrać");
        game = true;
        round.innerHTML = liczbaRund;
        wygranaGracz = 0;
        wygranaKomputer = 0;
        result.innerHTML = '';
    };

    var randomNumber = function(n) {
        var n = parseInt(n, 10);
        return Math.floor(Math.random()*n);
    };

    var checkKomputer = function() {
        if (komputer == 0) {
            return 'Kamień';
        } else if (komputer == 1) {
            return 'Papier';
        } else {
            return 'Nożyce';
        }
    };

    var checkWygrana = function() {
        if(wygranaGracz > wygranaKomputer) {
            return 'Wygrana';
        } 
        else if(wygranaGracz == wygranaKomputer) {
            return 'Remis';
        } 
        else {
            return 'Przegrana';
        }
    };

    var playerMove = function(event) {
        komputer = randomNumber(3);

        if((this == kamien && komputer == 0) || (this == papier && komputer == 1) || (this == nozyce && komputer == 2)) {
            wynik.innerHTML = 'Remis: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            result.innerHTML = wygranaGracz + '-' + wygranaKomputer + '<br>' + result.innerHTML;
        }
        else if((this == kamien && komputer == 2) || (this == papier && komputer == 0) || (this == nozyce && komputer == 1)) {
            wynik.innerHTML = 'Wygrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            wygranaGracz++;
            result.innerHTML = wygranaGracz + '-' + wygranaKomputer + '<br>' + result.innerHTML;
        } else {
            wynik.innerHTML = 'Przegrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
            wygranaKomputer++;
            result.innerHTML = wygranaGracz + '-' + wygranaKomputer + '<br>' + result.innerHTML;
        }

        liczbaRund = game ? (liczbaRund - 1) : 0;
        round.innerHTML = game ? liczbaRund : '';

        if(liczbaRund == 0 && game == true) {
            game = false;
            round.innerHTML = checkWygrana() + ' wynikiem: ' + wygranaGracz + '-' + wygranaKomputer;
        }

    };

    kamien.addEventListener('click', playerMove);
    papier.addEventListener('click', playerMove);
    nozyce.addEventListener('click', playerMove);
    roundButton.addEventListener('click', newGame);
})();