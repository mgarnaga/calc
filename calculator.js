let firstNum;
let secondNum;
let operator;

const regex = /(-?\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)/;

function operate(x, y, operator) {
    switch (operator) {
        case '+':
            return (x + y);
        case '-':
            return (x - y);
        case '*':
            return (x * y);
        case '/':
            if (y === 0) {
                alert('Naughty!')
                return '';
            } else {
                return (x / y);
            }
    };
};


document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
            if (btn.className == 'number') {
                document.querySelector('#display').textContent += btn.id;
                if (document.querySelector('#display').textContent.length > 14) {
                    document.querySelector('#display').textContent = document.querySelector('#display').textContent.substring(0, 14);
                }
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
                if (expression == null) {
                    return;
                } else {
                    firstNum = parseFloat(expression[1]);
                    secondNum = parseFloat(expression[4]);
                    operator = expression[3];
                    let fin = operate(firstNum, secondNum, operator);
                    document.querySelector('#display').textContent = rounding(fin);
                    if (document.querySelector('#display').textContent.length > 14) {
                        document.querySelector('#display').textContent = document.querySelector('#display').textContent.substring(0, 14);
                    }
                    document.querySelectorAll('.operator').forEach(oprtr => {
                        oprtr.removeAttribute('disabled');
                    })
                    document.querySelector('.dot').removeAttribute('disabled');
                };

            } else if (btn.className == 'dot') {
                const expression = document.querySelector('#display').textContent;
                let exp = expression.match(regex);
                if (exp == null) {
                    if (expression.includes('.')) {
                        btn.setAttribute('disabled', 'true');
                    }
                    else {
                        document.querySelector('#display').textContent += btn.id;
                        if (document.querySelector('#display').textContent.length > 14) {
                            document.querySelector('#display').textContent = document.querySelector('#display').textContent.substring(0, 14);
                        }
                        btn.setAttribute('disabled', 'true');
                        document.querySelectorAll('.operator').forEach(oprtr => {
                            oprtr.setAttribute('disabled', 'true');
                        })
                    }
                } else if (exp[3] != undefined && exp[4].includes('.')) {
                    btn.setAttribute('disabled', 'true');
                } else {
                    document.querySelector('#display').textContent += btn.id;
                    if (document.querySelector('#display').textContent.length > 14) {
                        document.querySelector('#display').textContent = document.querySelector('#display').textContent.substring(0, 14);
                    }
                    btn.setAttribute('disabled', 'true');
                    document.querySelectorAll('.operator').forEach(oprtr => {
                        oprtr.setAttribute('disabled', 'true');
                    })
                }

            // btn == class operator
            } else {
                const raw = document.querySelector('#display').textContent;
                let exp = raw.match(regex)
                if (exp == null) {
                    document.querySelector('#display').textContent += btn.id;
                    if (document.querySelector('#display').textContent.length > 14) {
                        document.querySelector('#display').textContent = document.querySelector('#display').textContent.substring(0, 14);
                    }
                    document.querySelectorAll('.operator').forEach(oprtr => {
                        oprtr.setAttribute('disabled', 'true');
                    })
                    document.querySelector('.dot').setAttribute('disabled', 'true');
                } else {
                    firstNum = parseFloat(exp[1]);
                    secondNum = parseFloat(exp[4]);
                    operator = exp[3];
                    let fin = operate(firstNum, secondNum, operator);
                    if (fin == '') {
                        document.querySelector('#display').textContent = fin;
                        document.querySelectorAll('.operator').forEach(oprtr => {
                            oprtr.setAttribute('disabled', 'true');
                        })
                        document.querySelector('.dot').setAttribute('disabled', 'true');
                    } else {
                        document.querySelector('#display').textContent = rounding(fin) + btn.id;
                        if (document.querySelector('#display').textContent.length > 14) {
                            document.querySelector('#display').textContent = document.querySelector('#display').textContent.substring(0, 14);
                        }
                        document.querySelectorAll('.operator').forEach(oprtr => {
                            oprtr.removeAttribute('disabled');
                        })
                        document.querySelector('.dot').removeAttribute('disabled');
                    };
                }
            };
            
        };
    })
});

window.addEventListener('keyup', (event) => {
    const key = document.querySelector(`button[id='${event.key}']`);
    if (key == null) {
        return;
    }
    key.click();
});

function rounding(num) {
    return Math.round(num * 100000) / 100000;
}