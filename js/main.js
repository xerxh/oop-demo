//游戏入口程序
document.body.onload=game;

//创建变量保存两个画布，两只画笔
var can1=null;
var can2=null;
var ctx1=null;
var ctx2=null;
//创建变量保存画布宽度高度
var canWidth=0;
var canHeight=0;
//创建变量保存背景图片
var bgPic=new Image();
//创建变量保存海葵类
var ane=null;
//保存fruit食物
var fruit=null;
//创建二个变量
var lastTime=null;   //上一帧执行时间
var deltaTime=null;  //二帧之间间隔

//创建二个变量保存鼠标移动位置
//鱼妈妈游戏跟随鼠标移动
var mx =0;
var my =0;
//保存大鱼对象
var mom=null;

//保存小鱼对象
var baby=null;

//游戏主函数
function game(){
    init();
    gameloop();
}

//初始化函数 获取画布，画笔，创建对象，加载图像、初始化基础数据
function init(){
   // getElementById
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");
    ctx1=can1.getContext("2d");
    ctx2=can2.getContext("2d");
    canWidth=can1.width;
    canHeight=can1.height;
    bgPic.src="src/background.jpg";
    //创建海葵类的对象 调用初始化方法
    ane=new aneObj();
    ane.init();
    //创建果实对象 调用初始化方法
    fruit=new fruitObj();
    fruit.init();
    //初始化二帧时间间隔
    lastTime=Date.now();
    deltaTime=0;
    //为每一个画布绑定鼠标移动事件处理函数
    can1.addEventListener("mousemove",onMouseMove,false);
    //创建大鱼对象
    mom=new momObj();
    mom.init();
    //创建小鱼对象
    baby=new babyObj();
    baby.init();
}

//程序主循环函数(画元素)
function gameloop(){
  //setInterval(drawBackground,500)
  requestAnimFrame(gameloop); //动态计算时间,新兼容性问题
  //计算二帧之间的时间间隔
  var now=Date.now();
  deltaTime=now-lastTime;
  //console.log(deltaTime);
  lastTime=now;
  //特殊情况:浏览器太慢时
  if(deltaTime>40)deltaTime=40;
  drawBackground(); //画背景
  ctx1.clearRect(0,0,canWidth,canHeight);
  ane.draw(); //画海葵
  fruitMonitor(); //监听画布上果实数量
  fruit.draw(); //画食物
  mom.draw();  //画大鱼
  baby.draw(); //画小鱼
  momFruitsCollision(); //碰撞检测
  momBabyCollistion()  ;//大鱼小鱼碰撞检测
}
//创建函数获取鼠标移动位置
function onMouseMove(e){
    if(e.offsetX|| e.layerX){
       mx= e.offsetX==undefined? e.layerX: e.offsetX;
    }
    if(e.offsetY|| e.layerY){
        my= e.offsetY==undefined? e.layerY: e.offsetY;
    }
}