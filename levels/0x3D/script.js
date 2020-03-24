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
    let bois = document.querySelector("#img1")
    let dropZone = document.querySelector(".dropZone");
    if(step1){
      bois.style.top = event.mouseY + "px";
      bois.style.left = event.mouseX + "px";
      if(isIntersecting(bois, dropZone)){
        step1 = false;
        InteractionHelper.onScroll("#img2", eventHandler2);
      }
    }
}

function eventHandler2(event){
    let img2 = document.querySelector("#img2")
    
    if(img2.offsetTop < 23){
        img2.style.top = img2.offsetTop + event.deltaY + "px";
        
        if(img2.offsetTop < -128){
            img2.style.top = -128+"px";
        }
    }else{ 
	   AppManager.levelComplete();
    }
     
    
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