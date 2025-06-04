function capital(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reverse(string){
    let reversedStr = '';
    for (let i = string.length - 1; i >= 0; i--){
        reversedStr += string[i];
    }
    return reversedStr;
}

class Calculator {
    add(x, y){
        return x + y;
    }

    subtract(x, y){
        return x - y;
    }

    multiply(x, y){
        return x*y;
    }

    divide(x, y){
        return x / y;
    }
}

function caesarCipher(str, num){
    let cipher = '';

    for(let char of str) {
        let isAlphabet = /[a-z]/i.test(char);
        let isUpper = /[A-Z]/.test(char);

        if(isAlphabet){
            let charCode = char.charCodeAt();

            if(isUpper){
                charCode -= 65;
                charCode += num;
                charCode %= 26;
                charCode += 65;
            } else {
                charCode -= 97;
                charCode += num;
                charCode %= 26;
                charCode += 97;
                
            }
            cipher += String.fromCharCode(charCode);
        } else {
            cipher += char;
        }
    }
    return cipher;
}

function analyzeArray(arr){
    let min = arr[0];
    let max = arr[0];
    let length = 0;
    let sum = 0;
    for(let num of arr){
        length += 1;
        sum += num;
        if(num < min) min = num;
        if(num > max) max = num;
    }
    return {
        average: sum / length,
        min: min,
        max: max,
        length: length
    }
}


module.exports = {
    capital: capital,
    reverse: reverse,
    calculator: new Calculator(),
    caesarCipher: caesarCipher,
    analyzeArray: analyzeArray,

}