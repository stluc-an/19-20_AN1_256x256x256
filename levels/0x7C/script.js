/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(toucheCtrl);
});

function toucheCtrl(event){
	console.log(event);
	//AppManager.levelComplete();
	if(event.key == "Control"){

		InteractionHelper.onBeforePrint( print);
	}
}

function print(event){
	console.log(event);
	document.querySelector("#rire").classList.remove("hide");
	setTimeout( AppManager.levelComplete , 3000);
}