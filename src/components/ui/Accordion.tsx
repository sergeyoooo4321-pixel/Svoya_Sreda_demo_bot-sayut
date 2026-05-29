"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type Item = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div className="accordion-item" key={item.question}>
          <button
            type="button"
            className="accordion-trigger"
            aria-expanded={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            <span>{item.question}</span>
            <ChevronDown className={clsx("accordion-icon", openIndex === index && "accordion-icon-open")} size={20} />
          </button>
          <div className={clsx("accordion-panel", openIndex === index && "accordion-panel-open")}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
