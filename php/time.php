<?php
include "var.php";
//Récupération des valeurs fournies par js via ajax
$rqt=$_POST['rqt'];
$recordTime=$_POST['timems'];


RequestBdd($rqt, $recordTime, $user, $pass, $dbname);

/*Fonction qui permet l'excécution de requêtes SQL à la bdd 'memory'
2 requêtes possibles : obtenir les 3 meilleurs temps 
ou enregistrer le temps réalisé de la partie
*/
function RequestBdd($rqt, $recordTime, $user, $pass, $dbname) {    
    try {
        //connexion à la bdd avec la méthode pdo 
        // $db = new PDO('pgsql:host=localhost;dbname=evolution', $user, $pass);
        $db = new PDO('pgsql:host=localhost;dbname='.$dbname, $user, $pass);//modifier ici le serveur s'il n'est pas local
       
        //Requête à effectuer en fonction de la valeur de la variable $rqt
        switch ($rqt) {
            
            case 'read': //Obtenir les 3 meilleurs scores
                $rqtBestScore = $db->prepare("SELECT timems FROM score ORDER BY 1 asc LIMIT 3;");
                $rqtBestScore->execute();
                //Lire tous les résultats et les mettre sous forme d'un tableau
                $resultBestScore = $rqtBestScore->fetchall(PDO::FETCH_COLUMN);  // print_r($resultBestScore);
                //Ecrire le résultat pour qu'il soit accessible pour le js via ajax
                echo json_encode($resultBestScore);
                //Clore la connexion
                $db = null;
                break;

            case 'record': //Enregistrer un nouveau temps
                //? correspond à la valeur à enregistrer dans la bdd (soit $value)
                $rqtRecordTime = $db->prepare("INSERT INTO score(timems) VALUES (?);");
                //Indiquer les valeurs à insérer à la place des ?. Le nombre indique la position du ?
                $rqtRecordTime->bindParam(1, $recordTime);
                $rqtRecordTime->execute();
                $db = null;
                break;
        }    

    } catch (PDOException $e) {
        //Obtenir le message d'erreur en cas d'erreur
        print "Erreur! : " . $e->getMessage() . "<br/>";
        die();
    }
}
?>