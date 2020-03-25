/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/
 var lettre = document.getElementById('lettre')



AppManager.ready(function(){
InteractionHelper.onTap("#E", secondeTap);


	
	
});

function secondeTap(event){
	event.target.classList.add('clicked');
	InteractionHelper.onTap("#Z", done);
	
}

function done(event){
	event.target.classList.add('clicked');
	AppManager.levelComplete();
}