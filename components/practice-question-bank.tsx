"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, Target, BookOpen, Calculator, Globe, Atom, Lightbulb } from "lucide-react"

interface Question {
  id: number
  subject: string
  topic: string
  difficulty: "Kolay" | "Orta" | "Zor"
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  alexTip: string
  timeLimit: number
}

const questionBank: Question[] = [
  {
    id: 1,
    subject: "Matematik",
    topic: "Cebirsel İfadeler",
    difficulty: "Orta",
    question:
      "Fenerbahçe'nin bu sezon attığı gol sayısı x, yediği gol sayısı y'dir. Averaj farkı (x-y) olarak hesaplanır. Eğer x = 3y - 5 ise ve averaj farkı 25 ise, takımın attığı gol sayısı kaçtır?",
    options: ["35", "40", "45", "50"],
    correctAnswer: 2,
    explanation:
      "x - y = 25 ve x = 3y - 5 denklemlerini çözelim. (3y - 5) - y = 25 → 2y - 5 = 25 → 2y = 30 → y = 15. x = 3(15) - 5 = 45",
    alexTip:
      "Futbol sevgin sayesinde matematik problemlerini daha kolay anlayabilirsin! Gerçek hayat örnekleri her zaman işe yarar.",
    timeLimit: 180,
  },
  {
    id: 2,
    subject: "Türkçe",
    topic: "Okuduğunu Anlama",
    difficulty: "Zor",
    question:
      "Aşağıdaki parçayı okuyun:\n\n'Fenerbahçe'nin tarihinde önemli bir yeri olan Şükrü Saracoğlu Stadyumu, sadece bir spor tesisi değil, aynı zamanda kültürel bir simgedir. Bu stadyum, binlerce taraftarın duygularını paylaştığı, sevinçlerin ve üzüntülerin yaşandığı bir mekândır. Stadyumun atmosferi, oyuncuların performansını doğrudan etkiler ve ev sahibi avantajı sağlar.'\n\nBu parçada vurgulanan ana düşünce nedir?",
    options: [
      "Şükrü Saracoğlu Stadyumu'nun mimari özellikleri",
      "Stadyumun sadece spor amaçlı kullanılması",
      "Stadyumun kültürel ve duygusal öneminin spor performansına etkisi",
      "Fenerbahçe taraftarlarının sayısal çokluğu",
    ],
    correctAnswer: 2,
    explanation:
      "Parçada stadyumun 'kültürel simge' olması, 'duyguların paylaşıldığı yer' olması ve 'oyuncu performansına etkisi' vurgulanmıştır.",
    alexTip:
      "Uzun paragrafları okurken ana fikri bulmak için 'sadece... değil, aynı zamanda...' gibi bağlaçlara dikkat et!",
    timeLimit: 240,
  },
  {
    id: 3,
    subject: "Fen Bilimleri",
    topic: "Kuvvet ve Hareket",
    difficulty: "Kolay",
    question:
      "Bir futbolcu topu 20 m/s hızla kaleye doğru şut çekiyor. Top 2 saniye sonra kaleye ulaşıyor. Topun kat ettiği mesafe kaç metredir?",
    options: ["20 m", "40 m", "60 m", "80 m"],
    correctAnswer: 1,
    explanation: "Mesafe = Hız × Zaman formülünü kullanırız. Mesafe = 20 m/s × 2 s = 40 m",
    alexTip: "Fizik formüllerini futbol örnekleriyle öğrenmek çok etkili! NBA'de de benzer hesaplamalar yapılır.",
    timeLimit: 120,
  },
]

export default function PracticeQuestionBank() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [stats, setStats] = useState({
    totalAnswered: 0,
    correctAnswers: 0,
    mathCorrect: 0,
    turkishCorrect: 0,
    scienceCorrect: 0,
  })

  const startQuestion = (question: Question) => {
    setCurrentQuestion(question)
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(question.timeLimit)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return

    setShowResult(true)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    setStats((prev) => ({
      totalAnswered: prev.totalAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      mathCorrect: prev.mathCorrect + (isCorrect && currentQuestion.subject === "Matematik" ? 1 : 0),
      turkishCorrect: prev.turkishCorrect + (isCorrect && currentQuestion.subject === "Türkçe" ? 1 : 0),
      scienceCorrect: prev.scienceCorrect + (isCorrect && currentQuestion.subject === "Fen Bilimleri" ? 1 : 0),
    }))
  }

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Matematik":
        return <Calculator className="h-4 w-4" />
      case "Türkçe":
        return <BookOpen className="h-4 w-4" />
      case "Fen Bilimleri":
        return <Atom className="h-4 w-4" />
      case "Sosyal Bilgiler":
        return <Globe className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Kolay":
        return "bg-green-100 text-green-800"
      case "Orta":
        return "bg-yellow-100 text-yellow-800"
      case "Zor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (currentQuestion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setCurrentQuestion(null)}>
            ← Soru Bankasına Dön
          </Button>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getSubjectIcon(currentQuestion.subject)}
                <CardTitle className="text-lg">{currentQuestion.subject}</CardTitle>
              </div>
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>{currentQuestion.difficulty}</Badge>
            </div>
            <CardDescription>{currentQuestion.topic}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-base leading-relaxed whitespace-pre-line">{currentQuestion.question}</div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)})</span>
                  {option}
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-4 w-4 ml-auto text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-4 w-4 ml-auto text-red-600" />
                  )}
                </Button>
              ))}
            </div>

            {!showResult ? (
              <Button onClick={submitAnswer} disabled={selectedAnswer === null} className="w-full">
                Cevabı Gönder
              </Button>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${selectedAnswer === currentQuestion.correctAnswer ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-semibold">
                      {selectedAnswer === currentQuestion.correctAnswer ? "Doğru!" : "Yanlış!"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{currentQuestion.explanation}</p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Alex'in İpucu:</p>
                        <p className="text-sm text-blue-700">{currentQuestion.alexTip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Soru Bankası</h2>
        <p className="text-gray-600">Alex'in özel hazırladığı LGS soruları ile pratik yap!</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalAnswered}</div>
            <div className="text-sm text-gray-600">Toplam Soru</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalAnswered > 0 ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Başarı Oranı</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.mathCorrect}</div>
            <div className="text-sm text-gray-600">Matematik Doğru</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.turkishCorrect}</div>
            <div className="text-sm text-gray-600">Türkçe Doğru</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="matematik">Matematik</TabsTrigger>
          <TabsTrigger value="turkce">Türkçe</TabsTrigger>
          <TabsTrigger value="fen">Fen Bilimleri</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {questionBank.map((question) => (
              <Card key={question.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getSubjectIcon(question.subject)}
                      <span className="font-semibold">{question.subject}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{question.topic}</span>
                    </div>
                    <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.question}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {Math.floor(question.timeLimit / 60)} dakika
                    </div>
                    <Button onClick={() => startQuestion(question)}>Soruyu Çöz</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matematik" className="space-y-4">
          <div className="grid gap-4">
            {questionBank
              .filter((q) => q.subject === "Matematik")
              .map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        <span className="font-semibold">{question.topic}</span>
                      </div>
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.question}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {Math.floor(question.timeLimit / 60)} dakika
                      </div>
                      <Button onClick={() => startQuestion(question)}>Soruyu Çöz</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="turkce" className="space-y-4">
          <div className="grid gap-4">
            {questionBank
              .filter((q) => q.subject === "Türkçe")
              .map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-semibold">{question.topic}</span>
                      </div>
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.question}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {Math.floor(question.timeLimit / 60)} dakika
                      </div>
                      <Button onClick={() => startQuestion(question)}>Soruyu Çöz</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="fen" className="space-y-4">
          <div className="grid gap-4">
            {questionBank
              .filter((q) => q.subject === "Fen Bilimleri")
              .map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Atom className="h-4 w-4" />
                        <span className="font-semibold">{question.topic}</span>
                      </div>
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.question}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {Math.floor(question.timeLimit / 60)} dakika
                      </div>
                      <Button onClick={() => startQuestion(question)}>Soruyu Çöz</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
