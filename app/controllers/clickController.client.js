'use strict';

(function () {

   var createNewPollButton = document.getElementById("create-new-poll-button");
   var viewAllPollsButton = document.getElementById("view-all-polls-button");
   // var apiUrl = appUrl + '/api/:id/clicks';

   createNewPollButton.addEventListener('click', function () {
      console.log("createNewPollButton clicked");
   });
   
   viewAllPollsButton.addEventListener('click', function () {
      console.log("viewAllPollsButton clicked")
   });

})();
