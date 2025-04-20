use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Coin, StdError};
use serde::{Deserialize, Serialize};
use cosmwasm_storage::{singleton, Singleton};

// Definir o modelo de Produto
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub quantity: u64,
    pub price: Coin,
    pub owner: String,
    pub status: ProductStatus,
}

// Status do Produto (Disponível ou Vendido)
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum ProductStatus {
    Available,
    Sold,
}

// Chave usada para armazenar o estado dos produtos
pub const PRODUCT_KEY: &[u8] = b"product_key"; 

// Estado global para o contrato (quantidade total de produtos registrados)
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct State {
    pub total_products: u64,
}

// Função de inicialização do contrato (criação inicial do estado)
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InitMsg,
) -> Result<Response, StdError> {
    let state = State {
        total_products: 0,
    };
    singleton(deps.storage).save(&state)?;
    Ok(Response::new().add_attribute("action", "instantiate"))
}

// Função para realizar a compra de um produto
pub fn execute_buy(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    product_id: String,
    quantity: u64,
) -> Result<Response, StdError> {
    let mut state: State = singleton(deps.storage).load()?;

    // Carregar produto com base no ID
    let mut product: Product = singleton(deps.storage).load(&product_id.as_bytes())?;

    if product.status == ProductStatus::Sold {
        return Err(StdError::generic_err("Product already sold"));
    }

    if product.quantity < quantity {
        return Err(StdError::generic_err("Not enough stock"));
    }

    // Subtrair a quantidade comprada
    product.quantity -= quantity;
    if product.quantity == 0 {
        product.status = ProductStatus::Sold;
    }

    // Atualizar o estado do produto
    singleton(deps.storage).save(&product.id.as_bytes(), &product)?;

    // Atualizar o total de produtos no estado
    state.total_products -= quantity;
    singleton(deps.storage).save(&state)?;

    Ok(Response::new().add_attribute("action", "buy").add_attribute("product_id", product_id))
}

// Função de consulta para obter a lista de produtos
pub fn query_products(deps: Deps, _env: Env) -> StdResult<Binary> {
    let state: State = singleton(deps.storage).load()?;
    to_binary(&state)
}

// Função para registrar um novo produto
pub fn execute_register_product(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    product_name: String,
    product_price: Coin,
    product_quantity: u64,
) -> Result<Response, StdError> {
    let mut state: State = singleton(deps.storage).load()?;
    
    // Criar um novo produto
    let new_product = Product {
        id: format!("product-{}", state.total_products + 1),
        name: product_name,
        quantity: product_quantity,
        price: product_price,
        owner: info.sender.to_string(),
        status: ProductStatus::Available,
    };

    // Armazenar o produto no estado
    singleton(deps.storage).save(new_product.id.as_bytes(), &new_product)?;

    // Atualizar o total de produtos
    state.total_products += 1;
    singleton(deps.storage).save(&state)?;

    Ok(Response::new().add_attribute("action", "register_product").add_attribute("product_id", new_product.id))
}

