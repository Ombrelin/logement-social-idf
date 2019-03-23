/**
 * Classe représente un utilisateur
 * @author Arsène Lapostolet
 */
class Utilisateur {
    /**
     * Permet d'initialiser un utilisateur
     * @param login Login de l'utilisateur
     * @param email Email de l'utilisateur
     */
    constructor(id,login, email) {
        this.id = id;
        this.login = login;
        this.email = email;
    }

    /**
     * Getter pour le login de l'utilisateur
     */
    getLogin() { return this.login }

    /**
     * Getter pour l'email de l'utilisateur
     */
    getEmail() { return this.email }

    getId() { return this.id }
}

var utilisateur; // Instance de l'utilisateur connecté, null si personne n'est connecté
var toast; // Toast de la page

window.addEventListener("load", function () { // On utilise addEventListener pour pouvoir le faire plusieurs fois (autres fichiers de scripts)

    window.toast = document.querySelector('#toast'); // On set la variable globale avec l'objet balise du Toast

    // ============================================= Gestion de la connexion ======================================================================

    $("#showConnexion").on("click", function () { // Quand on clique sur le bouton de connexion
        var dialog = document.querySelector("#connexionDialog"); // Récupération de la fenêtre modale de connexion
        dialog.showModal(); // Affichage de la fenêtre modale de connexion
    });

    $("#btnConnexion").on("click", function () { // Quand on clique sur le bouton pour confirmer la sélection
        console.log("clic");
        $.post( // Requête HTTP-POST
            "./ajax/connectUtilisateur.php", // Adresse de service AJAX
            $("#formConnexion").serialize() // On envoie les données du formulaire formConnexion
        ).done(function (resultat) { // Quand la requete POST est finie
            let profil = JSON.parse(resultat); // On transforme le résultat en objet JS

            if (profil.login != "invalide") { // Si le résultat n'est pas invalide
                $("#showConnexionParent").fadeToggle(); // On fait disparaître le bouton de connexion
                $("#showInscriptionParent").fadeToggle(); // On fait dispraître le bouton d'inscription
                $("#profil").html("<span>" + profil.login + "</span>"); // On fait apparaitre le nom de l'utilisateur dans le menu
                $("#profil").fadeToggle(); // On affiche le nom de l'utilisateur
                let utilisateur = new Utilisateur(profil.id,profil.login, profil.email); // Initialise l'instance de l'utilisateur
                window.utilisateur = utilisateur; // Stockage de l'instance de l'utilisateur dans la variable globale

                $("#erreurConnexion").fadeOut(); // On cache l'erreur si elle est affichée
                var dialog = document.querySelector("#connexionDialog"); // On récupère la fenêtre modale
                dialog.close(); // On ferme la fenêtre modale

                // Toast
                var data = { message: "Bonjour " + window.utilisateur.getLogin() + ", vous êtes bien connecté !" }; // On paramètre le message du toast
                window.toast.MaterialSnackbar.showSnackbar(data); // Affichage du Toast
                $("#btnModaleAddProposition").fadeIn();
                $("#auteurProposition").val(window.utilisateur.getId());
               
            }
            else {
                $("#erreurConnexion").fadeIn(); // Si c'est invalide on affiche l'erreur
            }
        });
    });

    $("#btnAnnuler").on("click", function () { // Quand on clique sur le bouton annuler
        var dialog = document.querySelector("#connexionDialog"); // Récupération de la fenêtre modale de connexion
        dialog.close(); // Fermeture de la fenêtre modale de connexion
    });

    // ===================================== Gestion de l'inscription =============================================================================

    $("#showInscription").on("click", function () { // Quand on clique sur le bouton d'inscription
        var dialog = document.querySelector("#inscriptionDialog"); // On récupère la fenêtre modale d'inscription
        dialog.showModal(); // Ouverture de la fenêtre modale d'inscription
    });

    $("#btnInscription").on("click", function () { // Quand on clique sur le bouton de validation de l'inscription

        if (new String($("#passwordInscr").val()).length >= 8) { // On vérifie que le mot de passe fait 8 caractère ou plus
            $.getJSON( // On fait une procédure AJAX pour récupérer du JSON pour vérif que l'adresse mail n'est pas déjà utilisée
                "./ajax/newAdresse.php?adresse=" + $("#emailInscr").val(), // L'adresse de procédure AJAX paramètrée avec l'email
                function (resultat) { // Quand la procédure AJAX est finie
                    if (resultat.new == "true") { // Si l'adresse email est nouvelle
                        $("#erreurInscr").fadeOut(); // On cache le message d'erreur
                        $.post( // On fait une requête HTTP-POST via une procédure AJAX pour soumettre le formulaire
                            "./ajax/inscriptionUtilisateur.php", // Adresse du service AJAX
                            $("#formInscription").serialize() // On récupère l'objet jQuery du formulaire et on envoie son contenu
                        ).done(function (data) { // Quand la procédure AJAX est finie
                            var dialog = document.querySelector("#inscriptionDialog"); // Récupération de la fenêtre modale d'inscription
                            dialog.close(); // Fermeture de la fenêtre modale

                            // Toast
                            var data = { message: "Inscription validée" }; // Paramètrage du test du toast
                            window.toast.MaterialSnackbar.showSnackbar(data); // On lance le toast
                        });
                    }
                    else { // L'email est pas nouvelle
                        $("#erreurInscr").fadeIn(); // On affiche l'erreur
                        $("#erreurInscr").html("Cette adresse email est déjà utilisée") // On set le texte de l'erreur
                    }
                }
            );
        }
        else { // Si le mdp fait moins de 8 caractère
            $("#erreurInscr").fadeIn(); // On affiche l'erreur
            $("#erreurInscr").html("Votre mot de passe doit faire 8 caractères ou plus");// On set le texte de l'erreur
        }
    });

    $("#btnAnnulerInscr").on("click", function () { // Quand on clique sur le bouton d'annulation de l'inscription
        var dialog = document.querySelector("#inscriptionDialog"); // On récupère la fenêtre modale
        dialog.close(); // On ferme la fenêtre modale
    });

    $("#passwordInscr").on("input", function () { // Quand on tape un truc dans le champs de mot de passe de l'inscription
        if ($("#confPassword").val() != $("#passwordInscr").val()) { // Si les value des  champs de mot de passe et de confirmation de mot de passe sont différentes
            $("#passwordInscr").addClass("invalide"); // On met les champs en rouge
            $("#confPassword").addClass("invalide");
            $("#erreur").fadeIn() // On affiche l'erreur
        }
        else {  // Si les value des  champs de mot de passe et de confirmation de mot de passe sont pareils
            $("#passwordInscr").removeClass("invalide"); // On remet les champs en blanc et bleu
            $("#confPassword").removeClass("invalide");
            $("#erreur").fadeOut(); // On chache l'erreur
        }
    });

    $("#confPassword").on("input", function () { // Quand on tape un truc dans le champs de confirmation de mot de passe de l'inscription
        if ($("#confPassword").val() != $("#passwordInscr").val()) { 
            $("#passwordInscr").addClass("invalide");
            $("#confPassword").addClass("invalide");
            $("#erreur").fadeIn();
        }                                                                           // Même procédure mais avec le champs de confirmation
        else {
            $("#passwordInscr").removeClass("invalide");
            $("#confPassword").removeClass("invalide");
            $("#erreur").fadeOut();
        }
    });
});