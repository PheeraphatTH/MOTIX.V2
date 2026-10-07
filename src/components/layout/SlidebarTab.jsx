import React from 'react';
import { Menu, ChevronRight, Sparkles } from 'lucide-react';

export const SlidebarTab = ({ onOpen, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 group select-none">
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center gap-2 pl-2.5 pr-3 py-3 rounded-r-2xl bg-[#0F131D]/95 hover:bg-[#161C2B] text-slate-200 hover:text-white border-y border-r border-[#263147] hover:border-[#E63946]/70 shadow-2xl shadow-black/80 backdrop-blur-md transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
        title="เปิดแถบเมนูลัด (Slidebar Menu)"
        aria-label="Open Slidebar Navigation"
      >
        {/* Animated indicator pulse */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative">
            <Menu className="w-5 h-5 text-[#E63946] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E63946]" />
          </div>

          {/* Vertical Text */}
          <span className="text-[11px] font-black text-slate-300 group-hover:text-white tracking-widest [writing-mode:vertical-rl] rotate-180 py-1 font-['Prompt',sans-serif]">
            เมนู
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E63946] transition-colors" />
        </div>
      </button>
    </div>
  );
};
