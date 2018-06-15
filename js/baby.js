//创建小鱼类
var  babyObj=function(){

    //保存小鱼坐标
    this.x;
    this.y;
    //保存小鱼游动角度
    this.angle;
    //保存小鱼 身体 尾巴 眼睛 图片
    this.babyEye=[];
    this.babyBody=[];
    this.babyTail=[];

    this.babyTailIndex = 0;   //尾巴图片下标
    //创建两个变量保存切换图片的时间差
    //开始总时间
    this.babyTailStart = 1;  //尾巴开始计时
    this.babyTailEndtime =300; //结尾时间
    //控制大鱼身体[0,1,2,3,4,5,6,7]

    this.babyBodyIndex = 19;  //身体图片下标
    this.babyBodyStart = 1;  //身体部分计时开始
    this.babyBodyEndtime = 4000; //结尾时间

    this.babyEyeIndex=0; //眼睛下标
    this.babyEyeStart=1;
    this.babyEyeEndtime=2000;

}
//创建小鱼初始化
babyObj.prototype.init=function(){

    this.x=canWidth/2;
    this.y=canHeight/2;
    this.angle=0;
    for(var i=0;i<2;i++){
        this.babyEye[i]=new Image();
        this.babyEye[i].src="./src/babyEye"+i+".png";
    }
    for(var i=0;i<=19;i++){
        this.babyBody[i]=new Image();
        this.babyBody[i].src="./src/babyFade"+i+".png";
    }
    for(var i=0;i<=7;i++){
        this.babyTail[i]=new Image();
        this.babyTail[i].src="./src/babyTail"+i+".png";
    }

}
//创建小鱼绘制方法
babyObj.prototype.draw=function(){

    //计算新坐标
    this.x=lerpDistance(mom.x-mom.bigBody[mom.bigBodyIndex].width,this.x,0.98);
    this.y=lerpDistance(mom.y-mom.bigBody[mom.bigBodyIndex].height,this.y,0.99);
    //小鱼趋向大鱼游动

    //计算鱼游动角度
    //获取坐标差
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    //计算角度差
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    //获取趋向角度
    this.angle=lerpAngle(beta,this.angle,0.9);
    //计算当前显示小鱼身体图片下标
    this.babyBodyStart=this.babyBodyStart+deltaTime;
    //结果开始计时的时长大于总时长
    if(this.babyBodyStart>this.babyBodyEndtime){

        //    console.log(1);
        this.babyBodyStart=1;
        this.babyBodyIndex=this.babyBodyIndex-1;
        //如果大于7只显示最后一张图片
        if(this.babyBodyIndex<1){
            this.babyBodyIndex=0;
        }

    }
    //计算尾巴的时间
    this.babyTailStart=this.babyTailStart+deltaTime;
    if(this.babyTailStart>this.babyTailEndtime){

        //this.bigTailIndex=1;
        this.babyTailStart=1;  //赋值初始值
        this.babyTailIndex=(this.babyTailIndex+1)%8; //0-7自动循环

    }
    //console.log(this.bigTailIndex);
    //计算眼睛的时间
    this.babyEyeStart=this.babyEyeStart+deltaTime;
    if(this.babyEyeStart>this.babyEyeEndtime){

        //this.bigTailIndex=1;
        this.babyEyeStart=1;
        this.babyEyeIndex=(this.babyEyeIndex+1)%2; //0-1自动循环
        if(this.babyEyeIndex==1){
            this.babyEyeEndtime=100;
        }else{
            this.babyEyeEndtime=3000;
        }

    }
    //绘制小鱼

    for(var i=0;i<=6;i++){

        ctx1.save();
        if(i<2){
            ctx1.translate(this.x-(35*i),this.y+(25*i));
        }else if(i>=2&&i<=4){
            //console.log(3);
            ctx1.translate(this.x+(45*i),this.y);
        }else if(i>4){
            //console.log(2);
            ctx1.translate(this.x+38*i,this.y+(15*i));
        }

        ctx1.rotate(this.angle);
        //画鱼身体
        ctx1.drawImage(this.babyBody[this.babyBodyIndex],
            -this.babyBody[this.babyBodyIndex].width*0.5,
            -this.babyBody[this.babyBodyIndex].height*0.5);
        //画鱼尾巴
        ctx1.drawImage(this.babyTail[this.babyTailIndex],
            -this.babyTail[this.babyTailIndex].width*0.5+27,
            -this.babyTail[this.babyTailIndex].height*0.5);
        //画鱼眼睛
        ctx1.drawImage(this.babyEye[this.babyEyeIndex],
            -this.babyEye[this.babyEyeIndex].width*0.5,
            -this.babyEye[this.babyEyeIndex].height*0.5);
        ctx1.restore();

    }



}

babyObj.prototype.restart=function(){
    baby.babyBodyIndex=0;
    console.log(1);
}