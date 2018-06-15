//食物类
var fruitObj=function(){
    this.alive=[]; //当前食物是否活着
    this.orange=new Image(); //桔色图片
    this.blue=new Image(); //蓝色图片
    this.x=[];   //食物X坐标
    this.y=[];   //食物Y坐标
    this.l=[];   //食物长度(由小变大)
    this.spd=[]; //食物的速度(生长速度,向上漂移速度)
    this.fruitType=[];
}
//添加初始化方法
fruitObj.prototype.num=30;

fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false; //初始每一个食物
        this.x[i]=0;    //初始每个食物X,Y坐标
        this.y[i]=0;
        this.l[i]=0;
        this.spd[i]=Math.random()*0.017+0.003; //初始速度
        //this.fruitType[i]=Math.random()>0.8?"blue":"orange";
    }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
};

//添加绘制方法
fruitObj.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        //先判断当前食物是否活动状态  活动才画
        if(this.alive[i]){
            //this.x[i]=i*25+50;
            if(this.l[i]>21)
                this.y[i]-=this.spd[i]*2*deltaTime; //向上飘动
            else
                this.l[i]+=this.spd[i]*deltaTime;
            //console.log(this.fruitType[i])
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            ctx2.drawImage(pic,this.x[i]-(21*0.5),this.y[i],this.l[i],this.l[i]);
            //飘出屏幕
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
}

//创建函数来监听食物如果不足15个自动出生食物直到15个
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num<15){
        sendFruit();
    }
}
//创建一个食物
function sendFruit(){
    //查找状态为false食物一个
    for(var i=0;i<fruit.num;i++){
        //var p=Math.ceil(Math.random()*29);
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }/*else{
            sendFruit();
        }*/

    }
    //食物出生找一个海葵位置->x y l 状态 随机类型 orange blue
}

fruitObj.prototype.born=function(i){

    //随机找一个海葵的位置
    var aneIdx=Math.floor(Math.random()*ane.num);
    //console.log(aneIdx);
    //计算食物的位置
    this.x[i]=ane.x[aneIdx];
    this.y[i]=canHeight-ane.len[i];
    //长度初始化食物大小
    this.l[i]=0;
    this.alive[i]=true;
    this.fruitType[i]=Math.random()>0.8?"blue":"orange";
}
//为食物添加一个状态修改方法
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
}