/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:49
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint(print);
	document.querySelector(".zone").classList.add("hide");
});

function print(event){
	console.log(event);
	//AppManager.levelComplete();
	document.querySelector("#print").classList.add("hide");
	document.querySelector("#follow").classList.remove("hide");
	document.querySelector(".zone").classList.remove("hide");

	InteractionHelper.onMouseLeave(".zone", leave);

}

function leave(event){
	console.log(event);
	AppManager.levelComplete();
}