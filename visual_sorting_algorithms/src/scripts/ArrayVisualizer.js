
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
    var height_factor = Math.ceil(this.view_canvas.height / (max - min + 1));
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
        
        //Some calculations 
        let { min, max, height_factor, width_factor } =this.calculateFactors(newArr);
      await sleep(sleepms);
      view_canvas_ctx.clearRect(0, 0, this.view_canvas.width, this.view_canvas.height);
      
        callback(newArr,color_arr,each_elem_duration,sleepms,index);

        for (var index = 0; index < newArr.length; index++) {
          
        if (this.onresizecheck) {
          this.onresizecheck = null;
          this.updateView(newArr, color_arr, each_elem_duration, sleepms);
          return;
        }
          var val = newArr[index];
          
        view_canvas_ctx.fillStyle = (color_arr.length<newArr.length)?color_arr[Math.floor(color_arr.length * val / (max - min + 1))]:color_arr[index];
        var x = (index-1) * width_factor;
        var y = this.view_canvas.height - (height_factor * val);
        var w = width_factor;
        var h = val * height_factor;
        view_canvas_ctx.fillRect(x, y, w, h);
        if (each_elem_duration > 1)
              await sleep(each_elem_duration);
        
        }
  }
  
 
}