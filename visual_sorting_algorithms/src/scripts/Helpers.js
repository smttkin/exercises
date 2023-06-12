 function randInt(min=0,max=100){
        return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createRandArr(length,min,max){
    var array = [];
    for (var i = 0; i < length; i++) {
        var randomInt = randInt(min,max);
        array.push(randomInt);
    }
    return array;
} 
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function getOctaveNotes(octave, baseFrequency = 261.63) {
    var noteArray = {};
    for (var i = 0; i < notes.length; i++) {
        var frequency = baseFrequency * Math.pow(2, octave - 4) * Math.pow(2, i / 12);
        noteArray[notes[i]] = frequency;
    }
    return noteArray;
}
function getOctaveNotesArr(octave, baseFrequency = 261.63) {
        var noteArray = [];
        for (var i = 0; i < notes.length; i++) {
            var frequency = baseFrequency * Math.pow(2, octave - 4) * Math.pow(2, i / 12);
            noteArray[i] = frequency;
        }
        return noteArray;
}
function calculateFactors(arr) {
    var max = Math.max(...arr);
    var min = Math.min(...arr);
    var height_factor = this.view_canvas.height / (max - min + 1);
    var width_factor = this.view_canvas.width / arr.length;
    return { max, min, height_factor, width_factor };
}
  function   sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  