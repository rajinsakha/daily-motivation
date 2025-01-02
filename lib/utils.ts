import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDayOfWeek() {
  const currentDate = new Date(); // Get the current date
  const dayOfWeekIndex = currentDate.getDay(); // Get the day index (0 for Sunday, 6 for Saturday)
  
  // Array of day names corresponding to the day indexes
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Return the name of the current day of the week
  return daysOfWeek[dayOfWeekIndex];
}