"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Clock, Target, CheckCircle, MessageSquare, Calendar } from "lucide-react"

interface WeeklyReport {
  week: number
  mathScore: number
  turkishScore: number
  scienceScore: number
  studyHours: number
  questionsAnswered: number
  accuracy: number
}

export default function EnhancedParentDashboard() {
  const [weeklyData, setWeeklyData] = useState<WeeklyReport[]>([])
  const [currentStreak, setCurrentStreak] = useState(12)
  const [totalStudyTime, setTotalStudyTime] = useState(145) // hours
  const [lgsTarget] = useState(470)
  const [currentProjection] = useState(445)

  useEffect(() => {
    // Sample weekly data
    const sampleData: WeeklyReport[] = [
      {
        week: 1,
        mathScore: 65,
        turkishScore: 70,
        scienceScore: 75,
        studyHours: 18,
        questionsAnswered: 120,
        accuracy: 72,
      },
      {
        week: 2,
        mathScore: 70,
        turkishScore: 72,
        scienceScore: 78,
        studyHours: 20,
        questionsAnswered: 135,
        accuracy: 75,
      },
      {
        week: 3,
        mathScore: 75,
        turkishScore: 75,
        scienceScore: 80,
        studyHours: 22,
        questionsAnswered: 150,
        accuracy: 78,
      },
      {
        week: 4,
        mathScore: 78,
        turkishScore: 78,
        scienceScore: 82,
        studyHours: 24,
        questionsAnswered: 165,
        accuracy: 80,
      },
      {
        week: 5,
        mathScore: 80,
        turkishScore: 80,
        scienceScore: 85,
        studyHours: 25,
        questionsAnswered: 180,
        accuracy: 82,
      },
      {
        week: 6,
        mathScore: 82,
        turkishScore: 82,
        scienceScore: 87,
        studyHours: 26,
        questionsAnswered: 195,
        accuracy: 84,
      },
    ]
    setWeeklyData(sampleData)
  }, [])

  const latestWeek = weeklyData[weeklyData.length - 1]
  const averageScore = latestWeek
    ? Math.round((latestWeek.mathScore + latestWeek.turkishScore + latestWeek.scienceScore) / 3)
    : 0

  return (
    <div className="space-y-6">
      {/* Header with Alex's Message */}
      <Card className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <img src="/alex-fenerbahce-avatar.png" alt="Alex" className="w-12 h-12 rounded-full" />
            Alex'ten Aile Raporu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Bu Haftaki Durum</h3>
              <p className="text-white/90 mb-4">
                Tuna bu hafta gerçekten harika bir performans sergiledi! Matematik konusunda büyük ilerleme kaydetti ve
                Fenerbahçe maçlarını izlerken bile çalışma disiplinini korudu.
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Hedeflenen çalışma saatinin %108'ini tamamladı</span>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Öne Çıkan Başarılar</h4>
              <ul className="space-y-2 text-sm">
                <li>✅ 7 gün üst üste çalışma</li>
                <li>✅ Matematik doğruluk oranı %15 arttı</li>
                <li>✅ Paragraf anlama hızı iyileşti</li>
                <li>✅ Fenerbahçe maçı sonrası bile çalışmaya devam etti</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="progress">İlerleme Grafikleri</TabsTrigger>
          <TabsTrigger value="recommendations">Alex'in Önerileri</TabsTrigger>
          <TabsTrigger value="schedule">Program & Hedefler</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ortalama Puan</p>
                    <p className="text-2xl font-bold">{averageScore}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Hedef: {lgsTarget} puan</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Çalışma Serisi</p>
                    <p className="text-2xl font-bold">{currentStreak}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Gün üst üste</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Toplam Çalışma</p>
                    <p className="text-2xl font-bold">{totalStudyTime}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Bu dönem toplam</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">LGS Projeksiyonu</p>
                    <p className="text-2xl font-bold">{currentProjection}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Mevcut performansa göre</p>
              </CardContent>
            </Card>
          </div>

          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Ders Bazında Performans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Matematik</span>
                    <span className="text-sm text-muted-foreground">{latestWeek?.mathScore || 0}/100</span>
                  </div>
                  <Progress value={latestWeek?.mathScore || 0} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Son hafta: Cebirsel ifadeler konusunda %20 gelişim
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Türkçe Paragraf</span>
                    <span className="text-sm text-muted-foreground">{latestWeek?.turkishScore || 0}/100</span>
                  </div>
                  <Progress value={latestWeek?.turkishScore || 0} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Son hafta: Anlam bilgisi konusunda istikrarlı performans
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Fen Bilimleri</span>
                    <span className="text-sm text-muted-foreground">{latestWeek?.scienceScore || 0}/100</span>
                  </div>
                  <Progress value={latestWeek?.scienceScore || 0} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Son hafta: Basınç konusunda mükemmel anlayış</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Haftalık İlerleme Grafiği</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="mathScore" stroke="#3b82f6" name="Matematik" />
                  <Line type="monotone" dataKey="turkishScore" stroke="#10b981" name="Türkçe" />
                  <Line type="monotone" dataKey="scienceScore" stroke="#f59e0b" name="Fen" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Çalışma Saatleri ve Doğruluk Oranı</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="studyHours" fill="#8884d8" name="Çalışma Saati" />
                  <Bar dataKey="accuracy" fill="#82ca9d" name="Doğruluk %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Alex'in Bu Hafta İçin Önerileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Güçlü Yanlar</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Matematik konusunda sürekli gelişim gösteriyor</li>
                  <li>• Çalışma disiplini çok iyi, hiç aksatmıyor</li>
                  <li>• Fenerbahçe maçları ile çalışma dengesini iyi kuruyor</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">Gelişim Alanları</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Türkçe paragraf hızını artırmak için daha fazla pratik yapmalı</li>
                  <li>• Fen bilimlerinde formül ezberlemek yerine mantığını anlamalı</li>
                  <li>• Hata yaptığı soruları tekrar etme sıklığını artırmalı</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Gelecek Hafta Planı</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Pazartesi-Çarşamba: Matematik cebirsel ifadeler yoğunlaştırma</li>
                  <li>• Perşembe-Cuma: Türkçe paragraf hız çalışması</li>
                  <li>• Hafta sonu: Fen bilimleri formül mantığı çalışması</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aile İçin Öneriler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Motivasyon Desteği</p>
                  <p className="text-sm text-blue-600">
                    Tuna'nın Fenerbahçe tutkusunu kullanarak matematik problemlerini futbol analogileriyle
                    açıklayabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Çalışma Ortamı</p>
                  <p className="text-sm text-green-600">
                    Çalışma saatlerinde sessiz ortam sağlamaya devam edin. Mevcut düzen çok iyi çalışıyor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800">Hedef Takibi</p>
                  <p className="text-sm text-orange-600">
                    Haftalık hedefleri birlikte takip etmeye devam edin. Bu, motivasyonunu yüksek tutuyor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Bu Haftaki Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    day: "Pazartesi",
                    subjects: ["Matematik: Cebirsel İfadeler", "Türkçe: Paragraf"],
                    status: "completed",
                  },
                  { day: "Salı", subjects: ["Fen: Basınç", "Matematik: Problem Çözme"], status: "completed" },
                  { day: "Çarşamba", subjects: ["Türkçe: Anlam Bilgisi", "Fen: Kuvvet"], status: "completed" },
                  { day: "Perşembe", subjects: ["Matematik: Denklemler", "Türkçe: Paragraf"], status: "in-progress" },
                  { day: "Cuma", subjects: ["Fen: Hareket", "Matematik: Tekrar"], status: "pending" },
                  { day: "Cumartesi", subjects: ["Genel Tekrar", "Fenerbahçe Maçı"], status: "pending" },
                  { day: "Pazar", subjects: ["Haftalık Değerlendirme", "Serbest Zaman"], status: "pending" },
                ].map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.subjects.join(" • ")}</p>
                    </div>
                    <Badge
                      variant={
                        day.status === "completed" ? "default" : day.status === "in-progress" ? "secondary" : "outline"
                      }
                    >
                      {day.status === "completed"
                        ? "Tamamlandı"
                        : day.status === "in-progress"
                          ? "Devam Ediyor"
                          : "Bekliyor"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
