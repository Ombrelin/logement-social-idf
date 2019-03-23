<?php
 // On ouvre le XML des lois
$filename = "../donnes/lois.xml";
$file = fopen($filename,"r") or die("Impossible d'ouvrir le fichier!"); // Ouverture en lecture

while ($ligne = fgets($file)) { // Tant qu'on peut lire des lignes
    echo $ligne; // On affiche ce qu'on lit
}
fclose($file); // On ferme le fichier
?>
