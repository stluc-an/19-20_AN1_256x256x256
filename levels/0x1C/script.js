/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
    InteractionHelper.onDoubleTap("img", eventHandler);
});

function eventHandler(event){
    console.log(event);
    document.getElementById('pdf').classList.add('pdf2');
    document.getElementById('ppdf').classList.add('ppdf2');
    document.getElementById('navbar').classList.add('navbar2');
    document.getElementById('text').classList.add('text2');

    InteractionHelper.onTap("#print", myFunction);
    InteractionHelper.onBeforePrint(BPHandler);
}

function myFunction() {
  window.print();
}


function BPHandler(event){
    AppManager.levelComplete();
}