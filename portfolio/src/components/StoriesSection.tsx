import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface Story {
  title: string;
  year: string;
  description: string;
  link: string;
}

interface StoriesSectionProps {
  heading?: string;
  subheading?: string;
  stories: Story[];
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  heading = "Selected Stories & Essays",
  subheading = "Short fiction and standalone pieces, free to read.",
  stories,
}) => {
  return (
    <section
      id="stories"
      className="border-t border-stone-200/80 py-16 sm:py-20"
    >
      <div className="mb-10">
        <h2 className="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-1.5 text-base text-stone-600 sm:text-lg">
          {subheading}
        </p>
      </div>

      <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
        {stories.map((story) => (
          <a
            key={story.title}
            href={story.link}
            className="group grid grid-cols-1 items-center gap-2 px-3 py-6 transition-colors hover:bg-stone-200/40 md:grid-cols-12 md:gap-6"
          >
            <div className="md:col-span-4">
              <span className="block text-xs font-bold text-amber-700">
                {story.year}
              </span>
              <h3 className="mt-0.5 font-serif text-xl font-normal text-stone-900 group-hover:text-amber-800">
                {story.title}
              </h3>
            </div>

            <p className="text-base leading-relaxed text-stone-600 md:col-span-6 sm:text-[1.08rem]">
              {story.description}
            </p>

            <div className="mt-2 flex items-center gap-1 text-base font-medium text-stone-900 md:col-span-2 md:mt-0 md:justify-end">
              <span>Read</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
