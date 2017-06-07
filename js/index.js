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
        this.bindEvents();
    },
    
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        document.getElementById("scan").addEventListener("click", app.scan);

    },
    scan: function(){
        console.log("starting scan");
        document.getElementById("scan").disabled=true;
        document.getElementById("scan").innerHTML="Starting camera";
        cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if(result.cancelled !== true){
                        alert("Sending data:" + result.text );
                        var xmlHttp = new XMLHttpRequest();
                        xmlHttp.open( "GET", "http://www.spielberg-camping.at/admin/arrival.php?id="+result.text, false ); // false for synchronous request
                        xmlHttp.send( null );
                        console.log("http://www.spielberg-camping.at/admin/arrival.php?id="+result.text);
                        console.log(xmlHttp.responseText);
                    }
                  document.getElementById("scan").disabled=false;
                    document.getElementById("scan").innerHTML="SCAN";
                },
                function (error) {
                    alert("Scanning failed: " + error);
                    document.getElementById("scan").disabled=false;
                        document.getElementById("scan").innerHTML="SCAN";
                },
                {
                    preferFrontCamera: false, 
                    showFlipCameraButton: true, 
                    showTorchButton: true, 
                    torchOn: true, 
                    prompt: "Place a barcode inside the scan area", 
                    resultDisplayDuration: 500, 
                    formats: "CODE_128", 
                    orientation: "portrait", 
                    disableAnimations: true, 
                    disableSuccessBeep: false 
                }
        );
    },
   
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    }
};
