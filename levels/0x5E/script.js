/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#chien", touch);
});

function touch(event){
	//console.log(event);
	//AppManager.levelComplete();
	document.querySelector("#chien").classList.add("hide");
	document.querySelector("#waf").classList.remove("hide");

	InteractionHelper.onTimeout("#waf", wait);
	
}

function wait(event){
	console.log(event);
	setTimeout( AppManager.levelComplete , 1000);
	

}