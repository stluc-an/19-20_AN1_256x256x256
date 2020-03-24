/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(eventHandler);
});

function eventHandler(event){
    
	if(event.key == "p"){
        
        let touchP = document.querySelector("#touchP");
        touchP.classList.add("hide");
    }
    AppManager.levelComplete();
    InteractionHelper.onKeyDown(eventHandler2);
}


function eventHandler2(event){
    
    if(event.key == "a"){
        
        let touchA = document.querySelector("#touchA");
        touchA.classList.add("hide");
    }
	AppManager.levelComplete();
}