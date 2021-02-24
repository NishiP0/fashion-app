window.onload = function Init(){
	startVideo();
}

function startVideo() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then(function (stream) {
		document.getElementById('local_video').srcObject = stream;
	}).catch(function (error) { // 失敗時の処理はこちら.
		console.error('mediaDevice.getUserMedia() error:', error);
		return;
	});
}

function camera(){
	const shut = document.getElementById("shutter")
	const send = document.getElementById("send")

	shut.addEventListener('click', take_picture);
	send.addEventListener('click', tenso);

	function take_picture()
  {
	var canvas = document.getElementById('canvas');
	var video = document.getElementById('local_video')
	var ctx = canvas.getContext('2d');
	var w = video.offsetWidth * 0.5;	// videoの横幅取得.
	var h = video.offsetHeight * 0.5;	// videoの縦幅取得.
	canvas.setAttribute("width", w);	// canvasに書き出すための横幅セット.
	canvas.setAttribute("height", h);	// canvasに書き出すための縦幅セット.
	ctx.drawImage(video, 0, 0, w, h);	// videoの画像をcanvasに書き出し.

	var base64 = canvas.toDataURL('image/jpg');	// canvas上の画像をbase64に変換.
	var picture = base64.replace(/^data:\w+\/\w+;base64,/, '');	// base64変換したデータのプレフィクスを削除.
  }

  function tenso(picture) {
	  return $.ajax({
		  url: "http://localhost:8080/camera",//phpファイルのURL
		  type: "post",
		  data: {"image": picture},
		  success: function () {	// 転送成功時.
			console.log("success");
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {	// 転送失敗時.
			console.log("error");
		  }
	  })
  }
}



window.addEventListener('load', camera)