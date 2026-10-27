"use client";

import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../cart/CartContext";
import { products } from "./productData";
import { useState } from "react";
import ProductView from "./../../productView/ProductView"
import { ThemeToggleButton } from "../../../../components/ui/theme-toggle-button";
export default function HomeProducts() {
  const { addItem } = useCart();
  const [showProduct, setProduct] = useState(false)

  function viewProduct(productData) {
    console.log(productData);
  }
  return <section className="bg-[#f7f6f1] px-[max(28px,calc((100vw-1240px)/2))] py-[88px] font-sans text-[#191918] max-[1000px]:px-7 max-[1000px]:py-[70px] max-[680px]:px-[18px] max-[680px]:py-[54px] dark:bg-zinc-950 dark:text-zinc-100">
    <div className="mb-[31px] flex items-end justify-between gap-5 max-[680px]:items-start max-[680px]:flex-col max-[680px]:gap-[14px]">
      <div>
        <p className="mb-[10px] text-[10px] font-bold uppercase tracking-[1.3px] text-[#76884a]">Selected for now
        </p>
        <h2 className="m-0 text-[clamp(30px,4vw,52px)] font-medium">Everyday, elevated.
        </h2>
      </div>
      <Link className="inline-flex items-center gap-2 border-b border-[#1b1b19] pb-[3px] text-[11px] font-bold whitespace-nowrap text-[#1b1b19] no-underline max-[680px]:text-[10px]" href="/catalog">View the full catalog <ArrowRight size={15} />
      </Link>
    </div>
    <div className="grid grid-cols-4 gap-[17px] max-[1000px]:grid-cols-3 max-[680px]:grid-cols-2 max-[680px]:gap-x-[10px] max-[680px]:gap-y-[23px]">
      {products.map((product, index) =>
        <article className="group" key={product.id}
          onClick={(product) => viewProduct(product)}>
          <div className="relative aspect-[.75] overflow-hidden bg-[#dbd9d1]">
            <span className="absolute top-3 left-3 z-2 grid size-[27px] place-items-center rounded-full bg-[#d6ff5c] text-[9px] font-bold text-[#1d270d]">0{index + 1}</span>
            <button className="absolute top-[11px] right-[11px] z-2 grid size-8 place-items-center rounded-full border-0 bg-white/88 text-[#242420]" aria-label={`Save ${product.name}`}>
              <Heart size={17} />
            </button>
            <Image className="object-cover object-top transition-transform duration-350 group-hover:scale-[1.035]" src={product.image} alt={product.name} fill sizes="(max-width: 680px) 50vw, (max-width: 1000px) 33vw, 25vw" />
          </div>
          <div className="flex min-h-[65px] justify-between gap-[10px] px-px py-3 max-[680px]:min-h-[75px]">
            <div><p className="m-0 text-[10px] text-[#77766f]">{product.category}</p>
              <h3 className="my-[5px] text-xs">{product.name}</h3>
              <small className="text-[10px] text-[#77766f]">{product.color}</small>
            </div>
            <strong className="pt-[13px] text-xs whitespace-nowrap">${product.price}</strong>
          </div>
          <button className="flex min-h-[38px] w-full items-center justify-center gap-[7px] border border-[#292927] bg-transparent text-[11px] font-bold text-[#1d1d1b] transition-colors hover:bg-[#1d1d1b] hover:text-white" onClick={() => addItem(product)}><ShoppingBag size={16} /> Add to bag</button>
        </article>)}
    </div>
  </section>;
}
