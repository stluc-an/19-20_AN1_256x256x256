/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(enter);
});

function enter(event){
	//console.log(event);
	//AppManager.levelComplete();
    document.querySelector("#entername").classList.add("hide");
    InteractionHelper.onMouseLeave("body", end);
}

function end(event){
	//console.log(event);
	AppManager.levelComplete();
}