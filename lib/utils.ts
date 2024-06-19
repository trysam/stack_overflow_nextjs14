import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  num: number | string,
  precision: number = 1
): string | number {
  const numberValue = typeof num === "string" ? parseFloat(num) : num;

  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
  ];

  const found = map.find((x) => Math.abs(numberValue) >= x.threshold);
  if (found) {
    const formatted =
      (numberValue / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}

export function getTimestamp(dateCreated: Date): string {
  const now = new Date();
  const date = new Date(dateCreated);
  const diffInMs = now.getTime() - date.getTime();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30; // Approximating a month as 30 days
  const msPerYear = msPerDay * 365;

  if (diffInMs < msPerMinute) {
    const seconds = Math.round(diffInMs / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (diffInMs < msPerHour) {
    const minutes = Math.round(diffInMs / msPerMinute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffInMs < msPerDay) {
    const hours = Math.round(diffInMs / msPerHour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffInMs < msPerMonth) {
    const days = Math.round(diffInMs / msPerDay);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diffInMs < msPerYear) {
    const months = Math.round(diffInMs / msPerMonth);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.round(diffInMs / msPerYear);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}
