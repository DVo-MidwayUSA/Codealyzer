(function () {

    'use strict'

    var el = document.querySelector('#test');

    var currentRating = 0;

    var maxRating = 5;

    var getParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var callback = function (rating) { 
        console.log(rating); 
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currTab = tabs[0];
            console.log(getParameterByName('path', currTab.url));
        });
    };

    var myRating = rating(el, currentRating, maxRating, callback);
}())