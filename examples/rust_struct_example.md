# Rust

```
struct Rectangle {
    width: u32,
    height: u32,
    area: u32,
}
impl Rectangle {
    fn calculate_area(&mut self) {
        self.area = self.width * self.height;
    }
}
#[no_mangle]
pub extern fn calc_area(_w: u32, _h: u32) -> u32 {
    let rec = &mut Rectangle {width: _w, height: _h, area: 0};
    rec.calculate_area();
    return rec.area;
}
```

# Wat

```
(module
  (type (;0;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 0) (param i32 i32) (result i32)
    local.get 1
    local.get 0
    i32.mul)
  (table (;0;) 1 1 funcref)
  (memory (;0;) 16)
  (global (;0;) (mut i32) (i32.const 1048576))
  (global (;1;) i32 (i32.const 1048576))
  (global (;2;) i32 (i32.const 1048576))
  (export "memory" (memory 0))
  (export "__data_end" (global 1))
  (export "__heap_base" (global 2))
  (export "calc_area" (func 0)))
```

# Hexdump

```
0x0061736d0100000001070160027f7f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b073104066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f6261736503020963616c635f6172656100000a09010700200120006c0b
```

# Deployment - request

```
{
 "request": {
  "application": {
   "storage": "file_system",
   "bytecode": "0x0061736d0100000001070160027f7f017f030201000405017001010105030100100619037f01418080c0000b7f00418080c0000b7f00418080c0000b073104066d656d6f727902000a5f5f646174615f656e6403010b5f5f686561705f6261736503020963616c635f6172656100000a09010700200120006c0b",
   "name": "Struct"
  }
 }
}
```

# Deployment - response

```
{
    "response": {
        "application": {
            "name": "Struct",
            "uuid": "0xdf73d2644f64599b"
        },
        "status": "success"
    }
}
```

# Execution - request

```
{
 "request": {
  "application": {
   "storage": "file_system", 
   "uuid": "0xdf73d2644f64599b"
  },
  "function": {
   "name": "calc_area", 
   "arguments": ["10", "10"],
   "argument_types": ["i32", "i32"], 
         "return_types": ["i32"]
  },
  "modules": ["rust"] 
 }
}
```

# Execution - response

```
{
    "result": {
        "error_message": "",
        "gas": 0,
        "gas_used": 6,
        "return_value": [
            "100"
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
    "service_name": "0xdf73d2644f64599b_1579133802_calc_area",
    "uuid": "0xdf73d2644f64599b"
}
```
