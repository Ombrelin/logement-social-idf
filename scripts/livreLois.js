window.addEventListener("load", function(){
    console.log("Chargement des lois ...")
    $.ajax({
        url: "./ajax/lois.php",
        success: function(data){
            $(data).find("entry").each(function(){
                let title = $(this).find("title").text();
                let content = $(this).find("content");

                articles = new Array();

                $(content).find("point").each(function(){
                    articles.push($(this).text());
                });

                // Création du contenu

                let contenu = document.createElement("div");
                contenu.className = "mdl-card__supporting-text";
                articles.forEach(element => {
                    $(contenu).append(element);
                    $(contenu).append("<br>");
                });

                // Création du titre
                let titre = document.createElement("div");
                let textTitre = document.createElement("h4");
                $(textTitre).html(title);
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

                $("#livreLois").append(carte);
            });
        },
    });
});