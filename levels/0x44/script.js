/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile(".phase1", dropFile);
});

function dropFile(event){
    if(event.type=="drop"){
	console.log(event);
    event.target.classList.add("hide");
    InteractionHelper.onDropFile(".phase2", dropFile2);
    }

}
function dropFile2(event){
    
		if(event.type=="drop"){
		AppManager.levelComplete();	
	console.log(event);
    event.target.classList.add("hide");
	}
}