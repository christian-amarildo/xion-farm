import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

// Você precisará definir o endereço do contrato após o deploy
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

// Interface para o Product de acordo com o contrato
export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: {
    denom: string;
    amount: string;
  };
  owner: string;
  status: "Available" | "Sold";
}

// Interface para a resposta de consulta
export interface ProductsResponse {
  products: Product[];
}

class BlockchainService {
  private client: SigningCosmWasmClient | null = null;
  private walletAddress: string = "";

  // Conecta ao cliente CosmWasm
  async connect(chainId: string = "xion-testnet-1") {
    try {
      if (!window.keplr) {
        throw new Error("Keplr wallet not found. Please install Keplr extension.");
      }

      // Habilita a Keplr para a chain XION
      await window.keplr.enable(chainId);
      
      // Obtém o offlineSigner da Keplr
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      
      // Obtém o endereço da carteira
      const accounts = await offlineSigner.getAccounts();
      this.walletAddress = accounts[0].address;
      
      // Cria o cliente de assinatura
      const rpcEndpoint = "https://rpc.testnet.xion.fan"; // Endpoint da testnet XION
      this.client = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner,
        { 
          gasPrice: GasPrice.fromString("0.025uxion")  // Ajuste de acordo com a XION
        }
      );
      
      return {
        client: this.client,
        walletAddress: this.walletAddress
      };
    } catch (error) {
      console.error("Failed to connect to blockchain:", error);
      throw error;
    }
  }

  // Busca todos os produtos disponíveis
  async getProducts() {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    try {
      const response = await this.client.queryContractSmart(
        CONTRACT_ADDRESS, 
        { get_products: {} }
      );
      return response as ProductsResponse;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  }

  // Busca detalhes de um produto específico
  async getProduct(productId: string) {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    try {
      const response = await this.client.queryContractSmart(
        CONTRACT_ADDRESS, 
        { get_product: { id: productId } }
      );
      return response as Product;
    } catch (error) {
      console.error(`Failed to fetch product ${productId}:`, error);
      throw error;
    }
  }

  // Registra um novo produto
  async registerProduct(name: string, price: number, quantity: number, denom: string = "uxion") {
    if (!this.client || !this.walletAddress) {
      throw new Error("Client not connected. Call connect() first.");
    }

    try {
      const result = await this.client.execute(
        this.walletAddress,
        CONTRACT_ADDRESS,
        { 
          register_product: { 
            product_name: name,
            product_price: {
              denom: denom,
              amount: price.toString()
            },
            product_quantity: quantity
          } 
        },
        "auto"
      );
      return result;
    } catch (error) {
      console.error("Failed to register product:", error);
      throw error;
    }
  }

  // Compra um produto
  async buyProduct(productId: string, quantity: number) {
    if (!this.client || !this.walletAddress) {
      throw new Error("Client not connected. Call connect() first.");
    }

    try {
      const result = await this.client.execute(
        this.walletAddress,
        CONTRACT_ADDRESS,
        { 
          buy: { 
            product_id: productId,
            quantity: quantity
          } 
        },
        "auto"
      );
      return result;
    } catch (error) {
      console.error(`Failed to buy product ${productId}:`, error);
      throw error;
    }
  }
}

// Exporta uma instância única do serviço
export const blockchainService = new BlockchainService();