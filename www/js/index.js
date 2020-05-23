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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
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
    PhoneCall: () => {
        let Mobile = document.getElementById('txtMobileNo').value;

        if (!app.IsValid(Mobile)) {
            AppHelper.alert('Please Enter the Valid Mobile No.');
            return;
        } else {
            Mobile = `+91${Mobile}`;
        }

        AppHelper.OnConfirm('Call with Speaker', ["OK", "Cancel"], (res) => {
            var IsSpeaker = 'false';
            if (res === 1) {         
                IsSpeaker = 'true';       
            }

            if (app.IsDefined(cordova.plugins.phonedialer)) {
                cordova.plugins.phonedialer.call(
                    Mobile,
                    (err) => {
                        if (err === "OK") {
                            message = "Call Initiated";
                        } else if (err !== "OK") {
                            message = "Unable to call Error:" + err;
                            if (err === "empty") {
                                message = "Unknown phone number";
                            } else {
                                console.log("Dialer error:" + err);
                                message = "Unable to call Error:" + err;
                            }
                        } else {
                            message = "Unable to call Error:" + err;
                        }    
                        
                        AppHelper.alert(message);
                    },
                    (success) => {
                        if (success === "OK") {
                            message = "Call Initiated";
                        } else {
                            message = "Unable to call Error:" + success;
                        }      
                        
                        console.log(message);                                               
                    },
                    IsSpeaker
                );
            }
        });
    },
    PhoneDial: () => {
        let Mobile = document.getElementById('txtMobileNo').value;

        if (!app.IsValid(Mobile)) {
            AppHelper.alert('Please Enter the Valid Mobile No.');
            return;
        } else {
            Mobile = `+91${Mobile}`;
        }

        if (app.IsDefined(cordova.plugins.phonedialer)) {
            cordova.plugins.phonedialer.dial(
                Mobile,
                (err) => {
                    if (err === "OK") {
                        message = "Call Initiated";
                    } else if (err !== "OK") {
                        message = "Unable to call Error:" + err;
                        if (err === "empty") {
                            message = "Unknown phone number";
                        } else {
                            console.log("Dialer error:" + err);
                            message = "Unable to call Error:" + err;
                        }
                    } else {
                        message = "Unable to call Error:" + err;
                    }    
                    
                    AppHelper.alert(message);
                },
                (success) => {
                    if (success === "OK") {
                        message = "Call Initiated";
                    } else {
                        message = "Unable to call Error:" + success;
                    }      
                    
                    console.log(message);                                               
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