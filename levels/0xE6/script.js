/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(1000,  eventHandler);
});

function eventHandler(event){
	document.querySelector("#smiley").classList.add("hide");
	document.querySelector("#leave").classList.remove("hide");
	
	InteractionHelper.onMouseLeave("#leave", partez);
}

	function partez(event){
		console.log(event);



	AppManager.levelComplete();

}


