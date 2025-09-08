"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Trophy, BookOpen, Timer } from "lucide-react"

interface CurriculumWeek {
  Hafta: string
  Matematik: string
  "Türkçe Paragraf": string
  "Fen Bilimleri": string
  "Mentor Mesajı": string
}

interface LearningTech {
  Teknoloji: string
  Açıklama: string
  "Alex'te Nasıl Kullanılır?": string
}

export default function AdvancedLearningSystem() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [curriculum, setCurriculum] = useState<CurriculumWeek[]>([])
  const [learningTech, setLearningTech] = useState<LearningTech[]>([])
  const [pomodoroActive, setPomodoroActive] = useState(false)
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutes
  const [studyStreak, setStudyStreak] = useState(7)
  const [weeklyProgress, setWeeklyProgress] = useState({
    matematik: 75,
    turkce: 60,
    fen: 80,
  })

  useEffect(() => {
    fetchCurriculumData()
  }, [])

  const fetchCurriculumData = async () => {
    try {
      const curriculumUrl =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hafta-Matematik-TrkeParagraf-FenBilimleri-MentorMesaj-8TSYo18w2PX2LHKRC9dW2fxuXGwVaY.csv"
      const techUrl =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17.%20ALEX%27%C4%B0N%20GEL%C4%B0%C5%9EM%C4%B0%C5%9E%20%C3%96%C4%9ERENME%20TEKNOLOJ%C4%B0LER%C4%B0-HybzpluPdK8eltiHdMNeQ00vL6SmSm.csv"

      const [curriculumRes, techRes] = await Promise.all([fetch(curriculumUrl), fetch(techUrl)])

      const curriculumText = await curriculumRes.text()
      const techText = await techRes.text()

      // Parse CSV data
      const parseCsv = (text: string) => {
        const lines = text.split("\n")
        const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())
        return lines
          .slice(1)
          .map((line) => {
            const values = line.split(",").map((v) => v.replace(/"/g, "").trim())
            const obj: any = {}
            headers.forEach((header, index) => {
              obj[header] = values[index] || ""
            })
            return obj
          })
          .filter((obj) => Object.values(obj).some((v) => v))
      }

      setCurriculum(parseCsv(curriculumText))
      setLearningTech(parseCsv(techText))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const startPomodoro = () => {
    setPomodoroActive(true)
    const timer = setInterval(() => {
      setPomodoroTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setPomodoroActive(false)
          setPomodoroTime(25 * 60)
          return 25 * 60
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const currentWeekData = curriculum.find((week) => week.Hafta === currentWeek.toString())

  return (
    <div className="space-y-6">
      {/* Alex's Weekly Message */}
      {currentWeekData && (
        <Card className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img src="/alex-fenerbahce-avatar.png" alt="Alex" className="w-12 h-12 rounded-full" />
              Alex'ten Bu Hafta İçin Mesaj
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{currentWeekData["Mentor Mesajı"]}</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <h4 className="font-semibold">Matematik</h4>
                <p className="text-sm">{currentWeekData.Matematik}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <h4 className="font-semibold">Türkçe</h4>
                <p className="text-sm">{currentWeekData["Türkçe Paragraf"]}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <h4 className="font-semibold">Fen</h4>
                <p className="text-sm">{currentWeekData["Fen Bilimleri"]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pomodoro Timer & Study Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Pomodoro Çalışma Zamanı
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">{formatTime(pomodoroTime)}</div>
            <Button onClick={startPomodoro} disabled={pomodoroActive} className="w-full">
              {pomodoroActive ? "Çalışma Devam Ediyor..." : "25 Dakika Çalışma Başlat"}
            </Button>
            {pomodoroActive && (
              <p className="text-sm text-gray-600 mt-2">Odaklan Tuna! Alex seninle birlikte çalışıyor 💪</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Başarı İstatistiklerin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Çalışma Serisi</span>
                <Badge variant="secondary">{studyStreak} gün</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Matematik</span>
                  <span>{weeklyProgress.matematik}%</span>
                </div>
                <Progress value={weeklyProgress.matematik} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Türkçe</span>
                  <span>{weeklyProgress.turkce}%</span>
                </div>
                <Progress value={weeklyProgress.turkce} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fen Bilimleri</span>
                  <span>{weeklyProgress.fen}%</span>
                </div>
                <Progress value={weeklyProgress.fen} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Learning Technologies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Alex'in Gelişmiş Öğrenme Teknolojileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningTech.slice(0, 6).map((tech, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h4 className="font-semibold text-blue-600 mb-2">{tech.Teknoloji}</h4>
                <p className="text-sm text-gray-600 mb-2">{tech.Açıklama}</p>
                <p className="text-xs text-green-600 font-medium">Alex'te: {tech["Alex'te Nasıl Kullanılır?"]}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Haftalık Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.from({ length: 36 }, (_, i) => i + 1).map((week) => (
              <Button
                key={week}
                variant={currentWeek === week ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentWeek(week)}
                className="w-12 h-12"
              >
                {week}
              </Button>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <p>📅 Şu an {currentWeek}. haftadasın</p>
            <p>🎯 LGS'ye kalan hafta: {36 - currentWeek}</p>
            <p>⚡ Bu hafta odaklan: {currentWeekData?.Matematik || "Matematik konusu yükleniyor..."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
