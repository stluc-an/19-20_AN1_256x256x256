/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:31
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("#Sceau", eventHandler)
});

function eventHandler(event){
	console.log(event);
    
    event.mouseX = event.mouseX - (window.innerWidth / 2) + 256 / 2 ;
    event.mouseY = event.mouseY - (window.innerHeight / 2) + 256 / 2 ;
    
    document.querySelector("#Sceau").style.left = event.mouseX+"px";
    document.querySelector("#Sceau").style.top = event.mouseY+"px";
    
    document.querySelector("#Batiment").classList.add("hide");
    document.querySelector("#Sceau").classList.add("hide");
    document.querySelector("#Hand").classList.remove("hide");
    document.querySelector("#cube").classList.remove("hide");
    
    InteractionHelper.onWindowResize( eventHandler2);
}

function eventHandler2(event){
    AppManager.levelComplete();
}
