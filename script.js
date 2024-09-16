$(document).ready(function() {
    //console.log("Loaded"); //functional check
    BaseBehavior();
    numbersToInput();
    ClearInput();
    OperatorsPress();
    Equals();
    higherOperatorsToggle();
    mathBtnPushed();
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
        input.val(buttonValue === '.' && !input.val().includes(',') 
            ? input.val() + buttonValue 
            : buttonValue !== '.'
            ? (input.val() === '0' ? buttonValue : input.val() + buttonValue)
            : input.val());  // Do nothing if buttonValue is ',' and input already contains a comma
    });
}

function ClearInput() {
    $('#clearAll').on('click', function() {
        $('#input').val(0);
        $('#label').text('')
    });

    $('#clear').on('click', function() {
        $('#input').val(0);
    });

    $('#delLast').on('click', function(){
        const minusLastChar = $('#input').val().slice(0,-1)
        $('#input').val(minusLastChar)
    })
    
}

function Equals() {
    const input = $('#input')
    const label = $('#label')
    $('#equals').on('click', function(){
        memory2 = input.val()
        const lastChar = label.text().slice(-2)
        if (lastChar === " /") {
            if (parseFloat(memory2) === 0) {
                input.val('Bro, that makes no sense!');
            } else {
                input.val(parseFloat(memory1) / parseFloat(memory2));
            }
        } else {
            lastChar === " +" ? input.val(parseFloat(memory1)+parseFloat(memory2)):
            lastChar === " -" ? input.val(parseFloat(memory1)-parseFloat(memory2)):
            lastChar === " *" ? input.val(parseFloat(memory1)*parseFloat(memory2)):
            lastChar === "xʸ" ? input.val(parseFloat(memory1)**parseFloat(memory2)):
            lastChar === "ʸ√" ? input.val(parseFloat(memory1)**(1/parseFloat(memory2))):
            input.val('invalid operation')
        }
    });
}

function OperatorsPress() {
    const input = $('#input')
    const label = $('#label')

    $('.operators').on('click', function() {
        if ($(this).text() !== "=" && $(this).text() !== "x²" && $(this).text() !== "²√") {
            memory1 = input.val();         // Save the current input value
            operator = $(this).text();     // Get the text of the clicked operator button

            label.html(`${memory1} ${operator}`); // Update the label to show the current operation
            input.val(0);                 // Clear the input field
        } else if($(this).text() === "x²"){
            higherOperations(input, label);
        } else if($(this).text() === "²√"){
            higherOperations(input, label)
        }
        
    });
}

function higherOperatorsToggle() {
    const math = $('#higherOp')

    math.on('click', function(){
        const operators = $('.operators')
        operators.each(function(index, element){
            if ($(element).attr('id') === 'divide') {
                $(element).attr('id', 'square')
                $(element).text('x²')
            }
            else if ($(element).attr('id') === 'square') {
                $(element).attr('id', 'divide')
                $(element).text('/')
            }
            else if ($(element).attr('id') === 'multiply') {
                $(element).attr('id', 'squareX')
                $(element).text('xʸ')
            }
            else if ($(element).attr('id') === 'squareX') {
                $(element).attr('id', 'multiply')
                $(element).text('*')
            }
            else if ($(element).attr('id') === 'subtract') {
                $(element).attr('id', 'squareRoot')
                $(element).text('²√')
            }
            else if ($(element).attr('id') === 'squareRoot') {
                $(element).attr('id', 'subtract')
                $(element).text('-')
            }
            else if ($(element).attr('id') === 'add') {
                $(element).attr('id', 'yRoot')
                $(element).text('ʸ√')
            }
            else if ($(element).attr('id') === 'yRoot') {
                $(element).attr('id', 'add')
                $(element).text('+')
            }

            
        })
    })
}

function mathBtnPushed() {
    $('#higherOp').on('click', function() {
        $(this).toggleClass('pushed')
    })
}

function higherOperations(input, label) {
    const square = $('#square')
    const squareRoot = $('#squareRoot')
    
    square.on('click', function(){
        label.html(parseFloat(input.val())**2)
    })
    squareRoot.on('click', function(){
        label.html(parseFloat(input.val())**(1/2))
    })
    }
