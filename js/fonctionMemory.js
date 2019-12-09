// Déclaration de variables
var startTime= 0;
var endTime= 0;
var recordTime=0;
var recordTimeMs= 0;
var firstCard= true;
var score= 0;
var rqt= 'read';
var result='';

//Actions lorsque la page est chargée
$( document ).ready(function(){
    responseBestTime(showBestTime);
    $("#partie").click(createGame);
});

//Toutes les fonctions du jeu

////Fonctions pour la préparation du jeu 

/*Fonction qui envoie une requête ajax (type POST)
Le fichier php visé est time.php
La requête envoie 2 paramètres : 
- timems: c'est le temps réalisé pour la partie en ms
(0 pour une partie non commencée et valeur de recordTime pour la fin du jeu)
- rqt: le numéro de requête à réaliser 
(read pour récupérer les meilleurs temps et record pour enregistrer la partie)
 */
function responseBestTime(callback) {
    $.ajax({
        type: 'POST',
        data: 'timems=' + recordTimeMs+ '&rqt=' +rqt,
        url: 'http://localhost/memorysass/php/time.php',
        timeout: 3000,
        datatype: 'json',
        success: function(jsonTime) {
            callback(jsonTime);
        },
        error: function() {
            alert('Problème de gestion de données :/');
        }
    })
}

/* Fonction qui affiche les 3 meilleurs temps réalisés dans la div #famousWall.
Les données récupérées sont issues de la bdd, via la requête ajax.
jsonTime est un tableau au format json*/ 
function showBestTime(jsonTime) {
    bestTime= JSON.parse(jsonTime);
    $("#famousWall").append("<h2>Meilleurs temps réalisés</h2>");
    for (var i in bestTime){
        //Affiche le temps en min et sec pour chaque valeur
        bestTimeMs= new Date(bestTime[i]);
        $("#famousWall").append("<span><strong>"+(i+1)+"#</strong>    "+bestTimeMs.getUTCMinutes()+ " min et " +bestTimeMs.getSeconds()+" sec"+"</span>");
    }
}

/*La fonction cache le contenu de la div id="start" et #famousWall, puis
elle crée le code html et css des cartes et de la barre de progression.
Ce code est généré dans la div id="game".
Elle paramètre des événements sur les éléments #progressbar-inner, .card et .found.
Elle active une animation sur la page.
Elle affecte une valeur à la variable startTime.
*/
function createGame(){
    $("#start").hide();
    $("#famousWall").hide();
    // code html et css pour les cartes 
    var imagePosition = getImagePosition();
    $("#game").append('<div id="cards">');
    for ( i = 0; i < 28; i++) {	
        $("#cards").css("background-color", "rgb(201, 200, 214)");
        $("#cards").append('<div class ="card" id="c'+i+'"></div>');       
        $("#c"+i).css("background-position", "0 -"+imagePosition[i]+"00px");
    }
    $("#game").append('</div>');
    // Evenment sur les cartes en fonction de leur classe
    $(".card").click(play);
    $(".found").off('click');
    // code html pour la barre de progression
    $("#game").append('<div id="progressbar-container">'
                     +'    <div id="progressbar">'
                     +'        <span id="progressbar-inner"></span>'
                     +'    </div>'
                     +'</div>');
    // Evenement à la fin de l'animation
    $("#progressbar-inner").on('animationend', endGame);

    // Animation pour que la page se déplace jusqu'à l'espace de jeu 
    $('html').animate({scrollTop: $("#game").offset().top}, 'slow');
    startTime = new Date().getTime();
}


/* Cette fonction génère un tableau contenant tous les nombres
entiers de 0 à 27, placés dans un ordre aléatoire.
La fonction renvoie le tableau de valeurs. */
function getCardsPosition() {					
    randomNumber = Math.round(Math.random()*27) //Permet d'obtenir un nombre aléatoire entier compris entre 0 et 27	
    randomNumberList =[];		 								
    for ( i = 0; i < 28; i++) {							                                                 
        while (randomNumberList.includes(randomNumber))	 {	//Evite les doublons
            randomNumber = Math.round(Math.random()*27);
        }
        randomNumberList.push(randomNumber)	;							                   
    }
    return randomNumberList;
}

/* Cette fonction génère un tableau contenant l'ordre définitif
des images à afficher, généré aléatoirement.
Une image est représentée par un entier.
Exemple : 2, cette valeur s'intégrera dans les paramètres css du background-position.
La fonction renvoie le tableau de valeurs. */
function getImagePosition() {
    var randomPosition = getCardsPosition();
    var imageList =[];		 								
    for ( i = 0; i < 14; i++) {							                                                 
        position =i;
        //Permet le placement aléatoire dans le tableau de l'image
        //Chaque image est présente 2 fois dans le tableau
        imageList[randomPosition[i*2]] = position;
        imageList[randomPosition[(i*2)+1]] = position;					                   
    }
    return imageList;
}

////Fonction pour le fonctionnement du jeu 

/*Cette fonction permet le fonctionnement du jeu.
Elle s'excécute lorsqu'une carte est cliquée.
Les cartes se retournent pour montrer l'image et sont comparées.
Si les valeurs sont différentes, les cartes se retournent après 1s.
Si les valeurs sont identiques, les images restent visibles et ne sont plus cliquables
Si toutes les cartes sont retournées la fin du jeu 'gagné' s'excécute.
Elle affecte une valeur à la variable endGame
*/
function play(){
    //Test pour savoir si c'est la 1ère ou 2ème carte qui est cliquée
    if (firstCard == true) {
        //Cas pour la 1ère carte
        firstCard = this.getAttribute('id'); //Désactive la possibilité de cliquer sur les cartes
        $('#'+firstCard).off('click');
        $('#'+firstCard).css('background-image', 'url("img/cards.png")');
    }
    else {
        //Cas pour la 2ème carte
        var secondCard = $('#'+this.getAttribute('id'));
        $('.card').off('click'); 
        secondCard.css('background-image', 'url("img/cards.png")');
        var testCard = $('#'+firstCard);
        firstCard = true; 
        //Test de comparaison des valeurs des cartes
        if (testCard.css("background-position") != secondCard.css("background-position")){
            //Cas des cartes différentes
            setTimeout(function() { //Permet des actions après un délai
                testCard.css('background-image', '');
                secondCard.css('background-image', '');
                $(".card").click(play);
            }, 1000);
        }
        //Cas des cartes  identiques
        //Test si c'est la fin du jeu 
        else if (score<13) {
                //Si ce n'est pas la fin du jeu
                score =score+1;
                //Les cartes changent de classes
                testCard.attr('class', 'found');
                secondCard.attr('class', 'found');
                $(".card").click(play);
        }
        else {
            //Si c'est la fin du jeu (toutes les cartes retournées)
            winGame();
        } 
    }
}

////Fonctions pour la fin du jeu

/* La fonction calcule le nombre de millisecondes entre 2 dates.
Une alerte s'affiche avec un message de victoire indiquant le temps réalisé.
Les valeurs startTime et EndTime sont des variables telles que startTime = new Date().getTime();
*/
function GetTimeGame(startTime, endTime){
    timeGame = endTime - startTime; 
    return timeGame;
}

/* Fonction qui active la fin du jeu gagné. 
Elle s'active si toutes les cartes sont retourneées.
*/
function winGame(){
    $("#progressbar-inner").off('animationend');
    endTime = new Date().getTime();
    recordTimeMs=GetTimeGame(startTime, endTime);
    //Permet d'obtenir les minutes et les secondes à partir du temps en Ms
    recordTime = new Date(recordTimeMs);
    result='win';
    recordGame();
}

/* Fonction qui enregistre le partie dans la bdd.
Et lance la fin de la partie*/
function recordGame(){
    rqt='record';
    responseBestTime(endGame);
}

/* Fonction qui active la fin du jeu perdu ou gagné.
Si result = 'win', la partie est gagnée
Elle s'active à la fin de l'animation de la barre de progression si c'est perdu
Sinon après l'enregistrement du temps. 
La page est rechargée.*/
function endGame(){
    if (result=='win'){
        alert("Vous avez gagnééééé! Votre temps est de "+recordTime.getUTCMinutes()+ " min et " +recordTime.getSeconds()+" sec");
    }
    else{
        alert ('Vous avez perduuuuu!');
    }
    location.reload(true);
}