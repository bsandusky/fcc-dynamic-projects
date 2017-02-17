'use strict';

(function () {

   var createNewPollButton = document.getElementById("create-new-poll-button");
   var viewMyPollsButton = document.getElementById("view-my-polls-button");
   var pollsContainer = document.getElementById("polls-container")
   var apiUrl = appUrl + '/api/:id/polls';

   createNewPollButton.addEventListener('click', function () {
      console.log("createNewPollButton clicked");
   });
   
   viewMyPollsButton.addEventListener('click', function () {
       ajaxFunctions.ajaxRequest('GET', apiUrl, function(response) {
          pollsContainer.innerHTML = response;
       });
   }, false);

})();
