$(document).ready(function() {
    //console.log("Loaded"); //functional check
    BaseBehavior();
    numbersToInput();
    ClearInput();
    OperatorsPress();
    Equals();
});

let memory1 = 0
let memory2 = 0
let operator = ''

function BaseBehavior() {
    const input = $('#input');
    input.val(0);
}

function numbersToInput() {
    $('.numbers').on('click', function() {
        const input = $('#input');
        const buttonValue = $(this).text();

        // Fix for ensuring only one comma
        input.val(buttonValue === ',' && !input.val().includes(',') 
            ? input.val() + buttonValue 
            : buttonValue !== ',' 
            ? (input.val() === '0' ? buttonValue : input.val() + buttonValue)
            : input.val());  // Do nothing if buttonValue is ',' and input already contains a comma
    });
}

function ClearInput() {
    $('#clear').on('click', function() {
        $('#input').val(0);
        $('#label').text('')
    });
}

function Equals() {
    const input = $('#input')
    const label = $('#label')
    $('#equals').on('click', function(){
        memory2 = input.val()
        const lastChar = label.text().slice(-1)
        lastChar === "+" ? input.val(parseInt(memory1)+parseInt(memory2)):
        lastChar === "-" ? input.val(parseInt(memory1)-parseInt(memory2)):
        lastChar === "/" ? input.val(parseInt(memory1)/parseInt(memory2)):
        lastChar === "*" ? input.val(parseInt(memory1)*parseInt(memory2)):
        input.val('invalid operation')         
    }   
)
}

function OperatorsPress() {
    const input = $('#input')
    const label = $('#label')

    $('.operators').on('click', function() {
        if ($(this).text() !== "=") {
            memory1 = input.val();         // Save the current input value
            operator = $(this).text();     // Get the text of the clicked operator button

            label.html(`${memory1} ${operator}`); // Update the label to show the current operation
            input.val(0);                 // Clear the input field
        }
        
    });
}
