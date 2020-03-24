/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(actionWhenKeyDormeur);
});

function actionWhenKeyDormeur(event){
    console.log(event);
    if(event.key == "c"){
        document.querySelector("#Dormeur2").classList.remove("hide");
    }
    
    setTimeout (pause, 4000);
}

function pause(){
    AppManager.levelComplete();
        
}