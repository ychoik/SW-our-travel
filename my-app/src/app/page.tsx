"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, MapPin, Users, MessageCircle, Star, Heart, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetch("http://localhost:8080/api/user", {
      credentials: "include",
    })
        .then(res => res.json())
        .then(data => {
          if (data.loggedIn) {
            setUserName(data.userName)
          } else {
            setUserName(null)
          }
        })
        .catch(err => {
          console.error("사용자 정보 확인 실패:", err)
        })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
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

              <div className="flex items-center space-x-3">
                {userName ? (
                    <span className="text-orange-600 font-semibold">👋 {userName}님</span>
                ) : (
                    <>
                      <Button asChild variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                        <Link href="/login">로그인</Link>
                      </Button>
                      <Button asChild className="bg-gradient-to-r from-orange-500 to-yellow-500 ...">
                        <Link href="/signup">회원가입</Link>
                      </Button>
                    </>
                )}
              </div>
            </div>

            <form onSubmit={handleSearch} className="md:hidden mt-4">
              <div className="relative">
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
        </header>

        <section className="relative py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              특별한 여행
            </span>
              을 시작하세요
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              국내 최고의 여행지와 행사 정보를 한 곳에서 만나보세요. 새로운 추억을 만들어갈 여행 동반자도 찾아보세요.
            </p>
          </div>
        </section>
        {/* Main Feature Sections */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 행사 추천 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-pink-50 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">행사 추천</CardTitle>
                  <CardDescription className="text-gray-600">원하는 날짜의 특별한 행사를 찾아보세요</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href="/events" className="w-full">
                    <Button
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full cursor-pointer"
                    >
                      행사 둘러보기
                    </Button>
                  </Link>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    이번 주 인기 행사 12개
                  </div>
                </CardContent>
              </Card>

              {/* 여행지 추천 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">여행지 추천</CardTitle>
                  <CardDescription className="text-gray-600">지역별 숨겨진 명소를 발견해보세요</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full">
                    <Link href="/destinations">
                      <MapPin className="w-5 h-5 mr-2" />
                      여행지 탐색
                    </Link>
                  </Button>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-1" />
                    평점 4.5+ 추천지 89곳
                  </div>
                </CardContent>
              </Card>

              {/* 팀원 구하기 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">팀원 구하기</CardTitle>
                  <CardDescription className="text-gray-600">함께 여행할 동반자를 만나보세요</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full">
                    팀원 찾기
                  </Button>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <Heart className="w-4 h-4 mr-1" />
                    활성 매칭 요청 24건
                  </div>
                </CardContent>
              </Card>

              {/* 커뮤니티 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-indigo-50 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">커뮤니티</CardTitle>
                  <CardDescription className="text-gray-600">여행 경험과 정보를 공유해보세요</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full">
                    게시판 보기
                  </Button>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    오늘 새 글 15개
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Destinations Preview */}
        <section className="py-16 px-4 bg-white/50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">이번 주 인기 여행지</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">다른 여행자들이 가장 많이 찾는 국내 여행지를 확인해보세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "제주도 한라산",
                  location: "제주특별자치도",
                  rating: 4.8,
                  reviews: 1234,
                  image: "/한라산.jpg",
                },
                {
                  name: "부산 해운대",
                  location: "부산광역시",
                  rating: 4.6,
                  reviews: 987,
                  image: "/부산 해운대.jpg",
                },
                {
                  name: "경주 불국사",
                  location: "경상북도",
                  rating: 4.7,
                  reviews: 756,
                  image: "/불국사.jpg",
                },
              ].map((place, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-0 bg-white">
                    <div className="relative">
                      <Image
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {place.rating}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{place.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {place.location}
                      </p>
                      <p className="text-gray-500 text-sm">리뷰 {place.reviews.toLocaleString()}개</p>
                    </CardContent>
                  </Card>
              ))}
            </div>

          </div>
        </section>

        {/* Recent Reviews */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">최근 여행 후기</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">실제 여행자들의 생생한 후기를 확인해보세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  user: "김여행",
                  place: "강릉 경포대",
                  rating: 5,
                  comment: "일출이 정말 아름다웠어요! 사진으로는 담을 수 없는 감동이었습니다.",
                  date: "2일 전",
                },
                {
                  user: "박모험",
                  place: "전주 한옥마을",
                  rating: 4,
                  comment: "전통 문화를 체험할 수 있어서 좋았습니다. 한복 체험도 추천해요!",
                  date: "3일 전",
                },
                {
                  user: "이탐험",
                  place: "설악산 국립공원",
                  rating: 5,
                  comment: "등산 코스가 다양해서 초보자도 즐길 수 있어요. 단풍이 정말 예뻤습니다.",
                  date: "5일 전",
                },
              ].map((review, index) => (
                  <Card key={index} className="border-0 bg-white hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{review.user[0]}</span>
                          </div>
                          <span className="font-medium text-gray-800">{review.user}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{review.place}</h4>
                      <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
                      <p className="text-gray-400 text-xs">{review.date}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Our Travel</span>
                </div>
                <p className="text-gray-400 text-sm">
                  국내 여행의 모든 것을 한 곳에서 만나보세요. 특별한 여행 경험을 함께 만들어갑니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">서비스</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      행사 추천
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      여행지 추천
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      팀원 구하기
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      커뮤니티
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">고객지원</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      자주 묻는 질문
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      고객센터
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      이용약관
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      개인정보처리방침
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">연락처</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>이메일: info@ourtravel.co.kr</li>
                  <li>전화: 1588-0000</li>
                  <li>운영시간: 평일 09:00-18:00</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 Our Travel. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}
