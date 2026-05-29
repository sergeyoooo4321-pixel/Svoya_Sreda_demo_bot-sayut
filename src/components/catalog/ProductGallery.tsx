"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColor = product.colors[activeIndex] || product.colors[0];

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <Image
          src={activeColor.image}
          alt={`${product.name}, цвет ${activeColor.name}`}
          fill
          sizes="(max-width: 900px) 100vw, 52vw"
          className="product-gallery-image"
          priority
          loading="eager"
        />
      </div>
      <div className="product-gallery-thumbs" aria-label="Варианты цвета">
        {product.colors.map((color, index) => (
          <button
            key={color.name}
            type="button"
            className={index === activeIndex ? "gallery-thumb gallery-thumb-active" : "gallery-thumb"}
            onClick={() => setActiveIndex(index)}
            aria-label={`Показать цвет ${color.name}`}
          >
            <Image src={color.image} alt="" fill sizes="96px" className="gallery-thumb-image" />
            <span style={{ backgroundColor: color.hex }} />
          </button>
        ))}
      </div>
      <p className="gallery-caption">Цвет: {activeColor.name}</p>
    </div>
  );
}
