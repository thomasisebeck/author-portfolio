import React, { useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface Story {
  title: string;
  year: string;
  description: string;
  link: string;
}

export interface Poem {
  title: string;
  year: string;
  genre: string;
  shaped?: boolean;
  lines: string[];
}

interface StoriesSectionProps {
  heading?: string;
  subheading?: string;
  stories: Story[];
  poems?: Poem[];
}

export const POEMS: Poem[] = [
  {
    title: "To This Day",
    year: "2026",
    genre: "Concrete & Visual",
    shaped: true,
    lines: [
      "to this day ",

      "You're the reason i care to look ",

      "left                  and                   right ",

      "before i cross the street ",

      "",
      "whenever               ",
      "      i wanted                                                                                      ",
      "                to fall                                                                                          to my veins",
      "                     from this world                                                            the pulse",
      "                              You'd catch me                                          and return ",
      "                                             right before i struck the ground  ",
      "",
      "You were a goddess",
      "of passion and fire ",
      "that cared neither for heaven ",

      "                                         nor",
      "                                         hell",
      "but the fact that You were the reason",
      "i would smile ",
      "on the days i felt ",
      "i would shatter ",
      "with any touch",

      "other than Your fingertips ",
      "brushing     a   c   r   o   s   s     my cheek ",
      "",
      "                              yet the day",
      "                              You chose to go",
      "                              my heart ",
      "",
      "                         b",
      "                                     u",

      "                 r",

      "                                         s",

      "                             t",
      "",
      "              with the colours of everything you ever told me ",
      "                                                                       which made me believe i was ok ",
      "",

      "give me a reason i am worthy of love",
    ],
  },
  {
    title: "Alone",
    year: "2026",
    genre: "Elegy & Solitude",
    lines: [
      "Black cobble stone",
      "Wandering alone",
      "Clouds paint the sky",
      "The land is ash and bone",
      "",
      "Is it the sun or the moon",
      "Suspended in endless twilight",
      "At what point does the warmth of day",

      "Make way for the coolness of night",
      "",
      "Silence like a heavy veil",
      "Voices of spirits turned mute",
      "Yet the ravens still call my name:",
      "Angels with wings of soot",
      "",
      "It's been some time",
      "Since I said goodbye",
      "I neither know how to smile",
      "Nor remember how to cry",
      "",
      "No troubles, no trials",
      "Not an end in sight",
      "Just the next hollow step",
      "Into the ever-fading light",
    ],
  },

  {
    title: "I Wish It Was Me",

    year: "2026",
    genre: "Elegy & Solitude",
    lines: [
      "i told you i'd be there",
      "till the very end",
      "did i not",
      "",
      "who would have guessed",
      "that you'd appear to me",

      "on a day so grim",
      "a husk... a shell of who you once were",
      "with the flame within burning dim",
      "",
      "i wish it was me",
      "with the drum in my chest slowing",
      "the spark in my eye fading",
      "the surrounding darkness growing",
      "",

      "what difference does it make to you",
      "to cross the threshold from day to night",
      "it is me who's left staring",

      "at your soul take flight",
      "",
      "If it was me",
      "Would you feel the fading of the day",
      "The endless expanse",
      "Of red and black and grey",
      "",
      "In that instant",

      "I had already known",
      "That your heart would turn to ash",
      "Your breath to stillness",
      "Your body to flesh and bone",
      "",
      "Is there a difference",
      "Between you and I",
      "You are dead throughout",
      "And I am dead within",
    ],
  },
  {
    title: "If We Meet Again",

    year: "2026",
    genre: "Love & Longing",
    lines: [
      "The girl with the hummingbird heart",
      "Became the name you would be known by",
      "Because when you took to the track",
      "It was as though you could fly",

      "",
      "It was clear to me",
      "When I first drew you in",
      "It was the night I performed a piece I composed",
      "On my baroque violin",
      "",

      "You ran up on stage",
      "With tears in your eyes",

      "And vowed to stay by my side",
      "So long as the stars lit the skies",
      "",
      "I was tentative at first",
      "To cross that line",
      "And somehow afraid",
      "To hold your hand in mine",
      "",
      "Though as time passed on",

      "So did my initial doubt",
      "And you became that",

      "Which I could no longer do without",
      "",

      "On Sundays I'd go out",
      "To watch you train beneath the evening sun",
      "Enamoured by each stride",
      "In your graceful run",
      "",
      "I composed a piece",

      "For your ears alone",
      "And our mutual admiration bloomed",
      "From the seeds which you had sewn",
      "",

      "It was not until that fateful day",

      "Where, once again with tears in your eyes, you came to me",

      "Though this time, it was to break your vow",
      "To say that you had to leave",
      "",
      "And in that moment",
      "You wished for us not to drift apart",
      "I left the words on my lips unsaid:",
      "Had you known right from the start?",
      "",
      "I thought the music I played",
      "Would grant me solace",
      "But what would the point",
      "If not to bring a smile upon your face",
      "",
      "We would write letters at first",
      "As though nothing had changed",
      "Yet the moon cannot remain full forever—",
      "And so too did our exchanges wane",
      "",
      "Perhaps, I thought",
      "It would be better to just let you be",
      "Because in the final letter you wrote",
      "You said you had given up running",
      "Because it had done nothing",
      "But remind you of me",
      "",

      "So if we meet again my dear",
      "To grant your wish when we did part",
      "I will have forgotten how to play the strings",

      "And you will no longer be known",
      "As the girl with the hummingbird heart",
    ],
  },
  {
    title: "Luminous",

    year: "2026",
    genre: "Love & Longing",
    lines: [
      "I felt there was no way to tell you",
      "On the day you jumped into a lake",
      "Of sapphire blue",
      "Wearing all your clothes",
      "That no jewel was of greater value",
      "Than the smile upon your face",
      "",
      "And I could not describe to you",
      "On the night we gathered around the fire",
      "Sitting shoulder to shoulder",

      "That the warmth in my chest",
      "Glowing crimson red",
      "Was not ascribed to the flames",
      "But your company instead",

      "",
      "I was too afraid to take the hand",
      "You brushed gently against my fingers",
      "So instead you pointed out the way the dew",
      "Collected on the pine trees",
      "Sparkling emerald green",
      "",
      "I could not say back then",
      "When you stood against the luminous sky at dusk",
      "Arms stretched out in awe",
      "That no hues were of greater splendour",
      "Than the iridescent fragments of your child-like soul",

      "",
      "And only when night falls",
      "Knowing that you rest under a sky of different constellations",
      "I wondered why I ever found the stars beautiful",
      "When they only ever glowed white",

      "And it is only now that I realise",
      "Where all the colours have gone",
    ],
  },

  {
    title: "Cartography",
    year: "2026",
    genre: "Love & Longing",
    lines: [
      "Counting the knots run through my hand",

      "Trimming the sails to the breeze",
      "Searching for patterns in the sand",

      "Following constellations across the seas",
      "",
      "Though the days do feel the same",
      "I close my eyes",
      "And still I hear",
      "The north wind call your name",
      "Yet still I fear",
      "The prospect I may not reclaim",
      "The space inside your heart held dear",

      "",
      "And though wealth and riches are nigh",
      "When each day fades to black",
      "I can't help but ask the stars:",
      "Is it too late to turn back?",

      "",
      "Without you near, I've gone astray",

      "And I've been searching since that day",
      "Across the ocean, to try and find",
      "The life with you I left behind",
    ],
  },
  {
    title: "Cavity",

    year: "2026",
    genre: "Love & Longing",
    lines: [
      "The gentleness of your words",
      "Makes flowers ascend",
      "From the cavities in my chest",
      "Which I believed would never mend",
      "",
      "The parts of me I left behind:",
      "On days I could not bear the sting",
      "Linger deep within the frost",
      "Awaiting the piercing rays of spring",
      "",
      "Though what if spring does not come",
      "And my essence remains cold",
      "The day will arrive",
      "When my heart will grow old",
      "",
      "Perhaps there is no need to wait",
      "No reason to despair",
      "But instead use that same frozen",
      "Just to show that I care",
    ],
  },
];

const WritingTab = {
  Stories: "stories",
  Poetry: "poetry",
} as const;

type WritingTab = (typeof WritingTab)[keyof typeof WritingTab];

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  heading = "Selected Writing",
  subheading = "Short fiction, essays, and verse, free to read.",
  stories,
  poems = POEMS,
}) => {
  const [activeTab, setActiveTab] = useState<WritingTab>(WritingTab.Stories);
  const [poemIndex, setPoemIndex] = useState(0);

  // Group poems by genre and order each group by year (newest first)
  const groupedPoems = useMemo(() => {
    const groups = new Map<string, { poem: Poem; index: number }[]>();

    poems.forEach((poem, index) => {
      const existing = groups.get(poem.genre) ?? [];
      existing.push({ poem, index });
      groups.set(poem.genre, existing);
    });

    for (const entries of groups.values()) {
      entries.sort((a, b) => Number(b.poem.year) - Number(a.poem.year));
    }

    return Array.from(groups.entries());
  }, [poems]);

  // Flat ordered sequence matching the sidebar so Next/Previous follows the index order
  const orderedIndices = useMemo(
    () => groupedPoems.flatMap(([, entries]) => entries.map((e) => e.index)),
    [groupedPoems],
  );

  const currentOrderedPos = Math.max(0, orderedIndices.indexOf(poemIndex));

  const handlePrevPoem = () => {
    const prevPos =
      currentOrderedPos === 0
        ? orderedIndices.length - 1
        : currentOrderedPos - 1;
    setPoemIndex(orderedIndices[prevPos]);
  };

  const handleNextPoem = () => {
    const nextPos =
      currentOrderedPos === orderedIndices.length - 1
        ? 0
        : currentOrderedPos + 1;
    setPoemIndex(orderedIndices[nextPos]);
  };

  const currentPoem = poems[poemIndex];

  return (
    <section id="stories" className="py-16 sm:py-20">
      {/* Section Header + Tabs */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-1.5 text-base text-stone-600 sm:text-lg">
            {subheading}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          role="tablist"
          aria-label="Writing categories"
          className="inline-flex self-start rounded-lg border border-stone-200/90 bg-stone-100/80 p-1 sm:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === WritingTab.Stories}
            onClick={() => setActiveTab(WritingTab.Stories)}
            className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === WritingTab.Stories
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
              }`}
          >
            Short Stories
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === WritingTab.Poetry}
            onClick={() => setActiveTab(WritingTab.Poetry)}
            className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === WritingTab.Poetry
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
              }`}
          >
            Poetry
          </button>
        </div>
      </div>

      {/* Tab 1: Short Stories List */}
      {activeTab === WritingTab.Stories && (
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
      )}

      {/* Tab 2: Genre Index Sidebar + Poetry Carousel */}
      {activeTab === WritingTab.Poetry && currentPoem && (
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {/* Left Selection Bar Grouped by Genre */}
          <aside
            aria-label="Poems by genre"
            className="rounded-xl border border-stone-200/90 bg-white/60 p-6 md:col-span-3"
          >
            <div className="space-y-6">
              {groupedPoems.map(([genre, entries]) => (
                <div key={genre}>
                  <h3 className="mb-2.5 border-b border-stone-200/80 pb-1.5 text-xs font-bold tracking-[0.14em] text-amber-700 uppercase">
                    {genre}
                  </h3>
                  <ul className="space-y-1">
                    {entries.map(({ poem, index }) => {
                      const isSelected = index === poemIndex;
                      return (
                        <li key={poem.title}>
                          <button
                            type="button"
                            onClick={() => setPoemIndex(index)}
                            className={`flex w-full cursor-pointer items-baseline justify-between gap-3 rounded-md px-2.5 py-2 text-left transition-colors ${isSelected
                              ? "bg-stone-900 text-white"
                              : "text-stone-700 hover:bg-stone-200/60 hover:text-stone-950"
                              }`}
                          >
                            <span className="font-serif text-base font-normal">
                              {poem.title}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Right Carousel Reader */}
          <div className="rounded-xl border border-stone-200/90 bg-white/80 p-6 shadow-xs sm:p-10 md:col-span-9">
            <div className={currentPoem.shaped ? "w-full" : "mx-auto max-w-xl"}>
              <div className="mb-6 flex items-center justify-between border-b border-stone-200/70 pb-4">
                <div>
                  <span className="block text-xs font-bold tracking-wider text-amber-700">
                    {currentPoem.genre} &middot; {currentPoem.year}
                  </span>
                  <h3 className="mt-0.5 font-serif text-2xl font-normal text-stone-900">
                    {currentPoem.title}
                  </h3>
                </div>
                <span className="text-sm text-stone-400">
                  {currentOrderedPos + 1} / {orderedIndices.length}
                </span>
              </div>

              {/* Poem Body: Shaped Monospace Box vs Standard Serif Stanzas */}
              {currentPoem.shaped ? (
                <div className="overflow-x-auto rounded-lg border border-stone-200/80 bg-[#fbf9f5] p-5 sm:p-7">
                  <pre className="min-w-max font-mono text-[11px] leading-[1.65] text-stone-800 sm:text-xs md:text-[13px]">
                    {currentPoem.lines.join("\n")}
                  </pre>
                </div>
              ) : (
                <div className="min-h-[220px] space-y-1.5 font-serif text-lg leading-relaxed text-stone-700 sm:text-[1.2rem]">
                  {currentPoem.lines.map((line, idx) =>
                    line === "" ? (
                      <div key={idx} className="h-4" aria-hidden="true" />
                    ) : (
                      <p key={idx}>{line}</p>
                    ),
                  )}
                </div>
              )}

              {/* Carousel Controls */}
              <div className="mt-10 flex items-center justify-between border-t border-stone-200/70 pt-6">
                <button
                  type="button"
                  onClick={handlePrevPoem}
                  aria-label="Previous poem"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-950"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center gap-2">
                  {orderedIndices.map((idx) => (
                    <button
                      key={poems[idx].title}
                      type="button"
                      onClick={() => setPoemIndex(idx)}
                      aria-label={`Read ${poems[idx].title}`}
                      className={`h-2 cursor-pointer rounded-full transition-all ${idx === poemIndex
                        ? "w-6 bg-amber-700"
                        : "w-2 bg-stone-300 hover:bg-stone-400"
                        }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextPoem}
                  aria-label="Next poem"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-950"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
