// ==UserScript==
// @name         Insta Photo Only
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides videos from any profile.
// @author       shin-nowa
// @match        https://www.instagram.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
// GM stands for greasemonkey, we use it to persist data and state.
(function() {
    'use strict';

    let isEnabled = GM_getValue("filterEnabled", true); // read the default configuration

    function registerMenu() { // just for create a "menu" on tampermonkey
        const statusText = isEnabled ? "✅ Filter: ON" : "❌ Filter: OFF";
        GM_registerMenuCommand(statusText, toggleFilter);
    }

    function toggleFilter() { // function to enable and disable
        isEnabled = !isEnabled;
        GM_setValue("filterEnabled", isEnabled);

        if (isEnabled) {
            alert("Filter on.");
            runFilter();
        } else {
            alert("Filter off, reload the page to see the videos again.");
            location.reload();
        }
    }

    function runFilter() {
        if (!isEnabled) return; // if aren't on, return

        const path = window.location.pathname;        // filtering so it doesn't run when you're not on a profile
        const isProfile = path !== '/' && !path.startsWith('/direct/') && !path.startsWith('/explore/') && !path.startsWith('/reels/'); 

        if (!isProfile) return;

        const links = document.querySelectorAll('a');

        links.forEach(link => {
            if (link.href.includes('/reel/')) { // verifies if the links contains a reel
                link.style.display = 'none';
            }
        });
    }

    registerMenu(); // runs the function.

    setInterval(runFilter, 800); // runs again within 800ms interval to catch the scrolling.

})();