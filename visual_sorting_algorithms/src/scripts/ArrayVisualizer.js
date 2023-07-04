
class ArrayVisualizer {
    constructor() {
      this.screenHeight = null;
      this.screenWidth = null;
      this.padding = 4;
      this.view_container = document.getElementById('view-container');
      this.view_canvas = document.getElementById('view-canvas');
      this.audioContext = null;
      this.each_elem_duration = 500;
      this.onresizecheck = null;
  
    }
    calculateFactors(arr) {
      var max = Math.max(...arr);
      var min = Math.min(...arr);
      var height_factor = Math.ceil(this.view_canvas.height / (max - min +1));
      var width_factor = Math.ceil(this.view_canvas.width / arr.length);
      return { max, min, height_factor, width_factor };
    }
    onReSize(e) {
      this.onresizecheck = e;
      this.view_container = document.getElementById("view-container");
      this.view_canvas = document.getElementById("view-canvas");
      let canvas = document.getElementById("view-canvas");

      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;

      if (this.screenHeight < this.screenWidth) {
        this.view_container.style.width = this.screenHeight + "px";
        this.view_container.style.height = this.screenHeight + "px";
        this.view_canvas.style.width = this.screenHeight - this.padding + "px";
        this.view_canvas.style.height = this.screenHeight - this.padding + "px";
        this.view_canvas.setAttribute("width", this.screenWidth - this.padding);
        this.view_canvas.setAttribute("height", this.screenHeight - this.padding);
      } else {
        this.view_container.style.width = this.screenWidth + "px";
        this.view_container.style.height = this.screenWidth + "px";
        this.view_canvas.style.width = this.screenWidth - this.padding + "px";
        this.view_canvas.style.height = this.screenWidth - this.padding + "px";
        this.view_canvas.setAttribute("width", this.screenWidth - this.padding);
        this.view_canvas.setAttribute("height", this.screenHeight - this.padding);
      }

    }

    clearView() {
      this.view_canvas = document.getElementById("view-canvas");
      this.view_canvas.clearRect(0, 0, this.view_canvas.width, this.view_canvas.height);
    }
    
    async updateView(newArr = [1], color_arr = ["red"], each_elem_duration = 0.01, sleepms = 500, callback = (arr,color_arr,each_elem_duration,sleepms,index) => { }) {
      //Object that allows to manipulate canvas context
      var view_canvas_ctx = this.view_canvas.getContext('2d');
      
      //Some calculations about how array elements will be positioned and scaled as rectangle in canvas  
      let { min, max, height_factor, width_factor } =this.calculateFactors(newArr);
      
      //Wait for sleepms milliseconds on each updateView frame
      if(sleepms>0)
        await sleep(sleepms);

      //Cleaning canvas 
      view_canvas_ctx.clearRect(0, 0, this.view_canvas.width, this.view_canvas.height);

      //Additional things may user want to do with array
      callback(newArr,color_arr,each_elem_duration,sleepms,index);

      for (var index = 0; index < newArr.length; index++) {
        
        //Redraw the array elements onto the new scaled canvas 
        //If onReSize function executed while updateView is still running
        if (this.onresizecheck) {
          this.onresizecheck = null;
          this.updateView(newArr, color_arr, each_elem_duration, sleepms);
          return;
        }
        
        //Wait for each element drawing if it is wanted
        if (each_elem_duration > 0)
          await sleep(each_elem_duration);
        
        //Current element
        var val = newArr[index];

        //Calculation of coordiante and scale values 
        /*so we can draw all the elements properly into the canvas*/
        var x = index * width_factor+index;
        var y = this.view_canvas.height - (height_factor * (val));
        var w = width_factor-1;
        var h = val * height_factor;
                
        //Gathering current element's color from color_arr
        /*
          Special case: If there is less color info then newArr element count
          The colors of array elements should be repeated periodically
        */
        view_canvas_ctx.fillStyle = (color_arr.length<newArr.length)?color_arr[index%(color_arr.length)]:color_arr[index];
        
        //Drawing the rectangle for the current element into the canvas
        view_canvas_ctx.fillRect(x, y, w, h);

   
      }
  }
  
 
}