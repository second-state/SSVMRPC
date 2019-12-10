# HTTP POST Specification

Requests to deploy and/or execute code on the SSVM can be performed in a language agnostic way, via HTTP POST. For example a user, or an application, can construct a HTTP POST and send it to the [SSVMRPC](https://github.com/second-state/SSVMRPC) endpoint, to receive a response from the SSVM.

You will notice that each action is split up into a separate endpoint. This is done for a few reasons:
- it allows the software that receives the request to manage permissions/access control on a per-endpoint basis (as apposed to peeking into the incoming data to make these decisions. This is for both safety and flexibility)
- it allows the service to manage user subscriptions (credits, limits, throttling usage etc.) and/or monetization if required
- it requires less data to be sent i.e. the endpoint describes the service so there is no need to add this to the JSON

## Deploy WebAssembly(Wasm) application instance

```
http://ip_address:8000/deploy_wasm_application
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"bytecode": "0x0"
		}
	}
}
```
```
{
	"response": {
		"status": "success",
		"application": {
			"uuid": "0x1234"
		}
	}
}
```
## Destroy WebAssembly(Wasm) application instance

```
http://ip_address:8000/destroy_wasm_application
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"uuid": "0x1234"
		}
	}
}
```
```
{
	"response": {
		"status": "success",
		"application": {
			"uuid": "0x1234"
		}
	}
}
```
## Execute a WebAssembly(Wasm) application's function

```
http://ip_address:8000/execute_wasm_function
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"uuid": "0x1234"
		},
		"function": {
			"name": "add", // function name as per wat file 
			"arguments": [2, 2] // valid arguments of the function, in the correct order
		},
		"modules": ["wasi-core", "rust"] // can be blank or list as many modules as required
	}
}
```
```
{
	"response": {
		"status": "success",
		"data": 4 // this can be any amount of valid JSON data
	}
}
```

## Deploy an Ethereum flavoured WebAssembly(Ewasm) application instance

```
http://ip_address:8000/deploy_ewasm_application
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"bytecode": "0x0"
		}
	}
}
```
```
{
	"response": {
		"status": "success",
		"application": {
			"uuid": "0x1234"
		}
	}
}
```
## Destroy an Ethereum flavoured WebAssembly(Ewasm) application instance

```
http://ip_address:8000/destroy_ewasm_application
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"uuid": "0x1234"
		}
	}
}
```
```
{
	"response": {
		"status": "success",
		"application": {
			"uuid": "0x1234"
		}
	}
}
```
## Execute an Ethereum flavoured WebAssembly(Ewasm) application's function

```
http://ip_address:8000/execute_ewasm_function
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"uuid": "0x1234"
		},
		"function": {
			"name": "add", // function name as per wat file 
			"arguments": [2, 2] // valid arguments of the function, in the correct order
		},
		"modules": ["ewasm"], // can be blank or list as many modules as required
		"storage": {          // storage can be empty, i.e. "storage":{}, if this is the inaugural execution
			"00000...00000": "00000...00064",
			"f5b24...9cf10": "00000...00064"
		}
	}

}
```
```
{
	"response": {
		"status": "success",
		"data": 4 // this can be any amount of valid JSON data
	}
}
```

