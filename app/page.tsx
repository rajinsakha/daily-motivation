"use client";
import { useEffect, useState } from "react";
import quotesData from "../constants/data.json";
import { getCurrentDayOfWeek } from "@/lib/utils";
interface Quote {
  day: number;
  quote: string;
  author: string;
}

export default function Home() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    // Get the current day of the year
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const dayOfYear =
      Math.floor(
        (currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    // Find the quote for the current day
    const dailyQuote = quotesData.quotes.find(
      (q: Quote) => q.day === dayOfYear
    );

    if (dailyQuote) {
      setQuote(dailyQuote.quote);
      setAuthor(dailyQuote.author);
    } else {
      setQuote("Stay motivated and have a great day!");
    }
  }, []);

  return (
    <main className="h-screen p-8  sm:px-20 sm:py-12 text-white font-[family-name:var(--font-geist-sans)] bg-zinc-900">
      <div className="">
        <h2 className="text-xl text-center font-medium">
          {getCurrentDayOfWeek()} Motivation
        </h2>
      </div>
      <section className="flex flex-col items-center justify-center h-[75vh] text-white ">
        <div className="max-w-5xl space-y-4">
          <h1 className="text-2xl leading-[32px] sm:text-3xl sm:leading-[42px] md:text-4xl md:leading-[48px] lg:text-5xl lg:leading-[60px] text-center font-bold uppercase text-white">
            {quote}
          </h1>
          <p className="text-right">- {author}</p>
        </div>
      </section>
    </main>
  );
}
