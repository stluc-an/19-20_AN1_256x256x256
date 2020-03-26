/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(eventHandler);
});

function eventHandler(event){
	console.log(event);
	if(event.keyCode == 67){
		document.getElementById('image').setAttribute("src", "sortirSouris.jpg");
		InteractionHelper.onMouseLeave("#zoneSortie", enventSortie);
}
}

function enventSortie(event){
	console.log(event);
	AppManager.levelComplete();
}
