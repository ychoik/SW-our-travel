"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar as CalendarIcon } from "lucide-react"
import Image from "next/image"

interface DetailItem {
    contentid: string
    title: string
    overview: string
    addr1: string
    tel: string
    firstimage: string
    homepage: string
}

export default function EventDetailPage() {
    const searchParams = useSearchParams()
    const contentId = searchParams.get("contentid")
    const [detail, setDetail] = useState<DetailItem | null>(null)

    useEffect(() => {
        if (!contentId) return

        fetch(`http://localhost:8080/tour/detail-common?contentId=${contentId}`)
            .then(res => res.json())
            .then((data) => {
                console.log("✅ 받은 상세 응답:", data); // ✅ 추가
                const items = data?.response?.body?.items?.item
                if (Array.isArray(items) && items.length > 0) {
                    setDetail(items[0])
                }
            })
            .catch(console.error)
    }, [contentId])




    if (!contentId) return <p className="text-center mt-10 text-red-500">잘못된 접근입니다.</p>
    if (!detail) return <p className="text-center mt-10 text-gray-500">로딩 중...</p>

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <Card>
                    <Image
                        src={detail.firstimage || "/placeholder.svg"}
                        alt={detail.title}
                        width={800}
                        height={400}
                        className="w-full h-80 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-6">
                        <h1 className="text-3xl font-bold text-orange-600 mb-4">{detail.title}</h1>

                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {detail.addr1 || "주소 정보 없음"}
                        </div>

                        <div className="text-gray-700 text-sm mb-4">
                            {detail.overview ? (
                                <p>{detail.overview}</p>
                            ) : (
                                <p>행사 소개 정보가 없습니다.</p>
                            )}
                        </div>

                        {detail.tel && (
                            <p className="text-sm text-gray-500 mb-2">문의: {detail.tel}</p>
                        )}

                        {detail.homepage && (
                            <a
                                href={detail.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                공식 홈페이지 바로가기
                            </a>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
