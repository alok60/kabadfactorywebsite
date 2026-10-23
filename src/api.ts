import { siteConfig } from "./config";

type ApiOptions = RequestInit & { token?: string | null };

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);

  const response = await fetch(`${siteConfig.apiBaseUrl}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === "object" && data && "message" in data ? String(data.message) : "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data as T;
}

export type Category = {
  id: number;
  name: string;
  slug?: string;
  category?: string;
  unit: string;
  price: number | string;
  iconUrl?: string;
  imageUrl?: string;
  description?: string;
};

export type Session = {
  token: string;
  user: {
    id: number;
    role: string;
    name: string;
    mobile: string;
    email?: string | null;
  };
};
