"use client"

import { useState } from "react"
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

interface Product {
  id: string
  name: string
  category: string
  price: string
  quantity: number
  status: "in_stock" | "low_stock" | "out_of_stock"
}

const products: Product[] = [
  {
    id: "1",
    name: "Organic Corn",
    category: "Grains",
    price: "$4.99/kg",
    quantity: 500,
    status: "in_stock",
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: "$3.50/kg",
    quantity: 120,
    status: "in_stock",
  },
  {
    id: "3",
    name: "Grass-fed Beef",
    category: "Meat",
    price: "$12.99/kg",
    quantity: 50,
    status: "low_stock",
  },
  {
    id: "4",
    name: "Organic Milk",
    category: "Dairy",
    price: "$2.99/L",
    quantity: 200,
    status: "in_stock",
  },
  {
    id: "5",
    name: "Free-range Eggs",
    category: "Poultry",
    price: "$4.50/dozen",
    quantity: 0,
    status: "out_of_stock",
  },
  {
    id: "6",
    name: "Honey",
    category: "Sweeteners",
    price: "$8.99/jar",
    quantity: 30,
    status: "low_stock",
  },
]

export function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <Button>Add Product</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "in_stock"
                        ? "default"
                        : product.status === "low_stock"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {product.status === "in_stock"
                      ? "In Stock"
                      : product.status === "low_stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Stock</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

