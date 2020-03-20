/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#Wall", buttonPressed);
});

function buttonPressed(event){
	console.log(event);
    AppManager.levelComplete();
    setTimeout (pause, 2000);
    
}

function pause(){
    AppManager.levelComplete();
}
