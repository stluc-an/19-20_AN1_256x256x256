/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(eventHandler);
});

function eventHandler(event){
	document.querySelector("#show").classList.add("hide");
	document.querySelector("#sized").classList.remove("hide");
	InteractionHelper.onWindowResize(redimension)
	console.log(event);
}

function redimension(event){
		console.log(event);
		AppManager.levelComplete();
}
