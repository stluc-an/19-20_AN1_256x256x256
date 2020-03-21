/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:04
\*----------------------------------------*/

AppManager.ready(function(){

	setButtonOS(getOSname());
	
	InteractionHelper.onDropFile("#monImage1", eventHandler);
	
});


function eventHandler(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	
	
	InteractionHelper.onShow(eventHandler2);
	
}

function setButtonOS(OS){
	let allValues=["microsoft","apple","linux" ];
	let controlBtns=  document.querySelector(".imgWrapper img");
	for(let value of allValues){
		controlBtns.classlist.remove(value);
	}
	controlBtns.classlist.add(OS)
}

function getOSname(){
	let OSName="microsoft";
	if(navigator.appVersion.indexOf("Mac")!=-1){
		OSName="apple";
	}
	if (navigator.appVersion.indexOf("X11")!=-1) {
		OSName="apple";
	}
	if (navigator.appVersion.indexOf("Linux")!=-1) {
		OSName="linux";
	}
	return OSName;
}	
function eventHandler2(event){
	console.log(event);
	document.querySelector("#monImage2").classList.add("hide");
	AppManager.levelComplete();}





