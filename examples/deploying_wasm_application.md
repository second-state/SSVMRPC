Once you have created your application, you can deploy it as follows.


# Deploying your application

This hexadecimal dump of the Wasm file needs a quick tweak. We need to add a 0x to the beginning of the Wasm hex string when we deploy our application. Here is an example of how we deploy the application via Curl.

## Curl

Note the 0x, that we manually added, at the start of the bytecode!

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{
"request": {
"application": {
"storage": "file_system",
"bytecode": "0x0061736d0100000001070160027f7f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b073704066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f6261736503020f6164645f74776f5f6e756d6265727300000a09010700200120006a0b","name": "Add"}}}' \
http://13.54.168.1:8000/deploy_wasm_application
```

## Postman

Here is the equivalent JSON that you would pass in, if using a GUI HTTP client to make the POST request.
Again, note the 0x, that we manually added, at the start of the bytecode!

```
{
 "request": {
  "application": {
   "storage": "file_system",
   "bytecode": "0x0061736d0100000001070160027f7f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b073704066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f6261736503020f6164645f74776f5f6e756d6265727300000a09010700200120006a0b",
   "name": "Add"
  }
 }
}
```

# Response

```
{"response":{"application":{"name":"Add","uuid":"0xa9d57ac0f5046512"},"status":"success"}}
```

# Application successfully deployed

When the application deploys, it will return a unique identifier i.e. **0xa9d57ac0f5046512** . You will need to remember/save this identifier for when you are calling an application's function, in the future.

Now that you have successfully deployed your application, you can go ahead and execute your application's public functions


