(function() {
    'use strict';

    var kamien = document.getElementById('kamien');
    var papier = document.getElementById('papier');
    var nozyce = document.getElementById('nozyce');
    var wynik = document.getElementById('wynik');
    var komputer;

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

    var playerMove = function(event) {
        komputer = randomNumber(3);

        if((this == kamien && komputer == 0) || (this == papier && komputer == 1) || (this == nozyce && komputer == 2)) {
            wynik.innerHTML = 'Remis: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
        }
        else if((this == kamien && komputer == 2) || (this == papier && komputer == 0) || (this == nozyce && komputer == 1)) {
            wynik.innerHTML = 'Wygrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
        } else {
            wynik.innerHTML = 'Przegrana: zagrałeś: ' + this.innerHTML + ', komputer zagrał: ' + checkKomputer() + '<br>' + wynik.innerHTML;
        }
    };

    kamien.addEventListener('click', playerMove);
    papier.addEventListener('click', playerMove);
    nozyce.addEventListener('click', playerMove);
})();