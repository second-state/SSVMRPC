
#![feature(proc_macro_hygiene, decl_macro)]

use std::str;
use rocket::Data;
use serde_json::Value;
extern crate ssvm_container;
use rocket::response::content;
#[macro_use] extern crate rocket;

/// Ethereum WebAssembly (Ewasm)
/// Deploy an Ewasm application (returns a uuid for future reference)
/// http://ip_address:8000/deploy_ewasm_application
#[post("/deploy_ewasm_application", data = "<bytes_vec>")]
fn deploy_ewasm_application(bytes_vec: Data) -> content::Json<String> {
    if bytes_vec.peek_complete() {
        // Parse incoming JSON
        let string_text = str::from_utf8(&bytes_vec.peek()).unwrap();
        let v: Value = serde_json::from_str(string_text).unwrap();
        // Get storage option
        let application_storage = &v["request"]["application"]["storage"];
        println!("Application storage: {:?}", application_storage);
        // Get bytecode
        let bytecode_wasm = &v["request"]["application"]["bytecode"].to_string();
        println!("Application bytecode: {:?}", bytecode_wasm);
        // Application name
        let application_name = &v["request"]["application"]["name"].to_string();
        println!("Application name: {:?}", application_name);
        // Evaluate the storage options
        if application_storage.to_string() == "null" || application_storage == "file_system" {
            let fs = ssvm_container::storage::file_system::FileSystem::init();

            println!("Application storage is being set to the default: file_system.");
            // Initialize the file system storage
            println!("Initializing application");
            //let fs = ssvm_container::storage::file_system::FileSystem::init();
            println!("Deploying application");
            // Deploy the application using file_system storage
            println!("Success ...");
            let uuid = ssvm_container::storage::file_system::FileSystem::create_application(
                &fs,
                &bytecode_wasm,
                &application_name,
            );
            println!("Success");
            content::Json(uuid)
        } else {
            content::Json("{ 'error': 'bad storage option, please check input json' }".to_string())
        }
    } else {
        content::Json("{ 'error': 'bad input' }".to_string())
    }
}
/*
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
*/

fn main() {
    rocket::ignite()
        //.mount("/", routes![deploy_ewasm_application, destroy_ewasm_application, execute_ewasm_function, execute_ewasm_function_adhoc, deploy_wasm_application, destroy_wasm_application, execute_wasm_function])
        .mount("/", routes![deploy_ewasm_application])
        .launch();
}
