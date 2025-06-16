"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Search,
    MapPin,
    Users,
    ChevronLeft,
    ChevronRight,
    Star,
} from "lucide-react"
import Image from "next/image"

interface AreaBasedItem {
    addr1: string
    contentid: string
    contenttypeid: string
    createdtime: string
    firstimage: string
    mapx: number
    mapy: number
    modifiedtime: string
    tel: string
    title: string
}

const ITEMS_PER_PAGE = 20

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<AreaBasedItem[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("1") // default to 서울 areaCode
    const [sortBy, setSortBy] = useState("title")
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8080/tour/area-based?areaCode=${selectedRegion}`)
            .then((res) => res.json())
            .then((data) => setDestinations(data))
            .catch(console.error)
    }, [selectedRegion])

    const filteredDestinations = useMemo(() => {
        let filtered = destinations
        if (searchTerm) {
            const lower = searchTerm.toLowerCase()
            filtered = filtered.filter(
                (d) =>
                    d.title.toLowerCase().includes(lower) ||
                    (d.addr1 && d.addr1.toLowerCase().includes(lower))
            )
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "title":
                    return a.title.localeCompare(b.title)
                case "addr1":
                    return a.addr1.localeCompare(b.addr1)
                default:
                    return 0
            }
        })

        return filtered
    }, [destinations, searchTerm, sortBy])

    const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE)
    const currentDest = filteredDestinations.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <div className="min-h-screen bg-orange-50 px-4 py-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">여행지 탐색</h1>

                <Card className="mb-8 p-6">
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Input
                            placeholder="여행지명, 주소 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <Select value={selectedRegion} onValueChange={(v) => { setSelectedRegion(v); setCurrentPage(1) }}>
                            <SelectTrigger>
                                <SelectValue placeholder="지역 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">서울</SelectItem>
                                <SelectItem value="2">인천</SelectItem>
                                <SelectItem value="3">대전</SelectItem>
                                <SelectItem value="4">대구</SelectItem>
                                <SelectItem value="5">광주</SelectItem>
                                <SelectItem value="6">부산</SelectItem>
                                <SelectItem value="7">울산</SelectItem>
                                <SelectItem value="8">세종</SelectItem>
                                <SelectItem value="31">경기도</SelectItem>
                                <SelectItem value="32">강원도</SelectItem>
                                <SelectItem value="33">충청북도</SelectItem>
                                <SelectItem value="34">충청남도</SelectItem>
                                <SelectItem value="35">경상북도</SelectItem>
                                <SelectItem value="36">경상남도</SelectItem>
                                <SelectItem value="37">전라북도</SelectItem>
                                <SelectItem value="38">전라남도</SelectItem>
                                <SelectItem value="39">제주도</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="정렬 기준" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="title">이름순</SelectItem>
                                <SelectItem value="addr1">주소순</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentDest.map((d) => (
                        <Card key={d.contentid} className="overflow-hidden hover:shadow-md">
                            <Image
                                src={d.firstimage || "/placeholder.svg"}
                                alt={d.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className="p-4">
                                <h3 className="text-lg font-bold text-orange-600 mb-1">{d.title}</h3>
                                <p className="text-sm text-gray-600 mb-1">{d.addr1}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
