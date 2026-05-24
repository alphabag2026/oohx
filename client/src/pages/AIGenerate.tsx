import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import ShareImageModal from "@/components/ShareImageModal";
import { Link } from "wouter";
import {
  Sparkles, Download, RefreshCw, ArrowLeft, Wand2, Image as ImageIcon, Loader2, Share2
} from "lucide-react";

const STYLES = [
  "Cinematic", "Anime", "Hyperreal", "K-Pop", "Hyperanime",
  "Anime XL", "Anime XL+", "Cinematic XL", "Photo XL+", "Hyperreal XL+"
];

const FILTERS = [
  "Default", "Cinematic", "Studio", "Flash", "Analog", "Professional",
  "Polaroid", "Vintage", "Cyberpunk", "3D", "Sketch", "Watercolor", "Cartoon"
];

const EMOTIONS = [
  "Default", "Smiling", "Laughing", "Winking", "Shocked", "Angry",
  "Scared", "Upset", "Orgasm Face"
];

const IMAGE_SIZES = [
  { value: "512x768", label: "세로 (Portrait)" },
  { value: "768x512", label: "가로 (Landscape)" },
  { value: "512x512", label: "정방형 (Square)" },
];

const EXAMPLE_PROMPTS = [
  "beautiful woman with long dark hair, wearing elegant red dress, soft lighting",
  "cute anime girl with blue eyes, school uniform, cherry blossom background",
  "gorgeous model in luxury apartment, natural light, cinematic style",
  "K-pop idol style, colorful hair, vibrant background, studio lighting",
];

export default function AIGenerate() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("ugly, blurry, low quality");
  const [style, setStyle] = useState("Cinematic");
  const [filter, setFilter] = useState("Default");
  const [emotion, setEmotion] = useState("Default");
  const [imageSize, setImageSize] = useState("512x768");
  const [quality, setQuality] = useState<"Ultra" | "Extreme" | "Max">("Ultra");
  const [ageSlider, setAgeSlider] = useState(25);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [gemsRemaining, setGemsRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const generateMutation = trpc.ai.generateImage.useMutation({
    onSuccess: (data) => {
      setGeneratedImage(data.imageUrl);
      setGemsRemaining(data.gemsRemaining);
      setError(null);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setError(null);
    generateMutation.mutate({
      prompt,
      style: style as Parameters<typeof generateMutation.mutate>[0]["style"],
      filter,
      emotion,
      quality,
      image_size: imageSize as "512x512" | "512x768" | "768x512",
      negative_prompt: negativePrompt,
      age_slider: ageSlider,
    });
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `oohx-ai-${Date.now()}.jpg`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/30 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">홈으로</span>
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <img
                src="https://oohx.ai/oohx-logo.png"
                alt="OohX Logo"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                OohX AI 생성
              </span>
            </div>
          </div>
          {gemsRemaining !== null && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-900/30 border border-red-500/30">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">{gemsRemaining.toFixed(1)} Gems 남음</span>
            </div>
          )}
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/30 border border-red-500/50 text-red-300 text-sm font-medium mb-4">
              <Wand2 className="w-4 h-4" />
              AI 이미지 생성
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              당신만의{" "}
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                AI 파트너
              </span>{" "}
              만들기
            </h1>
            <p className="text-gray-400 text-lg">
              프롬프트를 입력하고 원하는 AI 파트너 이미지를 생성하세요
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-5">
              {/* Prompt */}
              <div className="p-5 rounded-xl bg-black/40 border border-red-900/30">
                <label className="block text-sm font-medium text-red-300 mb-2">
                  프롬프트 *
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="원하는 이미지를 영어로 설명하세요... (예: beautiful woman with long dark hair)"
                  className="w-full h-28 bg-black/40 border border-red-900/40 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-red-500/60 text-sm"
                />
                {/* Example prompts */}
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1.5">예시 프롬프트:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {EXAMPLE_PROMPTS.map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(ex)}
                        className="text-xs px-2 py-1 rounded bg-red-900/20 border border-red-900/30 text-red-300 hover:bg-red-900/40 transition truncate max-w-[200px]"
                      >
                        {ex.substring(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style & Filter */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                  <label className="block text-sm font-medium text-red-300 mb-2">스타일</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/60"
                  >
                    {STYLES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                  <label className="block text-sm font-medium text-red-300 mb-2">필터</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/60"
                  >
                    {FILTERS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Emotion & Size */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                  <label className="block text-sm font-medium text-red-300 mb-2">표정</label>
                  <select
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/60"
                  >
                    {EMOTIONS.map(em => (
                      <option key={em} value={em}>{em}</option>
                    ))}
                  </select>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                  <label className="block text-sm font-medium text-red-300 mb-2">이미지 크기</label>
                  <select
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/60"
                  >
                    {IMAGE_SIZES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quality */}
              <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                <label className="block text-sm font-medium text-red-300 mb-2">품질</label>
                <div className="flex gap-2">
                  {(["Ultra", "Extreme", "Max"] as const).map(q => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition border ${
                        quality === q
                          ? "bg-red-600 border-red-500 text-white"
                          : "bg-black/40 border-red-900/30 text-gray-400 hover:border-red-500/50"
                      }`}
                    >
                      {q}
                      {q === "Extreme" && <span className="text-xs text-yellow-400 ml-1">+1💎</span>}
                      {q === "Max" && <span className="text-xs text-yellow-400 ml-1">+2💎</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Slider */}
              <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                <label className="block text-sm font-medium text-red-300 mb-2">
                  나이 설정: <span className="text-white">{ageSlider}세</span>
                </label>
                <input
                  type="range"
                  min={18}
                  max={50}
                  value={ageSlider}
                  onChange={(e) => setAgeSlider(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>18세</span>
                  <span>50세</span>
                </div>
              </div>

              {/* Negative Prompt */}
              <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                <label className="block text-sm font-medium text-red-300 mb-2">
                  네거티브 프롬프트 (제외할 요소)
                </label>
                <input
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="w-full bg-black/40 border border-red-900/40 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 text-sm"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || generateMutation.isPending}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 py-6 text-lg font-bold"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    생성 중... (10-30초 소요)
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    AI 이미지 생성하기
                  </>
                )}
              </Button>

              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-red-300 text-sm">
                  오류: {error}
                </div>
              )}
            </div>

            {/* Right: Generated Image */}
            <div className="flex flex-col">
              <div className="flex-1 rounded-xl bg-black/40 border border-red-900/30 overflow-hidden min-h-[500px] flex flex-col">
                {generateMutation.isPending ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-red-900/30 border-t-red-500 animate-spin" />
                      <Sparkles className="w-8 h-8 text-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-gray-400 text-sm">AI가 이미지를 생성하고 있습니다...</p>
                    <p className="text-gray-500 text-xs">약 10~30초 소요됩니다</p>
                  </div>
                ) : generatedImage ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 relative">
                      <img
                        src={generatedImage}
                        alt="Generated AI Image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4 border-t border-red-900/30 flex gap-2">
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="flex-1 border-red-500/50 text-red-300 hover:bg-red-900/20"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        다운로드
                      </Button>
                      <Button
                        onClick={() => setShareModalOpen(true)}
                        variant="outline"
                        className="flex-1 border-red-500/50 text-red-300 hover:bg-red-900/20"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        공유
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        disabled={generateMutation.isPending}
                        className="flex-1 bg-red-600 hover:bg-red-700 border-0"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        재생성
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-24 h-24 rounded-full bg-red-900/20 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-red-500/50" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 mb-2">아직 생성된 이미지가 없습니다</p>
                      <p className="text-gray-500 text-sm">
                        왼쪽에서 프롬프트를 입력하고<br />
                        "AI 이미지 생성하기" 버튼을 클릭하세요
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-4 p-4 rounded-xl bg-black/20 border border-red-900/20">
                <p className="text-xs text-gray-500 font-medium mb-2">💡 생성 팁</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• 영어로 상세하게 묘사할수록 더 좋은 결과가 나옵니다</li>
                  <li>• Cinematic 스타일은 사실적인 이미지에 최적화되어 있습니다</li>
                  <li>• K-Pop 스타일은 한국 아이돌 스타일 이미지를 생성합니다</li>
                  <li>• Ultra 품질 = 1 Gem, Extreme = 2 Gems, Max = 3 Gems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Share Modal */}
      {generatedImage && (
        <ShareImageModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          imageUrl={generatedImage}
          prompt={prompt}
        />
      )}
    </div>
  );
}
