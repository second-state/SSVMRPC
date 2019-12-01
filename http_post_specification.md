# HTTP POST Specification

Requests to deploy and/or execute code on the SSVM can be performed in a language agnostic way, via HTTP POST. For example a user, or an application, can construct a HTTP POST and send it to the [SSVMRPC](https://github.com/second-state/SSVMRPC) endpoint, to receive a response from the SSVM.

## Deploy non-blockchain application instance

```
{
	"request": {
		"type": "deploy",
		"application": {
			"name": "My Application",
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
## Destroy non-blockchain application instance
```
{
	"request": {
		"type": "destroy",
		"application": {
			"uuid": "0x1234"
		}
	}
}
```

```
{
	"response": {
		"status": "success"
	}
}
```


## Execute service non-blockchain application

