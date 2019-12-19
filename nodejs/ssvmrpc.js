class SSVMRPC {
    // Search Engine Base URL (Please include protocol. Please do not include trailing slash)
    // Example: https://search-engine.com
    constructor(_ssvmRpcBaseUrl) {
        this.ssvmRpcBaseUrl = _ssvmRpcBaseUrl;
        console.log("SSVMRPC Base URL set to: " + this.ssvmRpcBaseUrl);
    }
    
    // DEPLOY Ewasm
    deployEwasmApplication(_data){
    var url = this.ssvmRpcBaseUrl + "/deploy_ewasm_application";
            return new Promise(function(resolve, reject) {
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
                xhr.send(JSON.stringify(_data));
            });
        }

    // DESTROY Ewasm
    destroyEwasmApplication(_data){
    var url = this.ssvmRpcBaseUrl + "/destroy_ewasm_application";
            return new Promise(function(resolve, reject) {
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
                xhr.send(JSON.stringify(_data));
            });
        }

    // DEPLOY Wasm
    deployWasmApplication(_data){
    var url = this.ssvmRpcBaseUrl + "/deploy_wasm_application";
            return new Promise(function(resolve, reject) {
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
                xhr.send(JSON.stringify(_data));
            });
        }

    //DESTROY Wasm
    destroyWasmApplication(_data){
    var url = this.ssvmRpcBaseUrl + "/destroy_wasm_application";
            return new Promise(function(resolve, reject) {
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
                xhr.send(JSON.stringify(_data));
            });
        }
}

