This example is designed to demonstrate how to store values on the heap (as apposed to only using values on the stack which are exhausted upon completion of execution)

This example is code only (with request response syntax) It does not go into details about setting up Rust programming language and/or any compiler configuration etc. Please see this [other example](https://github.com/second-state/SSVMRPC/blob/master/examples/creating_wasm_application.md#set-wasm-specific-system-configuration) which explains exactly how to perform specific wasm configuration etc.
Persist code

# Rust 

```
#[no_mangle]
pub extern fn persist(_x: u32) -> u32{
    let x = Box::new(_x);
    let r = x.clone();
    *r
}
```

# Wat

```
(module
  (type (;0;) (func (param i32) (result i32)))
  (func $persist (type 0) (param i32) (result i32)
    local.get 0)
  (table (;0;) 1 1 funcref)
  (memory (;0;) 16)
  (global (;0;) (mut i32) (i32.const 1048576))
  (global (;1;) i32 (i32.const 1048576))
  (global (;2;) i32 (i32.const 1048576))
  (export "memory" (memory 0))
  (export "__data_end" (global 1))
  (export "__heap_base" (global 2))
  (export "persist" (func $persist)))
  ```

  # Hexdump

  ```
  0x0061736d0100000001060160017f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b072f04066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f626173650302077065727369737400000a0601040020000b
  ```

#  Deployment - request

```
{
 "request": {
  "application": {
   "storage": "file_system",
   "bytecode": "0x0061736d0100000001060160017f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b072f04066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f626173650302077065727369737400000a0601040020000b",
   "name": "Persist"
  }
 }
}
```

# Deployment - response

```{
    "response": {
        "application": {
            "name": "Persist",
            "uuid": "0x1bb19a4f69c45206"
        },
        "status": "success"
    }
}
```

# Execution - request

```
{
 "request": {
  "application": {
   "storage": "file_system", 
   "uuid": "0x1bb19a4f69c45206"
  },
  "function": {
   "name": "persist", 
   "arguments": ["10"],
   "argument_types": ["i32"], 
         "return_types": ["i32"]
  },
  "modules": ["rust"] 
 }
}
```

# Execution - response

```
{
    "result": {
        "error_message": "",
        "gas": 0,
        "gas_used": 4,
        "return_value": [
            "10"
        ],
        "status": "Succeeded",
        "vm_snapshot": {
            "global": [
                [
                    0,
                    "0x0000000000100000"
                ],
                [
                    1,
                    "0x0000000000100000"
                ],
                [
                    2,
                    "0x0000000000100000"
                ]
            ]
        }
    },
    "service_name": "0x1bb19a4f69c45206_1579136500_persist",
    "uuid": "0x1bb19a4f69c45206"
}
```
