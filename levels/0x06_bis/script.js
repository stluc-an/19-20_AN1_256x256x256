/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("#ourson", eventHandler);
});

function eventHandler(event){
	//console.log(event);
	document.querySelector("#ourson").classList.add("hide");
	document.querySelector("#leave").classList.remove("hide");





 InteractionHelper.onMouseLeave("#leave", partez);
}

	function partez(event){
		console.log(event);



	AppManager.levelComplete();

}

	
