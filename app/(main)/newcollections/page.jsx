import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const edits = [
  { image: "/model1.jpeg", title: "Soft structure", text: "Easy layers that move from morning to late plans." },
  { image: "/model4.jpeg", title: "Modern classics", text: "Clean lines, familiar shapes and considered details." },
  { image: "/model5.jpeg", title: "After hours", text: "A bolder point of view for every invitation." },
];

export default function NewCollectionsPage() {
  return <main className="min-h-[calc(100vh-68px)] bg-[#f6f5f0] font-sans text-[#1b1b1a] dark:bg-zinc-950 dark:text-zinc-100">
    <section className="grid min-h-[570px] grid-cols-2 max-[800px]:min-h-0 max-[800px]:grid-cols-1">
      <div className="flex flex-col items-start justify-center bg-[#d9d7cf] p-[clamp(55px,9vw,128px)] dark:bg-zinc-900 max-[800px]:px-[25px] max-[800px]:py-[65px]"><p className="mb-[13px] flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1.3px] text-[#778a48]">Collection 01 / Spring 2026</p><h1 className="m-0 text-[clamp(43px,5vw,75px)] font-medium leading-[.91] max-[480px]:text-[45px]">New forms<br />for right now.</h1><p className="my-[23px] mb-7 max-w-[335px] text-sm leading-[1.6] text-[#575650] dark:text-zinc-300">Pieces with room for everyday life, designed to be reached for again and again.</p><Link href="/shop" className="inline-flex items-center gap-[9px] bg-[#171717] px-4 py-[13px] text-[11px] font-bold text-white no-underline">Shop the edit <ArrowRight size={16} /></Link></div>
      <div className="relative min-h-[380px] overflow-hidden max-[800px]:min-h-[430px]"><Image className="object-cover object-top" src="/model6.jpeg" alt="New collection fashion look" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
    </section>
    <section className="mx-auto max-w-[1240px] px-[30px] py-[85px] max-[800px]:px-5 max-[800px]:py-[58px]"><div className="mb-[31px] flex items-end justify-between gap-5 max-[800px]:items-start"><div><p className="mb-[13px] text-[10px] font-bold uppercase tracking-[1.3px] text-[#778a48]">Choose your mood</p><h2 className="m-0 text-[clamp(28px,3.4vw,48px)] font-medium">The new collection</h2></div></div><div className="grid grid-cols-3 gap-[18px] max-[800px]:gap-[11px] max-[480px]:grid-cols-1 max-[480px]:gap-7">{edits.map((edit, index) => <article key={edit.title}><div className="relative aspect-[.78] overflow-hidden bg-[#d8d5cc] max-[480px]:aspect-square"><Image className="object-cover object-top transition-transform duration-[350ms] hover:scale-[1.035]" src={edit.image} alt={edit.title} fill sizes="(max-width: 700px) 100vw, 33vw" /><span className="absolute top-[13px] left-[13px] z-1 grid size-[27px] place-items-center rounded-full bg-[#d6ff5c] text-[9px] font-bold text-[#1c270a]">0{index + 1}</span></div><h3 className="my-[14px] mb-[6px] text-[15px]">{edit.title}</h3><p className="m-0 text-xs leading-[1.5] text-[#6a6962]">{edit.text}</p><Link className="mt-[14px] inline-flex items-center gap-[7px] text-[11px] font-bold text-[#1d1d1c] no-underline dark:text-zinc-200" href="/shop">Discover <ArrowRight size={14} /></Link></article>)}</div></section>
  </main>;
}
