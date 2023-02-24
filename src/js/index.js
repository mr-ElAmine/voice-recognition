// By moi
// Création d'une instance de reconnaissance vocale Webkit
const recognition = new webkitSpeechRecognition();

// Configuration de la reconnaissance vocale
recognition.continuous = true; // Permet une reconnaissance continue
recognition.interimResults = false; // N'affiche pas les résultats intermédiaires

// Sélection des éléments HTML nécessaires
const transcription = document.getElementById("transcription"); // Champ de texte pour la transcription
const buttonStart = document.getElementById("start"); // Bouton pour démarrer la reconnaissance vocale
const buttonStop = document.getElementById("stop"); // Bouton pour arrêter la reconnaissance vocale

let previousWord = ""; // Variable pour stocker le mot précédent, afin d'éviter les doublons dans la transcription

// Ajout d'un écouteur d'événement sur le bouton "start"
buttonStart.addEventListener("click", () =>{
    const langues = document.getElementById("langues"); // Sélection de la langue depuis un élément HTML
    const langueSelectionnee = langues.options[langues.selectedIndex].value; // Récupération de la valeur de la langue sélectionnée
    recognition.lang = langueSelectionnee; // Configuration de la langue de reconnaissance
    recognition.start(); // Démarrage de la reconnaissance vocale
    transcription.value = ""; // Effacement du texte de transcription
    buttonStop.style.removeProperty("display"); // Affichage du bouton "stop"
    buttonStart.style.display = "none"; // Masquage du bouton "start"
});

// Ajout d'un écouteur d'événement sur le bouton "stop"
buttonStop.addEventListener("click", () =>{
    buttonStart.style.removeProperty("display"); // Affichage du bouton "start"
    buttonStop.style.display = "none"; // Masquage du bouton "stop"
    recognition.stop(); // Arrêt de la reconnaissance vocale
});

// Ajout d'un gestionnaire d'événements pour le résultat de la reconnaissance vocale
recognition.onresult = (event) => {
    const currentWord = event.results[event.results.length - 1][0]; // Récupération du mot transcrit
    if (currentWord.transcript !== previousWord){ // Vérification pour éviter les doublons
        transcription.value += currentWord.transcript + " "; // Ajout du mot transcrit à la transcription
        previousWord = currentWord.transcript; // Stockage du mot précédent pour la vérification ultérieure
    }
};

