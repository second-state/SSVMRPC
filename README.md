# SSVMRPC
A Remote Procedure Call (RPC) implementation which facilitates both code-deployment and code-execution interactions with SecondState's stateless Virtual Machine (SSVM)

## Design overview
![ssvmrpc diagram](https://github.com/second-state/SSVMRPC/blob/master/architecture.jpg)

## HTTP POST specification
The [http_post_specification](https://github.com/second-state/SSVMRPC/blob/master/http_post_specification.md) file provides detailed specification for calling SSVMRPC from the web.

## State specification
The [ssvmrpc_application_state_specification.md](https://github.com/second-state/SSVMRPC/blob/master/ssvmrpc_application_state_specification.md) file provides a detailed specification for storing application state.

## Service specification
The [ssvmrpc_service_specification.md](https://github.com/second-state/SSVMRPC/blob/master/ssvmrpc_service_specification.md) file provides a detailed specification for service objects (function to call, arguments to use etc).

## Installing SSVMRPC
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
Create/open the ~/ssvmrpc/src/main.rs file and fill it with the contents of [this raw main.rs file](https://raw.githubusercontent.com/second-state/SSVMRPC/master/main.rs)

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
Endpoints
```
http://ip_address:8000/deploy
http://ip_address:8000/destroy
http://ip_address:8000/execute
```
Example of passing in unknown arbitrary data i.e. calling execute with the following JSON string
```
http://ip_address:8000/execute
```
```
{"application":{"more_keys":"more_values"}, "asdf":"xyz"}
```
Results in
```
Application: String("more_values")
```
Note the new `v["application"]["more_keys"]` notation which now allows us to look into internal objects even if we only know one path (not necessary to define all keys as Rust struct components). As you can see, the Rust application correctly sees this as a String. Also if we just ask for `v["application"]` we can see that Rust correctly sees this as an Object 
```
Application: Object({"more_keys": String("more_values")})
```
This is perfect.
