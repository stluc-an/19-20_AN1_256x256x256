/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:50
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("#Jesus", actionWhenDragjesus)
});

function actionWhenDragjesus(event){
	console.log(event);
    
    event.mouseX = event.mouseX - (window.innerWidth / 2) + 0 ;
    event.mouseY = event.mouseY - (window.innerHeight / 2) + 0 ;
    
    document.querySelector("#Jesus").style.left = event.mouseX+"px";
    document.querySelector("#Jesus").style.top = event.mouseY+"px";
    
    InteractionHelper.onHide( action_hide);
}

function action_hide(event){
    document.querySelector("#Jesus").classList.add("hide");
    document.querySelector("#King").classList.remove("hide");
    
    AppManager.levelComplete();
}
