let jsonobj;
let btns = [] //manage all btn
let n = 0;
//預讀取

function preload(){ 
  jsonobj =loadJSON('data.json'); 
  //for file 路徑 -> jsonobj =loadJSON('.assets/data0.json'); 
  img = loadImage('map.jpg');
}

function setup() {
  //guide by alert (\n -> next line)
  alert("Earthquake Information: \nIf you want to see the information about longtitude, latitude, magnitude, please press key 'F12'. \n\nAutoplay Music: Earfquake by Tyler The Creator \n[Spoiler! Be Careful of The Volume!]");
  //Audio (element set to sutoplay)
    ele = createAudio('earfquake.mp3');
    ele.autoplay(true);
  //canvas size
  createCanvas(360,180); 
  console.log(jsonobj);
  console.log(jsonobj.metadata.count);
  console.log(jsonobj.features[0].geometry.coordinates);
  jsonobj.features.forEach((v)=>{
    let lat = v.geometry.coordinates[0];
    let lang = v.geometry.coordinates[1];
    let mag = v.properties.mag;
    //根據每筆資料製作 btn 物件
    btns.push(new btn(lat+180,180-(lang+90),mag*mag*1.3));
    // shadow effect in blue color
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'blue';
    ellipse(width/2,height/2,25,25);
  });
}

function draw() { 
  //background(80);
  image(img,0,0,360,180);
  //根據 btns 袋子中每個物件進行顯示
  btns.forEach((b)=>{
    b.display();
  })
}

//建立物件導向 按鈕
class btn{
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
  }
  display(){
    if (mouseX > this.x-this.size/2 &&
        mouseX < this.x+this.size/2 &&
        mouseY > this.y-this.size/2 &&
        mouseY < this.y+this.size/2){
          fill(255-10*sin(n),100,100,this.size*1.5);
          square(this.x-(this.size/2),this.y-(this.size/2),this.size*0.8+6*sin(n),this.size*0.25);
          //change to rounded square when mouse on it
    }
    else{
          fill(100,255,100,this.size*1.5);
          n = n+0.0001;
          circle(this.x,this.y,this.size*0.8+6*sin(n));
    }
    noStroke();
    //circle(this.x,this.y,this.size);
  }
}
