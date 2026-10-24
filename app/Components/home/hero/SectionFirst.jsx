import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SectionFirst() {
  return (
    <section className="relative grid min-h-[calc(100vh-68px)] grid-cols-[minmax(300px,.9fr)_minmax(440px,1.1fr)] overflow-hidden bg-[#efeee9] text-[#151515] dark:bg-zinc-950 dark:text-zinc-100 max-[850px]:min-h-0 max-[850px]:grid-cols-1">
      <div className="relative [z-index:2] px-[clamp(28px,7vw,110px)] pt-[clamp(52px,10vw,145px)] pb-[94px] max-[850px]:min-h-[525px] max-[850px]:pb-[84px] max-[480px]:min-h-[475px] max-[480px]:pt-[54px]">
        <p className="mb-[22px] text-[11px] font-bold uppercase tracking-[1.4px] text-[#677247]">The spring edit / 2026</p>
        <h1 className="m-0 text-[clamp(50px,6vw,91px)] font-medium leading-[.88]">Dress like<br /><em className="font-serif font-normal text-[#788c45]">you mean it.</em></h1>
        <p className="my-[29px] max-w-[340px] text-[15px] leading-[1.65] text-[#53534d] dark:text-zinc-300">Thoughtfully chosen essentials for days that ask for a little more personality.</p>
        <div className="flex items-center gap-[18px] max-[480px]:items-start max-[480px]:flex-col max-[480px]:gap-4"><Link className="inline-flex items-center gap-[10px] bg-[#1b1b1a] px-[17px] py-[13px] text-xs font-bold text-[#f7f7f2] no-underline" href="/newcollections">Shop the collection <ArrowRight size={16} /></Link><Link className="inline-flex items-center gap-[10px] border-b border-[#1b1b1a] pb-[3px] text-xs font-bold text-[#171717] no-underline" href="/catalog">Explore catalog</Link></div>
        <div className="absolute bottom-9 left-[clamp(28px,7vw,110px)] flex items-center gap-[10px] text-[#65645e] dark:text-zinc-400 max-[850px]:bottom-9"><span className="text-xs font-bold text-[#849750]">01</span><p className="m-0 max-w-[205px] text-[10px] leading-[1.4]">New shapes, soft tailoring and expressive colour.</p></div>
      </div>
      <div className="relative min-h-[630px] overflow-hidden bg-[#c9cebd] max-[850px]:min-h-[440px] max-[480px]:min-h-[370px]">
        <div className="absolute right-[12%] bottom-0 h-[80%] w-[min(70%,520px)] max-[850px]:right-[18%] max-[850px]:h-[94%] max-[480px]:right-[7%] max-[480px]:w-[75%]"><Image className="object-cover object-top" src="/model3.jpeg" alt="Model wearing a contemporary look" fill priority sizes="(max-width: 850px) 75vw, 35vw" /></div>
        <div className="absolute bottom-[8%] left-[5%] z-2 h-[35%] w-[30%] border-[8px] border-[#efeee9] shadow-[0_12px_30px_rgba(20,20,15,.18)] max-[850px]:left-[10%] max-[850px]:h-[38%] max-[850px]:w-[28%] max-[480px]:left-[5%] max-[480px]:h-[33%] max-[480px]:w-[30%] max-[480px]:border-[5px]"><Image className="object-cover object-top" src="/model1.jpeg" alt="Editorial fashion portrait" fill sizes="(max-width: 850px) 40vw, 18vw" /></div>
        <span className="absolute top-[8%] right-[7%] text-[11px] font-bold leading-none tracking-[2px] text-white [writing-mode:vertical-rl] max-[850px]:right-[8%]">LUMA<br />FORM</span>
      </div>
      <div className="absolute right-0 bottom-0 left-0 [z-index:3] flex min-h-9 items-center justify-around overflow-hidden bg-[#d6ff5c] text-[10px] font-bold uppercase tracking-[.7px] text-[#1b2708] whitespace-nowrap"><span>Made for your every day</span><i className="size-[5px] shrink-0 rounded-full bg-[#1b2708]" /> <span>Made for your every day</span><i className="size-[5px] shrink-0 rounded-full bg-[#1b2708]" /> <span className="max-[850px]:hidden">Made for your every day</span></div>
    </section>
  );
}
