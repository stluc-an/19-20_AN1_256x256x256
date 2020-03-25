/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/



AppManager.ready(function(){
	InteractionHelper.onSound( eventHandler);
});

function eventHandler(event){
	console.log(event.intensity);

	if (event.intensity> 50.00) {


		let scroll= document.querySelector("body");
		scroll.classList.add("scrollBar");
		micro = document.querySelector(".gif");
		micro.classList.add("hide");
		InteractionHelper.onScroll("#scroll", done);
		
		}
	
}

function done (event)

{if (document.getElementById("scroll").scrollTop > 1) {
		
		setTimeout(theEnd, 1000);
	}
}
	
function theEnd(){
	console.log(event);
	AppManager.levelComplete();

}