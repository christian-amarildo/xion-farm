"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Truck, ShieldCheck, Leaf, Calendar } from "lucide-react"

export default function ProductDetailPage() {
  const { id } = useParams()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuying, setIsBuying] = useState(false)

  // Mock product data - in a real app, this would be fetched from an API
  const product = {
    id: id,
    name: "Organic Corn",
    category: "Grains",
    price: 4.99,
    location: "Iowa, USA",
    farmer: "Green Valley Farms",
    farmerImage: "/images/farmer1.png",
    certification: ["Organic", "Non-GMO"],
    image: "/images/corn.png",
    rating: 4.8,
    reviews: 124,
    description:
      "Premium organic corn grown using sustainable farming practices. Our corn is non-GMO and free from synthetic pesticides and fertilizers. Perfect for both human consumption and animal feed.",
    availableQuantity: 500,
    harvestDate: "2023-09-15",
    shelfLife: "6 months",
    nutritionalInfo: {
      calories: "365 kcal per 100g",
      protein: "9.4g per 100g",
      carbs: "74g per 100g",
      fat: "4.7g per 100g",
      fiber: "7.3g per 100g",
    },
    farmingPractices: [
      "No synthetic pesticides or fertilizers",
      "Crop rotation to maintain soil health",
      "Water conservation techniques",
      "Carbon sequestration practices",
      "Biodiversity promotion",
    ],
    blockchainVerified: true,
    carbonFootprint: "0.8 kg CO2e per kg",
    similarProducts: [
      { id: "2", name: "Organic Wheat", price: 5.49, image: "/placeholder.svg?height=100&width=100" },
      { id: "3", name: "Organic Soybeans", price: 6.99, image: "/placeholder.svg?height=100&width=100" },
      { id: "4", name: "Organic Rice", price: 7.49, image: "/placeholder.svg?height=100&width=100" },
    ],
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= product.availableQuantity) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    setTimeout(() => {
      setIsAddingToCart(false)
      toast({
        title: "Added to cart",
        description: `${quantity} kg of ${product.name} added to your cart`,
      })
    }, 1000)
  }

  const handleBuyNow = () => {
    setIsBuying(true)
    setTimeout(() => {
      setIsBuying(false)
      toast({
        title: "Order placed",
        description: `Your order for ${quantity} kg of ${product.name} has been placed`,
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.certification.map((cert) => (
                <Badge key={cert} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
              {product.blockchainVerified && <Badge className="bg-green-500">Blockchain Verified</Badge>}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={product.farmerImage} alt={product.farmer} />
              <AvatarFallback>{product.farmer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{product.farmer}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {product.location}
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}/kg</div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  max={product.availableQuantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="text-sm text-muted-foreground">{product.availableQuantity} kg available</div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleAddToCart} disabled={isAddingToCart}>
                {isAddingToCart ? "Adding..." : t("marketplace.addToCart")}
              </Button>
              <Button className="flex-1" onClick={handleBuyNow} disabled={isBuying}>
                {isBuying ? "Processing..." : t("product.buy")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>Delivery available</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span>Quality guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-muted-foreground" />
              <span>Sustainably grown</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Harvested: {product.harvestDate}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="nutrition">Nutritional Info</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Product Specifications</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>{product.category}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Harvest Date</span>
                      <span>{product.harvestDate}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Shelf Life</span>
                      <span>{product.shelfLife}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Available Quantity</span>
                      <span>{product.availableQuantity} kg</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Origin</span>
                      <span>{product.location}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Certifications</h3>
                  <ul className="space-y-2 text-sm">
                    {product.certification.map((cert) => (
                      <li key={cert} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>{cert} Certified</span>
                      </li>
                    ))}
                    {product.blockchainVerified && (
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>Blockchain Verified Origin</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Information</CardTitle>
              <CardDescription>Nutritional content per 100g of product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <Card key={key}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{value.split(" ")[0]}</div>
                      <p className="text-xs text-muted-foreground">{value.split(" ").slice(1).join(" ")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Health Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Rich in essential vitamins and minerals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Good source of dietary fiber</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contains antioxidants that help fight inflammation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Supports digestive health</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Practices</CardTitle>
              <CardDescription>How this product contributes to sustainable agriculture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Farming Practices</h3>
                  <ul className="space-y-2 text-sm">
                    {product.farmingPractices.map((practice, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Environmental Impact</h3>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Carbon Footprint</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        >
                          {product.carbonFootprint}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">30% lower than conventional farming methods</p>
                    </div>

                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Water Usage</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        >
                          25% Reduced
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Efficient irrigation systems reduce water consumption
                      </p>
                    </div>

                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Biodiversity Impact</span>
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        >
                          Positive
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Practices that promote local wildlife and plant diversity
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Sustainability Certifications</h3>
                <div className="flex flex-wrap gap-4">
                  {product.certification.map((cert) => (
                    <div key={cert} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Regenerative Agriculture</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Verification</CardTitle>
              <CardDescription>Transparent supply chain information verified on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Transaction Hash</h3>
                  <div className="font-mono text-sm bg-background p-2 rounded border overflow-x-auto">
                    0x8a7d56b5e9f4e4c1d9b5e9f4e4c1d9b5e9f4e4c1d9b5e9f4e4c1d9b5e9f4e4c1
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Origin Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Origin Verified</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Product origin has been verified on the blockchain
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Quality Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Quality Verified</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Product quality has been verified by certification bodies
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Sustainability Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Sustainability Verified</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Sustainable farming practices have been verified</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Supply Chain Journey</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-300 text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Planting</h4>
                        <p className="text-xs text-muted-foreground">2023-04-15</p>
                        <p className="text-sm mt-1">
                          Seeds planted using organic farming methods at Green Valley Farms
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-300 text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Growing</h4>
                        <p className="text-xs text-muted-foreground">2023-04-15 to 2023-09-10</p>
                        <p className="text-sm mt-1">
                          Crops grown using sustainable practices, including organic fertilizers and pest management
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-300 text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Harvesting</h4>
                        <p className="text-xs text-muted-foreground">2023-09-15</p>
                        <p className="text-sm mt-1">
                          Crops harvested at optimal ripeness to ensure quality and nutritional value
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-300 text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Processing & Packaging</h4>
                        <p className="text-xs text-muted-foreground">2023-09-16</p>
                        <p className="text-sm mt-1">
                          Processed and packaged using sustainable materials at Green Valley Farms facility
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Complete Blockchain Record
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.similarProducts.map((similarProduct) => (
            <Card key={similarProduct.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={similarProduct.image || "/placeholder.svg"}
                  alt={similarProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{similarProduct.name}</h3>
                <p className="text-sm text-muted-foreground">${similarProduct.price.toFixed(2)}/kg</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

