function eval() {
    // Do not use eval!!!
    return;
}

const characterFunc = {
    "+": (a,b)=>a+b,
    "-": (a,b)=>a-b,
    "*": (a,b)=>a*b,
    "/": (a,b)=>{
        if(b==0) throw("TypeError: Division by zero.");
        return a/b;},
};

function expressionCalculator(expr) {
    let regexp =/\([^()]+\)/;
    while (/[\(\)]/.test(expr)) {
    let str = expr.match(regexp);
    if(!str) {
        throw("ExpressionError: Brackets must be paired");
    } else {
        expr = expr.replace(regexp, calculator(str[0]));
    }  
}

return calculator(expr);

}

function calculator(str){
    let  newElement, arg;
    let mas = str.match(/[-+\*\/]|\d+\.\d+|\d+/g);
   
    for (let i=0; i<mas.length; i++) {
        if(mas[i]=="*"||mas[i]=="/") {
            if(characterFunc[mas[i+1]]) {
                newElement = characterFunc[mas[i]](+mas[i-1], -mas[i+2]);
                mas.splice(i-1, 4, newElement);
                i--;

            } else {
            newElement = characterFunc[mas[i]](+mas[i-1], +mas[i+1]);
            mas.splice(i-1, 3, newElement);
            i--;}
        } 
    } 

    for (let i=0; i<mas.length; i++) {
        if(mas[i]=="-"||mas[i]=="+") {
            if (!mas[i-1]) {
                newElement = characterFunc[mas[i]](0, +mas[i+1]);
                mas.splice(i, 2, newElement);

            }else if(characterFunc[mas[i+1]]) {
                newElement = characterFunc[mas[i]](+mas[i-1], -mas[i+2]);
                mas.splice(i-1, 4, newElement);
                i--;
            } else {
            newElement = characterFunc[mas[i]](+mas[i-1], +mas[i+1]);
            mas.splice(i-1, 3, newElement);
            i--;}            
        } 
    }
    return +mas[0];
}


module.exports = {
    expressionCalculator
}
