'use strict';

var control = (function (){
  var root = document.querySelector('main')
  var submitButton = root.querySelector('button');
  var feedback = root.querySelector('#feedback');
  var scaleNumber = root.querySelector('#scale');
  var email = root.querySelector('#email');
  var loadingText = root.querySelector('.loading');
  var backMessage = document.querySelector('ul');

  function sendFeedBack() {
    submitButton.addEventListener('click', function(){
      if (checkEmpty(feedback.value, scaleNumber.value, email.value)){
        loadingText.innerText = 'LOADING!';

        ajax.send(feedback.value, scaleNumber.value, email.value, function(res){
          loadingText.innerText = '';
          renderText(res);
        });
      } else {
        warning();
      }
    });
  }

  function checkEmpty(feedback, scale, email) {
    if (feedback === '' || scale === '' || email === ''){
      return false;
    } else {
      return true;
    }
  }

  function warning(feedback, scale, email) {
    deleteList();
    var li = document.createElement('li');
    li.innerText = 'Please fill the survey';
    backMessage.appendChild(li);
    sendFeedBack();
  }

  function renderText(text){
    deleteList();
    if (text.status === 'ok'){
      var projects = text.projects;
      projects.forEach(function(t){
        var li = document.createElement('li');
        li.innerText = t;
        backMessage.appendChild(li);
      });
    } else if (text.status === 'error') {
        var message = text.message;
        var li = document.createElement('li');
        li.innerText = text.message;
        backMessage.appendChild(li);
    }
  }

  function deleteList(){
    while (backMessage.firstChild){
      backMessage.removeChild(backMessage.firstChild);
    };
  }

  return {
    init: sendFeedBack
  }

})();

var ajax = (function (){

  var APIEndpoint = 'http://localhost:3000/';

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
  }
})();
