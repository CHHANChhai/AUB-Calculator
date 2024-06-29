
(function () {
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');
    let operatorButtons = ['#sum', '#ceButton', '#subtract', '#multiply', '#divide'];
    let resultCalculated = false; // Flag to detect if a result was calculated

    // Initialize screen with '0'
    screen.value = '0';
    updateButtonStates();

    // Function to update button states 
    function updateButtonStates() {
        operatorButtons.forEach(selector => {
            let button = document.querySelector(selector);
            if (screen.value === '' || screen.value === '0') {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    }

    // Update button states on screen value change
    screen.addEventListener('input', updateButtonStates);

    buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            let value = e.target.dataset.num;
            if (typeof value !== 'undefined' && isValidFirstCharacter(value)) {
                if (resultCalculated && !isOperator(value)) {
                    screen.value = ''; // Clear the screen if result was previously calculated and a number is entered
                }
                screen.value += value;
                resultCalculated = false;
                updateButtonStates(); // Update button states after each click
            }
        });
    });

    clear.addEventListener('click', function (e) {
        screen.value = '';
        resultCalculated = false;
        updateButtonStates();
    });

    equal.addEventListener('click', function (e) {
        if (screen.value !== '') {
            try {
                let answer = eval(screen.value);
                screen.value = answer;
                resultCalculated = true; // Set flag to true when result is calculated
                updateButtonStates();
            } catch (error) {
                screen.value = 'Error';
                resultCalculated = false;
            }
        }
    });

    // Attach the backspace function to the button with the 'backspace' id
    document.querySelector('#backspaceButton').addEventListener('click', function () {
        screen.value = screen.value.slice(0, -1);
        updateButtonStates();
    });

    document.getElementById('ceButton').addEventListener('click', function () {
        clearEntry();
        updateButtonStates();
    });

    document.querySelector('#percentageButton').addEventListener('click', function (e) {
        calculatePercentage();
        updateButtonStates();
    });

    document.querySelector('#togglePlusMinus').addEventListener('click', function (e) {
        togglePlusMinus();
        updateButtonStates();
    });

    function isValidFirstCharacter(char) {
        const operators = ['+', '-', '*', '/', '%','.'];
        const invalidFirstOperators = ['*', '/', '%', '.'];
        const screenValue = screen.value;
        
        if (screenValue === '' && invalidFirstOperators.includes(char)) {
            return false;
        }
        //  user can not use two operators at the one time
        if (operators.includes(screenValue.slice(-1)) && operators.includes(char)) {
            screen.value = screenValue.slice(0, -1) + char;
            return false;
        }

        //  user can not use two operators as segments at the one value
        const segments = screenValue.split(/[\+\-\*\/%]/);
        if (char === '.' && segments[segments.length - 1].includes('.')) {
            return false;
        }
        return true;
    }

    function isOperator(char) {
        return ['+', '-', '*', '/', '%'].includes(char);
    }
    
    // calculate CalculatePercentage
    function calculatePercentage() {
        let screenValue = screen.value;
        let value = parseFloat(screenValue);
        if (!isNaN(value)) {
            screen.value = (value / 100).toString();
        }
    }
    // Clear Screen
    function clearEntry() {
        let screenValue = screen.value;
        if (screenValue !== '') {
            screen.value = screenValue.slice(0, -1);
        }
    }
    //can make positive namber and nigative number
    function togglePlusMinus() {
        let screenValue = screen.value;
        if (screenValue.startsWith('-')) {
            screen.value = screenValue.slice(1);
        } else {
            screen.value = '-' + screenValue;
        }
    }
})();




