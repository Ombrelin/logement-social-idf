window.addEventListener("load", function () {
    let btnCarte = document.querySelector("#btnCarte");
    let btnProposition = document.querySelector("#btnProposition");
    let btnLois = document.querySelector("#btnLois");

    btnCarte.addEventListener("click", function(){
        document.querySelector("#containerCarte").scrollIntoView({behavior: "smooth"});
    });
    
    btnLois.addEventListener("click", function(){
        document.querySelector("#livreLois").scrollIntoView({behavior: "smooth"});
    });

});