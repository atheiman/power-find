// Popup JS

window.setTimeout(function () {
    // delay tooltip activation to solve tooltip being visible on popup
    $(function () {
        $("[data-toggle='tooltip']").tooltip();
    })
}, 100);

function App() {
    this.elements = {
        'form': document.forms[0],
        'findButton': document.getElementById('findButton'),
        'messageP': document.getElementById('messageP'),
    }

    this.elements.form.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            app.findNext()
        }
    });


    this.highlightAll = function () {
        var modifiers = 'gi';

        if (this.elements.form.regex.checked === true)
            regex = true;
        if (this.elements.form.caseSensitive.checked === true)
            modifiers = 'g';

        // get list of matches
        var re = new RegExp(app.elements.form.pattern.value, modifiers);
        console.log('regexp:', re);

        // pass re to background script expecting to get matches back.
        //var matches = document.getElementsByTagName('body')[0].innerText.match(re);

        // iterate through matches
        matches.forEach(function (match, index, matches) {
            // wrap match with .bg-red span
            // http://stackoverflow.com/questions/1835903/how-do-to-wrap-a-span-around-a-section-of-text-without-using-jquery
        });

        console.log('searching for pattern', this.elements.form.pattern.value);
    }

    this.findNext = function () {
        // scroll to next highlight span
    }

    this.setMessage = function (msgText, className) {
        // set messageP element to msgText, clears messageP.className,
        // sets messageP.className to className
        this.elements.messageP.innerText = msgText;
        this.elements.messageP.className = '';
        if (typeof className === 'string') {
            this.elements.messageP.className = className;
        }
    }

    this.close = function () {
        window.close();
    }
}

var app = new App();
