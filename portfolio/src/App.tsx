import { useState } from "react";
import { Mail } from "lucide-react";
import { NovelHero } from "./components/NovelHero";
import { StoriesSection } from "./components/StoriesSection";
import type { Poem, Story } from "./components/StoriesSection";

const ActiveSection = {
  Novel: "novel",
  Stories: "stories",
} as const;

type ActiveSection = (typeof ActiveSection)[keyof typeof ActiveSection];

const NOVEL_INTRO =
  "Five years in the making, What's Right With You? is a psychological story about codependency, memory, and the quiet terror of being truly known. Spin the cover to inspect the jacket, read the opening chapter, or explore shorter fiction below.";

const NOVEL_BLURB = [
  "Most feel accomplished on their twenty-first birthday.\nI cried.",
  "When two shattered souls snap together like puzzle pieces, it's difficult to tell whether you're being fixed, or losing touch with your own identity.",
  "So when Lucinda, a young lady without a past, meets Samuel, a fellow who sees no future for himself, a deathly duo forms.",
  "But as their fates become intertwined, they discover the chilling truth behind the ties which bind them, and the double-edged sword of unwavering devotion.",
];

const SHORT_WORKS: Story[] = [
  {
    title: "Cartography",
    year: "2026",
    description:
      "Short fiction exploring memory, distance, and the quiet maps we draw between people.",
    link: "#cartography",
  },
  {
    title: "Apathy",
    year: "2026",
    description: "A meditation on stillness and modern detachment.",
    link: "#apathy",
  },
  {
    title: "The Shallows",
    year: "2020",
    description:
      "Early flash fiction examining what lingers just beneath the surface.",
    link: "#the-shallows",
  },
];

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(
    ActiveSection.Novel,
  );

  return (
    <div className="min-h-screen bg-[#fbf9f5] font-sans text-stone-900 antialiased selection:bg-amber-200/60">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Minimal Header */}
        <header className="flex items-center justify-between border-b border-stone-200/80 py-8">
          <button
            type="button"
            onClick={() => setActiveSection(ActiveSection.Novel)}
            className="cursor-pointer font-serif text-xl font-normal text-stone-900"
          >
            Thomas Isebeck
          </button>
          <nav className="flex gap-7 text-base font-medium text-stone-600">
            <button
              type="button"
              onClick={() => setActiveSection(ActiveSection.Novel)}
              className={`cursor-pointer transition-colors hover:text-stone-950 ${activeSection === ActiveSection.Novel
                ? "text-stone-950 underline decoration-amber-700 underline-offset-8"
                : ""
                }`}
            >
              Novel
            </button>
            <button
              type="button"
              onClick={() => setActiveSection(ActiveSection.Stories)}
              className={`cursor-pointer transition-colors hover:text-stone-950 ${activeSection === ActiveSection.Stories
                ? "text-stone-950 underline decoration-amber-700 underline-offset-8"
                : ""
                }`}
            >
              Stories
            </button>
            <a
              href="#contact"
              className="transition-colors hover:text-stone-950"
            >
              Contact
            </a>
          </nav>
        </header>

        <main>
          {activeSection === ActiveSection.Novel && (
            <NovelHero
              title="What's Right With You?"
              author="Thomas Isebeck"
              coverUrl="/cover"
              intro={NOVEL_INTRO}
              blurbParagraphs={NOVEL_BLURB}
            />
          )}

          {activeSection === ActiveSection.Stories && (
            <StoriesSection stories={SHORT_WORKS} />
          )}
        </main>

        {/* Footer */}
        <footer
          id="contact"
          className="flex flex-col items-center justify-between gap-4 border-t border-stone-200/80 py-10 text-base text-stone-500 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Thomas Isebeck</p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 font-medium text-stone-800 transition-colors hover:text-amber-700"
          >
            <Mail className="h-4 w-4" /> Get in touch
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
