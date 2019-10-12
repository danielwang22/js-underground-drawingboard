//大畫板
class DrawBoard{
  constructor(target,width,height){
    this.target = target;
    this.width = width;
    this.height = height;
    this.target.width = width;
    this.target.height = height;
    this.curColor = "black";
    this.curSize = 1;
    this.globalAlpha = 1;
    this.paint = false;
    this.selected = false;
    this.drag = false;
    this.lastPoint;
    this.addclick = [];
    this.Type = 'penTypeOne';
    this.STACK_MAX_SIZE = 30;
    this.undoDataStack = [];
    this.redoDataStack = [];
    this.Random = 0;
    this.distance = 0;
    this.angle = 0;
    this.midPoint = {};
    this.img = new Image();
    this.timeout;
    //Get context
    this.context = this.target.getContext("2d");
    this.context.fillStyle = "rgba(0, 0, 0, 0.16)";
    this.context.fillRect(0, 0, this.target.width, this.target.height);
    this.context.lineJoin = 'miter';
    this.context.lineCap = 'butt';
  }
  //筆刷隨機大小
  set getRandomInt(num){ return this.Random = Math.floor(Math.random() * (num.max - num.min + 1)) + num.min; }
  get getRandomInt(){ return this.Random }
  //筆刷點距離
  set distanceBetween(point) {
    return this.distance = Math.sqrt(Math.pow(point.two.x - point.one.x, 2) + Math.pow(point.two.y - point.one.y, 2));
  }
  get distanceBetween() { return this.distance; }
  //筆刷角度
  set angleBetween(point) {
    return this.angle = Math.atan2( point.two.x - point.one.x, point.two.y - point.one.y );
  }
  get angleBetween() { return this.angle; }
  
  set midPointBtw(point) {
    return this.midPoint = {
      x: point.one.x + (point.two.x - point.one.x) / 2,
      y: point.one.y + (point.two.y - point.one.y) / 2
    };
  }
  get midPointBtw() { return this.midPoint; }

  NormalPen(penType){
    this.Type = penType;
    
    const onMouseDown = (e) => {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      this.paint = true;
      this.selected = false;
      this.drag = false;
      this.lastPoint = { x: mouseX, y: mouseY };

      this.getRandomInt = {max:30 + this.curSize,min:10 + this.curSize};
      this.addclick.push({ 
        x: mouseX, 
        y: mouseY,
        radius: this.getRandomInt,
        opacity: Math.random()
      });
      this.saveDraw();
    }
    const onMouseMove = (e) => {
      if(this.paint) {
       let mouseCurrentX = e.offsetX;
       let mouseCurrentY = e.offsetY;
       this.context.strokeStyle = this.curColor
       this.context.lineWidth = this.curSize;

       this.getRandomInt = {max:20 + this.curSize,min:5 + this.curSize};
       this.addclick.push({ 
         x: mouseCurrentX, 
         y: mouseCurrentY ,
         radius: this.getRandomInt,
         opacity: (Math.random() - 0.2)
        });
       this[this.Type](mouseCurrentX,mouseCurrentY);
      }
    }
    const onMouseUp = () => {
      this.paint = false;
      this.context.globalAlpha = this.globalAlpha;
      this.addclick = [];

      clearTimeout(this.timeout);
    }
    const onMouseLeave = () => {
      this.paint = false;
      this.context.globalAlpha = this.globalAlpha;
      this.addclick = [];

      clearTimeout(this.timeout);
    }
    //Register 
    this.target.addEventListener("mousedown", onMouseDown);
    this.target.addEventListener("mousemove", onMouseMove);
    //Mouse up&leave on the Document     
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
  }
  penTypeOne(X,Y){
    this.context.beginPath();
    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.context.lineTo(X,Y);
    this.context.closePath();
    this.context.stroke();

    this.lastPoint = {x:X,y:Y}

  }
  penTypeTwo(X,Y){
    this.context.beginPath();
    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.getRandomInt = {
      min:(this.curSize + 2), 
      max:(this.curSize + 10)
    };
    this.context.lineWidth = this.getRandomInt;
    this.context.lineTo(X,Y);
    this.context.stroke();

    this.lastPoint = {x:X,y:Y}
  }
  penTypeThree(X,Y){
    this.getRandomInt = {
      min: 0, 
      max:(this.curSize + 2)
    };

    this.context.beginPath();
    this.context.moveTo(this.lastPoint.x - this.getRandomInt, this.lastPoint.y - this.getRandomInt);
    this.context.lineTo(X - this.getRandomInt, Y - this.getRandomInt);
    this.context.stroke();
    
    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.context.lineTo(X, Y);
    this.context.stroke();
    
    this.context.moveTo(this.lastPoint.x + this.getRandomInt, this.lastPoint.y + this.getRandomInt);
    this.context.lineTo(X + this.getRandomInt, Y + this.getRandomInt);
    this.context.stroke();
        
    this.lastPoint = { x: X, y: Y };
  }
  penTypeFour(X,Y){
    this.context.globalAlpha = this.globalAlpha;

    this.context.beginPath();
    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.context.lineTo(X, Y);
    this.context.stroke();
    
    this.context.moveTo(this.lastPoint.x - 2, this.lastPoint.y - 2);
    this.context.lineTo(X - 2, Y - 2);
    this.context.stroke();
    
    this.context.moveTo(this.lastPoint.x - 1, this.lastPoint.y - 1);
    this.context.lineTo(X - 1, Y - 1);
    this.context.stroke();
    
    this.context.moveTo(this.lastPoint.x + 1, this.lastPoint.y + 1);
    this.context.lineTo(X + 1, Y + 1);
    this.context.stroke();
    
    this.context.moveTo(this.lastPoint.x + 2, this.lastPoint.y + 2);
    this.context.lineTo(X + 2, Y + 2);
    this.context.stroke();
      
    this.lastPoint = { x: X, y: Y };
  }
  penTypeFive(X,Y){
    
    this.context.beginPath();
    this.context.globalAlpha = this.globalAlpha;
    this.context.moveTo(this.lastPoint.x - 3, this.lastPoint.y - 3);
    this.context.lineTo(X - 3, Y - 3);
    this.context.stroke();
    
    this.context.globalAlpha = 0.6 - (1 - this.globalAlpha);
    this.context.moveTo(this.lastPoint.x - 1, this.lastPoint.y - 1);
    this.context.lineTo(X - 1, Y - 1);
    this.context.stroke();
    
    this.context.globalAlpha = 0.4 - (1 - this.globalAlpha);
    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.context.lineTo(X, Y);
    this.context.stroke();
    
    this.context.globalAlpha = 0.3 - (1 - this.globalAlpha);
    this.context.moveTo(this.lastPoint.x + 1, this.lastPoint.y + 1);
    this.context.lineTo(X + 1, Y + 1);
    this.context.stroke();

    this.context.globalAlpha = 0.2 - (1 - this.globalAlpha);
    this.context.moveTo(this.lastPoint.x + 3, this.lastPoint.y + 3);
    this.context.lineTo(X + 3, Y + 3);
    this.context.stroke();
      
    this.lastPoint = { x: X, y: Y };
  }
  penTypeSix(X,Y){
    this.context.fillStyle = '#333';
    this.context.lineWidth = 1;
    
    let currentPoint = { x: X, y: Y };
    this.distanceBetween = {one:this.lastPoint, two:currentPoint};
    this.angleBetween = {one:this.lastPoint, two:currentPoint};
    
    for (var i = 0; i < this.distanceBetween; i+=5) {
      let x = this.lastPoint.x + (Math.sin(this.angleBetween) * i);
      let y = this.lastPoint.y + (Math.cos(this.angleBetween) * i);
      this.context.beginPath();
      this.context.arc(x, y,this.curSize, false, Math.PI * 2, false);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    }
    
    this.lastPoint = currentPoint;

  }
  penTypeSeven(X,Y){
    const offsetPoints = (val) => {
      let offsetPoints = [ ];
      for (let i = 0; i < this.addclick.length; i++) {
        offsetPoints.push({ 
          x: this.addclick[i].x + val,
          y: this.addclick[i].y + val
        });
      }
      return offsetPoints;
    }

    const stroke = (points) => {
      let p1 = points[0];
      let p2 = points[1];
      
      this.context.beginPath();
      this.context.moveTo(p1.x, p1.y);
    
      for (let i = 1, len = points.length; i < len; i++) {
        // we pick the point between pi+1 & pi+2 as the
        // end point and p1 as our control point
        this.midPointBtw = {one:p1, two:p2};
        this.context.quadraticCurveTo(p1.x, p1.y, this.midPointBtw.x, this.midPointBtw.y);
        p1 = points[i];
        p2 = points[i+1];
      }
      // Draw last line as a straight line while
      // we wait for the next point to be able to calculate
      // the bezier control point
      this.context.lineTo(p1.x, p1.y);
      this.context.stroke();
    }

    stroke(offsetPoints(-3-this.curSize));
    stroke(offsetPoints(-1-this.curSize));
    stroke(this.addclick);
    stroke(offsetPoints(1+this.curSize));
    stroke(offsetPoints(3+this.curSize));
  }
  penTypeEight(X,Y){
    this.context.fillStyle = this.curColor;

    for (let i = 0; i < this.addclick.length; i++) {
      this.context.globalAlpha = this.addclick[i].opacity - (1 - this.globalAlpha);
      this.context.beginPath();
      this.context.arc(
        this.addclick[i].x, this.addclick[i].y, this.addclick[i].radius, 
        false, Math.PI * 2, false);
      this.context.fill();
    }
  }
  penTypeNine(X,Y){
    this.context.lineWidth = 1;
    const drawStar = (x, y) => {
      let length = 15 + this.curSize;
      this.context.save();
      this.context.translate(x, y);
      this.context.beginPath();
      this.context.rotate((Math.PI * 1 / 10));
      for (var i = 5; i--;) {
        this.context.lineTo(0, length);
        this.context.translate(0, length);
        this.context.rotate((Math.PI * 2 / 10));
        this.context.lineTo(0, -length);
        this.context.translate(0, -length);
        this.context.rotate(-(Math.PI * 6 / 10));
      }
      this.context.lineTo(0, length);
      this.context.closePath();
      this.context.stroke();
      this.context.restore();
    }

    for (let i = 0; i < this.addclick.length; i++) {
      drawStar(this.addclick[i].x, this.addclick[i].y);
    }
  }
  penTypeTen(X,Y){
    let density = 50;
    this.context.fillStyle = this.curColor;
    
    for (let i = density; i--; ) {
      let radius = this.curSize + 30;
      this.getRandomInt = {min:-radius, max:radius};
      let offsetX = X + this.getRandomInt;
      this.getRandomInt = {min:-radius, max:radius};
      let offsetY = Y + this.getRandomInt;
      this.context.fillRect(offsetX, offsetY, 1, 1);
    }
  }
  ClearCanvas(){
    this.context.clearRect(0, 0,this.target.width,this.target.height);
    this.context.globalAlpha = 1;
    this.context.fillStyle = "rgba(0, 0, 0, 0.16)";
    this.context.fillRect(0, 0, this.target.width, this.target.height);
    this.context.globalAlpha = this.globalAlpha;
    this.selected = false;
  }
  saveDraw(){
    this.redoDataStack = [];
    if (this.undoDataStack.length >= this.STACK_MAX_SIZE) {
      this.undoDataStack.pop();
    }
    this.undoDataStack.unshift(this.context.getImageData(0, 0, this.target.width, this.target.height));
  }
  undo(){
    if (this.undoDataStack.length <= 0) return;
    this.redoDataStack.unshift(this.context.getImageData(0, 0, this.target.width, this.target.height));
    const imageData = this.undoDataStack.shift();
    this.context.putImageData(imageData, 0, 0);
  }
  redo(){
    if (this.redoDataStack.length <= 0) return;
    this.undoDataStack.unshift(this.context.getImageData(0, 0, this.target.width, this.target.height));
    const imageData = this.redoDataStack.shift();
    this.context.putImageData(imageData, 0, 0);
  }
}

let drawboard = new DrawBoard(document.getElementById('canvas'),document.body.clientWidth,window.innerHeight);

//Color Picker
class Picker {
    constructor(target, width, height) {
      this.target = target;
      this.width = width;
      this.height = height;
      this.target.width = width;
      this.target.height = height;
      //Get context 
      this.context = this.target.getContext("2d");
      //Circle (Color Selector Circle)
      this.pickerCircle = { x: 20, y: 10, width: 10, height: 10 };

      this.listenForEvents();
    }
    draw() {
        this.build();
    }
    build() {
        //Create a Gradient Color (colors change on the width)
        let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
        //Add Color Stops to the Gradient (from 0 to 1)
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        //Add color picker colors (red, green, blue, yellow...)
        //Render the Color Gradient from the 0's position to the full width and height
        this.context.fillStyle = gradient; ///, set it's style to be the color gradient
        this.context.fillRect(0, 0, this.width, this.height); ///< render it
        //Apply black and white (on the height dimension instead of the width)
        gradient = this.context.createLinearGradient(0, 0, 0, this.height);
        //We have two colors so 0, 0.5 and 1 needs to be used.
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        //set style and render it.
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);
        //Circle 
        this.context.beginPath();
        //Arc renders a circle depending on the position, radius and arc
        this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        //Render it in black but not fill (only stroke)
        this.context.strokeStyle = "black";
        //Render the circle stroke and close the rendering path
        this.context.stroke();
        this.context.closePath();
    }
    listenForEvents() {
        let isMouseDown = false;
        const onMouseDown = (e) => {
          let currentX = e.offsetX;
          let currentY = e.offsetY;
          if(currentY > this.pickerCircle.y && currentY < this.pickerCircle.y + this.pickerCircle.width && currentX > this.pickerCircle.x && currentX < this.pickerCircle.x + this.pickerCircle.width) {
            isMouseDown = true;
          } else {
            this.pickerCircle.x = currentX;
            this.pickerCircle.y = currentY;
          }
        }
        const onMouseMove = (e) => {
          if(isMouseDown) {
           let currentX = e.offsetX;
           let currentY = e.offsetY;
            this.pickerCircle.x = currentX;
            this.pickerCircle.y = currentY;
          }
        }
        const onMouseUp = () => {
          isMouseDown = false;
        }
        //Register 
        this.target.addEventListener("mousedown", onMouseDown);
        this.target.addEventListener("mousemove", onMouseMove);
        this.target.addEventListener("mousemove", () => this.onChangeCallback(this.getPickedColor()));
        //Mouse up on the Document     
        document.addEventListener("mouseup", onMouseUp);
      }
    getPickedColor() {
        //Get the Image Data (pixel value) pointed by the circle by using it's current position
        //getImageData returns an object that has the pixel data (1, 1) is for getting only one pixel.
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        //Return back an object has the RGB color value of the pointed pixel.
        //The data is an array holds the red, green, blue and alpha values of the current pixel 
        return { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };
    }
    onChange(callback) {
        //Save Callback function reference on the class
        this.onChangeCallback = callback;
    }
  }

//Create an instance passing it the canvas, width and height
let picker = new Picker(document.getElementById("color-picker"), 250, 220);

//Draw 
setInterval(() => picker.draw(), 1);

picker.onChange((color) => {
    //Get the preview DOM element
    let selected = document.getElementById('color-circle');
    //Change it's backagroundColor to the current color (rgb CSS function)
    selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    drawboard.curColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
});


document.querySelector('#canvas').addEventListener('mousedown',()=>{
  let PenSize = document.getElementById("pen-size");
  let PenType = document.getElementById("pen-type");
  let ColorPickerContainer = document.getElementById("color-picker-container");
  PenSize.classList.remove("show");
  PenType.classList.remove("silde-out");
  ColorPickerContainer.classList.remove('show');
},false)

const OpenTopBar = () =>{
  let TopBar = document.getElementById("Top-bar");
  TopBar.style.top = TopBar.style.top === "-62px" ? '' : '-62px';
}
const OpenBottomBar = () =>{
  let BottomBar = document.getElementById("bottom-bar");
  BottomBar.classList.toggle("mb-3");
  BottomBar.style.bottom = BottomBar.style.bottom === '-80px' ? '' : '-80px'
}
const OpenLibrary = () =>{
  let Library = document.getElementById("pen-library");
  let Setting = document.getElementById("pen-setting");
  let LibraryContainer = document.getElementById("library-container");
  let SettingContainer = document.getElementById("setting-container");

  Library.style.color = "black";
  Library.style.backgroundColor = "white";
  Setting.style.color = "rgba(0, 0, 0, 0.16)";
  Setting.style.backgroundColor = "#E8E8E8";
  

  LibraryContainer.style.display = "block";
  SettingContainer.style.display = "none";
}
const OpenSetting = () =>{
  let Setting = document.getElementById("pen-setting");
  let Library = document.getElementById("pen-library");
  let SettingImg = document.getElementById("setting-img");
  let LibraryContainer = document.getElementById("library-container");
  let SettingContainer = document.getElementById("setting-container");

  Setting.style.color = "black";
  Setting.style.backgroundColor = "white";
  Library.style.color = "rgba(0, 0, 0, 0.16)";
  Library.style.backgroundColor = "#E8E8E8";

  SettingImg.src = `brush/display-image/${drawboard.Type}.jpg`;

  LibraryContainer.style.display = "none";
  SettingContainer.style.display = "block";
}
const OpenPenSize = () =>{
  let PenSize = document.getElementById("pen-size");
  PenSize.classList.toggle("show");
}
const ChangePenSize = () =>{
  let PenSize = document.querySelector("#pen-size input").value;
  drawboard.curSize = Number(PenSize);
  document.querySelector("#pen-size-text").innerHTML = `${PenSize}`;
  document.querySelector("#pen-size span").innerHTML = `${PenSize}px`;
  document.querySelector("#pen-type-size-value").innerHTML = `${PenSize}px`;
}
const SettingPenSize = () =>{
  let PenSize = document.querySelector("#pen-type-size input").value;
  drawboard.curSize = Number(PenSize);
  document.querySelector("#pen-size-text").innerHTML = `${PenSize}`;
  document.querySelector("#pen-size span").innerHTML = `${PenSize}px`;
  document.querySelector("#pen-type-size-value").innerHTML = `${PenSize}px`;
}
const SettingPenOpacity = () =>{
  let PenOpacity = document.querySelector("#pen-type-opacity input").value;
  drawboard.globalAlpha = Number(PenOpacity) * 0.01;
  document.querySelector("#pen-type-opacity-value").innerHTML = `${PenOpacity}%`;
}
const ChangeLineJoin = (linejoin) =>{
  let LineJoinVal = linejoin.value;
  drawboard.context.lineJoin = LineJoinVal;
}
const ChangeLineCap = (linecap) =>{
  let LineCapVal = linecap.value;
  drawboard.context.lineCap = LineCapVal;
}
const OpenPenType = () =>{
  let PenType = document.getElementById("pen-type");
  PenType.classList.toggle("silde-out");
}
const ChangeTopBrushImage = (e,penType) =>{
  e.prototype.stopPropagation;
  drawboard.NormalPen(penType);
}
const OpenColorPicker = () =>{
  let ColorPickerContainer = document.getElementById("color-picker-container");
  ColorPickerContainer.classList.toggle('show');
}