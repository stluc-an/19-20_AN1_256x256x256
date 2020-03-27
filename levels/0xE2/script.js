/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(2000,  eventHandler);
});

function eventHandler(event){
	document.querySelector("#loading").classList.add("hide");
	document.querySelector("#sac").classList.remove("hide");
	InteractionHelper.onLongTap("div", eventHandler2);

}
	function eventHandler2(event){
	document.querySelector("#sac").classList.add("hide");
	document.querySelector("#youlose").classList.remove("hide");

	console.log(event);

AppManager.levelComplete();
}
