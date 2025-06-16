"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        userId: "",
        userName: "",
        password: "",
        confirmPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!agreedToTerms) {
            alert("이용약관에 동의해주세요.")
            return
        }
        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        setIsLoading(true)

        try {
            const registerResponse = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    userId: formData.userId,
                    userName: formData.userName,
                    password: formData.password,
                    email: "", // 이메일 빈 값으로 전달
                }),
                credentials: "include",
            })

            if (!registerResponse.ok) {
                const text = await registerResponse.text()
                alert("회원가입 실패: " + text)
                setIsLoading(false)
                return
            }

            const loginResponse = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    userId: formData.userId,
                    password: formData.password,
                }),
                credentials: "include",
            })

            if (loginResponse.ok) {
                alert("회원가입 및 자동 로그인 성공!")
                window.location.href = "/"
            } else {
                alert("회원가입은 성공했지만 자동 로그인에 실패했습니다.")
                window.location.href = "/login"
            }
        } catch (error) {
            console.error("오류:", error)
            alert("서버 오류가 발생했습니다.")
        } finally {
            setIsLoading(false)
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
                        <div className="flex items-center space-x-3">
                            <Link href="/login">
                                <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                    로그인
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="text-center pb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                    <MapPin className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                Our Travel
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-2">새로운 여행의 시작, 지금 가입하세요</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="userId">아이디</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="userId"
                                            type="text"
                                            placeholder="아이디를 입력하세요"
                                            value={formData.userId}
                                            onChange={(e) => handleInputChange("userId", e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userName">이름</Label>
                                    <Input
                                        id="userName"
                                        type="text"
                                        placeholder="이름을 입력하세요"
                                        value={formData.userName}
                                        onChange={(e) => handleInputChange("userName", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">비밀번호</Label>
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
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="비밀번호를 다시 입력하세요"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        className="rounded border-orange-300 text-orange-500 focus:ring-orange-400 mt-1"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                        <Link href="/terms" className="text-orange-600 hover:underline">이용약관</Link>과
                                        <Link href="/privacy" className="text-orange-600 hover:underline"> 개인정보처리방침</Link>에 동의합니다.
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading || !agreedToTerms}
                                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg py-3 font-medium"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            가입 중...
                                        </div>
                                    ) : (
                                        "회원가입"
                                    )}
                                </Button>
                            </form>

                            <div className="text-center pt-4 border-t border-gray-100">
                                <p className="text-gray-600">
                                    이미 계정이 있으신가요?{' '}
                                    <Link href="/login" className="text-orange-600 hover:underline font-medium">
                                        로그인
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
