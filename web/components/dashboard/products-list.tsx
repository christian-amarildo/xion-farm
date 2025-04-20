"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search } from "lucide-react"
import { useBlockchain } from "@/hooks/use-blockchain"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddProductDialog, setShowAddProductDialog] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0
  })
  
  const { 
    walletAddress, 
    connect, 
    products, 
    isLoading, 
    registerProduct, 
    buyProduct, 
    loadProducts 
  } = useBlockchain()

  // Filtrar produtos com base no termo de pesquisa
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Manipula a conexão com a carteira
  const handleConnect = async () => {
    await connect()
  }

  // Manipula o registro de novos produtos
  const handleRegisterProduct = async () => {
    if (await registerProduct(newProduct.name, newProduct.price, newProduct.quantity)) {
      setShowAddProductDialog(false)
      setNewProduct({ name: "", price: 0, quantity: 0 })
    }
  }

  // Manipula a compra de produtos
  const handleBuyProduct = async (productId: string) => {
    await buyProduct(productId, 1) // Comprando apenas 1 unidade por padrão
  }

  // Mapear o status para um componente Badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge variant="default">Available</Badge>
      case "Sold":
        return <Badge variant="destructive">Sold Out</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Recarregar produtos periodicamente
  useEffect(() => {
    if (walletAddress) {
      const interval = setInterval(() => {
        loadProducts()
      }, 10000) // Recarregar a cada 10 segundos
      
      return () => clearInterval(interval)
    }
  }, [walletAddress, loadProducts])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {!walletAddress ? (
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
            <DialogTrigger asChild>
              <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new agricultural product to the XionFarm marketplace
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (XION)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    value={newProduct.quantity} 
                    onChange={(e) => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={handleRegisterProduct} disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register Product"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {walletAddress ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">Loading products...</TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No products found</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono">{product.id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{Number(product.price.amount) / 1000000} {product.price.denom.replace('u', '')}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell className="font-mono">{product.owner.substring(0, 8)}...</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleBuyProduct(product.id)} disabled={product.status === "Sold" || product.quantity === 0}>
                            Buy Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground mt-2">Connect your Keplr wallet to view and manage products</p>
          </div>
        </div>
      )}
    </div>
  )
}