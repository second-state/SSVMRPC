This section will show you how to create and [deploy](https://github.com/second-state/SSVMRPC/blob/master/examples/deploying_wasm_application.md) your own Wasm executable on the SecondState infrastructure. It will also show you how to [execute one of your application's public functions](https://github.com/second-state/SSVMRPC/blob/master/examples/execute_wasm_applications_function.md). For this application creation & deployment demonstration, we will use Rust on an Ubuntu OS.

# Install Rust

```
sudo apt-get update
sudo apt-get -y upgrade
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

# Create a new application

```
cd ~
cargo new --lib add
cd add
```

# Set Wasm specific system configuration 

Add the following to the Cargo.toml file

```
[lib]
name = "add_lib"
path = "src/lib.rs"
crate-type =["cdylib"]
```

# Write the source code

Open a new file at src/lib.rs and add the following code
```
#[no_mangle]
pub extern fn add_two_numbers(_x: i32, _y: i32) -> i32{
_x + _y
}
```

# Wasm system config

```
rustup target add wasm32-wasi
rustup override set nightly
```

# Compile to Wasm

```
cargo build --release --target=wasm32-wasi
```

The above compilation will create a new Wasm file at target/wasm32-wasi/release/add_lib.wasm . This is the file that we will deploy on SecondState's Wasm infrastructure.
As you will see in a minute, we will be following this particular HTTP POST specification when deploying this application.

# A quick word about compiled Wasm files

## WAT

If you would like to see the textual representation of your application (known as "WebAssembly Text format" or "WAT" for short), you can install the incredibly useful wabt toolkit. Simply run the following command; converting from wasm to wat.

```
./wasm2wat ~/add/target/wasm32-wasi/release/add_lib.wasm -o ~/add/target/wasm32-wasi/release/add_lib.wat
```

The textual representation (WAT) will look like this.

```
(module
(type (;0;) (func (param i32 i32) (result i32)))
(func $add_two_numbers (type 0) (param i32 i32) (result i32)
local.get 1
local.get 0
i32.add)
(table (;0;) 1 1 funcref)
(memory (;0;) 16)
(global (;0;) (mut i32) (i32.const 1048576))
(global (;1;) i32 (i32.const 1048576))
(global (;2;) i32 (i32.const 1048576))
(export "memory" (memory 0))
(export "__data_end" (global 1))
(export "__heap_base" (global 2))
(export "add_two_numbers" (func $add_two_numbers)))
```

## Wasm

You will notice that the original add_lib.wasm file is not able to be easily viewed, as it is a binary file. You will also notice that without any optimisations, the Wasm file is around 1800000 bytes … ouch!
We will be using the following command to convert the Wasm file to hex (for use in the HTTP POST's JSON data). 
**Before you do that however, I highly recommend shrinking the original Wasm file.**

```
xxd -p target/wasm32-wasi/release/add_lib.wasm | tr -d $'\n'
```

One very easy way to shrink the Wasm executable is to use the awesome wabt toolkit again. Except this time we will convert back the other way i.e. convert the wat file (that we just created) back to wasm like this.

```
./wat2wasm ~/add/target/wasm32-wasi/release/add_lib.wat -o ~/add/target/wasm32-wasi/release/add_lib.wasm
```

The overall result of these conversions sees the Wasm executable size go from the original 1800000 bytes to just 4000 bytes. The hexadecimal representation of the Wasm executable file now looks, literally, like this …
```
0061736d0100000001070160027f7f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b073704066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f6261736503020f6164645f74776f5f6e756d6265727300000a09010700200120006a0b
```

Next you can [deploy your application](https://github.com/second-state/SSVMRPC/blob/master/examples/deploying_wasm_application.md).
