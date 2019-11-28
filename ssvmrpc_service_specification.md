# SSVM Service Specification

## To VM
Calling data and return_data must be valid JSON (represent parsable objects)

### Deployment

#### Deploy ethereum contract
```
{
    "service_name": "ERC20", // A string
    "type": "deployment",              // Only accept "execution" and "deployment"
    "modules": ["ethereum"],          // "ethereum" for enabling "EEI", "Core" for enabling "wasi_core"
    "deployment":                     // Only valid when "type" is "deployment" 
    {
        "bytecode": "0x0",            // Wasm format (encoded in hex string)
        "argument": [10000, "ERC20"], // JSON Array for the constructor's arugments
        "ethereum": {                 // Only valid when "modules" is "ethereum"
            "abi": [{                 // Smart contract ABI
                "constant": true,
                "inputs": [],
                "name": "data",
                "payable": false,
                "type": "function"
            }],
            "caller": "0x0",          // 20 bytes hex number in string format
            "call_value": "0x0"        // 32 bytes hex number in string format
        }
    }
}
```

```
ssvm deploy --modules=ethereum --service_name="ERC20" --bytecode="0x0" --argument="[10000, "ERC20"]" --abi="[...]" --caller="0x0" --call_value="0x0"
```

#### Deploy non-blockchain Wasm i.e. Rust
```
{
    "service_name": "Bank Service",
    "type": "deployment",
    "modules": "core",
    "deployment":
    {
        "bytecode": "0x...",
        "argument": [],
    }
}
```

```
ssvm deploy --modules=core --service_name="Bank Service" --bytecode="0x..." --argument="[]"
```

### Execution

#### Execution of ethereum contract functions
```
{
    "service_name": "ERC20",
    "type": "execution",
    "modules": ["ethereum"],
    "execution":
    {
        "uuid": "0x12345678",
        "function_name": "Mint",
        "argument": ["0x1234", 1000],
        "ethereum": {
            "caller": "0x0",
            "call_value": "0x0"
        }
    }
}
```

```
ssvm execute --modules=ethereum --uuid="0x12345678" --service_name="ERC20" --function_name="Mint" --argument="["0x1234", 1000]" --caller="0x0" --call_value="0x0"
```
#### Execution of non-blockchain Wasm i.e. Rust

The following data object provides the command line call with the appropriate arguments

```
{
    "service_name": "Bank Service",
    "type": "execution",
    "modules": ["core"],
    "execution":
    {
        "uuid": "0x12345678",
        "function_name": "Add",
        "argument": [100, 200]
    }
}
```
Example command line execution based on the above data object
```
ssvm execute --modules=core --service_name="Bank Service" --function_name="Add" --argument="[100, 200]" --bytecode="0x..." --argument="[]"
```


## From VM
Calling data and return_data must be valid JSON (represent parsable objects)

### Deployment

#### Return object of ethereum smart contract deployment
```
{
    "service_name": "ERC20",
    "result":
    {
        "status": "Deployed",    // Can be "Deployed", "Failed"
        "uuid": "0x12345678",    // 64 bits unsigned integer in hex string format
        "error_message": "..."  // String
    }
}
```

#### Return object of non-blockchain i.e. Rust deployment
```
{
    "service_name": "Bank Service",
    "result":
    {
        "status": "Deployed",    // Can be "Deployed", "Failed"
        "uuid": "0x12345678",    // 64 bits unsigned integer in hex string format
        "error_message": "..."  // String
    }
}
```

### Execution

#### Return object of ethereum smart contract function execution
```
{
    "service_name": "ERC20",
    "result":
    {
        "status": "Successful",  // Can be "Deployed", "Successful", "Failed"
        "return_data": [],       // JSON Array
        "error_message": "..."  // String
    }
}
```

#### Return object of non-blockchain i.e. Rust function execution
```
{
    "service_name": "Bank Service",
    "result":
    {
        "status": "Successful",  // Can be "Deployed", "Successful", "Failed"
        "return_data": [300],    // JSON Array
        "error_message": "..."  // String
    }
}
```
