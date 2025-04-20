// src/lib.rs
use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Coin, StdError,
    entry_point,
};
use serde::{Deserialize, Serialize};
use cw_storage_plus::{Item, Map};

// Message sent to initialize the contract
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct InitMsg {}

// Messages that can be sent to the contract
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RegisterProduct {
        product_name: String,
        product_price: Coin,
        product_quantity: u64,
    },
    Buy {
        product_id: String,
        quantity: u64,
    },
}

// Messages that can query the contract
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetProducts {},
    GetProduct { id: String },
}

// Define the model of Product
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub quantity: u64,
    pub price: Coin,
    pub owner: String,
    pub status: ProductStatus,
}

// Product Status (Available or Sold)
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum ProductStatus {
    Available,
    Sold,
}

// Global state for the contract
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct State {
    pub total_products: u64,
}

// Define storage
const STATE: Item<State> = Item::new("state");
const PRODUCTS: Map<&str, Product> = Map::new("products");

// Query response for products
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct ProductsResponse {
    pub products: Vec<Product>,
}

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InitMsg,
) -> StdResult<Response> {
    let state = State {
        total_products: 0,
    };
    STATE.save(deps.storage, &state)?;
    
    Ok(Response::new().add_attribute("action", "instantiate"))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::RegisterProduct {
            product_name,
            product_price,
            product_quantity,
        } => execute_register_product(deps, env, info, product_name, product_price, product_quantity),
        ExecuteMsg::Buy {
            product_id,
            quantity,
        } => execute_buy(deps, env, info, product_id, quantity),
    }
}

pub fn execute_register_product(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    product_name: String,
    product_price: Coin,
    product_quantity: u64,
) -> StdResult<Response> {
    let mut state = STATE.load(deps.storage)?;
    
    // Create a new product
    let product_id = format!("product-{}", state.total_products + 1);
    let new_product = Product {
        id: product_id.clone(),
        name: product_name,
        quantity: product_quantity,
        price: product_price,
        owner: info.sender.to_string(),
        status: ProductStatus::Available,
    };
    
    // Save the product to storage
    PRODUCTS.save(deps.storage, &product_id, &new_product)?;
    
    // Update total products
    state.total_products += 1;
    STATE.save(deps.storage, &state)?;
    
    Ok(Response::new()
        .add_attribute("action", "register_product")
        .add_attribute("product_id", product_id))
}

pub fn execute_buy(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    product_id: String,
    quantity: u64,
) -> StdResult<Response> {
    // Load product based on ID
    let mut product = PRODUCTS.load(deps.storage, &product_id)?;
    
    if product.status == ProductStatus::Sold {
        return Err(StdError::generic_err("Product already sold"));
    }
    
    if product.quantity < quantity {
        return Err(StdError::generic_err("Not enough stock"));
    }
    
    // Subtract purchased quantity
    product.quantity -= quantity;
    
    if product.quantity == 0 {
        product.status = ProductStatus::Sold;
    }
    
    // Update product status
    PRODUCTS.save(deps.storage, &product_id, &product)?;
    
    Ok(Response::new()
        .add_attribute("action", "buy")
        .add_attribute("product_id", product_id)
        .add_attribute("quantity", quantity.to_string()))
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetProducts {} => query_products(deps),
        QueryMsg::GetProduct { id } => query_product(deps, id),
    }
}

pub fn query_products(deps: Deps) -> StdResult<Binary> {
    let products: StdResult<Vec<_>> = PRODUCTS
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|item| {
            let (_, product) = item?;
            Ok(product)
        })
        .collect();
    
    to_binary(&ProductsResponse {
        products: products?,
    })
}

pub fn query_product(deps: Deps, id: String) -> StdResult<Binary> {
    let product = PRODUCTS.load(deps.storage, &id)?;
    to_binary(&product)
}

// Schema generation for better client integration
#[cfg(schema)]
fn generate_schema() {
    use std::env::current_dir;
    use std::fs::create_dir_all;

    use cosmwasm_schema::{export_schema, remove_schemas, schema_for};

    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(InitMsg), &out_dir);
    export_schema(&schema_for!(ExecuteMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
    export_schema(&schema_for!(State), &out_dir);
    export_schema(&schema_for!(Product), &out_dir);
    export_schema(&schema_for!(ProductsResponse), &out_dir);
}