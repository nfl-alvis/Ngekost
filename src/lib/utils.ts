export function formatIDR(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type ClassValue =
  | string
  | false
  | null
  | undefined
  // Base UI passes className as a function of state (e.g. (state) => state.open ? 'x' : 'y')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((state: any) => string | undefined);

export function cn(...classes: Array<ClassValue>): string {
  return classes
    .filter(Boolean)
    .map((c) => (typeof c === "function" ? (c as (s: unknown) => string | undefined)({}) ?? "" : c))
    .filter(Boolean)
    .join(" ");
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${m} m`;
  return `${(m / 1000).toFixed(1)} km`;
}
