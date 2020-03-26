/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#zoneSortie", eventHandler);
});

function eventHandler(event){
	console.log(event);
		document.getElementById('image').setAttribute("src", "attendre.jpg");
		document.getElementById('image').removeAttribute("usemap");
		InteractionHelper.onTimeout(2000, eventTime);
}

function eventTime(event){
	console.log(event);
	AppManager.levelComplete();
}
