/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("div", eventHandler);
});

function eventHandler(event){
	document.getElementById('a').classList.add('drag');
	console.log(event);
	InteractionHelper.onDrag("div", dragHandler);

}

function dragHandler(event){

	document.getElementById('a').classList.remove('drag');
	document.getElementById('a').classList.add('dragged');
	setTimeout ( AppManager.levelComplete, 400);
}