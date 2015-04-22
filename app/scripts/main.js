/* jshint devel:true */
'use strict';

$(document).ready(function(){
  $('.menu a').click(function(){
    var id = $(this).prop('hash');

    if(id === '#home'){
      $('html, body').animate({
          scrollTop : 0
      },500);
    }else{
      $('html, body').animate({
          scrollTop : $('section'+id+'').offset().top
      },500);
    }
  });
});
