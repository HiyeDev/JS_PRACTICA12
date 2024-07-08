const inputUser = document.querySelector('#user');
const inputHobbieNumber = document.querySelector('#hobbies-number');
const legend = document.querySelector('#legend');
const inputSubmit = document.querySelector('input[type="submit"][value="Enviar"]')
const inputsCheckboxsHobbies = document.querySelectorAll('.hobbies');
let checkedCheckboxsHobbiesSelected = 0;
let hobbieNumber = 0;

addEventListeners();

function addEventListeners () {
    addEventListenerOnCheckboxsHobbies();
    addEventListenerOnInputHobbieNumber();
    addEventListenerOnInputUser();
    addEventListenerInputSubmit();
}

function updateCheckBoxsHobbies() {
    disabledCheckBoxsHobbies();
    activatedCheckBoxsHobbies();
}

function revertLegendText() {
    if (checkedCheckboxsHobbiesSelected == hobbieNumber) {
        legend.textContent = 'Aficiones';
        legend.classList.remove('invalid');
    }
}


function activatedCheckBoxsHobbies() {
    if (checkedCheckboxsHobbiesSelected < hobbieNumber) {
        inputsCheckboxsHobbies.forEach(inputCheckboxHobbie => {
            if (!inputCheckboxHobbie.checked) {
                inputCheckboxHobbie.disabled = false;
            }
        })
    }
}

function disabledCheckBoxsHobbies() {
    if (checkedCheckboxsHobbiesSelected == hobbieNumber) {
        inputsCheckboxsHobbies.forEach(inputCheckboxHobbie => {
            if (!inputCheckboxHobbie.checked) {
                inputCheckboxHobbie.disabled = true;
            }
        })
    }
}

function updateCheckedCeckboxsHobbies (checked) {
    checked ? checkedCheckboxsHobbiesSelected++ : checkedCheckboxsHobbiesSelected--;
}

function addEventListenerInputSubmit() {
    inputSubmit.addEventListener('click', (event) => {
        if (checkedCheckboxsHobbiesSelected < hobbieNumber) {
            legend.textContent = `Debes seleccionar ${hobbieNumber} aficiones`;
            legend.classList.add('invalid');
            event.preventDefault();
        }
    })
}

function addEventListenerOnCheckboxsHobbies() {
    inputsCheckboxsHobbies.forEach(inputCheckboxHobbie => {
    inputCheckboxHobbie.addEventListener('click', () => {
        let checkedInputCheckBoxHobbie = inputCheckboxHobbie.checked;
        updateCheckedCeckboxsHobbies(checkedInputCheckBoxHobbie);
        updateCheckBoxsHobbies();
        revertLegendText();
    })
});
}

function addEventListenerOnInputHobbieNumber() {
    inputHobbieNumber.addEventListener('input', () => {
    if (inputHobbieNumber.validity.rangeUnderflow || inputHobbieNumber.validity.rangeOverflow) {
        inputHobbieNumber.setCustomValidity('Debes elegir un número entre 2 y 4');
    } else {
        inputHobbieNumber.setCustomValidity("");
    }
    hobbieNumber = parseInt(inputHobbieNumber.value);
    updateCheckBoxsHobbies();

});
}

function addEventListenerOnInputUser() {
    inputUser.addEventListener('input', () => {
    const labelUser = document.querySelector('label[for="user"]');
     if (inputUser.validity.patternMismatch || inputUser.value.length > 6) {
        labelUser.classList.add('invalid');
     } else {
        labelUser.classList.remove('invalid');
     }
});
}