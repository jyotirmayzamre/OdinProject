function fibs(num){
    let arr = [0, 1];
    let length = arr.length;
    while(num > 2){
        let newNum = arr[length - 1] + arr[length - 2];
        length = arr.push(newNum);
        num -= 1;
    }
    return arr;
}


function mergeSort(arr){
    const length = arr.length;
    if(length == 1){
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    return merge(mergeSort(arr.slice(0, middle)), mergeSort(arr.slice(middle)));

}

function merge(arr1, arr2){
    let arr3 = []
    let length1 = arr1.length;
    let length2 = arr2.length;

    while(length1 != 0 && length2 != 0){
        if(length1 == 0){
            arr3.push(arr2.shift());
            length2 -= 1;
        } else if(length2 == 0){
            arr3.push(arr2.shift());
            length1 -= 1;
        } else{
            let num1 = arr1.shift();
            let num2 = arr2.shift();

            if (num1 < num2){
                arr3.push(num1);
                arr3.push(num2);
            } else {
                arr3.push(num2);
                arr3.push(num1);
            }

            length1 -= 1;
            length2 -= 1;
        }
    }
    return arr3;
}
