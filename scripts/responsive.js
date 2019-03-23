function toggleBar(){
    if($("#toggleMenu i").hasClass("fa-bars")){
        $("#toggleMenu i").removeClass("fa-bars");
        $("#toggleMenu i").addClass("fa-times");
    }
    else{
        $("#toggleMenu i").removeClass("fa-times");
        $("#toggleMenu i").addClass("fa-bars");
    }
    
}

window.addEventListener("load", function(){
    $("#toggleMenu").on("click", function(){
        $("nav .mdl-cell--1-col").fadeToggle();
        toggleBar();
    });
    if (window.matchMedia("(max-width: 768px)").matches) {
        document.querySelector("#mapid").addEventListener("click", function(){
            document.querySelector("#carteInfos").scrollIntoView({behavior: "smooth"});
        });
      }
    
});