"use client"

import { useState } from "react"
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/use-toast"

export function SocialShare() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = "XionFarm - Revolutionizing Agriculture with Blockchain"

  const handleShare = (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      default:
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-muted/30 py-6">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-sm font-medium">Share this page:</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare("facebook")}>
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare("twitter")}>
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare("linkedin")}>
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

