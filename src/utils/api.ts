export function getApiUrl() {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL_BROWSER ?? "http://localhost:3333";
  } else {
    return process.env.NEXT_PUBLIC_API_URL_INTERNAL ?? "http://backend:3333";
  }
}
