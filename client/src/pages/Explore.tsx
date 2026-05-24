import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Image as ImageIcon, Sparkles, Download } from "lucide-react";

export default function Explore() {
  const [limit] = useState(20);
  const { data: gallery, isLoading } = trpc.ai.gallery.useQuery({ limit });

  const handleDownload = (imageUrl: string, idx: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `oohx-explore-${idx + 1}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center gap-3 px-4 py-4 max-w-6xl mx-auto">
          <Link href="/">
            <button className="p-2 rounded-full hover:bg-red-900/30 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <Sparkles className="w-5 h-5 text-red-400" />
          <h1 className="text-lg font-bold">AI 갤러리 탐색</h1>
          <span className="ml-auto text-sm text-gray-400">커뮤니티 작품</span>
        </div>
      </div>

      <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        {/* Hero Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-900/30 to-black/40 border border-red-500/20 text-center">
          <h2 className="text-2xl font-bold mb-2">AI 생성 갤러리</h2>
          <p className="text-gray-400 text-sm mb-4">OohX 커뮤니티가 만든 AI 아트를 탐색하세요</p>
          <Link href="/ai-generate">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              나도 만들기
            </Button>
          </Link>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-red-500" />
          </div>
        ) : !gallery || gallery.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg mb-2">아직 공개된 작품이 없습니다</p>
            <p className="text-sm text-gray-600 mb-6">첫 번째 AI 이미지를 공개해 보세요!</p>
            <Link href="/ai-generate">
              <Button className="bg-red-600 hover:bg-red-700 border-0">
                AI 이미지 생성하기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {gallery.map((img, idx) => (
              <div key={img.id} className="group relative break-inside-avoid rounded-xl overflow-hidden bg-black/40 mb-4">
                <img
                  src={img.imageUrl}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                  <p className="text-xs text-gray-300 line-clamp-2 mb-2">{img.prompt}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(img.imageUrl, idx)}
                      className="flex-1 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-xs flex items-center justify-center gap-1 transition"
                    >
                      <Download className="w-3 h-3" />
                      저장
                    </button>
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-xs text-gray-300">
                  {img.style ?? "Cinematic"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
