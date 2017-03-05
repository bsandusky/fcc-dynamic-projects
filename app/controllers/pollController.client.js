(function() {
    
    var apiUrl = appUrl + '/api' + location.pathname;
    
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = data[userProperty];
    }
    
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response) {
        var pollData = JSON.parse(response);
        
        var pollContainer = document.getElementById("pollContainer");
        updateHtmlElement(pollData, pollContainer, 'poll_stimulus');

    });
    
})()