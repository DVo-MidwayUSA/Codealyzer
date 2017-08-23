(function () {
    'use strict'

    var getParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var getPath = function (submission) {
        return new Promise(function (resolve, reject) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var currTab = tabs[0];
                var path = getParameterByName('path', currTab.url);
                if (!path) {
                    reject();
                }

                submission.path = path;
                resolve(submission);
            });
        });
    };

    var getUser = function (submission) {
        return new Promise(function (resolve, reject) {
            chrome.identity.getProfileUserInfo(function (userInfo) {
                submission.user = userInfo.email;
                resolve(submission);
            });
        });
    };

    var callback = function (rating) {
        var submission = {};
        submission.rating = rating;

        getPath(submission);
        getUser(submission);
        console.log(submission);
    };

    var el = document.querySelector('#rating');
    var currentRating = 0;
    var maxRating = 5;
    rating(el, currentRating, maxRating, callback);
}())