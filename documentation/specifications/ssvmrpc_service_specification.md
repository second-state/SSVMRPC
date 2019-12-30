# SSVM Service Specification

## To Rust RPC
Calling data and return_data must be valid JSON (represent parsable objects)

### Execution

#### Execution of ethereum contract functions
```json
{
    // Debugging Info for Rust Container
    "service_name": "ERC20",  // A string
    "uuid": "0x12345678",  // 64 bits unsigned integer in hex string format
    // Info for SSVM 
    "modules": ["Ethereum"],
    "execution":
    {
        "function_name": "Mint",  // String format
        "gas": 100,
        "argument": ["0x1234", "1000"],  // JSON Array for the function's arugments
        "ethereum": {
            "caller": "0x0",  // 20 bytes hex number in string format
            "call_value": "0x0",  // 32 bytes hex number in string format
            "abi": [{                 // Smart contract ABI
                "constant": true,
                "inputs": [],
                "name": "data",
                "payable": false,
                "type": "function"
            }],
        },
        "storage": {"0000000000000000000000000000000000000000000000000000000000000000":"0000000000000000000000000000000000000000000000000000000000000064",
                    "f5b24dcea0e9381721a8c72784d30cfe64c11b4591226269f839d095b3e9cf10":"0000000000000000000000000000000000000000000000000000000000000064"},       // Key-value pairs in JSON Object
    }
}
```

```shell
$ SSVM --input_file=/home/johndoe/input.json --output_file=/home/johndoe/output.json --wasm_file=/home/johndoe/bytecode.wasm
```

SSVM has only three parameters:
1. input_file: Put a input JSON file path from SSVMRPC here.
2. output_file: Put a output JSON file path to SSVMRPC here.
3. wasm_file: Put a wasm file path to execute here.

#### Execution of non-blockchain Wasm i.e. Rust

The following data object provides the command line call with the appropriate arguments

```json
{
        "service_name": "0xccf2cd31a8d64164_1576892508_add",
        "uuid": "0x0000000012345678",
        "modules": [
                "rust"
        ],
        "execution": {
                "function_name": "add",
                "gas": 100,
                "argument": [
                        "0x0000000000000001",
                        "0x0000000000000001"
                ],
                "vm_snapshot": {
                    "global" : [
                        [0, "0x00000000FFFFFFFF"], [1, "0x00000000FFFFFFFF"]
                        // List: [global_id, value_hex_string(64bit)]
                    ],  // Global instance
                    "memory" : [
                        [0, "00000000"]
                        // List: [memory_id, memory_dump_hex_string]
                    ]   // Memory instance
                } // Dumpped snapshot to restore VM
        }
}
```

```shell
$ SSVM --input_file=/home/0xccf2cd31a8d64164/1576892508/input.json --output_file=/home/0xccf2cd31a8d64164/1576892508/output.json --wasm_file=/home/0xccf2cd31a8d64164/bytecode.wasm
```
SSVM only has three parameters:
1. input_file: Put a input JSON file path from SSVMRPC here.
2. output_file: Put a output JSON file path to SSVMRPC here.
3. wasm_file: Put a wasm file path to execute here.

## From VM
Calling data and return_data must be valid JSON (represent parsable objects)

### Execution

#### Return object of ethereum smart contract function execution
```json
{
  "service_name": "ERC20",  // A string
  "uuid": "0x12345678",  // 64 bits unsigned integer in hex string format
  "result":
  {
    "status": "Succeeded",  // Can be "Succeeded", "Failed", or "Reverted"
    "gas":100,
    "used_gas":6,
    "storage": {"0000000000000000000000000000000000000000000000000000000000000000":"0000000000000000000000000000000000000000000000000000000000000064",
                "f5b24dcea0e9381721a8c72784d30cfe64c11b4591226269f839d095b3e9cf10":"0000000000000000000000000000000000000000000000000000000000000064"},    // Key-value pairs in JSON Object
    "return_data": [],       // JSON Array
    "error_message": "...",  // String
  }
}
```

#### Return object of non-blockchain i.e. Rust function execution
```json
{
  "service_name":"0xccf2cd31a8d64164_1576892508_add",
  "uuid":"0x0000000012345678",
  "result":
  {
    "status":"Succeeded",
    "error_message":"",
    "gas":100,
    "used_gas":6,
    "vm_snapshot":
    {
      "global":[
        [0,"0x0000000000100000"],
        [1,"0x0000000000100000"],
        [2,"0x0000000000100000"]
      ],
      "memory":[
        [0,"000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000"]
      ]
    },
    "return_value":["0x0000000000000002"]
  }
}
```
