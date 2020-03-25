/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onHide(eventHandler);
});

function eventHandler(event){
	document.getElementById('a').classList.add('B');
	document.getElementById('a').classList.remove('A');
	document.getElementById('b').classList.add('A');
	document.getElementById('b').classList.add('B');
	document.getElementById('c').classList.add('B');
	document.getElementById('c').classList.remove('A');
	console.log(event);
	InteractionHelper.onMouseLeave("div", dragHandler);

}

function dragHandler(event){

	document.getElementById('a').classList.remove('drag');
	document.getElementById('a').classList.add('dragged');
	AppManager.levelComplete();
}