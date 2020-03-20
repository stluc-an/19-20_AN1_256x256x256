/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-28 15:49:33
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(2000,  wait);
});

function wait(event){
	console.log(event);
	//AppManager.levelComplete();
	document.querySelector("#stop").classList.add("hide");
	document.querySelector("#pasla").classList.remove("hide");

	InteractionHelper.onHide(hide);
}

function hide(event){
	console.log(event);
	AppManager.levelComplete();

}