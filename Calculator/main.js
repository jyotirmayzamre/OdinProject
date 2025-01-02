function evalPost(exp){
    let stack = [];
    for(let i=0; i < exp.length(); i++){
        let char = parseInt(exp[i]);
        if(isNaN(char)){
            let dig1 = stack.pop();
            let dig2 = stack.pop();
            switch(char){
                case '+':
                    stack.push(dig2+dig1);
                    break;
                case '-':
                    stack.push(dig2 - dig1);
                    break;
                case '*':
                    stack.push(dig2 * dig1);
                    break;
                case '/':
                    stack.push(dig2 / dig1);
                    break;
            }
        } else{
            stack.push(char);
        }
    }
    return stack.pop();
}