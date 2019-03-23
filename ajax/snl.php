<?php
 // On ouvre le fichier de comptage des LS
$filename = "../donnes/SNL.csv";
$file = fopen($filename,"r") or die("Impossible d'ouvrir le fichier!"); // Ouverture en lecture

// Initialisation des variables
$adresses = array();
$infos = array();

$found = false;
while ($ligne = fgets($file)) { // Tant qu'on peut lire des lignes
    $tab = explode(";",$ligne); // On parse la ligne
    $cp = $tab[0]; // Code postal
    $nbls = $tab[1]; // Nombre de ls
    
    if($cp == $_GET["postcode"]){ // Si on a trouvé la bonne ville passé en paramètre
        echo $nbls; // On affiche le nombre de LS
        $found = true;
        break;
    }
}

if(!$found){
    echo 0;
}

fclose($file); // On ferme le fichier
?>
