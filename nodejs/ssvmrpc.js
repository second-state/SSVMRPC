function SSVMRPC(_ssvmRpcBaseUrl) {
        this.ssvmRpcBaseUrl = _ssvmRpcBaseUrl;
    
    // DEPLOY Ewasm
    this.deployEwasmApplication = function(_data){
    let url = this.ssvmRpcBaseUrl + "/deploy_ewasm_application";
            return new Promise(function(resolve, reject) {
                XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function(e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        }
                    } 
                };
                xhr.onerror = reject;
                xhr.open("POST", url, true);
                xhr.send(JSON.stringify(_query));
            });
        }

    // DESTROY Ewasm
    this.destroyEwasmApplication = function(_data){
    let url = this.ssvmRpcBaseUrl + "/destroy_ewasm_application";
            return new Promise(function(resolve, reject) {
                XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function(e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        }
                    } 
                };
                xhr.onerror = reject;
                xhr.open("POST", url, true);
                xhr.send(JSON.stringify(_query));
            });
        }

    // DEPLOY Wasm
    this.deployWasmApplication = function(_data){
    let url = this.ssvmRpcBaseUrl + "/deploy_wasm_application";
            return new Promise(function(resolve, reject) {
                 XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function(e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        }
                    } 
                };
                xhr.onerror = reject;
                xhr.open("POST", url, true);
                xhr.send(JSON.stringify(_query));
            });
        }

    //DESTROY Wasm
    this.destroyWasmApplication = function(_data){
    let url = this.ssvmRpcBaseUrl + "/destroy_wasm_application";
            return new Promise(function(resolve, reject) {
                 XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function(e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        }
                    } 
                };
                xhr.onerror = reject;
                xhr.open("POST", url, true);
                xhr.send(JSON.stringify(_query));
            });
        }
}
module.exports = {
    SSVMRPC: SSVMRPC
}

