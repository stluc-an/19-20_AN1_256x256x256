/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(eventHandler);
});

function eventHandler(event){
	document.querySelector("#bouton").classList.add("hide");
	document.querySelector("#look").classList.remove("hide");
		console.log(event);
	InteractionHelper.onScroll("div", eventHandler2);

}
	function eventHandler2(event){
	console.log(event);
	AppManager.levelComplete();
}