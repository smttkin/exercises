//Returns rand integer in the given range
function randInt(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Creates random integer array in the given range
function createRandArr(length,min,max){
    var array = [];
    for (var i = 0; i < length; i++) {
        var randomInt = randInt(min,max);
        array.push(randomInt);
    }
    return array;
} 

//Returns promise that will wait for given ms milliseconds
/*You can use in async function with await keyword*/
function  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  