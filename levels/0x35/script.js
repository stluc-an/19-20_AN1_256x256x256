AppManager.ready(function(){
	InteractionHelper.onDrag("#monImage1", actionWhenDragImage1);
});

function actionWhenDragImage1(event){
    console.log(event);
    
    document.querySelector("#monImage1").style.left = event.mouseX+"px";
    document.querySelector("#monImage1").style.top = event.mouseY+"px";
    
    let aim = document.querySelector("#aim");
    aim = getPosAndSize(aim);
    if(
        event.mouseX > aim.x &&
        event.mouseX < aim.x+aim.w &&
        event.mouseY > aim.y &&
        event.mouseY < aim.y+aim.h
    ){
         document.querySelector("#monImage1").classList.add("hide");
        document.querySelector("#monImage2").classList.remove("hide");
        document.querySelector("#aim").classList.add("hide");
        InteractionHelper.onMouseEnter("#monImage2", actionWhenEnterImage2);
    }
    
  
}

function actionWhenEnterImage2(event){
	//console.log(event);
	//AppManager.levelComplete();
    
    AppManager.levelComplete();
}


function getPosAndSize(el) {
    // yay readability
    let w = el.offsetWidth;
    let h = el.offsetHeight;
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly, w:w , h:h};
}