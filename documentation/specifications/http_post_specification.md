# HTTP POST Specification

Requests to deploy and/or execute code on the SSVM can be performed in a language agnostic way, via HTTP POST. For example a user, or an application, can construct a HTTP POST and send it to the [SSVMRPC](https://github.com/second-state/SSVMRPC) endpoint, to receive a response from the SSVM.

You will notice that each action is split up into a separate endpoint. This is done for a few reasons:
- it allows the software that receives the request to manage permissions/access control on a per-endpoint basis (as apposed to peeking into the incoming data to make these decisions. This is for both safety and flexibility)
- it allows the service to manage user subscriptions (credits, limits, throttling usage etc.) and/or monetization if required
- it requires less data to be sent i.e. the endpoint describes the service so there is no need to add this to the JSON

# Wasm (WebAsssembly)

## Deploy WebAssembly(Wasm) application instance

```
http://ip_address:8000/deploy_wasm_application
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"bytecode": "0x0",
			"name": "Application 1"
		}
	}
}
```
```
{
    "response": {
        "application": {
            "name": "Application 1",
            "uuid": "57f34cba-d4d8-41a9-a933-ecbe7103d2a1"
        },
        "status": "success"
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
			"storage": "file_system", // "file_system" or "leveldb"
			"uuid": "uuid"
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
# Ewasm (Ethereum WebAssembly)
## Deploy an Ethereum flavoured WebAssembly(Ewasm) application instance

```
http://ip_address:8000/deploy_ewasm_application
```

```
{
	"request": {
		"application": {
			"storage": "file_system", // "file_system" or "leveldb"
			"bytecode": "0x0",
			"name": "Application 1"
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
			"storage": "file_system", // "file_system" or "leveldb"
			"uuid": "uuid"
		}
	}
}
```
## Execute an Ethereum flavoured WebAssembly(Ewasm) application's function
This call will execute a function of the application at `uuid` 0x1234. The state of the application at `uuid` 0x1234 will be updated based on this activity. If you want to just execute the function arbitrarily then please use the `execute_ewasm_function_adhoc` endpoint and pass in your own state.
```
http://ip_address:8000/execute_ewasm_function
```

```
{
	"request": {
		"application": {
			"storage": "file_system",
			"uuid": "0x1234"
		},
		"function": {
			"name": "add",
			"arguments": ["2", "2"],
			"caller": "0x0",
			"call_value": "0x0"
		},
		"modules": ["ewasm"],
		"abi": [{
			"constant": true,
			"inputs": [],
			"name": "data",
			"payable": false,
			"type": "function"
		}]
	}

}
```
```
{
    "response": {
        "application": {
            "name": "Application 1",
            "uuid": "57f34cba-d4d8-41a9-a933-ecbe7103d2a1"
        },
        "status": "success"
    }
}
```
{
	"response": {
		"status": "success",
		"data": 4 // this can be any amount of valid JSON data
	}
}
```
## Adhoc Ewasm execution
Execute an Ethereum flavoured WebAssembly(Ewasm) application's function by passing in your own state.

```
http://ip_address:8000/execute_ewasm_function_adhoc
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
		"storage": {          // calling code passed in the current state
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
		"data": 4,
		"storage": {          // returns the updated state which can be used to make another call
			"00000...00000": "00000...00064",
			"f5b24...9cf10": "00000...00064"
		}
	}
}
```


