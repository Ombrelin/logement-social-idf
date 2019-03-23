<?php

//Récupération des tracés GeoJSON

$fichierGEOJSON = fopen("../donnes/communes-geojson.json","r") //On ouvre le fichier des tracés GeoJSON de toutes les villes de France
 or die ("Impossible d'ouvrir le fichier");
$ligne = fgets($fichierGEOJSON); // Lecture des données GeoJSON
$table = json_decode($ligne); // On décode le JSON en objet PHP

// Récupération des communes en déficit SRU

$villesSRU = array(); // Initialisation du tableau
$fichierCSV = fopen("../donnes/sru.csv","r"); // On ouvre le fichier des villes en déficit SRU
while($ligne = fgets($fichierCSV)){ // On lit tant qu'il y a qqch à lire
    $tab = explode(";",$ligne); // On parse à la ligne CSV à partir du séparateur
    $nom = $tab[2]; // On récupère le nom dans la 3e colonne du fichier CSV
    array_push($villesSRU,$nom); // On rentre le nom dans le tableau
}

// Tri du tracé des villes SRU

$newFeatures = array(); // On crée un nouveau tableau de features
foreach($table->features as $feature){ // Pour chaque features du fichier national
    foreach($villesSRU as $ville){ // Pour chaque ville SRU
        if(strtolower($feature->properties->nom)==strtolower($ville)){ // On compare les noms
            array_push($newFeatures, $feature); // Si les noms sont les memes on ajoute la feature GeoJSOn dans le nouveau tableau
        }
    } 
}

// Traitement et affichage

$table->features = $newFeatures; // On change la référence dans $table pour le nouveau tableau trié
$geojson = json_encode($table); // Encodage de l'objet PHP en Json
echo $geojson; // Affichage du Json
?>