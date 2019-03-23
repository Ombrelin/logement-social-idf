window.addEventListener("load", function(){
    if(window.utilsateur != null){
        $("#formProposition").fadeIn();
    }

    $("#btnAddProposition").on("click", function(){
        console.log("Création d'une proposition")
        $("#loaderProposition").fadeIn();
        $.post(
            "./ajax/addProposition.php",
            $("#formAjoutProposition").serialize()
        ).done(function(resultat){
            console.log(resultat);
            $("#loaderProposition").fadeOut();
            let dialog = document.querySelector("#addPropDialog");
            dialog.close();
            loadPropositions();
        });
    });

    $("#btnModaleAddProposition").on("click",function(){
        let dialog = document.querySelector("#addPropDialog");
        dialog.showModal();
    });

    $("#btnAnnulerProposition").on("click",function(){
        let dialog = document.querySelector("#addPropDialog");
        dialog.close();
    });

    loadPropositions();
});

function loadPropositions(){
    $("#listePropositions").html("");

    $.getJSON("./ajax/getAllPropositions.php", function(data){
        console.log(data);
        data.forEach(element => {
             // Création du contenu

             let contenu = document.createElement("div");
             contenu.className = "mdl-card__supporting-text";
             $(contenu).append(element.contenu);

             // Création du titre
             let titre = document.createElement("div");
             let textTitre = document.createElement("h4");
             $(textTitre).html(element.titre + " par " + element.auteur);
             titre.appendChild(textTitre);
             titre.className = "mdl-card__title-text";
             titre.addEventListener("click", function(){
                 $(contenu).slideToggle();
             });
             

             // Création de la carte
             let carte = document.createElement("div");
             carte.className = "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col";
             carte.appendChild(titre);
             carte.appendChild(contenu);

             $("#listePropositions").append(carte);
        });
    });
}