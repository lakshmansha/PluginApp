/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        app.Reset();
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    CarouselInit: () => {
        $('.carousel').carousel({
            interval: 2000
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        if (navigator["splashscreen"]) {
            navigator.splashscreen.hide();
        }

        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    Validation: () => {
        var isValid = false;
        var forms = document.getElementsByClassName('needs-validation')[0];
        if (forms.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            isValid = true;
        }

        forms.classList.add('was-validated');

        return isValid;
    },
    Reset: () => {
        document.getElementById('alertDanger').innerHTML = "";
        document.getElementById('alertSuccess').innerHTML = "";
        document.getElementById('alertDanger').style.display = "none";
        document.getElementById('alertSuccess').style.display = "none";
        document.getElementById('txtMobileNo').value = '';
        document.getElementById('chkInSpeaker').checked = false;
    },
    PhoneCall: () => {
        let Mobile = document.getElementById('txtMobileNo').value;
        document.getElementById('alertDanger').innerHTML = "";
        document.getElementById('alertSuccess').innerHTML = "";
        document.getElementById('alertDanger').style.display = "none";
        document.getElementById('alertSuccess').style.display = "none";

        var checkBox = document.getElementById("chkInSpeaker");

        if (!app.Validation()) {
            return;
        } else {
            Mobile = `+91${Mobile}`;
        }

        var IsSpeaker = checkBox.checked == true ? 'true' : 'false';

        if (app.IsDefined(cordova.plugins.phonedialer)) {
            cordova.plugins.phonedialer.call(
                Mobile,
                (success) => {
                    if (success === "OK") {
                        message = "Call Initiated";
                        document.getElementById('alertSuccess').innerHTML = message;
                        document.getElementById('alertSuccess').style.display = "block";
                    } else {
                        message = "Unable to call Error:" + success;
                        document.getElementById('alertDanger').innerHTML = message;
                        document.getElementById('alertDanger').style.display = "block";
                    }
                },
                (err) => {
                    if (err !== "OK") {
                        message = "Unable to call Error:" + err;
                        if (err === "empty") {
                            message = "Unknown phone number";
                        } else {
                            console.log("Dialer error:" + err);
                            message = "Unable to call Error:" + err;
                        }

                        document.getElementById('alertDanger').innerHTML = message;
                        document.getElementById('alertDanger').style.display = "block";
                    }
                },
                IsSpeaker
            );
        }
    },
    PhoneDial: () => {
        let Mobile = document.getElementById('txtMobileNo').value;
        document.getElementById('alertDanger').innerHTML = "";
        document.getElementById('alertSuccess').innerHTML = "";
        document.getElementById('alertDanger').style.display = "none";
        document.getElementById('alertSuccess').style.display = "none";

        if (!app.Validation()) {
            return;
        } else {
            Mobile = `+91${Mobile}`;
        }

        if (app.IsDefined(cordova.plugins.phonedialer)) {
            cordova.plugins.phonedialer.dial(
                Mobile,
                (success) => {
                    if (success === "OK") {
                        message = "Call Initiated";
                        document.getElementById('alertSuccess').innerHTML = message;
                        document.getElementById('alertSuccess').style.display = "block";
                    } else {
                        message = "Unable to call Error:" + success;
                        document.getElementById('alertDanger').innerHTML = message;
                        document.getElementById('alertDanger').style.display = "block";
                    }
                },
                (err) => {
                    if (err !== "OK") {
                        message = "Unable to call Error:" + err;
                        if (err === "empty") {
                            message = "Unknown phone number";
                        } else {
                            console.log("Dialer error:" + err);
                            message = "Unable to call Error:" + err;
                        }

                        document.getElementById('alertDanger').innerHTML = message;
                        document.getElementById('alertDanger').style.display = "block";
                    }
                }
            );
        }

    },
    IsDefined: (value) => {
        let valid = false;

        if (value !== null && value !== undefined) {
            valid = true;
        }

        return valid;
    },
    IsValid: (value) => {
        let valid = false;

        if (typeof value === "string") {
            if (value !== null && value !== undefined && value !== "" && value !== "null") {
                valid = true;
            }
        } else if (typeof value === "number") {
            if (value !== null && value !== undefined && value > 0) {
                valid = true;
            }
        } else if (typeof value === "object") {
            if (value === null || value === undefined) {
                valid = false;
            } else {
                if (Object.keys(value).length > 0) {
                    valid = true;
                }
            }
        }

        return valid;
    }
};

//#region Alert Function

var AppHelper = {
    alert: (message, callback) => {
        if (navigator["notification"]) {
            navigator["notification"].alert(message, callback || function () { }, "Plugin App", "OK");
        } else {
            alert(message);
        }
    },
    OnConfirm: (message, array, callback, title) => {
        if (navigator["notification"]) {
            title = title !== undefined ? title : "Plugin App";
            navigator["notification"].confirm(
                message, // message
                (buttonIndex) => {
                    const val = buttonIndex === 1 ? 1 : 0;
                    callback(val);
                },
                title, // title
                array // Options
            );
        } else {
            title = title !== undefined ? title : "Confirm";
            const r = confirm(message);
            const val = r === true ? 1 : 0;
            setTimeout(() => {
                callback(val);
            }, 1000);
        }
    }
}

//#endregion


app.initialize();