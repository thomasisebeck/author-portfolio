import React from "react";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { BookCard } from "./BookCard";

interface NovelHeroProps {
  eyebrow?: string;
  title: string;
  author: string;
  coverUrl?: string;
  blurbParagraphs: string[];
  buyLink?: string;
  excerptLink?: string;
}

export const NovelHero: React.FC<NovelHeroProps> = ({
  eyebrow = "Debut Novel",
  title,
  author,
  coverUrl = "/cover",
  blurbParagraphs,
  buyLink = "#buy",
  excerptLink = "#excerpt",
}) => {
  return (
    <section
      id="novel"
      className="grid grid-cols-1 items-center gap-12 py-14 md:grid-cols-12 md:gap-10 md:py-20"
    >
      {/* Left Column: Blurb & Actions */}
      <div className="order-2 text-center md:order-1 md:col-span-7 md:text-left">
        <span className="mb-3 inline-block text-xs font-bold tracking-[0.16em] text-amber-700 uppercase">
          {eyebrow}
        </span>
        <h1 className="mb-6 font-serif text-4xl leading-[1.12] font-normal tracking-tight text-stone-900 sm:text-5xl">
          {title}
        </h1>

        {blurbParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className="mx-auto mb-5 max-w-xl text-lg leading-relaxed text-stone-600 last:mb-0 sm:text-[1.2rem] md:mx-0"
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <a
            href={buyLink}
            className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-amber-700"
          >
            Get the Book <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={excerptLink}
            className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-6 py-3 text-base font-medium text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-950"
          >
            <BookOpen className="h-4 w-4" /> Read Chapter One
          </a>
        </div>
      </div>

      {/* Right Column: 3D Interactive Book */}
      <div className="order-1 flex flex-col items-center md:order-2 md:col-span-5">
        <BookCard coverUrl={coverUrl} title={title} author={author} />
        <span className="mt-1 text-sm tracking-wide text-stone-400">
          Drag to rotate 360°
        </span>
      </div>
    </section>
  );
};
