import React, { useState, useRef, useEffect } from 'react';
import { useAdminStore } from '../store/adminStore';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  HelpCircle, 
  Building, 
  FileSpreadsheet, 
  Compass, 
  ChevronDown,
  RefreshCw,
  MessageSquareText,
  Globe,
  ExternalLink,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: { title: string; uri: string }[];
}

const QUICK_QUESTIONS = [
  "📍 Alamat kantor Yogyakarta & Batam?",
  "📜 Apa dasar hukum penyusunan DPPT?",
  "👥 Siapa saja susunan tim tenaga ahli?",
  "🗺️ Apa itu SIMA & Verifikasi Rempang?",
  "🏦 Bank apa saja rekanan PT. ING?",
  "🔍 Cari regulasi pengadaan tanah terbaru di internet"
];

export default function AIConsultantWidget() {
  const { content } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Saya Asisten Konsultasi AI PT. INDOS NESOS GEMILANG (ING).\n\nSaya telah terhubung langsung dengan seluruh data profil perusahaan, 7 layanan (FS, SIMA/GIS, DPPT, SSH/ASB, PIR), susunan tim ahli, bank rekanan, alamat kantor cabang (Batam, Jakarta, Yogyakarta), serta terintegrasi dengan Google Search Engine untuk menelusuri regulasi atau informasi terkini di internet.\n\nAda yang dapat kami bantu untuk Anda?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-5).map(m => ({ sender: m.sender, text: m.text })),
          liveContent: content // Send full live edited data from Admin Dashboard
        })
      });

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || data.error || 'Terima kasih atas pertanyaan Anda. Silakan hubungi kantor kami untuk konsultasi mendalam.',
        sources: data.sources && Array.isArray(data.sources) && data.sources.length > 0 ? data.sources : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Mohon maaf, terjadi kendala saat menghubungi asisten AI. Silakan hubungi kami via WhatsApp/Telepon di 0812-7023-3616 / 0812-7000-840.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-900 hover:bg-neutral-950 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-neutral-700 flex items-center gap-3 transition group relative"
          aria-label="Buka Konsultasi AI"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-900"></span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="flex items-center gap-1.5">
              <span className="block text-[10px] font-black uppercase tracking-wider text-red-400 leading-none">
                Gemini 3.7 + Google Search
              </span>
            </div>
            <span className="block text-xs font-bold text-white leading-tight mt-0.5">
              Konsultasi AI PT. ING
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] max-h-[660px] h-[82vh] bg-white rounded-3xl shadow-2xl border border-neutral-200 z-50 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-neutral-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-white leading-tight">
                      Konsultasi AI PT. ING
                    </h3>
                    <span className="text-[10px] bg-red-950 text-red-400 border border-red-800/60 px-1.5 py-0.5 rounded font-mono font-bold">
                      Gemini 3.7 Flash
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Website Knowledge
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-blue-400 font-medium">
                      <Globe className="w-3 h-3 text-blue-400" />
                      Google Grounding
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/70 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 sm:p-4 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-br-none shadow-sm font-medium'
                        : 'bg-white text-neutral-800 border border-neutral-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    
                    {/* Google Search Grounding Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                          <Globe className="w-3 h-3 text-blue-600" />
                          Sumber Penelusuran Google:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.slice(0, 4).map((source, sIdx) => (
                            <a
                              key={sIdx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] bg-neutral-100 hover:bg-blue-50 text-neutral-700 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-neutral-200 transition font-medium truncate max-w-[200px]"
                            >
                              <span className="truncate">{source.title || 'Sumber Web'}</span>
                              <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <span
                      className={`block text-[10px] mt-1.5 text-right font-mono ${
                        msg.sender === 'user' ? 'text-red-200' : 'text-neutral-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-none p-3.5 text-neutral-600 flex items-center gap-2.5 shadow-sm text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                    <span>Menganalisis data & menelusuri informasi via Google...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            <div className="bg-white px-3 py-2 border-t border-neutral-100 flex gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-[11px] whitespace-nowrap bg-neutral-100 hover:bg-red-50 hover:text-red-700 text-neutral-700 px-3 py-1.5 rounded-full border border-neutral-200 transition font-medium flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Tanya layanan, proyek, kantor Jogja, atau regulasi..."
                className="flex-1 bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition flex items-center justify-center flex-shrink-0"
                aria-label="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
