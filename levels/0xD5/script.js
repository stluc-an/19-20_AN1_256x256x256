/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onScroll("#fond", eventHandler);
});

function eventHandler(event){
	console.log(event);
	InteractionHelper.onMouseEnter("#cup", MouseEnterHandler);

}


function MouseEnterHandler(event){

	setTimeout ( AppManager.levelComplete, 300);
}