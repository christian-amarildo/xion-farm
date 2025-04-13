"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { Search, FileText, CheckCircle, Clock, ArrowUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export default function BlockchainPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm) {
      toast({
        title: "Searching blockchain",
        description: `Searching for transaction: ${searchTerm}`,
      })
    }
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      toast({
        title: "Verification Complete",
        description: "Product origin has been successfully verified on the blockchain",
      })
    }, 2000)
  }

  const transactions = [
    {
      id: "0x8a7d56b5e9f4e4c1d9b5e9f4e4c1d9b5e9f4e4c1",
      type: "Product Sale",
      from: "Green Valley Farms",
      to: "Whole Foods Market",
      amount: "500 kg Organic Corn",
      value: "$2,500",
      timestamp: "2023-04-01 14:32:45",
      status: "confirmed",
    },
    {
      id: "0x7b6e45a4d8c3b2a1d8c3b2a1d8c3b2a1d8c3b2a1",
      type: "Investment",
      from: "AgriTech Fund",
      to: "Sunshine Produce",
      amount: "Investment Round A",
      value: "$75,000",
      timestamp: "2023-04-02 09:15:22",
      status: "confirmed",
    },
    {
      id: "0x6c5d34a3b2c1d0a3b2c1d0a3b2c1d0a3b2c1d0a3",
      type: "Tokenization",
      from: "Rancho Verde",
      to: "XionFarm Platform",
      amount: "10,000 Cattle Tokens",
      value: "$120,000",
      timestamp: "2023-04-03 11:45:36",
      status: "confirmed",
    },
    {
      id: "0x5d4c23b2a1c0b2a1c0b2a1c0b2a1c0b2a1c0b2a1",
      type: "Certification",
      from: "Eco Certification Group",
      to: "Happy Cow Dairy",
      amount: "Organic Certification",
      value: "N/A",
      timestamp: "2023-04-04 16:20:18",
      status: "pending",
    },
    {
      id: "0x4e3d12a1b0c9a1b0c9a1b0c9a1b0c9a1b0c9a1b0",
      type: "Product Sale",
      from: "Sunrise Poultry",
      to: "Farm Fresh Markets",
      amount: "200 dozen Free-range Eggs",
      value: "$900",
      timestamp: "2023-04-05 08:05:52",
      status: "confirmed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Ledger</h1>
          <p className="text-muted-foreground">
            Transparent and immutable record of all transactions on the XionFarm platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,568</div>
            <p className="text-xs text-muted-foreground">+1,234 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokenized Assets</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.5M</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Confirmation Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4s</div>
            <p className="text-xs text-muted-foreground">-0.3s from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Transaction Search</CardTitle>
            <CardDescription>Search for transactions by ID, product, or participant</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Product Verification</CardTitle>
            <CardDescription>Verify the authenticity and origin of products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter product ID or scan QR code" />
              <Button onClick={handleVerify} disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="tokenized">Tokenized Assets</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                A transparent record of all recent transactions on the XionFarm blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-xs">{transaction.id.substring(0, 10)}...</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.from}</TableCell>
                        <TableCell>{transaction.to}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.value}</TableCell>
                        <TableCell>{transaction.timestamp}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokenized" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tokenized Agricultural Assets</CardTitle>
              <CardDescription>Agricultural assets that have been tokenized on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-40 relative">
                      <Image
                        src={`/images/${["farm-hero", "corn", "beef", "milk", "eggs", "honey"][index % 6]}.png`}
                        alt="Tokenized Asset"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {
                          [
                            "Corn Farm",
                            "Organic Corn",
                            "Cattle Ranch",
                            "Dairy Farm",
                            "Poultry Farm",
                            "Honey Production",
                          ][index % 6]
                        }{" "}
                        Tokens
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Value</span>
                        <span className="font-medium">
                          ${["1.2M", "450K", "2.5M", "780K", "350K", "120K"][index % 6]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token Price</span>
                        <span className="font-medium">
                          ${["12.50", "4.50", "25.00", "7.80", "3.50", "1.20"][index % 6]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Holders</span>
                        <span className="font-medium">{["245", "120", "380", "210", "95", "65"][index % 6]}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Certifications</CardTitle>
              <CardDescription>Verified certifications and credentials stored on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "0x8a7d56b5e9f4e4c1",
                        type: "Organic Certification",
                        issuer: "USDA Organic",
                        recipient: "Green Valley Farms",
                        issueDate: "2023-01-15",
                        expiryDate: "2024-01-14",
                        status: "active",
                      },
                      {
                        id: "0x7b6e45a4d8c3b2a1",
                        type: "Fair Trade Certification",
                        issuer: "Fair Trade USA",
                        recipient: "Sunshine Produce",
                        issueDate: "2023-02-20",
                        expiryDate: "2024-02-19",
                        status: "active",
                      },
                      {
                        id: "0x6c5d34a3b2c1d0a3",
                        type: "Humane Raised Certification",
                        issuer: "Certified Humane",
                        recipient: "Rancho Verde",
                        issueDate: "2023-03-10",
                        expiryDate: "2024-03-09",
                        status: "active",
                      },
                      {
                        id: "0x5d4c23b2a1c0b2a1",
                        type: "Non-GMO Verification",
                        issuer: "Non-GMO Project",
                        recipient: "Happy Cow Dairy",
                        issueDate: "2023-04-05",
                        expiryDate: "2024-04-04",
                        status: "pending",
                      },
                      {
                        id: "0x4e3d12a1b0c9a1b0",
                        type: "Regenerative Agriculture",
                        issuer: "Regenerative Organic Alliance",
                        recipient: "Sunrise Poultry",
                        issueDate: "2022-05-12",
                        expiryDate: "2023-05-11",
                        status: "expired",
                      },
                    ].map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-mono text-xs">{cert.id}...</TableCell>
                        <TableCell>{cert.type}</TableCell>
                        <TableCell>{cert.issuer}</TableCell>
                        <TableCell>{cert.recipient}</TableCell>
                        <TableCell>{cert.issueDate}</TableCell>
                        <TableCell>{cert.expiryDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              cert.status === "active"
                                ? "default"
                                : cert.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

