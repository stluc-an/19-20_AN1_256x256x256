/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-03-21 04:20:30
\*----------------------------------------*/
const __CHAR_PER_LINE__ = 16;
let player;
let ball;
let lines;
let flag = false;
let lastTime = 0;
let lookAt;
let currentLookAt = "";
let wasVisible = false;


AppManager.ready(function(){
	lines = (
		data.organism.pad() + 
		data.origin.pad() + 
		(new Array(__CHAR_PER_LINE__*5)).join(" ")
	).debit(__CHAR_PER_LINE__)
	.map((line, k)=>new Line(line, k));
	player = new Player();
	ball = new Ball();
	lookAt = document.querySelector(".lookAt")
	requestAnimationFrame(update);
});


function update(time){
	flag = true;
	const deltaTime = (time - lastTime)*0.001;
	lastTime = time;

	
	player.update(deltaTime);
	const cLines = [];
	for(const line of lines){
		if(line.update(deltaTime)){
			cLines.push(line);
		}
	}
	
	ball.update(deltaTime, player, cLines);
	
	let arrowPos = ball.getOffScreenPosition();
	if(currentLookAt!=arrowPos.y){
		if(currentLookAt != ""){
			lookAt.classList.remove(currentLookAt)	
		}
		if(arrowPos.y != ""){
			lookAt.classList.add(arrowPos.y)	
		}
		currentLookAt = arrowPos.y
	}
	lookAt.style.left = arrowPos.x+"px";

	if(!wasVisible && ball.isVisible()){
		wasVisible = true;
		ball.start();
		ball.isRunning = true;
	}

	requestAnimationFrame(update);
}
