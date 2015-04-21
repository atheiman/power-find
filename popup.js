// Popup JS

// // tooltip activation
// $(function () {
//    $("[data-toggle='tooltip']").tooltip();
// })()

function highlightAll() {
    // wrap all matching patterns in highlight span
    console.log('highlightAll triggered');
    var modifiers = 'gi';

    if (this.form.regex.checked === true)
        regex = true;
    if (this.form.caseSensitive.checked === true)
        modifiers = 'g';

    // pass re to content script for highlighting
    var msg = {action: 'highlightAll',
               re: new RegExp(form.pattern.value, modifiers)};
    console.log("sending msg:", msg);
    port.postMessage(msg);
}

function findNext() {
    // scroll to next highlight span
    console.log('findNext triggered');

    var msg = {action: 'findNext'}
    console.log("sending msg:", msg);
    port.postMessage(msg);
}

function setMessage(msgText, className) {
    // set messageP element to msgText, clears messageP.className,
    // sets messageP.className to className
    this.messageP.innerText = msgText;
    this.messageP.className = '';
    if (typeof className === 'string') {
        this.messageP.className = className;
    }
}

var form = document.forms[0],
    findButton = document.getElementById('findButton'),
    messageP = document.getElementById('messageP');

findButton.addEventListener('click', function (e) {
    findNext();
});

form.pattern.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        findButton.click();
    } else {
        highlightAll();
    }
});

// load content scripts into page
chrome.tabs.executeScript({file: "content_script.js"});
chrome.tabs.insertCSS({file: "content_script.css"});

// open port to content script
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    port = chrome.tabs.connect(tabs[0].id);
    console.log('port connected:', port);

    port.onMessage.addListener(function (msg) {
        console.log('msg received:', msg);
    })
});
