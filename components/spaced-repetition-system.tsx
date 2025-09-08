"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface ReviewItem {
  id: string
  question: string
  subject: string
  difficulty: "easy" | "medium" | "hard"
  lastReview: Date
  nextReview: Date
  interval: number
  easeFactor: number
  reviewCount: number
}

export default function SpacedRepetitionSystem() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([])
  const [currentReview, setCurrentReview] = useState<ReviewItem | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [dailyReviews, setDailyReviews] = useState(0)
  const [dailyTarget] = useState(20)

  useEffect(() => {
    // Initialize with sample review items
    const sampleItems: ReviewItem[] = [
      {
        id: "1",
        question: "Fenerbahçe'nin 11 oyuncusu var. Her oyuncu 2 gol atarsa toplam kaç gol olur?",
        subject: "Matematik",
        difficulty: "easy",
        lastReview: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        nextReview: new Date(),
        interval: 3,
        easeFactor: 2.5,
        reviewCount: 2,
      },
      {
        id: "2",
        question:
          'Aşağıdaki paragrafta ana fikir nedir? "Fenerbahçe, Türk futbolunun en köklü kulüplerinden biridir..."',
        subject: "Türkçe",
        difficulty: "medium",
        lastReview: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.3,
        reviewCount: 1,
      },
      {
        id: "3",
        question: "Futbol topunun basıncı neden önemlidir?",
        subject: "Fen",
        difficulty: "hard",
        lastReview: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        nextReview: new Date(),
        interval: 7,
        easeFactor: 2.1,
        reviewCount: 3,
      },
    ]
    setReviewItems(sampleItems)
    setCurrentReview(sampleItems[0])
  }, [])

  const getDueItems = () => {
    return reviewItems.filter((item) => item.nextReview <= new Date())
  }

  const handleReviewResponse = (quality: number) => {
    if (!currentReview) return

    // Spaced repetition algorithm (SM-2)
    let newInterval = currentReview.interval
    let newEaseFactor = currentReview.easeFactor

    if (quality >= 3) {
      if (currentReview.reviewCount === 0) {
        newInterval = 1
      } else if (currentReview.reviewCount === 1) {
        newInterval = 6
      } else {
        newInterval = Math.round(currentReview.interval * currentReview.easeFactor)
      }
    } else {
      newInterval = 1
    }

    newEaseFactor = currentReview.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    if (newEaseFactor < 1.3) newEaseFactor = 1.3

    const updatedItem: ReviewItem = {
      ...currentReview,
      lastReview: new Date(),
      nextReview: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000),
      interval: newInterval,
      easeFactor: newEaseFactor,
      reviewCount: currentReview.reviewCount + 1,
    }

    setReviewItems((prev) => prev.map((item) => (item.id === currentReview.id ? updatedItem : item)))

    setDailyReviews((prev) => prev + 1)
    setShowAnswer(false)

    // Move to next review item
    const dueItems = getDueItems().filter((item) => item.id !== currentReview.id)
    if (dueItems.length > 0) {
      setCurrentReview(dueItems[0])
    } else {
      setCurrentReview(null)
    }
  }

  const dueItems = getDueItems()
  const progressPercentage = (dailyReviews / dailyTarget) * 100

  return (
    <div className="space-y-6">
      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Günlük Tekrar Hedefi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>İlerleme</span>
              <span className="font-semibold">
                {dailyReviews}/{dailyTarget}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Bugün tekrar edilecek: {dueItems.length}</span>
              <span>Tamamlanan: {dailyReviews}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Review */}
      {currentReview ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tekrar Zamanı!</span>
              <Badge
                variant={
                  currentReview.difficulty === "easy"
                    ? "secondary"
                    : currentReview.difficulty === "medium"
                      ? "default"
                      : "destructive"
                }
              >
                {currentReview.subject}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-medium">{currentReview.question}</p>
            </div>

            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} className="w-full">
                Cevabı Göster
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-green-800">Alex'in Açıklaması:</p>
                  <p className="text-green-700 mt-2">
                    {currentReview.id === "1" && "11 × 2 = 22 gol! Matematik formülü: oyuncu sayısı × gol = toplam gol"}
                    {currentReview.id === "2" &&
                      "Ana fikir: Fenerbahçe'nin köklü bir kulüp olması. Paragrafın ilk cümlesi genelde ana fikri verir."}
                    {currentReview.id === "3" &&
                      "Basınç, topun sıçrama yüksekliğini ve oyun kalitesini etkiler. Fizik kuralları sporda çok önemli!"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleReviewResponse(1)}
                    className="flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Zor Geldi
                  </Button>
                  <Button variant="default" onClick={() => handleReviewResponse(3)} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Kolay Geldi
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Son tekrar: {currentReview.lastReview.toLocaleDateString("tr-TR")} | Tekrar sayısı:{" "}
                  {currentReview.reviewCount}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tebrikler Tuna!</h3>
            <p className="text-gray-600">Bugünkü tüm tekrarları tamamladın! 🎉</p>
            <p className="text-sm text-gray-500 mt-2">
              Yarın yeni sorular seni bekliyor. Alex seninle gurur duyuyor! 💪
            </p>
          </CardContent>
        </Card>
      )}

      {/* Review Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Tekrar İstatistiklerin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{reviewItems.length}</div>
              <div className="text-sm text-gray-600">Toplam Konu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{dueItems.length}</div>
              <div className="text-sm text-gray-600">Bugün Tekrar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{dailyReviews}</div>
              <div className="text-sm text-gray-600">Tamamlanan</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
