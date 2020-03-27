/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(show);
});

function show(event){
	console.log(event);
	
    document.querySelector(".phase1").classList.add("hide");
    InteractionHelper.onKeyDown( keyDown);
}

function keyDown(event){
    if(keyCode=75){
	console.log(event);
	AppManager.levelComplete();
    document.querySelector(".phase2").classList.add("hide");
        
    }
}