'use client';

import { ArrowLeft, Brain, AlertTriangle, Lightbulb, Target, Send, Bot, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";

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
    
      // Mock AI responses for financial advice
      const generateMockResponse = (userPrompt: string): string => {
        const prompt = userPrompt.toLowerCase();
        
        if (prompt.includes('budget') || prompt.includes('budgeting')) {
          return "Here are some effective budgeting strategies:\n\n1. **50/30/20 Rule**: Allocate 50% for needs, 30% for wants, and 20% for savings\n2. **Zero-based budgeting**: Assign every dollar a purpose\n3. **Track expenses**: Use apps or spreadsheets to monitor spending\n4. **Review monthly**: Adjust your budget based on actual spending patterns\n\nWould you like me to help you create a personalized budget based on your income?";
        }
        
        if (prompt.includes('save') || prompt.includes('saving')) {
          return "Great question about saving! Here are proven strategies:\n\n• **Automate savings**: Set up automatic transfers to savings accounts\n• **Start small**: Begin with just $25-50 per month and increase gradually\n• **High-yield accounts**: Use savings accounts with better interest rates\n• **Emergency fund**: Aim for 3-6 months of expenses\n• **Reduce recurring costs**: Cancel unused subscriptions\n\nWhat's your current savings goal? I can help you create a plan to reach it.";
        }
        
        if (prompt.includes('debt') || prompt.includes('loan') || prompt.includes('credit')) {
          return "Debt management is crucial for financial health. Here's my advice:\n\n**Debt Payoff Strategies:**\n• **Debt Avalanche**: Pay minimums on all debts, extra on highest interest rate\n• **Debt Snowball**: Pay minimums on all debts, extra on smallest balance\n• **Consolidation**: Consider combining debts for lower interest rates\n\n**Credit Tips:**\n• Keep utilization below 30% of credit limits\n• Pay more than minimums when possible\n• Never miss payments\n\nWhat type of debt are you dealing with? I can provide more specific guidance.";
        }
        
        if (prompt.includes('invest') || prompt.includes('investment') || prompt.includes('stock')) {
          return "Investment advice for beginners:\n\n**Getting Started:**\n• **Emergency fund first**: Ensure 3-6 months expenses saved\n• **401(k) match**: Always get full employer match\n• **Index funds**: Start with low-cost, diversified options\n• **Dollar-cost averaging**: Invest consistently over time\n\n**Key Principles:**\n• Diversify your portfolio\n• Invest for the long term\n• Don't try to time the market\n• Keep fees low\n\n*Note: This is general education, not personalized investment advice. Consider consulting a financial advisor for your specific situation.*";
        }
        
        if (prompt.includes('emergency') || prompt.includes('fund')) {
          return "Emergency funds are essential! Here's how to build one:\n\n**Emergency Fund Basics:**\n• **Goal**: 3-6 months of essential expenses\n• **Start small**: Even $500 can help with minor emergencies\n• **Separate account**: Keep it away from daily spending money\n• **High-yield savings**: Earn interest while keeping it accessible\n\n**Building Strategy:**\n1. Calculate monthly essential expenses\n2. Start with a $1,000 mini-emergency fund\n3. Save $100-200 monthly until you reach your goal\n4. Only use for true emergencies\n\nHow much do you spend on essential expenses each month?";
        }
        
        if (prompt.includes('expense') || prompt.includes('spending') || prompt.includes('track')) {
          return "Expense tracking is key to financial success! Here's how:\n\n**Tracking Methods:**\n• **Apps**: Mint, YNAB, or bank apps with categorization\n• **Spreadsheets**: Create custom categories\n• **Receipt method**: Save and categorize weekly\n• **Bank statements**: Review and categorize monthly\n\n**Categories to Track:**\n• Housing (rent/mortgage, utilities)\n• Food (groceries, dining out)\n• Transportation\n• Entertainment\n• Personal care\n• Miscellaneous\n\n**Tips:**\n• Review weekly to stay on track\n• Identify spending patterns\n• Set alerts for overspending\n\nWhat expense category do you struggle with most?";
        }
        
        // Default response for general financial questions
        return "I'd be happy to help with your financial question! Here are some general tips:\n\n**Financial Health Fundamentals:**\n• Create and stick to a budget\n• Build an emergency fund\n• Pay off high-interest debt\n• Save for retirement early\n• Track your expenses regularly\n• Set specific financial goals\n\n**Popular Topics I Can Help With:**\n• Budgeting strategies\n• Debt payoff plans\n• Saving and investment basics\n• Emergency fund planning\n• Expense tracking tips\n\nFeel free to ask about any specific financial situation or goal you'd like guidance on!";
      };
    
      const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          content: inputValue.trim(),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        
        // Simulate API delay
        setTimeout(() => {
          const aiResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: generateMockResponse(userMessage.content),
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiResponse]);
          setIsLoading(false);
        }, 1000);
      };
    
      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      };

  return (
    <div className="pb-20 h-screen flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="flex flex-row items-center justify-center transition-all h-12 px-4 py-2 has-[>svg]:px-3 text-primary hover:bg-accent hover:text-accent-foreground size-10 rounded-md">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">AI Financial Advisor</h1>
          </div>
        </div>

        <Card className="flex-1 flex flex-col">
            <CardHeader>
                <CardTitle>Financial Chat Assistant</CardTitle>
                <CardDescription>
                    Ask me anything about budgeting, saving, investing, or managing your finances
                </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col gap-4">
            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-96">
                {messages.map((message: ChatMessage) => (
                <div
                    key={message.id}
                    className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                    {message.role === 'assistant' && (
                        <div className="w-8 h-8 mt-1 text-blue-600 bg-sky-100 font-medium flex size-full items-center justify-center rounded-full">
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
                        <div className="w-8 h-8 mt-1 bg-primary text-primary-foreground font-medium flex size-full items-center justify-center rounded-full">
                            <User className="h-4 w-4" />
                        </div>
                    )}
                </div>
                ))}
                
                {isLoading && (
                <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 mt-1 text-blue-600 bg-sky-100 font-medium flex size-full items-center justify-center rounded-full">
                        <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg mr-4">
                        <p className="text-muted-foreground">Thinking...</p>
                    </div>
                </div>
                )}
            </div>
            
            {/* Input Area */}
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
                    className="px-3"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
                💡 Try asking: "How should I budget my income?" or "What's the best way to save money?"
            </div>
            </CardContent>
        </Card>
    </div>
);
}