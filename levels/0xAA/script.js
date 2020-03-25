/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(fabrice);
});

function fabrice(event){

	console.log(event);
     
    document.querySelector("#Image1").classList.add ("hide");
    document.querySelector("#Image2").classList.remove("hide");
   
   InteractionHelper.onShow(roger);
	
}

function roger(event){
	console.log(event);
	AppManager.levelComplete();

}