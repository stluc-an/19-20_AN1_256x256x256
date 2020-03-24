/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap(".phase1", doubleTap);
    
    
});

function doubleTap(event){
	console.log(event);
    event.target.classList.add("hide");
	AppManager.levelComplete();
InteractionHelper.onDropFile(".file", dropFile);
}

function dropFile(event){
    
    console.log(event);
    event.target.classList.add("hide");
	AppManager.levelComplete();
    
}