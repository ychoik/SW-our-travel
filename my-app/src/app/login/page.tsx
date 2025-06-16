"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.id || !formData.password) {
            alert("아이디와 비밀번호를 입력해주세요.")
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    userId: formData.id,
                    password: formData.password,
                }),
                credentials: "include",
            })

            if (response.ok) {
                setSuccessMessage("로그인에 성공했습니다!")
                window.location.href = "/"
            } else {
                const text = await response.text()
                alert("로그인 실패: " + text)
            }
        } catch (error) {
            console.error("로그인 요청 오류:", error)
            alert("서버와의 통신에 실패했습니다.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 opacity-5 z-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full" />
                <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full" />
                <div className="absolute bottom-20 left-32 w-24 h-24 bg-blue-300 rounded-full" />
                <div className="absolute bottom-32 right-10 w-12 h-12 bg-pink-300 rounded-full" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    홈으로 돌아가기
                </Link>

                <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                            Our Travel
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                            계정에 로그인하여 여행을 시작해보세요
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {successMessage && (
                            <div className="bg-green-100 text-green-800 p-3 rounded text-sm text-center">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="id" className="text-gray-700 font-medium">아이디</Label>
                                <Input
                                    id="id"
                                    type="text"
                                    placeholder="아이디를 입력하세요"
                                    value={formData.id}
                                    onChange={(e) => handleInputChange("id", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 font-medium">비밀번호</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="비밀번호를 입력하세요"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        로그인 중...
                                    </div>
                                ) : (
                                    "로그인"
                                )}
                            </Button>
                        </form>

                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-gray-600">
                                계정이 없으신가요?{' '}
                                <Link href="/signup" className="text-orange-600 hover:underline font-medium">
                                    회원가입
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
