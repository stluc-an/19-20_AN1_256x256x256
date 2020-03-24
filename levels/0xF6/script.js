/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onSound( sound);
});

function sound(event){
    if(event.intensity>100){
        
	console.log(event);
	AppManager.levelComplete();
    document.querySelector(".phase1").classList.add("hide");
    InteractionHelper.onMouseLeave(".phase2", mouseLeave);
    }
}
function mouseLeave(event){
	console.log(event);
	AppManager.levelComplete(); document.querySelector(".phase2").classList.add("hide");
}