let scoreA = 0;
let scoreB = 0;
let previousState = null;



// Load saved scores
const saved = JSON.parse(localStorage.getItem("scores"));
if (saved) {
    scoreA = saved.scoreA;
    scoreB = saved.scoreB;
}



/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Increase the score of Team B by one point.
 * This function updates the state of the game, updates the UI to reflect the new score, and saves the state to local storage.
 */
/*******  4fc331cf-ca6e-44a4-a97d-f3a9d4fbf6b1  *******/// ---- Scoring ----
function increaseTeamA() {
    savePrevious();
    scoreA++;
    save();
}

function decreaseTeamA() {
    savePrevious();
    scoreA--;
    save();
}

function increaseTeamB() {
    savePrevious();
    scoreB++;
    save();
}

function decreaseTeamB() {
    savePrevious();
    scoreB--;
    save();
}

// ---- Undo ----
function undo() {
    if (!previousState) return;

    scoreA = previousState.scoreA;
    scoreB = previousState.scoreB;
    previousState = null;
    save();
}

// ---- Reset ----
function resetScores() {
    savePrevious();
    scoreA = 0;
    scoreB = 0;
    save();
}

// ---- Helpers ----
function savePrevious() {
    previousState = { scoreA, scoreB };
}

function save() {
    localStorage.setItem(
        "scores",
        JSON.stringify({ scoreA, scoreB })
    );
    updateUI();
}

function updateUI() {
    document.getElementById("scoreA").innerText = scoreA;
    document.getElementById("scoreB").innerText = scoreB;
}

document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});

// ---- Service Worker ----
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("SW registered"))
        .catch(err => console.error("SW failed", err));
}
