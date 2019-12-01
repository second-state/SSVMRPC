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
```
Rust installation
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```
Rust configuration
```
rustup override set nightly
```
Add rocket dependency to Cargo.toml
```
[dependencies]
rocket = "0.4.2"
```
Create the SSVMRPC project
```
cd ~
cargo new ssvmrpc
cd ssvmrpc
```
Create/open the ~/ssvmrpc/src/main.rs file and fill with the following contents
```
#TODO
```
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
