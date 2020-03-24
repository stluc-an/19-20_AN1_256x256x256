/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseLeave(".zone", leave);
});

function leave(event){
	console.log(event);
	//AppManager.levelComplete();
	document.querySelector("#follow").classList.add("hide");
	document.querySelector("#print").classList.remove("hide");
	document.querySelector(".zone").classList.add("hide");

	InteractionHelper.onBeforePrint( print);
}

function print(event){
	console.log(event);
	AppManager.levelComplete();

}