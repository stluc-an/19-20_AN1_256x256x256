/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#tap",SecondDoubleTap);
});

function SecondDoubleTap(event){
	InteractionHelper.onDoubleTap("#tap",Done);
	console.log(event);
}

function Done(event){
	console.log(event);
	AppManager.levelComplete();
}