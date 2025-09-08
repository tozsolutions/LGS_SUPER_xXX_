"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, Brain, Zap, Trophy, Target, Clock } from "lucide-react"

interface VisualLessonProps {
  topic: string
  difficulty: "Kolay" | "Orta" | "Zor"
  visualType: "Fenerbahçe" | "NBA" | "Oyun" | "Günlük"
}

export default function VisualLearningSystem() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [memoryScore, setMemoryScore] = useState(85)

  const visualLessons = [
    {
      topic: "Kesirler",
      difficulty: "Orta" as const,
      visualType: "Fenerbahçe" as const,
      question: "Fenerbahçe'nin 90 dakikalık maçının 2/3'ü oynandı. Kaç dakika kaldı?",
      visual: "⚽ Maç Süresi: 90 dakika\n🟨🟨🟦 (2/3 oynandı)\n⏰ Kalan süre = ?",
      explanation: "90 ÷ 3 = 30 dakika (1/3)\n30 × 2 = 60 dakika (2/3 oynandı)\n90 - 60 = 30 dakika kaldı",
      answer: "30 dakika",
    },
    {
      topic: "Yüzdeler",
      difficulty: "Kolay" as const,
      visualType: "NBA" as const,
      question: "LeBron James 20 şuttan 15'ini attı. Başarı yüzdesi kaç?",
      visual: "🏀 Toplam şut: 20\n✅ İsabetli: 15\n❌ Kaçan: 5",
      explanation: "Başarı = (İsabetli ÷ Toplam) × 100\n(15 ÷ 20) × 100 = 75%",
      answer: "%75",
    },
  ]

  const currentLessonData = visualLessons[currentLesson]

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setMemoryScore((prev) => Math.min(100, prev + 5))
    }
    setShowAnswer(true)

    setTimeout(() => {
      setShowAnswer(false)
      setCurrentLesson((prev) => (prev + 1) % visualLessons.length)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Memory Score Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Görsel Hafıza Sistemi
            <Badge variant="secondary" className="ml-auto">
              <Trophy className="w-3 h-3 mr-1" />
              Hafıza Skoru: {memoryScore}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={memoryScore} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">Alex'in görsel öğrenme tekniği ile hafızanı güçlendir!</p>
        </CardContent>
      </Card>

      {/* Visual Learning Card */}
      <Card className="border-2 border-dashed border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              {currentLessonData.topic}
            </CardTitle>
            <div className="flex gap-2">
              <Badge
                variant={
                  currentLessonData.difficulty === "Kolay"
                    ? "secondary"
                    : currentLessonData.difficulty === "Orta"
                      ? "default"
                      : "destructive"
                }
              >
                {currentLessonData.difficulty}
              </Badge>
              <Badge variant="outline">
                {currentLessonData.visualType === "Fenerbahçe"
                  ? "⚽"
                  : currentLessonData.visualType === "NBA"
                    ? "🏀"
                    : currentLessonData.visualType === "Oyun"
                      ? "🎮"
                      : "📱"}
                {currentLessonData.visualType}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Soru:
            </h3>
            <p className="text-lg">{currentLessonData.question}</p>
          </div>

          {/* Visual Representation */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-yellow-950/20 dark:to-blue-950/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              Alex'in Görsel Anlatımı:
            </h3>
            <div className="text-center">
              <pre className="text-2xl leading-relaxed font-mono whitespace-pre-wrap">{currentLessonData.visual}</pre>
            </div>
          </div>

          {/* Answer Section */}
          {!showAnswer ? (
            <div className="flex gap-4 justify-center">
              <Button onClick={() => handleAnswer(true)} className="bg-green-600 hover:bg-green-700 text-white">
                ✅ Anladım, çözdüm!
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                🤔 Açıklama istiyorum
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Alex'in Açıklaması:</h3>
              <pre className="whitespace-pre-wrap text-sm mb-3">{currentLessonData.explanation}</pre>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Cevap: {currentLessonData.answer}</Badge>
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">3 gün sonra tekrar edilecek</span>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2">
            {visualLessons.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentLesson ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Memory Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">💡 Alex'in Hafıza İpuçları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span>🎯</span>
              <span>Fenerbahçe maçları gibi heyecanlı örnekler kullan</span>
            </div>
            <div className="flex items-start gap-2">
              <span>🔄</span>
              <span>Yanlış soruları 3 gün sonra tekrar et</span>
            </div>
            <div className="flex items-start gap-2">
              <span>👁️</span>
              <span>Görsel hafızan güçlü, sayıları resimle hatırla</span>
            </div>
            <div className="flex items-start gap-2">
              <span>⚡</span>
              <span>Hızlı çöz, uzun düşünme</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
