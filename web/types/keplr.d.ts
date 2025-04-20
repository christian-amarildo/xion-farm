// Definição de tipos para a carteira Keplr
interface KeplrWindow extends Window {
    keplr?: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => any;
      experimentalSuggestChain: (chainInfo: any) => Promise<void>;
    };
  }
  
  declare global {
    interface Window extends KeplrWindow {}
  }
  
  export {};