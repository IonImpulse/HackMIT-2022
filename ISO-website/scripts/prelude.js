const API = '/api/v1';


/*

Global variables

*/

var state = {
    uuid: null,
    user: null,
    settings: null,
}


// Function to load/save state from localstorage
function loadState() {
    const new_state = JSON.parse(localStorage.getItem('state')) ?? state;
    state = validateState(new_state);
}

function validateState(new_state) {
    for (let key of Object.keys(state)) {
        if (new_state[key] === undefined) {
            new_state[key] = state[key];
        }
    }

    return new_state;
}

function saveState() {
    localStorage.setItem('state', JSON.stringify(state));
}

function determineScreenSize() {
    const height = window.innerHeight;
    document.getElementById("main-grid").style.gridTemplateRows = `${height - 120}px 120px`;
}

determineScreenSize();
loadState();
