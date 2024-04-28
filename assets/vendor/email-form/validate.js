document.addEventListener('DOMContentLoaded', function(){
  var sendBtn = document.getElementById('sendMesage');
  var loadingMessage= document.querySelector('.loading');
  var sentMessage= document.querySelector('.sent-message');

  sendBtn.addEventListener('click', function(e){
    
    e.preventDefault();

    loadingMessage.style.display = 'block';
    sentMessage.style.display = 'none';

    setTimeout(function(){
      loadingMessage.style.display = 'none';
      sentMessage.style.display = 'block';
    }, 2000);
  });
});
