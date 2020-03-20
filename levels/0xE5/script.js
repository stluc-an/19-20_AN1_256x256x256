/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap(".Wall", buttonPressed);
});

function buttonPressed(event){
	console.log(event);
    event.target.classList.add("hide");
    InteractionHelper.onWindowResize(windowResize);
}

function windowResize(event){
    console.log(event);
    
    AppManager.levelComplete();
}