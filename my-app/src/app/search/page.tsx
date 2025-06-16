"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface KeywordSearchItem {
    contentid: string
    title: string
    addr1: string
    firstimage: string
    mapx: number
    mapy: number
    tel: string
}

export default function SearchPage() {
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("q") || ""
    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const [results, setResults] = useState<KeywordSearchItem[]>([])
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = searchQuery.trim()
        if (trimmed) {
            router.push(`/search?q=${encodeURIComponent(trimmed)}`)
        }
    }

    useEffect(() => {
        if (!initialQuery) return
        fetch(`http://localhost:8080/tour/search-keyword?keyword=${initialQuery}`)
            .then(res => res.json())
            .then(setResults)
            .catch(console.error)
    }, [initialQuery])

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 text-gray-800">
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Our Travel
              </span>
                        </Link>

                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="여행지, 행사를 검색해보세요..."
                                    className="pl-10 bg-white/80 border-orange-200 focus:border-orange-400 rounded-full"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </header>

            <section className="py-16 px-4 bg-white/50">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
              원하는 여행지나 행사
            </span>
                        를 검색해보세요
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                        국내의 다양한 관광 정보와 축제를 빠르게 찾을 수 있어요.
                    </p>
                    {initialQuery && (
                        <p className="text-md text-gray-700">
                            <strong className="text-orange-600">"{initialQuery}"</strong>에 관한 검색 결과입니다.
                        </p>
                    )}
                </div>

                <div className="container mx-auto mt-12">
                    {results.length === 0 ? (
                        <p className="text-center text-gray-500">😥 검색 결과가 없습니다.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map(item => (
                                <Card key={item.contentid} className="overflow-hidden hover:shadow-md">
                                    <Image
                                        src={item.firstimage || "/placeholder.svg"}
                                        alt={item.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                    />
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-bold text-orange-600 mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{item.addr1}</p>
                                        {item.tel && <p className="text-xs text-gray-500">📞 {item.tel}</p>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
