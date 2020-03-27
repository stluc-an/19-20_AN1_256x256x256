/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("#rido", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.querySelector("#rido").classList.add("hide");
	document.querySelector("#fenetre").classList.remove("hide");
	InteractionHelper.onShow(showed);
}

function showed(event){

	console.log(event);
	AppManager.levelComplete();
}