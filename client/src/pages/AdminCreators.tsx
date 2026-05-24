import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Shield, Save, X } from "lucide-react";
import { getLoginUrl } from "@/const";

interface CreatorForm {
  id?: number;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  category: string;
  tags: string;
  isActive: boolean;
}

const emptyForm: CreatorForm = {
  name: "",
  imageUrl: "",
  price: "₩9,900/월",
  description: "",
  category: "dating",
  tags: "",
  isActive: true,
};

export default function AdminCreators() {
  const { user, isAuthenticated, loading } = useAuth();
  const [editingCreator, setEditingCreator] = useState<CreatorForm | null>(null);
  const [showForm, setShowForm] = useState(false);

  const utils = trpc.useUtils();
  const { data: creators, isLoading } = trpc.creators.listAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const upsertMutation = trpc.creators.upsert.useMutation({
    onSuccess: () => {
      toast.success(editingCreator?.id ? "크리에이터가 수정되었습니다" : "크리에이터가 추가되었습니다");
      utils.creators.listAll.invalidate();
      utils.creators.list.invalidate();
      setShowForm(false);
      setEditingCreator(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.creators.delete.useMutation({
    onSuccess: () => {
      toast.success("크리에이터가 삭제되었습니다");
      utils.creators.listAll.invalidate();
      utils.creators.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white flex flex-col items-center justify-center gap-6 px-4">
        <Shield className="w-16 h-16 text-red-400 opacity-50" />
        <h1 className="text-2xl font-bold">관리자 전용 페이지</h1>
        <p className="text-gray-400 text-center">이 페이지는 관리자만 접근할 수 있습니다</p>
        {!isAuthenticated ? (
          <a href={getLoginUrl()}>
            <Button className="bg-red-600 hover:bg-red-700 border-0">로그인하기</Button>
          </a>
        ) : (
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">홈으로</Button>
          </Link>
        )}
      </div>
    );
  }

  const handleEdit = (creator: typeof creators extends (infer T)[] | undefined ? T : never) => {
    if (!creator) return;
    setEditingCreator({
      id: (creator as any).id,
      name: (creator as any).name ?? "",
      imageUrl: (creator as any).imageUrl ?? "",
      price: (creator as any).price ?? "",
      description: (creator as any).description ?? "",
      category: (creator as any).category ?? "dating",
      tags: (creator as any).tags ?? "",
      isActive: (creator as any).isActive ?? true,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCreator) return;
    upsertMutation.mutate({
      ...editingCreator,
      imageUrl: editingCreator.imageUrl || "https://via.placeholder.com/400x600",
    });
  };

  const handleNew = () => {
    setEditingCreator({ ...emptyForm });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center gap-3 px-4 py-4 max-w-5xl mx-auto">
          <Link href="/my">
            <button className="p-2 rounded-full hover:bg-red-900/30 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <Shield className="w-5 h-5 text-yellow-400" />
          <h1 className="text-lg font-bold">크리에이터 관리</h1>
          <Button
            onClick={handleNew}
            className="ml-auto bg-red-600 hover:bg-red-700 border-0 text-sm"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            추가
          </Button>
        </div>
      </div>

      <div className="pt-20 pb-12 px-4 max-w-5xl mx-auto">
        {/* Creator Form Modal */}
        {showForm && editingCreator && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-900 border border-red-500/30 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">
                  {editingCreator.id ? "크리에이터 수정" : "새 크리에이터 추가"}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:text-red-400 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">이름 *</label>
                  <Input
                    value={editingCreator.name}
                    onChange={e => setEditingCreator(p => p ? { ...p, name: e.target.value } : p)}
                    placeholder="크리에이터 이름"
                    required
                    className="bg-white/10 border-red-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">프로필 이미지 URL *</label>
                  <Input
                    value={editingCreator.imageUrl}
                    onChange={e => setEditingCreator(p => p ? { ...p, imageUrl: e.target.value } : p)}
                    placeholder="https://..."
                    required
                    className="bg-white/10 border-red-500/30 text-white"
                  />
                  {editingCreator.imageUrl && (
                    <img src={editingCreator.imageUrl} alt="preview" className="mt-2 w-20 h-28 object-cover rounded-lg" />
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">가격</label>
                  <Input
                    value={editingCreator.price}
                    onChange={e => setEditingCreator(p => p ? { ...p, price: e.target.value } : p)}
                    placeholder="₩9,900/월"
                    className="bg-white/10 border-red-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">소개</label>
                  <textarea
                    value={editingCreator.description}
                    onChange={e => setEditingCreator(p => p ? { ...p, description: e.target.value } : p)}
                    placeholder="크리에이터 소개..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-red-500/30 text-white placeholder:text-gray-500 text-sm resize-none focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">카테고리</label>
                  <Input
                    value={editingCreator.category}
                    onChange={e => setEditingCreator(p => p ? { ...p, category: e.target.value } : p)}
                    placeholder="dating, companion, ..."
                    className="bg-white/10 border-red-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">태그 (쉼표 구분)</label>
                  <Input
                    value={editingCreator.tags}
                    onChange={e => setEditingCreator(p => p ? { ...p, tags: e.target.value } : p)}
                    placeholder="귀여움, 활발함, ..."
                    className="bg-white/10 border-red-500/30 text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-400">활성화</label>
                  <button
                    type="button"
                    onClick={() => setEditingCreator(p => p ? { ...p, isActive: !p.isActive } : p)}
                    className={`w-10 h-6 rounded-full transition ${editingCreator.isActive ? "bg-red-600" : "bg-gray-600"} relative`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${editingCreator.isActive ? "left-5" : "left-1"}`} />
                  </button>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={upsertMutation.isPending}
                    className="flex-1 bg-red-600 hover:bg-red-700 border-0"
                  >
                    {upsertMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                    저장
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="border-gray-600 text-gray-300"
                  >
                    취소
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Creator List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          </div>
        ) : !creators || creators.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="mb-4">등록된 크리에이터가 없습니다</p>
            <Button onClick={handleNew} className="bg-red-600 hover:bg-red-700 border-0">
              <Plus className="w-4 h-4 mr-2" />
              첫 크리에이터 추가
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {creators.map((creator: any) => (
              <div key={creator.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition">
                <img
                  src={creator.imageUrl}
                  alt={creator.name}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{creator.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${creator.isActive ? "bg-green-900/40 text-green-400 border border-green-500/30" : "bg-gray-900/40 text-gray-400 border border-gray-500/30"}`}>
                      {creator.isActive ? "활성" : "비활성"}
                    </span>
                  </div>
                  <p className="text-sm text-red-400">{creator.price}</p>
                  <p className="text-xs text-gray-500 truncate">{creator.description}</p>
                  {creator.tags && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {creator.tags.split(",").map((tag: string, i: number) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-red-900/20 text-red-300 text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(creator)}
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-900/20 text-xs"
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    수정
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm(`"${creator.name}"을 삭제하시겠습니까?`)) {
                        deleteMutation.mutate({ id: creator.id });
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    className="border-red-500/30 text-red-300 hover:bg-red-900/20 text-xs"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
