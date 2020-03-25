/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){

	InteractionHelper.onKeyDown(eventHandler);

});

function eventHandler(event){
	console.log("====> 1");

	InteractionHelper.onDrag("#boite", ondrag);
    

};

function ondrag(event){

	console.log("====> 2");
	AppManager.levelComplete();

}