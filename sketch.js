//Create variable
var dog, happyDog,sadDog,foodStock
var lastFeed

function preload()
{
	//load images here
  happyDog=loadImage('images/dogImg.png')
  sadDog=loadImage('images/dogImg1.png')
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database()
  dog=createSprite(800,200,150,150)
  dog.addImage(sadDog);
  dog.scale=0.2
  ref=database.ref('Food');
  ref.on('value',readOp)
  var addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(add)
  var feed=createButton("feed")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  food =new Food()
}
function readOp(data){
foodStock=data.val();
food.updateFoodStock(foodStock)
}

function draw() {  
background(46,139,87);
/*if(keyWentDown(UP_ARROW)){
  writeStock(foodStock)
  dog.addImage(happyDog)
}*/
  drawSprites();
  //add styles here
  fill(255,255,254); stroke("black"); 
  text("Food remaining : "+foodStock,50,50);
   textSize(13); text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

food.display()
database.ref('lastFed').on('value',function(data){
  lastFeed=data.val()
})
if(lastFeed>=12){
  text('last feed :'+ lastFeed%12+"pm",350,30)
}else if(lastFeed===0){
  text('lastFeed:12 am',350,30)
}else{
  text('last feed :'+lastFeed+"am",350,30)
}
}
/*function writeStock(foodStock){
  if(foodStock<=0){
    foodStock=0
  }else{
    foodStock=foodStock-1
  }
  database.ref('/').update({
    Food:foodStock
  })
}*/
 function add(){
   foodStock++ 
   database.ref('/').update({
     Food:foodStock
   })
 }
function feedDog(){
  dog.addImage(happyDog)
  if(food.getFoodStock()<=0){
    food.updateFoodStock(0)
  }else{
    food.updateFoodStock(food.getFoodStock()-1)
  }
  database.ref('/').update({Food:food.getFoodStock(),lastFed:hour()})
}

