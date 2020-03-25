/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(keyDown);
    
});

function keyDown(event){
	if(event.key == "o"){
        document.querySelector(".prog").classList.add("hide");
        document.querySelector(".oreille").classList.remove("hide");
        InteractionHelper.onSound(sound);
    }
    
    
    
}

function sound(event){
    console.log(event);
    AppManager.levelComplete();
    
}