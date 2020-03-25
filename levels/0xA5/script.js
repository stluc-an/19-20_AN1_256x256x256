/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
    setTimeout(showMontre,1600);
	
});

function showMontre(){
    document.querySelector(".show1").classList.add("hide");
    InteractionHelper.onShow(show);
}

function show(event){
	console.log(event);
    document.querySelector(".show2").classList.add("hide");
    document.querySelector(".target").classList.remove("hide");
    InteractionHelper.onMouseEnter(".target", mouseEnter);
    
}


function mouseEnter(event){
    console.log(event);
	AppManager.levelComplete();
}