"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Product {
  id: string
  name: string
  category: string
  price: number
  location: string
  farmer: string
  certification: string[]
  image: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Organic Corn",
    category: "Grains",
    price: 4.99,
    location: "Iowa, USA",
    farmer: "Green Valley Farms",
    certification: ["Organic", "Non-GMO"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 3.5,
    location: "California, USA",
    farmer: "Sunshine Produce",
    certification: ["Organic"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Grass-fed Beef",
    category: "Meat",
    price: 12.99,
    location: "Texas, USA",
    farmer: "Rancho Verde",
    certification: ["Grass-fed", "Humane"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Organic Milk",
    category: "Dairy",
    price: 2.99,
    location: "Wisconsin, USA",
    farmer: "Happy Cow Dairy",
    certification: ["Organic", "Pasture-raised"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Free-range Eggs",
    category: "Poultry",
    price: 4.5,
    location: "Georgia, USA",
    farmer: "Sunrise Poultry",
    certification: ["Free-range", "Organic"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Honey",
    category: "Sweeteners",
    price: 8.99,
    location: "Montana, USA",
    farmer: "Busy Bee Apiaries",
    certification: ["Raw", "Unfiltered"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "7",
    name: "Organic Apples",
    category: "Fruits",
    price: 2.49,
    location: "Washington, USA",
    farmer: "Orchard Fresh",
    certification: ["Organic"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "8",
    name: "Wild Caught Salmon",
    category: "Seafood",
    price: 15.99,
    location: "Alaska, USA",
    farmer: "Ocean Harvest",
    certification: ["Wild-caught", "Sustainable"],
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function MarketplacePage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 20])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])

  const categories = Array.from(new Set(products.map((product) => product.category)))
  const certifications = Array.from(new Set(products.flatMap((product) => product.certification)))

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleCertification = (certification: string) => {
    setSelectedCertifications((prev) =>
      prev.includes(certification) ? prev.filter((c) => c !== certification) : [...prev, certification],
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    const matchesCertification =
      selectedCertifications.length === 0 || product.certification.some((cert) => selectedCertifications.includes(cert))

    return matchesSearch && matchesPrice && matchesCategory && matchesCertification
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("marketplace.title")}</h1>
          <p className="text-muted-foreground">Discover and purchase sustainable agricultural products.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search and filters for desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("marketplace.search")}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">{t("marketplace.price")}</h3>
              <Slider defaultValue={[0, 20]} max={20} step={0.5} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">{t("marketplace.category")}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">{t("marketplace.certification")}</h3>
              <div className="space-y-2">
                {certifications.map((certification) => (
                  <div key={certification} className="flex items-center space-x-2">
                    <Checkbox
                      id={`certification-${certification}`}
                      checked={selectedCertifications.includes(certification)}
                      onCheckedChange={() => toggleCertification(certification)}
                    />
                    <Label htmlFor={`certification-${certification}`} className="font-normal">
                      {certification}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search and filter */}
        <div className="md:hidden flex gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("marketplace.search")}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{t("marketplace.filter")}</SheetTitle>
                <SheetDescription>Adjust filters to find the products you're looking for.</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("marketplace.price")}</h3>
                  <Slider defaultValue={[0, 20]} max={20} step={0.5} value={priceRange} onValueChange={setPriceRange} />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("marketplace.category")}</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`mobile-category-${category}`} className="font-normal">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("marketplace.certification")}</h3>
                  <div className="space-y-2">
                    {certifications.map((certification) => (
                      <div key={certification} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-certification-${certification}`}
                          checked={selectedCertifications.includes(certification)}
                          onCheckedChange={() => toggleCertification(certification)}
                        />
                        <Label htmlFor={`mobile-certification-${certification}`} className="font-normal">
                          {certification}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">{filteredProducts.length} products found</div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("marketplace.sort")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.certification.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("product.price")}</span>
                    <span className="font-medium">${product.price.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("product.farmer")}</span>
                    <span>{product.farmer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("product.location")}</span>
                    <span>{product.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    {t("marketplace.viewDetails")}
                  </Button>
                  <Button className="flex-1">{t("marketplace.addToCart")}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

