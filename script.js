var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var code = '';
var hint = '';
var loggedIn = parseInt(sessionStorage.getItem('APILOGGEDIN') || '') || false;
var storedKey = localStorage.getItem('APIBANK');
var ApiName = document.querySelector('input[id="ApiName"]');
var ApiKey = document.querySelector('input[id="ApiKey"]');
var OtherDetails = document.querySelector('textarea[id="other"]');
var SubmitButton = document.querySelector('input[type="submit"]');
var APISECTION = document.getElementById('apis');
var getAPISButton = document.querySelector('button[id="GetApi"]');
var APIS = [];
if (!loggedIn)
    AuthenticateOrAddUser();
else {
    var apiArray = JSON.parse(localStorage.getItem('APICOLLECTION') || '[]');
    APIS = __spreadArray(__spreadArray([], APIS, true), apiArray, true);
    console.log(APIS);
    SubmitButton === null || SubmitButton === void 0 ? void 0 : SubmitButton.addEventListener('click', function (e) {
        e.preventDefault();
        AddKey();
    });
    getAPISButton === null || getAPISButton === void 0 ? void 0 : getAPISButton.addEventListener('click', function () {
        getAPIS();
    });
}
function AddKey() {
    var apikey = ApiKey.value;
    var apiname = ApiName.value;
    var other = OtherDetails.value;
    if (apikey.trim() === '' || apiname.trim() === '')
        alert('Please Fill Required Fields');
    else {
        var newAPI = {
            name: apiname,
            key: apikey,
            other: other,
            date: getDate()
        };
        APIS.push(newAPI);
        console.log(APIS);
        localStorage.setItem('APICOLLECTION', JSON.stringify(APIS));
        ApiKey.value = '';
        ApiName.value = '';
        OtherDetails.value = '';
    }
}
function AuthenticateOrAddUser() {
    if (storedKey) {
        for (var i = 1; i <= 3 && code === ""; i++)
            code = prompt('Enter the passcode: ') || '';
        if (code && code === "")
            setTimeout(function () {
                hint = prompt('Enter your first school name: ') || '';
                if (hint === localStorage.getItem('APISTOREHINT')) {
                    loggedIn = true;
                    sessionStorage.setItem('APILOGGEDIN', '1');
                }
                else
                    alert("incorrect answer");
            }, 1000);
        else {
            if (storedKey === code) {
                loggedIn = true;
                sessionStorage.setItem('APILOGGEDIN', '1');
            }
            else {
                alert('Wrong passcode');
            }
        }
    }
    else {
        do {
            code = prompt('Set passcode: ') || '';
        } while (code === "");
        do {
            hint = prompt('Enter your first school name: ') || '';
        } while (hint === "");
        if (code && hint) {
            localStorage.setItem('APIBANK', code);
            localStorage.setItem('APISTOREHINT', hint);
        }
    }
}
function getDate() {
    var date = new Date();
    function padLeft(input, length, padChar) {
        if (padChar === void 0) { padChar = '0'; }
        var result = input.toString();
        while (result.length < length) {
            result = padChar + result;
        }
        return result;
    }
    var year = date.getFullYear();
    var month = padLeft(String(date.getMonth() + 1), 2);
    var day = padLeft(String(date.getDate()), 2);
    var formattedDate = "".concat(year, "-").concat(month, "-").concat(day);
    return formattedDate;
}
function getAPIS() {
    var apis = JSON.parse(localStorage.getItem('APICOLLECTION') || '[]');
    if (APISECTION)
        APISECTION.innerHTML = "";
    if (apis.length)
        apis.map(function (api) { return (appendAPIS(api)); });
    else
        alert('no apis stored yet');
}
function appendAPIS(api) {
    var div = document.createElement('div');
    div.className = 'ApiList';
    div.innerHTML = "<h3>API NAME:".concat(api.name, "</h3>\n    <p> <strong>API KEY:</strong>").concat(api.key, "</p> <p> <strong>Others:</strong>").concat(api.other || '   null', "</p><p> <strong>UPLOAD DATE:</strong> ").concat(api.date, "</p>\n    <button class=\"ApiDelete\" >Delete</button>");
    APISECTION === null || APISECTION === void 0 ? void 0 : APISECTION.appendChild(div);
}
