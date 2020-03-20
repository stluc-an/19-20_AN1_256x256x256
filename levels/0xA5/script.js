/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(show);
});

function show(event){
	console.log(event);
    InteractionHelper.onMouseEnter(".rvb", mouseEnter);
    document.querySelector(".rvb").classList.remove("hide");
    
}

function mouseEnter(event){
    console.log(event);
	AppManager.levelComplete();
}