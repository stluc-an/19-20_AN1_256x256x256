/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseLeave(".mouseleave", mouseLeave);
});

function mouseLeave(event){
    console.log(event);
    event.target.classList.add("hide");
    document.querySelector(".windowresize").classList.remove("hide");
    InteractionHelper.onWindowResize(windowResize);
}

function windowResize(event){
	console.log(event);
	AppManager.levelComplete();
}