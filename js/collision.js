//碰撞检测
//1.大鱼碰到果实的检测
function momFruitsCollision(){
    //循环获取每一个食物
    for(var i=0;i<fruit.num;i++){

        //判断当前食物状态 true
        if(fruit.alive[i]){
        //获取大鱼与食物距离
            var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
        //如果距离小于30像素(900)(吃食物)
            if(l<900){
        //食物状态 true-->false
                //推荐不使用如下方法来修改当前食物的状态
                //fruit.alive[i]=false;
                //建议使用:食物自己对象添加方法
                fruit.dead(i);
            }
        }

    }

}

//2.大鱼碰到小鱼的检测
function momBabyCollistion(){
    //获取大鱼和小鱼距离
    var l=calLength2(mom.x,mom.y,baby.x,baby.y);
    //如果距离小于30像素(900)
    if(l<900){
    //小鱼吃饱状态
        baby.restart();
    }
}
