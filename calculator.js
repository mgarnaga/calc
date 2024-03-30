let firstNum;
let secondNum;
let operator;

const regex = /(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)/;

function operate(x, y, operator) {
    switch (operator) {
        case '+':
            return (x + y);
        case '-':
            return (x - y);
        case '*':
            return (x * y);
        case '/':
            return (x / y);
    };
};


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
            if (btn.className == 'number') {
                document.querySelector('#display').textContent += btn.id;
                document.querySelectorAll('.operator').forEach(oprtr => {
                    oprtr.removeAttribute('disabled');
                })
                document.querySelector('.dot').removeAttribute('disabled');

            } else if (btn.className == 'clear') {
                document.querySelector('#display').textContent = '';
                document.querySelectorAll('.operator').forEach(oprtr => {
                    oprtr.setAttribute('disabled', 'true');
                })
                document.querySelector('.dot').setAttribute('disabled', 'true');

            } else if (btn.className == 'result') {
                const raw = document.querySelector('#display').textContent;
                let expression = raw.match(regex);
                console.log(expression);
                firstNum = parseFloat(expression[1]);
                secondNum = parseFloat(expression[4]);
                operator = expression[3];
                let fin = operate(firstNum, secondNum, operator);
                console.log(fin);
                document.querySelector('#display').textContent = fin;
                document.querySelectorAll('.operator').forEach(oprtr => {
                    oprtr.removeAttribute('disabled');
                })
                document.querySelector('.dot').removeAttribute('disabled');

            } else if (btn.className == 'dot') {
                let expression = document.querySelector('#display').textContent
                let exp = expression.match(regex);
                if (exp == null) {
                    if (expression.includes('.')) {
                        btn.setAttribute('disabled', 'true');
                    }
                    else {
                        document.querySelector('#display').textContent += btn.id;
                        btn.setAttribute('disabled', 'true');
                        document.querySelectorAll('.operator').forEach(oprtr => {
                            oprtr.setAttribute('disabled', 'true');
                        })
                    }
                } else if (exp[3] != undefined && exp[4].includes('.')) {
                    btn.setAttribute('disabled', 'true');
                } else {
                    document.querySelector('#display').textContent += btn.id;
                    btn.setAttribute('disabled', 'true');
                    document.querySelectorAll('.operator').forEach(oprtr => {
                        oprtr.setAttribute('disabled', 'true');
                    })
                }


            } else {
                document.querySelector('#display').textContent += btn.id;
                document.querySelectorAll('.operator').forEach(oprtr => {
                    oprtr.setAttribute('disabled', 'true');
                })
                document.querySelector('.dot').setAttribute('disabled', 'true');
            };
            
        };
    })
});

window.addEventListener('keyup', (event) => {
    const key = document.querySelector(`button[id='${event.key}']`);
    key.click();
});