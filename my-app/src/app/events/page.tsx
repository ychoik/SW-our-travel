"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { format, parse } from "date-fns"
import Link from "next/link"

interface FestivalItem {
    contentid: string
    title: string
    eventstartdate: string
    eventenddate: string
    addr1: string
    firstimage: string
    mapx: number
    mapy: number
}

const ITEMS_PER_PAGE = 12

export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState("date")
    const [events, setEvents] = useState<FestivalItem[]>([])

    useEffect(() => {
        const today = new Date()
        const dateStr = format(today, "yyyyMMdd")
        fetch(`http://localhost:8080/tour/festival?eventStartDate=${dateStr}`)
            .then(res => res.json())
            .then(setEvents)
            .catch(console.error)
    }, [])

    const filteredEvents = useMemo(() => {
        let filtered = [...events]

        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.addr1.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter(event => event.title.includes(selectedCategory))
        }

        if (selectedDate) {
            const target = format(selectedDate, "yyyyMMdd")
            filtered = filtered.filter(
                event => event.eventstartdate <= target && event.eventenddate >= target
            )
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "date":
                    return a.eventstartdate.localeCompare(b.eventstartdate)
                default:
                    return a.title.localeCompare(b.title)
            }
        })

        return filtered
    }, [events, searchTerm, selectedCategory, selectedDate, sortBy])

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
    const currentEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className="min-h-screen bg-orange-50 py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">행사 둘러보기</h1>

                <Card className="mb-6 p-4">
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input placeholder="검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">전체</SelectItem>
                                <SelectItem value="축제">축제</SelectItem>
                                <SelectItem value="문화">문화</SelectItem>
                                <SelectItem value="음식">음식</SelectItem>
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "날짜 선택"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                            </PopoverContent>
                        </Popover>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="정렬" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">날짜순</SelectItem>
                                <SelectItem value="title">이름순</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentEvents.map((event) => (
                        <Link href={`/events/detail?contentid=${event.contentid}`} className="cursor-pointer" key={event.contentid}>
                            <Card className="bg-white shadow hover:shadow-lg transition">
                                <Image
                                    src={event.firstimage || "/placeholder.svg"}
                                    alt={event.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <CardContent className="p-4">
                                    <h3 className="font-bold text-lg text-orange-600 mb-1">{event.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{event.addr1}</p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        {format(parse(event.eventstartdate, "yyyyMMdd", new Date()), "yyyy.MM.dd")} ~{" "}
                                        {format(parse(event.eventenddate, "yyyyMMdd", new Date()), "yyyy.MM.dd")}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <Button
                                key={page}
                                size="sm"
                                variant={page === currentPage ? "default" : "outline"}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
