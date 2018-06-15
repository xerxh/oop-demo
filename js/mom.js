//动态效果鱼妈妈
var momObj=function() {

    this.x;
    this.y;
    this.angle;//大鱼游动的角度
    this.bigEye = []; //保存大鱼眼睛数组
    this.bigBody = []; //保存大鱼身体数组
    this.bigTail = []; //保存大鱼尾巴数组
    //控制大鱼尾巴[0,1,2,3,4,5,6,7]
    //创建一个变量保存尾巴下标
    this.bigTailIndex = 0;   //尾巴图片下标
    //创建两个变量保存切换图片的时间差
    //开始总时间
    this.bigTailStart = 1;  //尾巴开始计时
    this.bigTailEndtime =200; //结尾时间
    //控制大鱼身体[0,1,2,3,4,5,6,7]

    this.bigBodyIndex = 0;  //身体图片下标
    this.bigBodyStart = 1;  //身体部分计时开始
    this.bigBodyEndtime = 3000; //结尾时间

    this.bigEyeIndex=0; //眼睛下标
    this.bigEyeStart=1;
    this.bigEyeEndtime=3000;

}

momObj.prototype.init=function(){
    //大鱼初始化在屏幕中间
    this.x=canWidth/2;
    this.y=canHeight/2;
    this.angle=0;
    //初始化鱼眼睛
    for(var i=0;i<2;i++){
        this.bigEye[i]=new Image();
        this.bigEye[i].src="./src/bigEye"+i+".png";
    }
    //console.log(this.bigEye)
    //初始化鱼身体
    for(var i=0;i<8;i++){
        this.bigBody[i]=new Image();
        this.bigBody[i].src="./src/bigSwim"+i+".png";
    }
    //console.log(this.bigBody);
    //初始化鱼尾巴
    for(var i=0;i<8;i++){
        this.bigTail[i]=new Image();
        this.bigTail[i].src="./src/bigTail"+i+".png";
    }
    //console.log(this.bigTail);

};
momObj.prototype.draw=function(){

    //计算新坐标
    this.x=lerpDistance(mx,this.x,0.98);
    this.y=lerpDistance(my,this.y,0.98);
    //console.log(this.x+"___"+this.y)

    //计算鱼游动角度
        //获取坐标差
    var deltaY=my-this.y;
    var deltaX=mx-this.x;
        //计算角度差
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
        //获取趋向角度
    this.angle=lerpAngle(beta,this.angle,0.9);

    //计算当前显示大鱼身体图片小标
    this.bigBodyStart=this.bigBodyStart+deltaTime;
    //结果开始计时的时长大于总时长
    if(this.bigBodyStart>this.bigBodyEndtime){

    //    console.log(1);
        this.bigBodyStart=1;
        this.bigBodyIndex=this.bigBodyIndex+1;
        //如果大于7只显示最后一张图片
        if(this.bigBodyIndex>7){
            this.bigBodyIndex=7;
        }

    }

    //console.log(this.bigTailEndtime);
    //计算尾巴的时间
    this.bigTailStart=this.bigTailStart+deltaTime;
    if(this.bigTailStart>this.bigTailEndtime){
        //this.bigTailIndex=1;
        this.bigTailStart=1;
        this.bigTailIndex=(this.bigTailIndex+1)%8; //0-7自动循环
    }
    //console.log(this.bigTailIndex);

    //计算眼睛的时间
    this.bigEyeStart=this.bigEyeStart+deltaTime;
    if(this.bigEyeStart>this.bigEyeEndtime){
        //this.bigTailIndex=1;
        this.bigEyeStart=1;
        this.bigEyeIndex=(this.bigEyeIndex+1)%2; //0-1自动循环
        if(this.bigEyeIndex==1){
            this.bigEyeEndtime=100;
        }else{
            this.bigEyeEndtime=3000;
        }
    }

    //console.log(this.bigBodyIndex);

    //绘制大鱼
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    //画鱼身体
    ctx1.drawImage(this.bigBody[this.bigBodyIndex],
                    -this.bigBody[this.bigBodyIndex].width*0.5,
                    -this.bigBody[this.bigBodyIndex].height*0.5);

    //画鱼尾巴
    ctx1.drawImage(this.bigTail[this.bigTailIndex],
                    -this.bigTail[this.bigTailIndex].width*0.5+27,
                    -this.bigTail[this.bigTailIndex].height*0.5);

    ctx1.drawImage(this.bigEye[this.bigEyeIndex],
                    -this.bigEye[this.bigEyeIndex].width*0.5,
                    -this.bigEye[this.bigEyeIndex].height*0.5);

    ctx1.restore();

};
////大鱼妈妈
//var momObj= function () {
//    this.x;
//    this.y;
//    this.bigEye=new Image(); //大鱼眼睛
//    this.bigBody=new Image();//大鱼身体
//    this.bigTail=new Image();//大鱼尾巴
//}
////初始化大鱼妈妈
//momObj.prototype.init=function(){
//    this.x=canWidth/2;
//    this.y=canHeight/2;
//    this.bigEye.src='./src/bigEye0.png';
//    this.bigBody.src='./src/bigSwim0.png';
//    this.bigTail.src='./src/bigTail0.png';
//}
////绘制大鱼方法
//momObj.prototype.draw=function(){
//    //大鱼坐标位置随着鼠标移动而移动
//    this.x=mx;
//    this.y=my;
//    //绘制大鱼
//    ctx1.clearRect(0,0,800,600);
//    ctx1.save();
//    ctx1.translate(this.x,this.y);
//    ctx1.drawImage(this.bigEye,16,20);
//    ctx1.drawImage(this.bigBody,0,0);
//    ctx1.drawImage(this.bigTail,this.bigBody.width*0.5+13,6);
//    ctx1.restore();
//}