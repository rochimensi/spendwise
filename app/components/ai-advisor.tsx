'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Brain, Send, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAdvisor() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
          id: '1',
          role: 'assistant',
          content: "Hello! I'm your AI financial advisor. I can help you with budgeting tips, saving strategies, investment advice, debt management, and more. What financial question can I help you with today?",
          timestamp: new Date()
        }
      ]);
      const [inputValue, setInputValue] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [conversationId, setConversationId] = useState<string | null>(null);
    
      const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          content: inputValue.trim(),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue.trim();
        setInputValue('');
        setIsLoading(true);
        
        try {
          const response = await fetch('/api/ai-advisor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: currentInput,
              conversation_id: conversationId
            }),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          const aiResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.message,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiResponse]);
          
          // Update conversation ID for future messages
          if (data.conversation_id) {
            setConversationId(data.conversation_id);
          }
          
        } catch (error) {
          console.error('Error sending message:', error);
          
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      };

  return (
    <div className="pb-20 h-screen flex flex-col justify-between">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="flex flex-row items-center justify-center transition-all h-12 px-4 py-2 has-[>svg]:px-3 text-primary hover:bg-accent hover:text-accent-foreground size-10 rounded-md">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">AI Financial Advisor</h1>
          </div>
        </div>

        <Card className="flex-1 flex flex-col justify-between">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Financial Chat Assistant</CardTitle>
                <CardDescription>
                    Ask me anything about budgeting, saving, investing, or managing your finances
                </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="flex-1 flex flex-col justify-start space-y-4 overflow-y-auto p-1">
                  {messages.map((message: ChatMessage) => (
                  <div
                      key={message.id}
                      className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                      {message.role === 'assistant' && (
                          <div className="w-8 h-8 mt-1 text-blue-600 bg-sky-100 font-medium flex items-center justify-center rounded-full flex-shrink-0">
                              <Bot className="h-4 w-4" />
                          </div>
                      )}
                      
                      <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted mr-4'
                      }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-1 opacity-70`}>
                            {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                            })}
                        </p>
                      </div>
                      
                      {message.role === 'user' && (
                          <div className="w-8 h-8 mt-1 bg-primary text-primary-foreground font-medium flex items-center justify-center rounded-full flex-shrink-0">
                              <User className="h-4 w-4" />
                          </div>
                      )}
                  </div>
                  ))}
                  
                  {isLoading && (
                  <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 mt-1 text-blue-600 bg-sky-100 font-medium flex items-center justify-center rounded-full flex-shrink-0">
                          <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg mr-4">
                          <p className="text-muted-foreground">Thinking...</p>
                      </div>
                  </div>
                  )}
              </div>
              
              <div className="flex flex-col gap-2 pt-4 border-t flex-shrink-0">
                  <div className="flex gap-2">
                      <Textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me about budgeting, saving, investing, or any financial question..."
                          className="flex-1 min-h-[60px] resize-none"
                          disabled={isLoading}
                      />
                      <Button 
                          onClick={handleSendMessage} 
                          disabled={!inputValue.trim() || isLoading}
                          className="px-3 flex-shrink-0"
                      >
                          <Send className="h-4 w-4" />
                      </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center">
                      💡 Try asking: "How should I budget my income?" or "What's the best way to save money?"
                  </div>
              </div>
            </CardContent>
        </Card>
    </div>
);
}