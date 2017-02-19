(function() {
    
    var pollName = document.getElementById("poll-name");
    var apiUrl = appUrl + '/api/polls/:id';
    
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = data[userProperty];
   }
    
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
        var pollData = JSON.parse(data);
        
        pollName.innerHTML = pollData;
    })
    
})()