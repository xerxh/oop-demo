// class aneObj{
//     constructor(){
//
//     }
// }
var aneObj=function(){
    this.x=[];
    this.len=[];
}
//保存海葵个数
aneObj.prototype.num=50;
//初始化方法
aneObj.prototype.init=function(){

    //初始化每一个海葵
    for(var i=0;i<this.num;i++){
        this.x[i]=i*16+Math.random()*20;
        this.len[i]=200+Math.random()*90;
    }

};
aneObj.prototype.draw=function () {

    ctx2.save();
    //创建循环绘制每一个海葵
    ctx2.strokeStyle="#3b154e";
    ctx2.globalAlpha=0.6;
    ctx2.lineCap="round";
    ctx2.lineWidth=20;
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();

};