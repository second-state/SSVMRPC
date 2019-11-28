# SSVMRPC Application State Specification

This specification defines the storage of application state in leveldb. It envelops the [ssvmrpc_service_specification]( https://github.com/second-state/SSVMRPC/blob/master/ssvmrpc_service_specification.md) i.e. the service specification is nested inside this application state specification.

```
{
  service_name: "ERC 20", // User defined service name
	"direction": "to_vm",
	"timestamp": "TODO"
}
```


```
{
	"direction": "from_vm",
	"timestamp": "TODO"
}
```
