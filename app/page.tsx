"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Trophy, BookOpen, Calendar, Target, Zap, BarChart3 } from "lucide-react"
import PracticeQuestionBank from "@/components/practice-question-bank"
import AdvancedLearningSystem from "@/components/advanced-learning-system"
import SpacedRepetitionSystem from "@/components/spaced-repetition-system"
import EnhancedParentDashboard from "@/components/enhanced-parent-dashboard"

export default function AlexLGSCoach() {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "alex",
      message: "Merhaba Tuna! Ben Alex, senin LGS koçun. Bugün matematik mi çalışalım, yoksa paragraf anlama mı?",
      time: "14:30",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "user",
          message: message,
          time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setMessage("")

      // Simulate Alex's response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "alex",
            message: "Harika soru! Hemen görsel bir anlatımla açıklayayım. Fenerbahçe maçı gibi düşün...",
            time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4 font-mono tracking-normal bg-slate-950 text-yellow-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono bg-sky-300">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="font-playfair font-bold text-xl text-amber-200">Alex - LGS Koçum</h1>
              <p className="text-sm text-amber-200">Akıllı öğrenme asistanın</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-secondary-foreground border-[rgba(78,248,94,1)] bg-sky-500">
              <Trophy className="w-3 h-3 mr-1" />
              Level 8
            </Badge>
            <Badge variant="outline" className="border-primary text-primary">
              <Target className="w-3 h-3 mr-1" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target w-3 h-3 mr-1"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>Hedef: 470
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-slate-950">
          <TabsList className="grid w-full grid-cols-7 bg-slate-600">
            <TabsTrigger className="text-yellow-200 bg-slate-500" value="chat">Alex ile Sohbet</TabsTrigger>
            <TabsTrigger className="text-yellow-100 bg-slate-500" value="lessons">Akıllı Öğrenme</TabsTrigger>
            <TabsTrigger className="text-yellow-200 bg-slate-500" value="repetition">Tekrar Sistemi</TabsTrigger>
            <TabsTrigger className="text-yellow-200 bg-slate-500" value="progress">İlerleme</TabsTrigger>
            <TabsTrigger className="text-yellow-200 bg-slate-500" value="parent">Veli Paneli</TabsTrigger>
            <TabsTrigger className="text-yellow-200 bg-slate-500" value="questions">Soru Bankası</TabsTrigger>
            <TabsTrigger className="text-yellow-200 bg-slate-500" value="schedule">Program</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chat Area */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col bg-neutral-950">
                  <CardHeader className="bg-slate-900 text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/alex-fenerbahce-avatar.png" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AX</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="font-playfair text-lg">Alex</CardTitle>
                        <CardDescription className="text-white">
                          25 yaşında • Türkiye doğumlu, Brezilyalı babası olan LGS Koçun • NBA & Fenerbahçe Tutkunu
                        </CardDescription>
                      </div>
                      <div className="ml-auto">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 text-transparent bg-slate-500">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg bg-[rgba(240,245,16,1)] ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm bg-amber-200 text-slate-950">{msg.message}</p>
                          <span className="text-xs opacity-70 mt-1 block bg-yellow-300 text-slate-950">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Alex'e bir şey sor..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progress Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Bugünkü İlerleme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Matematik</span>
                        <span className="text-primary font-semibold">8/10 soru</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Türkçe Paragraf</span>
                        <span className="text-secondary font-semibold">5/8 soru</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Fen Bilimleri</span>
                        <span className="text-accent font-semibold">12/15 soru</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      Hızlı Çalışma
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Target className="w-4 h-4 mr-2" />
                      Matematik Pratik
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Paragraf Anlama
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Zap className="w-4 h-4 mr-2" />
                      Hızlı Test
                    </Button>
                  </CardContent>
                </Card>

                {/* Fenerbahçe Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Fenerbahçe Takvimi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">FB vs Galatasaray</p>
                          <p className="text-xs text-muted-foreground">Pazar 20:00</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Önemli
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">FB vs Beşiktaş</p>
                          <p className="text-xs text-muted-foreground">Çarşamba 19:30</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Normal
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="mt-6">
            <AdvancedLearningSystem />
          </TabsContent>

          <TabsContent value="repetition" className="mt-6">
            <SpacedRepetitionSystem />
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <PracticeQuestionBank />
          </TabsContent>

          {/* Other tab contents remain the same */}
          <TabsContent value="progress" className="mt-6">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">İlerleme Takibi</h3>
              <p className="text-muted-foreground">Yakında eklenecek...</p>
            </div>
          </TabsContent>

          <TabsContent value="parent" className="mt-6">
            <EnhancedParentDashboard />
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Haftalık Program</h3>
              <p className="text-muted-foreground">Yakında eklenecek...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
