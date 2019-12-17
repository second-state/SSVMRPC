# SSVMRPC Application State Specification

This specification defines the storage of application state. The ssvmrpc_state_specification is just a "specification". The concrete implementation of this specification is [the SSVMContainer's storage](https://github.com/second-state/SSVMContainer/blob/master/README.md#storage) mechanism. 

This ssvmrpc_state_specification, envelops the [ssvmrpc_service_specification]( https://github.com/second-state/SSVMRPC/blob/master/ssvmrpc_service_specification.md) i.e. the service specification is nested inside this ssvmrpc_state_specification. Please note the `"service":{}` object below.

```
{
	"applications": [{
			"application_uuid": "0x11111111",
			"application_name": "Application 1",
			"bytecode": "0x987654321",
			"services": [{
				"service_uuid": "0x48576757",
				"service_name": "add",
				"executions": [{
					"timestamp_uuid": "1575158141",
					"input": {},
					"output": {}
				}]
			}]
		},
		{
			"application_uuid": "0x11111112",
			"application_name": "Application 2",
			"bytecode": "0x123456789",
			"services": [{
				"service_uuid": "0x374657867",
				"service_name": "add",
				"executions": [{
					"timestamp_uuid": "1575158144",
					"input": {},
					"output": {}
				}]
			}]
		}
	]
}
```
