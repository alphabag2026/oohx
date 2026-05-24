import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, Sparkles, CreditCard, Shield, Star } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  features: string[];
}

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  plan: Plan;
}

export default function SubscribeModal({ isOpen, onClose, creatorName, plan }: SubscribeModalProps) {
  const [step, setStep] = useState<"confirm" | "success">("confirm");

  if (!isOpen) return null;

  const handleSubscribe = () => {
    // 결제 기능은 추후 연동 예정
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-red-950/50 border border-red-500/30 shadow-2xl shadow-red-900/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-red-900/30 transition text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "confirm" ? (
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {creatorName}의 {plan.name} 플랜
              </h2>
              <p className="text-3xl font-bold text-red-400 mt-2">{plan.price}</p>
            </div>

            {/* Features */}
            <div className="bg-black/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-400 mb-3 font-medium">포함된 혜택</p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-200">
                    <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>안전한 결제 · 언제든지 취소 가능 · 개인정보 보호</span>
            </div>

            {/* CTA */}
            <Button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 py-5 text-base font-semibold"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              구독 시작하기
            </Button>
            <p className="text-center text-xs text-gray-600 mt-3">
              결제 기능은 준비 중입니다. 곧 서비스될 예정입니다.
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            {/* Success Animation */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-900/30">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">구독 신청 완료!</h2>
            <p className="text-gray-400 mb-2">
              <span className="text-red-400 font-semibold">{creatorName}</span>의{" "}
              <span className="text-white font-semibold">{plan.name}</span> 플랜
            </p>
            <p className="text-sm text-gray-500 mb-6">
              결제 시스템 오픈 시 알림을 보내드립니다.
            </p>
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Sparkles key={s} className="w-4 h-4" />
              ))}
            </div>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8"
            >
              확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
