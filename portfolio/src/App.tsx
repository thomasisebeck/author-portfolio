import { Mail } from "lucide-react";
import { NovelHero } from "./components/NovelHero";
import { StoriesSection } from "./components/StoriesSection";
import type { Story } from "./components/StoriesSection";

const NOVEL_BLURB = [
  "Replace this with your official back-cover blurb. Set the central tension, introduce your protagonists, and leave the reader with the core question that drives the story forward.",
  "Whether read late at night or in a quiet afternoon corner, this novel asks what happens when the quiet truths we avoid finally demand an answer.",
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
  return (
    <div className="min-h-screen bg-[#fbf9f5] font-sans text-stone-900 antialiased selection:bg-amber-200/60">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Minimal Header */}
        <header className="flex items-center justify-between border-b border-stone-200/80 py-8">
          <span className="font-serif text-xl font-normal tracking-tight text-stone-900">
            Thomas Isebeck
          </span>
          <nav className="flex gap-7 text-base font-medium text-stone-600">
            <a href="#novel" className="transition-colors hover:text-stone-950">
              Novel
            </a>
            <a
              href="#stories"
              className="transition-colors hover:text-stone-950"
            >
              Stories
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-stone-950"
            >
              Contact
            </a>
          </nav>
        </header>

        <main>
          <NovelHero
            title="What’s Right With You?"
            author="Thomas Isebeck"
            coverUrl="/cover"
            blurbParagraphs={NOVEL_BLURB}
          />

          <StoriesSection stories={SHORT_WORKS} />
        </main>

        {/* Footer */}
        <footer
          id="contact"
          className="flex flex-col items-center justify-between gap-4 border-t border-stone-200/80 py-10 text-base text-stone-500 sm:flex-row"
        >
          <p>© {new Date().getFullYear()} Thomas Isebeck</p>
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
