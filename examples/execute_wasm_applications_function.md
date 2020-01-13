Now that you have created and deployed your Wasm application, you can go ahead and execute one of its public functions.

# Executing an application's function

The calling of an application's function is not limited to just users. This article explains how to call Wasm functions via Curl etc. because this is a great way to roll up your sleeves and understand the details of the requests and responses. 
The reality is that most of the time these functions will be called programatically by machines. At the very least, they will be constructed programatically behind a web browser or phone app and will be executed via end user "clicks".
Let's now have a go at calling an application's function. 

Copy and paste the following curl command into your terminal (or if you prefer, you can use a Graphical User Interface like Postman to perform this HTTP request for you).
Command line - Curl syntax example
Don't be overwhelmed by the `--data` below. It is actually pretty straight forward (see the HTTP POST specification for more information). Essentially, we are just calling the function add_two_numbers and passing in two numbers ["2", "2"] ; expecting a return value of "4" 

## Executing using Curl

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"request": {"application": {"storage": "file_system", "uuid": "0xa9d57ac0f5046512"},"function": {"name": "add_two_numbers", "arguments": ["2", "2"],"argument_types": ["i32", "i32"], "return_types": ["i32"]},"modules": ["rust"] }}' \
  http://13.54.168.1:8000/execute_wasm_function
  ```
  
## Executing using a GUI - Postman JSON example

```
{
 "request": {
  "application": {
   "storage": "file_system", 
   "uuid": "0xa9d57ac0f5046512"
  },
  "function": {
   "name": "add_two_numbers", 
   "arguments": ["2", "2"],
   "argument_types": ["i32", "i32"], 
         "return_types": ["i32"]
  },
  "modules": ["rust"] 
 }
}
```

## Response

Either of the above methods will produce a result object, as shown below. You will notice the return value "return_value":["4"] which is correct.

```
{
 "result": {
  "error_message": "",
  "gas": 0,
  "gas_used": 6,
  "return_value": [
   "4"
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
 "service_name": "0xa9d57ac0f5046512_1578786333_add_two_numbers",
 "uuid": "0xa9d57ac0f5046512"
}
```

You may have also noticed that there is a vm_snapshot section in the return data. What is this `vm_snapshot` ?

# VM Snapshot

VM Snapshot is data which is produced by SecondState's Virtual Machine(SSVM), itself. 
It is important to remember that the SSVM itself is stateless. Each call to this system invokes a new clean SSVM instance. 
The vm_snapshot data allows the overarching system to store the last known state of the SSVM. By storing this vm_snapshot information, we are able to ensure that SSVM can pick up where it last left off. Using this approach, the last known state of SSVM can be restored during the next execution.
We mentioned at the beginning of this article that an end-user does not really need to understand the inner workings of the system. Simply put, if an end-user repeatedly calls a function, all of the vm_snapshot (VM state) will be handled by the system on their behalf.

# Stateful Wasm execution as a service
This article has demonstrated a simple stateful Wasm execution environment; one where human callers or machines can interact, with the logic of each discrete Wasm function. Simply using HTTP POST requests via the web.