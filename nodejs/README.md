# SSVMRPC 
A mechanism to deploy and execute WebAssembly(Wasm) code on secondstate.io's stateless stack-based virtual machine, located at [github.com/second-state/SSVM](https://github.com/second-state/SSVM). This nodejs application, takes JSON request objects and returns JSON response objects. 

This nodejs application is a wrapper around secondstate.io's Wasm as a service (server) application. As you will see below this application can deploy and execute Wasm remotely using only a few lines of code at most. The request that you send is received by a service provider (and server that is running secondstate.io's [SSVMRPC software](https://github.com/second-state/SSVMRPC)). The SSVMRPC software delivers your request object to secondstate.io's Wasm virtual machine(SSVM). Once SSVM has performed the execution a response object is returned to your nodejs environment.

Usage
Install ssvmrpc nodejs package
```
npm install ssvmrpc.js
```
Import it into your nodejs environment
```
let ssvmrpc = require("ssvmrpc.js"); 
let SSVMRPC = ssvmrpc.SSVMRPC;
```
Point ssvmrpc to a valid provider (any server that is running secondstate.io's [SSVMRPC software](https://github.com/second-state/SSVMRPC))
```
let ssvmRpcInstance = new SSVMRPC('https://ssvmrpc.secondstate.io');
```
Then create a request object that adheres to secondstate.io's [HTTP POST specification](https://github.com/second-state/SSVMRPC/blob/master/documentation/specifications/http_post_specification.md)
```
data = {
	"request": {
		"application": {
			"bytecode": "0x01234567890",
			"name": "Application Example"
		}
	}
}

```
Execute one of the available functions i.e. deployWasmApplication etc.
```
ssvmRpcInstance.deployWasmApplication(data)
.then(function(result) {
    console.log(result);
  })
  .catch(function() {
    console.log("Error");
  });
```
