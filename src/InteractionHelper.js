/*----------------------------------------*\
  256x256x256 - index.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 12:19:52
  @Last Modified time: 2020-05-15 12:19:18
\*----------------------------------------*/
import interact from "./libs/interact/interact.1.3.4.min.js";
import Hammer from "./libs/hammer/hammer.2.0.8.min.js";

let mousePos;
let hidden, visibilityChange; 
const AudioContext = window.AudioContext ||  window.webkitAudioContext;


class InteractionHelper {
	static onTap(target, action){
		interact(target).on("tap", event => 	action({
													target : event.target,
													type : event.type,
													...mousePos
												}));
	}

	static onDoubleTap(target, action){
		interact(target).on("doubletap", event => 	action({
														target : event.target,
														type : event.type,
														...mousePos
													}));
	}

	static onLongTap(target, action){
		interact(target).on("hold", event => 	action({
													target : event.target,
													type : event.type,
													...mousePos
												}));
	}

	static onDrag(target, action){
		interact(target).draggable({
			onmove: event => 	action({
									target : event.target,
									type : event.type,
									...mousePos
								})
		});
	}

	static onDropFile(target, action){
		target = document.querySelector(target);
		target.addEventListener(
			"dragover", 
			event => {
				event.preventDefault();
				action({
					target : event.target,
					type : event.type,
					...mousePos
				})
		});
		target.addEventListener(
			"drop", 
			event => {
				event.preventDefault();
				action({
					target : event.target,
					type : event.type,
					files : event.dataTransfer.files,
					...mousePos
				})
		});
	}

	static onMouseEnter(target, action){
		target = document.querySelector(target);
		target.addEventListener(
			"mouseenter", 
			event => 	action({
							target : event.target,
							type : event.type,
							...mousePos
						}),
			false
		);
	}

	static onMouseLeave(target, action){
		target = document.querySelector(target);
		target.addEventListener(
			"mouseleave", 
			event => 	action({
							target : event.target,
							type : event.type,
							...mousePos
						}),
			false
		);
	}

	static onKeyUp(action){
		document.addEventListener(
			"keyup", 
			event => 	action({
							target : event.target,
							type : event.type,
							...mousePos,
							key : event.key,
							keyCode : event.keyCode
						}),
			false
		);
	}

	static onKeyDown(action){
		document.addEventListener(
			"keydown", 
			event => 	action({
							target : event.target,
							type : event.type,
							...mousePos,
							key : event.key,
							keyCode : event.keyCode
						}),
			false
		);
	}

	static onHide(action){
		document.addEventListener(visibilityChange, event => {
			if (document[hidden]) {
				action({
					type : "hide",
					...mousePos
				})
			}
		}, false);
	}

	static onShow(action){
		document.addEventListener(visibilityChange, event => {
			if (!document[hidden]) {
				action({
					type : "show",
					...mousePos
				})
			}
		}, false);
	}

	static onWindowResize(action){
		top.addEventListener(
			'resize', 
			event => 	action({
							type : event.type,
							...mousePos,
							width : top.innerWidth,
							height : top.innerHeight,
						}),
			false
		);
	}

	static onBeforePrint(action){
		top.addEventListener(
			'beforeprint', 
			event => 	action({
							target : event.target,
							type : event.type,
							...mousePos
						}),
			false
		);
	}

	static onScroll(target, action){
		target = document.querySelector(target);
		target.addEventListener(
			'wheel', 
			event => 	action({
							target : event.target,
							type : event.type,
							...mousePos,
							deltaX : event.deltaX,
							deltaY: event.deltaY,
							deltaZ: event.deltaZ
						}),
			false
		);
	}

	static onTimeout(time, action){
		setTimeout(	event => 	action({
									type : "timeout",
									...mousePos
								}), time);
	}

	static onSound(action){
    	navigator.mediaDevices.getUserMedia({ audio: true })
		.then(function(stream) {
  			const audioContext = new AudioContext();
			const analyser = audioContext.createAnalyser();
			const microphone = audioContext.createMediaStreamSource(stream);
			const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;

			microphone.connect(analyser);
			analyser.connect(javascriptNode);
			javascriptNode.connect(audioContext.destination);
			javascriptNode.onaudioprocess = function() {
				var array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				var values = 0;
				var length = array.length;
				for (var i = 0; i < length; i++) {
					values += (array[i]);
				}
				var average = values / length;
				if(average >= 1){
					action({
						type : "sound",
						...mousePos,
						intensity : average
					})
				}
			}
		})
		.catch(function(err) {
			/* handle the error */
			console.log(err);
  		})
	}

    static handleMouseMove(event) {
    	var dot, eventDoc, doc, body, pageX, pageY;

        event = event || top.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

		mousePos = {
			mouseX: event.pageX - ((window.innerWidth * 0.5) - (document.body.clientWidth * 0.5)),
			mouseY: event.pageY - ((window.innerHeight * 0.5) - (document.body.clientHeight * 0.5))
		};
    }
}

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}


InteractionHelper.onDropFile("body", ()=>false);
export default InteractionHelper;