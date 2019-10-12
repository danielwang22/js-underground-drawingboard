
  MoveImage(){
    let lastPoint,currentPoint;

    const mousedown = e =>{
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      this.selected = true;
      this.paint = false;
      this.drag = false;
      lastPoint = {x:mouseX,y:mouseY}
    }
    const mousemove = e =>{
      if(this.selected){
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        currentPoint = {x:mouseX,y:mouseY};

        // this.context.clearRect(0, 0,this.target.width,this.target.height);
        // this.context.fillStyle = "rgba(0, 0, 0, 0.16)";
        // this.context.fillRect(0, 0, this.target.width, this.target.height);
        
        // this.context.globalCompositeOperation = "xor";
        // this.context.fillStyle = "black";
        // this.context.setLineDash([5, 15])
        // this.context.beginPath();
        // this.context.strokeRect(
        //   lastPoint.x,lastPoint.y,
        //   (currentPoint.x - lastPoint.x),
        //   (currentPoint.y - lastPoint.y)
        // );
        // this.context.stroke();
        // this.context.closePath();
      }
    }
    const mouseup = e =>{
      this.selected = false;
      let area = {
        width : currentPoint.x - lastPoint.x,
        height : currentPoint.y - lastPoint.y
      }
      console.log(area)
      this.dragSelector(lastPoint,area)
    }
    const mouseleave = e =>{
      this.selected = false;
    }

    this.target.addEventListener("mousedown", mousedown);
    this.target.addEventListener("mousemove", mousemove);
    //Mouse up&leave on the Document     
    document.addEventListener("mouseup", mouseup);
    document.addEventListener("mouseleave", mouseleave);

  }
  dragSelector(start,area){
    let context,lastPoint,currentPoint;
    const mousedown = e =>{
      this.selected = false;
      this.drag = true;
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      lastPoint = {x:mouseX,y:mouseY};
      context = this.context.getImageData(start.x, start.y, area.width, area.height);
    }
    const mousemove = e =>{
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      currentPoint = {x:mouseX,y:mouseY};
      if(this.drag){
        this.context.clearRect(lastPoint.x,lastPoint.y,area.width,area.height);
        this.context.putImageData(context,lastPoint.x,lastPoint.y)
      }
      lastPoint = currentPoint;
    }
    const mouseup = e =>{
      this.drag = false;
    }

    this.target.addEventListener("mousedown", mousedown);
    this.target.addEventListener("mousemove", mousemove);
    //Mouse up&leave on the Document     
    document.addEventListener("mouseup", mouseup);
  }