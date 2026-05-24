import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Twitter, Link2, Check, Download } from "lucide-react";

interface ShareImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  prompt?: string;
}

export default function ShareImageModal({ isOpen, onClose, imageUrl, prompt }: ShareImageModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = prompt
    ? `OohX.ai에서 AI로 생성한 이미지: "${prompt.slice(0, 50)}${prompt.length > 50 ? '...' : ''}" 🔥 #OohX #AIArt`
    : "OohX.ai에서 AI로 생성한 이미지 🔥 #OohX #AIArt";
  // data URL이면 ai-generate 페이지, 외부 URL이면 이미지 직접 링크
  const shareUrl = imageUrl.startsWith('data:') ? "https://oohx.ai/ai-generate" : imageUrl;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `oohx-ai-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-slate-900 to-red-950 border border-red-500/30 rounded-2xl max-w-sm w-full p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2">이미지 공유</h3>
        <p className="text-gray-400 text-sm mb-6">
          AI로 생성한 이미지를 공유하세요
        </p>

        {/* Preview */}
        <div className="mb-6 rounded-xl overflow-hidden aspect-square">
          <img
            src={imageUrl}
            alt="Generated"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            onClick={handleTwitterShare}
            className="bg-[#1DA1F2] hover:bg-[#1a8fd1] border-0 text-white gap-2"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </Button>

          <Button
            onClick={handleTelegramShare}
            className="bg-[#0088cc] hover:bg-[#0077b3] border-0 text-white gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.367l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.192z"/>
            </svg>
            Telegram
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-red-500/30 text-gray-300 hover:bg-red-900/20 gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                복사됨!
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                링크 복사
              </>
            )}
          </Button>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-red-500/30 text-gray-300 hover:bg-red-900/20 gap-2"
          >
            <Download className="w-4 h-4" />
            다운로드
          </Button>
        </div>
      </div>
    </div>
  );
}
