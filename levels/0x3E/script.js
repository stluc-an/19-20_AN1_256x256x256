/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:50
\*----------------------------------------*/

let step1 = true;

AppManager.ready(function(){
	InteractionHelper.onDrag("div", eventHandler);
});

function eventHandler(event){
    let nuage = document.querySelector("#img2");
    let dropZone = document.querySelector(".dropZone");
    if(step1){
    nuage.style.top = event.mouseY + "px";
    nuage.style.left = event.mouseX + "px";
        if(isIntersecting(nuage, dropZone)){
        step1 = false;
        InteractionHelper.onTimeout("#img2", onTimeout);
      }
    }
	console.log(event);
	
    InteractionHelper.onTimeout(2000,  eventHandler2);
}

function eventHandler2(event){
	document.querySelector("#img1").classList.add("hide");
    document.querySelector("#img2").classList.add("hide");
    document.querySelector("#img3").classList.remove("hide");
    console.log(event);
	AppManager.levelComplete();
}

function isIntersecting(element1, element2){
  let positionAndSize1 = getPosAndSize(element1);  
  let positionAndSize2 = getPosAndSize(element2);  

  var not_colliding = ( 
    positionAndSize1.top + positionAndSize1.height < positionAndSize2.top || 
    positionAndSize1.top > positionAndSize2.top + positionAndSize2.height || 
    positionAndSize1.left + positionAndSize1.width < positionAndSize2.left || 
    positionAndSize1.left > positionAndSize2.left + positionAndSize2.width 
  );

  return  !not_colliding;
}

function getPosAndSize(el) {
    // yay readability
    let w = el.offsetWidth;
    let h = el.offsetHeight;
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {
      top: lx,
      left: ly,
      width : w,
      height : h
    };
}
