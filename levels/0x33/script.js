AppManager.ready(function(){
	InteractionHelper.onDrag("#monImage1", actionWhenDragImage1);
});

function actionWhenDragImage1(event){
    console.log(event);
    
    document.querySelector("#monImage1").style.left = event.mouseX+"px";
    document.querySelector("#monImage1").style.top = event.mouseY+"px";
    
    let monImage2 = document.querySelector("#monImage2");
    let monImage1 = document.querySelector("#monImage1");
    monImage2 = getPosAndSize(monImage2);
    if(
        event.mouseX > monImage2.x &&
        event.mouseX < monImage2.x+monImage2.w &&
        event.mouseY > monImage2.y &&
        event.mouseY < monImage2.y+monImage2.h
    ){
        document.querySelector("#monImage1").classList.add("hide");
        document.querySelector("#monImage2").classList.add("hide");
        document.querySelector("#monImage3").classList.remove("hide");
        document.querySelector("#monImage4").classList.remove("hide");
        InteractionHelper.onDrag("#monImage3", actionWhenDragImage3);
    }
    
  
}

function actionWhenDragImage3(event){
	console.log(event);
	
    document.querySelector("#monImage3").style.left = event.mouseX+"px";
    document.querySelector("#monImage3").style.top = event.mouseY+"px";
    
    let monImage3 = document.querySelector("#monImage3");
    let monImage4 = document.querySelector("#monImage4");
    monImage4 = getPosAndSize(monImage4);
    if(
        event.mouseX > monImage4.x &&
        event.mouseX < monImage4.x+monImage4.w &&
        event.mouseY > monImage4.y &&
        event.mouseY < monImage4.y+monImage4.h
    ){
    AppManager.levelComplete();
}
}

function getPosAndSize(monImage2) {
    // yay readability
    let w = monImage2.offsetWidth;
    let h = monImage2.offsetHeight;
    for (var lx=0, ly=0;
         monImage2 != null;
         lx += monImage2.offsetLeft, ly += monImage2.offsetTop, monImage2 = monImage2.offsetParent);
    return {x: lx,y: ly, w:w , h:h};
}

function getPosAndSize(monImage4) {
    // yay readability
    let w = monImage4.offsetWidth;
    let h = monImage4.offsetHeight;
    for (var lx=0, ly=0;
         monImage4 != null;
         lx += monImage4.offsetLeft, ly += monImage4.offsetTop, monImage4 = monImage4.offsetParent);
    return {x: lx,y: ly, w:w , h:h};
}