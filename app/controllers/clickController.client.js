'use strict';

(function () {
   
   $('#createPollModal').foundation();
   var createNewPollButton = document.getElementById("create-new-poll-button");
   var viewMyPollsButton = document.getElementById("view-my-polls-button");
   var pollsContainer = document.getElementById("polls-container")
   var apiUrl = appUrl + '/api/:id/polls';

   createNewPollButton.addEventListener('click', function(event) {
      
      event.preventDefault();
      var pollQuestion = document.getElementById("poll-question-field").value;
      var pollOptions = document.getElementById("poll-options-field").value;
      
      if (!pollQuestion && !pollOptions) {
         document.getElementById("poll-question-error").style.visibility = "visible";
         document.getElementById("poll-options-error").style.visibility = "visible";
         
      } else if (pollQuestion && !pollOptions) {
         document.getElementById("poll-question-error").style.visibility = "hidden";
         document.getElementById("poll-options-error").style.visibility = "visible";
         
      } else if (!pollQuestion && pollOptions) {
         document.getElementById("poll-question-error").style.visibility = "visible";
         document.getElementById("poll-options-error").style.visibility = "hidden";

      } else if (pollQuestion && pollOptions) {
         document.getElementById("poll-question-error").style.visibility = "hidden";
         document.getElementById("poll-options-error").style.visibility = "hidden";
         document.getElementById("create-poll-form").reset();
         $('#createPollModal').foundation('close');
   
         var payload = {
            poll_stimulus: pollQuestion,
            poll_options: pollOptions
         }
      
         ajaxFunctions.payloadRequest('POST', apiUrl, payload, function(response) {
            console.log(response)
         });
      }
      
   }, false);
   
   viewMyPollsButton.addEventListener('click', function () {
      
      ajaxFunctions.ajaxRequest('GET', apiUrl, function(response) {
          pollsContainer.innerHTML = response;
      });
      
   }, false);

})();
