# SSVM Service Specification

## To Rust RPC
Calling data and return_data must be valid JSON (represent parsable objects)

### Execution

#### Execution of ethereum contract functions
```json
{
    // Debugging Info for Rust Container
    "Service_Name": "ERC20",  // A string
    "UUID": "0x12345678",  // 64 bits unsigned integer in hex string format
    // Info for SSVM 
    "Modules": ["Ethereum"],
    "Execution":
    {
        "Function_Name": "Mint",  // String format
        "Argument": ["0x1234", "1000"],  // JSON Array for the function's arugments
        "Ethereum": {
            "Caller": "0x0",  // 20 bytes hex number in string format
            "Call_Value": "0x0",  // 32 bytes hex number in string format
            "abi": [{                 // Smart contract ABI
                "constant": true,
                "inputs": [],
                "name": "data",
                "payable": false,
                "type": "function"
            }],
        }
        "Storage": {"0000000000000000000000000000000000000000000000000000000000000000":"0000000000000000000000000000000000000000000000000000000000000064",
                        "f5b24dcea0e9381721a8c72784d30cfe64c11b4591226269f839d095b3e9cf10":"0000000000000000000000000000000000000000000000000000000000000064"},       // Key-value pairs in JSON Object
    }
}
```

```shell
$ SSVM --input_file=/home/johndoe/input.json --output_file=/home/johndoe/output.json --bytecode_file=/home/johndoe/bytecode.wasm
```

SSVM has only three parameters:
1. input_file: Put a input JSON file path from SSVMRPC here.
2. output_file: Put a output JSON file path to SSVMRPC here.
3. bytecode_file: Put a input JSON file path from SSVMRPC here.

#### Execution of non-blockchain Wasm i.e. Rust

The following data object provides the command line call with the appropriate arguments

```json
{
    // Debugging Info for Rust Container
    "service_name": "0xccf2cd31a8d64164_1576892508_add",  // We use applicationUuid_timeStamp_functionName so that debugging via the state data is explicit
    "uuid": "0xccf2cd31a8d64164",  // 64 bits unsigned integer in hex string format
    // Info for SSVM 
    "modules": ["rust"],
    "execution":
    {
        "function_name": "mint",  // String format
        "argument": ["0x1234", "1000"],  // JSON Array for the function's arugments
        
        "storage": {"0000000000000000000000000000000000000000000000000000000000000000":"0000000000000000000000000000000000000000000000000000000000000064",
                        "f5b24dcea0e9381721a8c72784d30cfe64c11b4591226269f839d095b3e9cf10":"0000000000000000000000000000000000000000000000000000000000000064"},       // Key-value pairs in JSON Object
    }
}
```

```shell
$ SSVM --input_file=/home/johndoe/input.json --output_file=/home/johndoe/output.json --bytecode_file=/home/johndoe/bytecode.wasm
```
SSVM only has three parameters:
1. input_file: Put a input JSON file path from SSVMRPC here.
2. output_file: Put a output JSON file path to SSVMRPC here.
3. bytecode_file: Put a input JSON file path from SSVMRPC here.

## From VM
Calling data and return_data must be valid JSON (represent parsable objects)

### Execution

#### Return object of ethereum smart contract function execution
```json
{
    "Service Name": "ERC20",  // A string
    "UUID": "0x12345678",  // 64 bits unsigned integer in hex string format

    "Result":
    {
        "Status": "Successful",  // Can be "Successful", "Failed"
        "Storage": {"0000000000000000000000000000000000000000000000000000000000000000":"0000000000000000000000000000000000000000000000000000000000000064",
                        "f5b24dcea0e9381721a8c72784d30cfe64c11b4591226269f839d095b3e9cf10":"0000000000000000000000000000000000000000000000000000000000000064"},    // Key-value pairs in JSON Object
        "Return_Data": [],       // JSON Array
        "Error_Message": "...",  // String
    }
}
```

#### Return object of non-blockchain i.e. Rust function execution
```json
{
    "Service Name": "ERC20",  // A string
    "UUID": "0x12345678",  // 64 bits unsigned integer in hex string format

    "Result":
    {
        "Status": "Successful",  // Can be "Successful", "Failed"
        "Storage": {"0000000000000000000000000000000000000000000000000000000000000000":"0000000000000000000000000000000000000000000000000000000000000064",
                        "f5b24dcea0e9381721a8c72784d30cfe64c11b4591226269f839d095b3e9cf10":"0000000000000000000000000000000000000000000000000000000000000064"},    // Key-value pairs in JSON Object
        "Return_Data": [],       // JSON Array
        "Error_Message": "...",  // String
    }
}
```
