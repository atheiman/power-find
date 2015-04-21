// content_script.js

var highlightClass = 'pf-highlight';

function highlightAll(re) {
    console.log('highlighting all instances matching', re.toString());
    // possible solutions:
    // http://stackoverflow.com/a/1836009/3343740
    // https://github.com/padolsey/findAndReplaceDOMText
}

function findNext() {
    console.log('scrolling to next span.%s', highlightClass);
}

function removeHighlights() {
    console.log('removing all instances of span.%s', highlightClass);
}

// port opened from extension
chrome.runtime.onConnect.addListener(function (port) {
    console.log('port connected:', port);

    port.onMessage.addListener(function (msg) {
        console.log('msg received:', msg);

        if (msg.action === 'highlightAll') {
            highlightAll(msg.re);
        } else if (msg.action === 'findNext') {
            findNext()
        }
    });
});
