# SSVMRPC
A Remote Procedure Call (RPC) implementation which facilitates both code-deployment and code-execution interactions with SecondState's stateless Virtual Machine (SSVM)

# Try our ready-made demo now
If you would like to quickly deploy your Wasm binary `.wasm` file and then execute some of its functions using nothing but Javascript or a Curl command, please go to the [usage section of this page](https://github.com/second-state/SSVMRPC/blob/master/README.md#usage).

# Create your own from scratch
Alternatively, if you want to create your very own environment from scratch, you can read along and follow the instructions which are directly below this paragraph. These instructions will help you set up everything from RPC server, RPCContainer, SSVM complete with SSL, CORS and so forth.

## Design overview
![ssvmrpc diagram](https://github.com/second-state/SSVMRPC/blob/master/documentation/images/architecture.jpg)

## Creating your own SSVMRPC
The following instructions will guide you through setting up your SSVMRPC server, which can receive HTTP POST requests from the web and communicate those to the rest of the SSVM ecosystem.

System preparation
```
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y install gcc
```
Rust installation
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```
Create the SSVMRPC project
```
cd ~
cargo new ssvmrpc
cd ssvmrpc
```
Rust configuration and housekeeping
```
rustup override set nightly
rustup update && cargo update
```
Add rocket dependency to Cargo.toml
```
[dependencies]
serde_json = { git = "https://github.com/serde-rs/json" }
ssvm_container = { git = "https://github.com/second-state/SSVMContainer" }
rocket = { git = "https://github.com/SergioBenitez/Rocket" }
```
## Main code
Create/open the ~/ssvmrpc/src/main.rs file and fill it with the contents of [this raw main.rs file](https://raw.githubusercontent.com/second-state/SSVMRPC/master/rust/main.rs)

Once your ~/ssvmrpc/src/main.rs file has been populated, you can build and deploy the application as follows.

## Deployment
Build the ssvmrpc application
```
cd ~
cd ssvmrpc
cargo build --release
```
Start the ssvmrpc server
```
./target/release/ssvmrpc
```

## Usage

You can use a command line approach i.e. curl, client-side Javascript or Node.js. As you know, each of these HTTP POST style approaches allow you to pass in a JSON data object. Below are a few arbitrary examples. Please see our [HTTP POST Specification](https://github.com/second-state/SSVMRPC/blob/master/documentation/specifications/http_post_specification.md) for more details on packing and unpacking request/response objects.

### Deploy an application

We would use the same request data, regardless of which HTTP POST approach we used i.e. Curl vs Javascript etc. Here is an example of the data required to deploy and application. As you can see below, we are essentially just passing in the text of a `.wasm` binary and an arbitrary `name` for your new application.

```
{
	"request": {
		"application": {
			"bytecode": "0x01234567890",
			"name": "Application Example"
		}
	}
}
```
#### Curl

The following Curl command
```
curl --header "Content-Type: application/json" \
     --request POST \
     --data '{"request": {"application": {"storage": "file_system", "bytecode": "0x01234567890","name": "My App"}}}' \
     http://13.236.207.76:8000/deploy_wasm_application
```
Returns the following JSON result
```
{"response":{"application":{"name":"My App","uuid":"1f81f773-2f1d-4632-9765-bdfedb54eb33"},"status":"success"}}
```

The response from the above request will provide us with a unique identifier for our application. As you can see below i.e. the `response->application->uuid` key has a value of `1f81f773-2f1d-4632-9765-bdfedb54eb33`. **Note: This uuid must be saved/stored somewhere on your calling application.** 

```
{
    "response": {
        "application": {
            "name": "My App",
            "uuid": "1f81f773-2f1d-4632-9765-bdfedb54eb33"
        },
        "status": "success"
    }
}
```

The uuid is essential for further interaction with your newly deployed application. This uuid allows you to identify your application, when performing execution of the functions that reside in your Wasm application. Let's take a look at how we would pass in our uuid. The next example shows how to pass in a uuid to remove that particular application from the system.

### Destroy an application

**A word about application state**
This system allows you to deploy a `.wasm` file and call its functions, as a service. Whilst the actual execution of the Wasm code is performed in a stateless stack-based Virtual Machine (VM) called [SSVM](https://github.com/second-state/SSVM), this system does actually provide state. The default storage mechanism stores all information and activity [on disk](https://github.com/second-state/SSVMContainer#file-system). Future versions will use leveldb etc.

The "destroy" functionality of this service essentially allows you to free up storage.

### Curl

The following Curl example
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"request": {"application": {"storage": "file_system", "uuid": "1f81f773-2f1d-4632-9765-bdfedb54eb33"}}}' \
  http://13.236.207.76:8000/destroy_wasm_application
```
Returns the following result
```
{"response":{"application":{"storage":"file_system","uuid":"1f81f773-2f1d-4632-9765-bdfedb54eb33"},"status":"success"}}
```

### Javascript

```
#TODO
```

### Node.js

```
#TODO
```
