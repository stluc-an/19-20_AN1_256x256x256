/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(keyDown);
});

function keyDown(event){
	console.log(event);
    document.querySelector(".keydown").classList.add("hide");
    document.querySelector(".mouseenter").classList.remove("hide");
    InteractionHelper.onMouseEnter(".mouseenter", mouseEnter);
	
}

function mouseEnter(event){
    console.log(event);
    AppManager.levelComplete();
}