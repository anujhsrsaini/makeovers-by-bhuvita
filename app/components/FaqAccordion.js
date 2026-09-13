"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const qId = `faq-question-${idx}`;
        const aId = `faq-answer-${idx}`;
        const questionText = faq.question || faq.q;
        const answerText = faq.answer || faq.a;

        return (
          <div
            key={idx}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-[#8B6F47]/40 bg-white shadow-sm'
                : 'border-gray-200/80 bg-white/70 hover:bg-white hover:border-[#8B6F47]/25'
            }`}
          >
            <h3>
              <button
                type="button"
                id={qId}
                aria-expanded={isOpen}
                aria-controls={aId}
                onClick={() => toggleFaq(idx)}
                className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6F47]"
              >
                <span className="font-playfair text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                  {questionText}
                </span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? 'bg-[#8B6F47] text-white rotate-180' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={aId}
              role="region"
              aria-labelledby={qId}
              className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
                isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
              }`}
            >
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">
                {answerText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
