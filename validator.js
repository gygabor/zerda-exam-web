'use strict';


var validator = (function(){
  var json = require('./words.json');
  var words = json[0].words;

  function validation (feedback, scale, email){
    if ((email.indexOf('@') != -1) && validNumber(scale) && findWord(feedback)){
      return true
    } else {
      return false;
    }
  }

  function findWord(feedback){
    var feedArray = feedback.split(' ');
    var findNumber = 0;
    words.forEach(function(word){
      var find = feedArray.indexOf(word)
      if (find != -1){
        findNumber++;
      }
    })
    if (findNumber >= 3){
      return true;
    } else {
      return false;
    }
  }

  function validNumber(number){
    if ((parseInt(number) >= 10) && (parseInt(number) > 0)){
      return true;
    } else {
      return false;
    }
  }

  return {
    validation: validation
  }
})();

module.exports = validator;
