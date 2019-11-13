<?php

//Récupération des tracés GeoJSON
// ce fichier n'est utilisé que pour construire le GeoJSON grand-paris. Il n'est pas appelé en AJAX.

$fichierGEOJSON = fopen("../donnes/communes-geojson.json","r") //On ouvre le fichier des tracés GeoJSON de toutes les villes de France
 or die ("Impossible d'ouvrir le fichier");
$ligne = fgets($fichierGEOJSON); // Lecture des données GeoJSON
$table = json_decode($ligne); // On décode le JSON en objet PHP

// Récupération des communes du grand paris

$villesGP = ["75056", "75101", "75102", "75103", "75104", "75105", "75106", "75107", "75108", "75109", "75110", "75111", "75112", "75113", "75114", "75115", "75116", "75117", "75118", "75119", "75120", "91027", "91326", "91432", "91479", "91589", "91687", "92002", "92004", "92007", "92009", "92012", "92014", "92019", "92020", "92022", "92023", "92024", "92025", "92026", "92032", "92033", "92035", "92036", "92040", "92044", "92046", "92047", "92048", "92049", "92050", "92051", "92060", "92062", "92063", "92064", "92071", "92072", "92073", "92075", "92076", "92077", "92078", "93001", "93005", "93006", "93007", "93008", "93010", "93013", "93014", "93015", "93027", "93029", "93030", "93031", "93032", "93033", "93039", "93045", "93046", "93047", "93048", "93049", "93050", "93051", "93053", "93055", "93057", "93059", "93061", "93062", "93063", "93064", "93066", "93070", "93071", "93072", "93073", "93074", "93077", "93078", "93079", "94001", "94002", "94003", "94004", "94011", "94015", "94016", "94017", "94018", "94019", "94021", "94022", "94028", "94033", "94034", "94037", "94038", "94041", "94042", "94043", "94044", "94046", "94047", "94048", "94052", "94053", "94054", "94055", "94056", "94058", "94059", "94060", "94065", "94067", "94068", "94069", "94070", "94071", "94073", "94074", "94075", "94076", "94077", "94078", "94079", "94080", "94081", "95018"]; // Initialisation du tableau

// Tri du tracé des villes du grand paris

$newFeatures = array(); // On crée un nouveau tableau de features
foreach($table->features as $feature){ // Pour chaque features du fichier national
    foreach($villesGP as $ville){ // Pour chaque ville SRU
        if(strtolower($feature->properties->code)==strtolower($ville)){ // On compare les noms
            array_push($newFeatures, $feature); // Si les noms sont les memes on ajoute la feature GeoJSOn dans le nouveau tableau
        }
    } 
}

// Traitement et affichage

$table->features = $newFeatures; // On change la référence dans $table pour le nouveau tableau trié
$geojson = json_encode($table); // Encodage de l'objet PHP en Json
echo $geojson; // Affichage du Json
?>