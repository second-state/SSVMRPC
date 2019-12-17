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
Create/open the ~/ssvmrpc/src/main.rs file and fill with the following contents
```
#![feature(proc_macro_hygiene, decl_macro)]
use rocket::response::content;
use rocket::Data;
use serde_json::Value;
use std::str;
#[macro_use]
extern crate rocket;

/// Ethereum WebAssembly (Ewasm)
/// Deploy an Ewasm application (returns a uuid for future reference)
/// http://ip_address:8000/deploy_ewasm_application
#[post("/deploy_ewasm_application", data = "<bytes_vec>")]
fn deploy_ewasm_application(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]);
    }
    content::Json("{'response':'success'}")
}

/// Ethereum WebAssembly (Ewasm)
/// Destroy a stored Ewasm application instance (returns the uuid of the destroyed application)
/// http://ip_address:8000/destroy_ewasm_application
#[post("/destroy_ewasm_application", data = "<bytes_vec>")]
fn destroy_ewasm_application(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]);
    }
    content::Json("{'response':'success'}")
}

/// Ethereum WebAssembly (Ewasm)
/// Execute an Ewasm application's function
/// http://ip_address:8000/execute_ewasm_function
#[post("/execute_ewasm_function", data = "<bytes_vec>")]
fn execute_ewasm_function(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]["more_keys"]);
    }
    content::Json("{'response':'success'}")
}

/// Ethereum WebAssembly (Ewasm)
/// Execute an Ewasm application's function in an ad hoc fashion
/// http://ip_address:8000/execute_ewasm_function_adhoc
#[post("/execute_ewasm_function_adhoc", data = "<bytes_vec>")]
fn execute_ewasm_function_adhoc(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]["more_keys"]);
    }
    content::Json("{'response':'success'}")
}

/// WebAssembly (Wasm)
/// Deploy a Wasm application (returns a uuid for future reference)
/// http://ip_address:8000/deploy_wasm_application
#[post("/deploy_wasm_application", data = "<bytes_vec>")]
fn deploy_wasm_application(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]);
    }
    content::Json("{'response':'success'}")
}

/// WebAssembly (Wasm)
/// Destroy a Wasm application (returns the uuid of the destroyed application)
/// http://ip_address:8000/destroy_wasm_application
#[post("/destroy_wasm_application", data = "<bytes_vec>")]
fn destroy_wasm_application(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]);
    }
    content::Json("{'response':'success'}")
}

/// WebAssembly (Wasm)
/// Execute a Wasm application's function
/// http://ip_address:8000/execute_wasm_function
#[post("/execute_wasm_function", data = "<bytes_vec>")]
fn execute_wasm_function(bytes_vec: Data) -> content::Json<&'static str> {
    if bytes_vec.peek_complete() {
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        println!("Application: {:?}", v["application"]["more_keys"]);
    }
    content::Json("{'response':'success'}")
}

fn main() {
    rocket::ignite()
        .mount("/", routes![deploy_ewasm_application, destroy_ewasm_application, execute_ewasm_function, execute_ewasm_function_adhoc, deploy_wasm_application, destroy_wasm_application, execute_wasm_function])
        .launch();
}
```

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
