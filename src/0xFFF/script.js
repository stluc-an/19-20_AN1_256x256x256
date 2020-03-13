/*----------------------------------------*\
  256x256x256 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-27 12:27:03
  @Last Modified time: 2020-03-13 16:44:00
\*----------------------------------------*/

const FAIL_AFTER = 14000;
const LEVELS = [
	"0x0", "0x1", "0x2", "0x3", 
	"0x4", "0x5", "0x6", "0x7", 
	"0x8", "0x9", "0xA", "0xB", 
	"0xC", "0xD", "0xE", "0xF"
];

AppManager.ready(() => {
	LevelManager = LevelManager();
	LevelManager.next();
});

let LevelManager = () => {
	let historyLVL = [];
	let availableLVL = LEVELS;//(new Array(256)).fill().map((p, k)=>{k = k.toString(16);while(k.length<2) k = "0"+k;return "0x"+k});
	
	let isValidated = false;
	let iframeDom = document.querySelector("iframe");
	let iframeWrapperDom = document.querySelector(".wrapper");
	
	document.querySelector(".total").innerText = availableLVL.length;

	window.addEventListener("message", (event) => {
		if(event.data == "SUCCESS" && !isValidated){
			isValidated = true;
			onLevelSuccess();
		}
	}, false);

	const requestLevel = (levelName) => {
		let parent = iframeDom.parentElement;
		parent.removeChild(iframeDom);
		iframeDom = document.createElement("iframe");
		iframeDom.setAttribute("src", "./../../levels/"+levelName+"/index.html");
		parent.appendChild(iframeDom);
		iframeDom.addEventListener('load', ()=>{
			isValidated=false;
			onLevelLoaded();
		}, false);
		iframeDom.focus();
	}

	return ({
		next : () => {
			const levelName = availableLVL.splice(Math.floor(Math.random() * availableLVL.length), 1)[0];
			document.querySelector(".score").innerText =historyLVL.length;
			historyLVL.push(levelName);
			if(!levelName) {
				onGameWin();
				return false;
			}
			if(document.querySelector(".lvl")){
				document.querySelector(".lvl").innerText = levelName;
				requestLevel(levelName);	
			}
		},
		prev : () => {
			availableLVL.push(historyLVL.pop());
			const levelName = historyLVL[historyLVL.length-1];
			document.querySelector(".score").innerText = historyLVL.length;
			if(!levelName) {
				onGameLoose();
				return false;
			}
			if(document.querySelector(".lvl")){
				document.querySelector(".lvl").innerText = levelName;
				requestLevel(levelName);	
			}
		},
		size : (ratio) => {
			iframeWrapperDom.style.height = ((ratio) * 256)+"px";
			iframeDom.style.marginTop = (-1 * (1-ratio) * 128)+"px";
		}
	});
};

const onLevelLoaded = () => {
	clearTimeout(window.TIMEOUT_OPENNING);
	window.TIMEOUT_OPENNING = setTimeout( () => {
		Animations.Open(() => {
			clearTimeout(window.TIMEOUT_FAIL);
			window.TIMEOUT_FAIL = setTimeout(onLevelFail, FAIL_AFTER);
		});
	}, 750);
}

const onLevelSuccess = () => {
	Animations.Close(function(){
		Animations.Magnify(375, document.querySelector(".score"));
		LevelManager.next();
	});
}

const onLevelFail = () => {
	Animations.Close(function(){
		Animations.Minify(375, document.querySelector(".score"));
		LevelManager.prev();
	});
}

const onGameWin = () => {
	const winDom = document.querySelector(".win");
	winDom.innerText = "YOU WIN";
	Animations.Win(winDom);
}

const onGameLoose = () => {
	document.querySelector(".reload").classList.remove("hidden");
	const winDom = document.querySelector(".win");
	winDom.innerText = "YOU LOOSE";	
	Animations.Loose(winDom);
}

const lerp = (A, B, t) => {
	return A + t * (B - A);
}

const Animations = {
	Magnify : (time, target) => {
		new Animator({
			duration : time*2,
			atStarting : () => {
				this.FS = 20;
			},
			atRunning : ({cursor}) => {
				let percent = cursor;
				target.style.fontSize = (this.FS + 20 * Math.sin(Math.PI * percent)) + "px";
			},
			atStoping : () => {
				target.style.fontSize = this.FS + "px";
			}
		}).start();
	},
	Minify : (time, target) => {
		new Animator({
			duration : time*2,
			atStarting : () => {
				this.FS = 20;
			},
			atRunning : ({cursor}) => {
				let percent = cursor;
				target.style.fontSize = (this.FS - 10 * Math.sin(Math.PI * percent)) + "px";
			},
			atStoping : () => {
				target.style.fontSize = this.FS + "px";
			}
		}).start();
	},
	Loose : (target) => {
		let looseAnim = (target) => {
			new Animator({
				duration : 1500,
				atStarting : () => {
					this.FS = 20;
				},
				atRunning : ({cursor}) => {
					let percent = cursor;
					percent = Math.pow(percent, 0.3);
					target.style.fontSize = (this.FS + 50 * Math.sin(
																Math.PI * lerp(
																	1, 0.95, lerp(
																		1, 0.2, Math.abs(
																			Math.sin(
																				0.3 * percent*2*Math.PI
																			)
																		)
																	)
																)
															)
											) + "px";
				},
				atStoping : () => {
					target.style.fontSize = this.FS + "px";
					looseAnim(target);
				}
			}).start();
		}
		looseAnim(target);
	},
	Win : (target) => {
		let winAnim = (target) => {
			new Animator({
				duration : 500,
				atStarting : () => {
					this.FS = 20;
				},
				atRunning : ({cursor}) => {
					let percent = cursor;
					target.style.fontSize = (this.FS + 50 * Math.sin(
																-1 * Math.PI * lerp(
																	1, 0.95, lerp(
																		1, 0.2, Math.abs(
																			Math.sin(
																				0.3 * percent*2*Math.PI
																			)
																		)
																	)
																)
															)
											) + "px";
				},
				atStoping : () => {
					target.style.fontSize = this.FS + "px";
					winAnim(target);
				}
			}).start();
		}
		winAnim(target);
	},
	Close : (callback) => {
		new Animator({
			duration : 500,
			atRunning : ({cursor}) => {
				let percent = Math.pow(cursor, 0.5);
				LevelManager.size(1 - percent);
			},
			atStoping : () => {
				LevelManager.size(0);
				if(callback)callback();
			}
		}).start();
	},
	Open : (callback) => {
		new Animator({
			duration : 500,
			atRunning : ({cursor}) => {
				let percent = Math.pow(cursor, 2)
				LevelManager.size(percent);
			},
			atStoping : () => {
				LevelManager.size(1);
				if(callback)callback();
			}
		}).start();
	}
}

