# SSVMRPC
A Remote Procedure Call (RPC) implementation which facilitates both code-deployment and code-execution interactions with SecondState's stateless Virtual Machine (SSVM)

# Try our ready-made demo now
If you would like to quickly deploy your Wasm binary `.wasm` file and then execute some of its functions using nothing but Javascript or a Curl command, please go to the [usage section of this page]().

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

You can use a command line approach i.e. curl, client-side Javascript or Node.js.

### Curl
```
curl
```

### Javascript
```

```

### Node.js
```

```
