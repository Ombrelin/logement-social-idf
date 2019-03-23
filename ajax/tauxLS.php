<?php
 // On ouvre le fichier de comptage des LS
$filename = "../donnes/couvertureLS_2015.csv";
$file = fopen($filename,"r") or die("Impossible d'ouvrir le fichier!"); // Ouverture en lecture

// Initialisation des variables
$adresses = array();
$infos = array();

while ($ligne = fgets($file)) { // Tant qu'on peut lire des lignes
    $tab = explode(";",$ligne); // On parse la ligne
    $insee = $tab[0]; // Code postal
    $txbls = $tab[6]; // Nombre de ls
    
    if($insee == $_GET["codeinsee"]){ // Si on a trouvé la bonne ville passé en paramètre
        echo $txbls; // On affiche le nombre de LS
        break;
    }
}
fclose($file); // On ferme le fichier
?>