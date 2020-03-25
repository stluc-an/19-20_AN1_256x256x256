/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/



AppManager.ready(function(){
	InteractionHelper.onSound(eventHandler);

	
});



function eventHandler(event){
	console.log(event.intensity);

	if (event.intensity> 50.00) {

		micro = document.querySelector(".gif");
		micro.classList.add("hide");
		message = document.querySelector(".gif3");
		message.classList.add("show");
		InteractionHelper.onHide(done);

		}
	
	
}
function done(event){
	console.log(event);
	AppManager.levelComplete();

}

