'use strict';

var control = (function (){
  var root = document.querySelector('main')
  var submitButton = root.querySelector('button');
  var feedback = root.querySelector('#feedback');
  var scaleNumber = root.querySelector('#scale');
  var email = root.querySelector('#email');
  var loadingText = root.querySelector('.loading');
  // var decodedText = document.querySelector('ul');

  function sendFeedBack() {
    submitButton.addEventListener('click', function(){

      loadingText.innerText = 'LOADING!';

      ajax.send(feedback.value, scaleNumber.value, email.value, function(res){
        loadingText.innerText = '';
        // renderText();
      });
    });
  }

  // function renderText(text){
  //   ajax.get(function(res){
  //     var allText = res.all;
  //     allText.forEach(function(t){
  //       var li = document.createElement('li');
  //       li.innerText = t;
  //       decodedText.appendChild(li);
  //     })
  //   });
  // }


  return {
    init: sendFeedBack
  }

})();

var ajax = (function (){

  var APIEndpoint = 'http://localhost:3000/';

  function get (callback){
    open('GET', 'decode/all', false, callback);
  }

  function send (feedback, scale, email, callback){
    var data = {feedback: feedback, scale: scale, email: email};
    open('POST', 'exam', data, callback);
  }


  function open (method, resource, data, callback){
    var xhr = new XMLHttpRequest();
		data = (data) ? data : null;
		xhr.open( method, APIEndpoint + resource );
    xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send( JSON.stringify(data) );
		xhr.onreadystatechange = function (rsp) {
			if( xhr.readyState === XMLHttpRequest.DONE ) {
				callback( JSON.parse(xhr.response) );
			}
    }
  }
  return {
    send: send,
    get: get
  }

})();
