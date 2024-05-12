export function HRTFConvolver(audioContext) {
    this.buffer = audioContext.createBuffer(2, 200, audioContext.sampleRate);
    this.convolver = audioContext.createConvolver();
    this.convolver.normalize = false;
    this.convolver.buffer = this.buffer;
    this.gainNode = audioContext.createGain();
  
    this.convolver.connect(this.gainNode);
  
    this.fillBuffer = function(hrirLR) {
      var bufferL = this.buffer.getChannelData(0);
      var bufferR = this.buffer.getChannelData(1);
      for (var i = 0; i < this.buffer.length; ++i) {
        bufferL[i] = hrirLR[0][i];
        bufferR[i] = hrirLR[1][i];
      }
      this.convolver.buffer = this.buffer;
    }
  }
  

