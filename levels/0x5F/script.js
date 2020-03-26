/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter(".phase1", mouseEnter);
});

function mouseEnter(event){
	console.log(event);
	
    event.target.classList.add("hide");
    InteractionHelper.onSound( sound);
}

function sound(event){
    if(event.intensity=500){
        
	console.log(event);
	AppManager.levelComplete(); document.querySelector(".phase2").classList.add("hide");
    }
}
