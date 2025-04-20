use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Coin, StdError,
    entry_point,
};
use serde::{Deserialize, Serialize};
use cw_storage_plus::{Item, Map};

// Mensagem enviada para inicializar o contrato
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct InitMsg {}

// Mensagens que podem ser enviadas ao contrato
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

// Mensagens que podem consultar o contrato
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetProducts {},
    GetProduct { id: String },
}

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

// Estado global para o contrato
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct State {
    pub total_products: u64,
}

// Definir armazenamento
const STATE: Item<State> = Item::new("state");
const PRODUCTS: Map<&str, Product> = Map::new("products");

// Resposta de consulta para produtos
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
    
    // Criar um novo produto
    let product_id = format!("product-{}", state.total_products + 1);
    let new_product = Product {
        id: product_id.clone(),
        name: product_name,
        quantity: product_quantity,
        price: product_price,
        owner: info.sender.to_string(),
        status: ProductStatus::Available,
    };
    
    // Salvar o produto no armazenamento
    PRODUCTS.save(deps.storage, &product_id, &new_product)?;
    
    // Atualizar total de produtos
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
    // Carregar produto com base no ID
    let mut product = PRODUCTS.load(deps.storage, &product_id)?;
    
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

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies(&[]);

        let msg = InitMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));

        // we can just call .unwrap() to assert this was a success
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // Verificar se o estado foi inicializado corretamente
        let state = STATE.load(&deps.storage).unwrap();
        assert_eq!(state.total_products, 0);
    }

    #[test]
    fn register_and_query_product() {
        let mut deps = mock_dependencies(&[]);

        // Inicializar o contrato
        let msg = InitMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));
        let _res = instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

        // Registrar um produto
        let product_name = "Tomato".to_string();
        let product_price = Coin {
            denom: "earth".to_string(),
            amount: 50u128.into(),
        };
        let product_quantity = 100u64;

        let msg = ExecuteMsg::RegisterProduct {
            product_name: product_name.clone(),
            product_price: product_price.clone(),
            product_quantity,
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Verificar se o produto foi registrado
        let res = query(deps.as_ref(), mock_env(), QueryMsg::GetProducts {}).unwrap();
        let products: ProductsResponse = from_binary(&res).unwrap();
        
        assert_eq!(products.products.len(), 1);
        assert_eq!(products.products[0].name, product_name);
        assert_eq!(products.products[0].price, product_price);
        assert_eq!(products.products[0].quantity, product_quantity);
        assert_eq!(products.products[0].status, ProductStatus::Available);
    }

    #[test]
    fn buy_product() {
        let mut deps = mock_dependencies(&[]);

        // Inicializar o contrato
        let msg = InitMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));
        let _res = instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

        // Registrar um produto
        let product_name = "Tomato".to_string();
        let product_price = Coin {
            denom: "earth".to_string(),
            amount: 50u128.into(),
        };
        let product_quantity = 100u64;

        let msg = ExecuteMsg::RegisterProduct {
            product_name,
            product_price,
            product_quantity,
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Comprar o produto
        let buyer_info = mock_info("buyer", &coins(50, "earth"));
        let buy_quantity = 30u64;
        let msg = ExecuteMsg::Buy {
            product_id: "product-1".to_string(),
            quantity: buy_quantity,
        };
        let _res = execute(deps.as_mut(), mock_env(), buyer_info, msg).unwrap();

        // Verificar se a quantidade foi atualizada
        let res = query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::GetProduct {
                id: "product-1".to_string(),
            },
        )
        .unwrap();
        let product: Product = from_binary(&res).unwrap();
        
        assert_eq!(product.quantity, product_quantity - buy_quantity);
        assert_eq!(product.status, ProductStatus::Available);
    }

    #[test]
    fn buy_all_stock() {
        let mut deps = mock_dependencies(&[]);

        // Inicializar o contrato
        let msg = InitMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));
        let _res = instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

        // Registrar um produto
        let product_name = "Tomato".to_string();
        let product_price = Coin {
            denom: "earth".to_string(),
            amount: 50u128.into(),
        };
        let product_quantity = 100u64;

        let msg = ExecuteMsg::RegisterProduct {
            product_name,
            product_price,
            product_quantity,
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Comprar todo o estoque
        let buyer_info = mock_info("buyer", &coins(5000, "earth"));
        let msg = ExecuteMsg::Buy {
            product_id: "product-1".to_string(),
            quantity: product_quantity,
        };
        let _res = execute(deps.as_mut(), mock_env(), buyer_info, msg).unwrap();

        // Verificar se o produto está marcado como vendido
        let res = query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::GetProduct {
                id: "product-1".to_string(),
            },
        )
        .unwrap();
        let product: Product = from_binary(&res).unwrap();
        
        assert_eq!(product.quantity, 0);
        assert_eq!(product.status, ProductStatus::Sold);
    }
}