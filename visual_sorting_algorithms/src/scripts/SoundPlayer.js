class SoundPlayer {
    #index;
    #frequencies;
    constructor(audioContext) {
        this.#index = 0;
        this.#frequencies = [432.0];
        this.audioContext = audioContext;
        this.oscillator;
        this.attackTime = 0.1; // Default attack time
        this.decayTime = 0.2; // Default decay time
        this.sustainLevel = 0.5; // Default sustain level
        this.releaseTime = 0.3; // Default release time
        this.gainNode = null; // Default gain node
        this.#initOscillator();
        this.multiplier = 1.0;
    }

    setFrequencies(arr=[432.0]) {
        if (arr.constructor == (Array || Float32Array || Float64Array)) {
            this.#frequencies = arr;
        }
    }
    clearFrequencies() {
        this.#frequencies = [432.0];
    }
    getDelayTimeMS(){
        return (this.attackTime+this.decayTime+this.releaseTime)*this.multiplier*1000;
    }
    #initOscillator(){
        this.oscillator=this.audioContext.createOscillator();
        this.oscillator.type='sine';
    }
    setAttackTime(time) {
        this.attackTime = time;
    }

    setDecayTime(time) {
        this.decayTime = time;
    }

    setSustainLevel(level) {
        this.sustainLevel = level;
    }

    setReleaseTime(time) {
        this.releaseTime = time;
    }

    setGainNode(gainNode) {
        this.gainNode = gainNode;
    }
    setTimeMultiplier(factor=0.5) {
        this.multiplier = factor;
    }
    
    //When playNext reaches to end of the array set index pointer to the 0 
    resetPlay() {
        this.#index = 0;
    }

    //Plays frequencies sequentially in the array 
    playNext() {
        if (this.#index < this.#frequencies.length)
            this.playFrequency(this.#frequencies[this.#index++]);
        else this.resetPlay();
    }
    
    //Plays one frequency at a time 
    playFrequency(frequency) {
    
        this.#initOscillator();

        //Copying properties of this object to use them in local scope of playFrequency method
        let { audioContext, oscillator, attackTime, decayTime, sustainLevel, releaseTime, gainNode } = this;
        
        attackTime *= this.multiplier;
        decayTime *= this.multiplier;
        releaseTime *= this.multiplier;
        
        // Connecting gain node to the  destination
        const gain = audioContext.createGain();
        gain.connect(gainNode || audioContext.destination);

        //Connecting the oscillator node to the gain so we can apply the ADSR envelope
        oscillator.connect(gain);
        oscillator.frequency.value = frequency;

        /*
          ADSR
          Attack,Decay,Sustain,Release
        */

        // Attack
        oscillator.start(audioContext.currentTime);
        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime);

        // Decay
        gain.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + attackTime + decayTime);

        // Sustain
        gain.gain.setValueAtTime(sustainLevel, audioContext.currentTime + attackTime + decayTime);
        
        // Release
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + attackTime + decayTime + releaseTime);

        //Stop the oscillator so sound is stopped 
        oscillator.stop(audioContext.currentTime + attackTime + decayTime + releaseTime);
        
        //Releasing the memory
        delete this.oscillator;
    }
}

function allowAudio(event) {

    if (event.target.parentElement != (document.body || document.html || window))
        event.target.parentElement.style.display = 'none';
    else
        event.target.style.display = 'none';
    return new SoundPlayer(new (window.AudioContext || window.webkitAudioContext)());
    
}