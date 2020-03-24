/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:50
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("#pomme", eventHandler);
});

function eventHandler(event){

	console.log(event);

	document.querySelector("#pomme").style.position = "absolute"
	document.querySelector("#pomme").style.left = event.mouseX+"px"
	document.querySelector("#pomme").style.top = event.mouseY+"px"
    
    InteractionHelper.onMouseLeave("#panier", pomme);
}

	function pomme(event){
		console.log(event);



	AppManager.levelComplete();

}