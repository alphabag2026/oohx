import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Image as ImageIcon, User, Heart, Download } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function MyPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { data: myImages, isLoading: imagesLoading } = trpc.ai.myImages.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white flex flex-col items-center justify-center gap-6 px-4">
        <User className="w-16 h-16 text-red-400 opacity-50" />
        <h1 className="text-2xl font-bold">로그인이 필요합니다</h1>
        <p className="text-gray-400 text-center">마이페이지를 이용하려면 로그인해 주세요</p>
        <a href={getLoginUrl()}>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8">
            로그인하기
          </Button>
        </a>
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  const handleDownload = (imageUrl: string, idx: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `oohx-image-${idx + 1}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center gap-3 px-4 py-4 max-w-5xl mx-auto">
          <Link href="/">
            <button className="p-2 rounded-full hover:bg-red-900/30 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-bold">마이페이지</h1>
        </div>
      </div>

      <div className="pt-20 pb-12 px-4 max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name ?? "사용자"}</h2>
              <p className="text-gray-400 text-sm">{user?.email ?? ""}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-red-900/40 border border-red-500/30 text-xs text-red-300">
                {user?.role === "admin" ? "관리자" : "일반 회원"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "생성한 이미지", value: myImages?.length ?? 0, icon: ImageIcon },
            { label: "즐겨찾기", value: 0, icon: Heart },
            { label: "채팅 세션", value: 0, icon: User },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Image History */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-red-400" />
            생성한 이미지
          </h3>

          {imagesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            </div>
          ) : !myImages || myImages.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>아직 생성한 이미지가 없습니다</p>
              <Link href="/ai-generate">
                <Button className="mt-4 bg-red-600 hover:bg-red-700 border-0">
                  AI 이미지 생성하기
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {myImages.map((img, idx) => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-black/40">
                  <img
                    src={img.imageUrl}
                    alt={`Generated ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
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
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-xs text-gray-300">
                    {img.style ?? "Cinematic"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin link */}
        {user?.role === "admin" && (
          <div className="mt-8 p-4 rounded-xl bg-yellow-900/20 border border-yellow-500/30">
            <h3 className="font-bold text-yellow-400 mb-2">관리자 메뉴</h3>
            <Link href="/admin/creators">
              <Button variant="outline" className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-900/20">
                크리에이터 관리
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
