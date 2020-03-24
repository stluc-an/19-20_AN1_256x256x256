/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(toucheR);
});

function toucheR(event){
	console.log(event);
	//AppManager.levelComplete();
		if(event.key == "r"){
			document.querySelector("#lettre").classList.add("hide");
	        document.querySelector("#read").classList.remove("hide");
	    }

	InteractionHelper.onScroll("#read", scroll);
}

function scroll(event){
//	console.log(event);

	console.log(document.body.scrollTop);
	if(document.body.scrollTop>400){
		AppManager.levelComplete();
	}
	
}