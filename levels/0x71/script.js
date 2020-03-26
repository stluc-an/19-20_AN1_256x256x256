a/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
  
	InteractionHelper.onKeyUp(keyUp);
    
   
});

function keyUp(event){
	console.log(event);
    document.querySelector(".phase1").classList.add("hide");
	
    InteractionHelper.onDoubleTap(".jard1", doubleTap);
}

function doubleTap(event){
	console.log(event);
	AppManager.levelComplete();
    document.querySelector(".jard1").classList.add("hide");
    
}
