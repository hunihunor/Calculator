document.addEventListener("DOMContentLoaded", function(){
    //console.log("Loaded"); //functional check
    BaseBehavior()
    numbersToInput()
    ClearInput()
    MultiplyPress()
})

function BaseBehavior(params) {
    const input = document.getElementById('input')
    input.value = 0
}

function numbersToInput() {
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => {
        button.addEventListener('click', function WriteNumbersOut() {
            const input = document.querySelector('#input');
            const buttonValue = button.textContent;

            if (buttonValue === ',') {
                // Add decimal point if it's not already included
                if (!input.value.includes(',')) {
                    input.value += buttonValue;
                }
            } else {
                // If input is '0', replace it with the clicked number
                if (input.value === '0' && buttonValue !== ',') {
                    input.value = buttonValue;
                } else {
                    // Append the clicked number to the input value
                    input.value += buttonValue;
                }
            }
        });
    });
}

function ClearInput() {
    const C = document.querySelector('#clear')
    C.addEventListener('click', ()=>{
        const input = document.getElementById('input')
        input.value = 0
    })
}

function MultiplyPress() {
    const multiplyButton = document.getElementById('multiply');
    multiplyButton.addEventListener('click', () => {
        const input = document.getElementById('input');
        const label = document.getElementById('label');

        label.innerHTML = input.value+"*"
    });
}