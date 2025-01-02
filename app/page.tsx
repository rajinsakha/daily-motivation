"use client";

import { useEffect, useState } from "react";
import { getCurrentDayOfWeek } from "@/lib/utils";
import quotesData from "@/constants/data.json";
import { Quote } from "@/types/data";
import QuoteSkeleton from "@/components/quote-skeleton";
import { motion } from "framer-motion";
import { Share2, Copy, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { toast } from "sonner";
// import { Progress } from "@/components/ui/progress"

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchQuote = () => {
      setIsLoading(true);
      try {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const dayOfYear =
          Math.floor(
            (currentDate.getTime() - startOfYear.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1;

        // Set progress
        setProgress((dayOfYear / 365) * 100);

        const dailyQuote = quotesData.quotes.find(
          (q: Quote) => q.day === dayOfYear
        );

        if (dailyQuote) {
          setQuote(dailyQuote);
        } else {
          setQuote({
            day: dayOfYear,
            quote: "Stay motivated and have a great day!",
            author: "DailyMotive",
          });
        }
      } catch (err) {
        setError("Failed to fetch the quote. Please try again later.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  const copyToClipboard = async () => {
    if (quote) {
      try {
        await navigator.clipboard.writeText(
          `"${quote.quote}" - ${quote.author}`
        );
        toast.success("Quote copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy quote");
        throw err;
      }
    }
  };

  const shareQuote = async () => {
    if (quote) {
      try {
        await navigator.share({
          title: "DailyMotive Quote",
          text: `"${quote.quote}" - ${quote.author}`,
          url: window.location.href,
        });
      } catch (err) {
        toast.error("Failed to share quote");
        throw err;
      }
    }
  };

  return (
    <main className="min-h-screen p-8 sm:p-12 md:p-16 lg:p-20 text-white bg-gradient-to-b from-zinc-900 to-zinc-800">
      <div className="fixed top-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl text-center font-medium">
          DailyMotive: {getCurrentDayOfWeek()}&apos;s Inspiration
        </h2>
        <p className="text-sm text-center text-zinc-400 mt-2">
          Your daily dose of motivation
        </p>
        <div className="max-w-xl mx-auto mt-4">
          {/* <Progress value={progress} className="h-1" /> */}
          <p className="text-xs text-center text-zinc-400 mt-1">
            Day {Math.floor((progress * 365) / 100)} of 365
          </p>
        </div>
      </div>

      <section className="flex flex-col items-center justify-center min-h-[50vh] text-white">
        {isLoading ? (
          <QuoteSkeleton />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl space-y-4"
          >
            <h1 className="text-2xl leading-[1.4] sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold uppercase text-white">
              {quote?.quote}
            </h1>
            <p className="text-right text-lg sm:text-xl">- {quote?.author}</p>

            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                className="rounded-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="secondary"
                onClick={shareQuote}
                className="rounded-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
