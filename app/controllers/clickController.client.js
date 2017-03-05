'use strict';

(function () {
   
   $('#createPollModal').foundation();
   var createNewPollButton = document.getElementById("create-new-poll-button");
   var viewMyPollsButton = document.getElementById("view-my-polls-button");
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
   
   var generatePollsList = function(record) {
      var html = "";
      html += "<li id="+
               record._id +
               "><div class='row'>" +
               "<div class='medium-5 columns stimulus' id='poll-stimulus'>" +
               "<a href='/polls/" + record._id +"'>" +
               record.poll_stimulus +
               "</a></div>" +
               "<div class='medium-3 columns status' id='poll-status'>";
                     
      if (record.active === true) {
         html += "<button class='button alert toggleButton'>Deactivate</button>";
      } else if (record.active === false) {
         html += "<button class='button toggleButton'>Activate</button>";
      }  
                     
      html +=  "</div>" +
               "</div>" +
               "</li>";
               
      return html;
   }
   
   var updatePollsList = function(event) {
      
      var payload = {
         _id: event.path[3].id
      }
      
      ajaxFunctions.payloadRequest('PUT', apiUrl, payload, function(response) {
         response = JSON.parse(response);
         
         if (response.active === true) {
            event.target.classList.add("alert");
            event.target.innerHTML = "Deactivate";
         } else if (response.active === false) {
            event.target.classList.remove("alert");
            event.target.innerHTML = "Activate";
         }
      });
      
   }
   
   viewMyPollsButton.addEventListener('click', function () {
      
      var pollsList = document.getElementById("polls-list");
      pollsList.innerHTML = "";
      
      ajaxFunctions.ajaxRequest('GET', apiUrl, function(response) {
         var parsedResponse = JSON.parse(response);
         
         parsedResponse.forEach(function(x) {
           pollsList.innerHTML += generatePollsList(x);
         });
         
         document.querySelectorAll(".toggleButton").forEach(function(x) {
            x.addEventListener('click', function(event) {
               updatePollsList(event);
            });
         });
      });
   }, false);
   
})();
