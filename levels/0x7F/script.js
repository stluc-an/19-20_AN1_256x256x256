/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(toucheE);
});

function toucheE(event){
	console.log(event);
	//AppManager.levelComplete();
		if(event.key == "e"){
			document.querySelector("#echo").classList.remove("hide");
			document.querySelector("#cerisier").classList.add("hide");
			InteractionHelper.onSound(sound);
	    }

	
}

function sound(event){
	console.log(event);
	document.querySelector("#montagne").classList.remove("hide");
	setTimeout( AppManager.levelComplete , 1000);
	

}