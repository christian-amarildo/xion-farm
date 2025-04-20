import { useState, useEffect, useCallback } from 'react';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { blockchainService, Product, ProductsResponse } from '../services/blockchain';
import { useToast } from '@/components/ui/use-toast';

export function useBlockchain() {
  const [client, setClient] = useState<SigningCosmWasmClient | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Conectar à carteira e ao blockchain
  const connect = useCallback(async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      const { client, walletAddress } = await blockchainService.connect();
      setClient(client);
      setWalletAddress(walletAddress);
      toast({
        title: 'Connected',
        description: `Connected to blockchain with address ${walletAddress.substring(0, 8)}...`,
      });
      return true;
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect to blockchain',
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting, toast]);

  // Carregar produtos da blockchain
  const loadProducts = useCallback(async () => {
    if (!client) return;
    
    setIsLoading(true);
    try {
      const response = await blockchainService.getProducts();
      setProducts(response.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load products from blockchain',
      });
    } finally {
      setIsLoading(false);
    }
  }, [client, toast]);

  // Registrar um novo produto
  const registerProduct = useCallback(async (name: string, price: number, quantity: number) => {
    if (!client || !walletAddress) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please connect your wallet first',
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      const result = await blockchainService.registerProduct(name, price, quantity);
      toast({
        title: 'Product Registered',
        description: `Successfully registered product: ${name}`,
      });
      await loadProducts(); // Recarregar produtos após o registro
      return true;
    } catch (error) {
      console.error('Error registering product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to register product',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [client, walletAddress, loadProducts, toast]);

  // Comprar um produto
  const buyProduct = useCallback(async (productId: string, quantity: number) => {
    if (!client || !walletAddress) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please connect your wallet first',
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      const result = await blockchainService.buyProduct(productId, quantity);
      toast({
        title: 'Purchase Successful',
        description: `Successfully purchased product ID: ${productId}`,
      });
      await loadProducts(); // Recarregar produtos após a compra
      return true;
    } catch (error) {
      console.error('Error buying product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to purchase product',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [client, walletAddress, loadProducts, toast]);

  // Carregar produtos automaticamente quando o cliente estiver disponível
  useEffect(() => {
    if (client) {
      loadProducts();
    }
  }, [client, loadProducts]);

  return {
    client,
    walletAddress,
    products,
    isConnecting,
    isLoading,
    connect,
    loadProducts,
    registerProduct,
    buyProduct
  };
}