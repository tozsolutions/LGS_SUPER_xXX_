"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

interface ChatMessage {
  id: number
  sender: "alex" | "user"
  message: string
  time: string
  type?: "text" | "audio" | "visual"
  emotion?: "happy" | "encouraging" | "thinking" | "celebrating"
}

export default function EnhancedChatInterface() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "alex",
      message:
        "Merhaba Tuna! Ben Alex, senin LGS koçun. Bugün hangi konuda çalışmak istiyorsun? Matematik mi, yoksa paragraf anlama mı?",
      time: "14:30",
      emotion: "happy",
    },
  ])

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition logic would go here
  }

  const handleEmojiResponse = (emoji: string, meaning: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        message: `${emoji} ${meaning}`,
        time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      },
    ])

    // Alex's response based on emoji
    setTimeout(() => {
      let alexResponse = ""
      switch (emoji) {
        case "👍":
          alexResponse = "Harika! O zaman bu konuya devam edelim. Fenerbahçe'nin gol sayısı gibi düşün..."
          break
        case "❤️":
          alexResponse = "Ben de seni seviyorum Tuna! Şimdi bu sevgiyi matematik problemlerine yöneltelim!"
          break
        case "😊":
          alexResponse = "Mutlu olman beni de mutlu ediyor! Hadi bu enerjiyle bir soru çözelim."
          break
        case "⭐":
          alexResponse = "Sen gerçekten bir yıldızsın! Bu motivasyonla LGS'de 470 puanı geçeceğiz!"
          break
        default:
          alexResponse = "Anlıyorum! Hadi birlikte çalışalım."
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "alex",
          message: alexResponse,
          time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          emotion: "encouraging",
        },
      ])
    }, 1000)
  }

  const speakMessage = (message: string) => {
    setIsSpeaking(true)
    // Text-to-speech logic would go here
    setTimeout(() => setIsSpeaking(false), 3000)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-950/20 dark:to-blue-950/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-14 h-14 border-2 border-yellow-400">
              <AvatarImage src="/alex-fenerbahce-avatar.png" />
              <AvatarFallback className="bg-primary text-primary-foreground">AX</AvatarFallback>
            </Avatar>
            {isSpeaking && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="font-playfair text-lg flex items-center gap-2">
              Alex
              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                Fenerbahçeli Koç
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              25 yaşında • Türkiye doğumlu • NBA & Fenerbahçe Tutkunu • Disiplinli Mentor
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => speakMessage("Merhaba Tuna!")} disabled={isSpeaking}>
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg relative ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                  : "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 text-foreground border border-blue-200 dark:border-blue-800"
              }`}
            >
              {msg.sender === "alex" && msg.emotion && (
                <div className="absolute -top-2 -left-2 text-lg">
                  {msg.emotion === "happy" && "😊"}
                  {msg.emotion === "encouraging" && "💪"}
                  {msg.emotion === "thinking" && "🤔"}
                  {msg.emotion === "celebrating" && "🎉"}
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">{msg.time}</span>
                {msg.sender === "alex" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakMessage(msg.message)}
                    className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="p-4 border-t border-border bg-muted/30">
        {/* Voice Input */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant={isListening ? "default" : "outline"}
            onClick={handleVoiceInput}
            className={`${isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""}`}
          >
            {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isListening ? "Dinliyorum..." : "Sesli Konuş"}
          </Button>
        </div>

        {/* Emoji Quick Responses */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEmojiResponse("👍", "Anladım!")}
            className="text-2xl hover:scale-110 transition-transform"
          >
            👍
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEmojiResponse("❤️", "Sevdim!")}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ❤️
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEmojiResponse("😊", "Mutluyum!")}
            className="text-2xl hover:scale-110 transition-transform"
          >
            😊
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEmojiResponse("🤔", "Düşünüyorum...")}
            className="text-2xl hover:scale-110 transition-transform"
          >
            🤔
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEmojiResponse("⭐", "Harika!")}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ⭐
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Yazma yok! Sadece sesli konuş veya emoji ile cevap ver
        </p>
      </div>
    </Card>
  )
}
