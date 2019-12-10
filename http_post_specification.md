# HTTP POST Specification

Requests to deploy and/or execute code on the SSVM can be performed in a language agnostic way, via HTTP POST. For example a user, or an application, can construct a HTTP POST and send it to the [SSVMRPC](https://github.com/second-state/SSVMRPC) endpoint, to receive a response from the SSVM.

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
			"name": "add", // function name as per wat
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
