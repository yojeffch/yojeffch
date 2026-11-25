/** Brazil helpers for Cap. 1 biodata controls (pt-BR). */

export const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

export const UF_LIST = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export type UfCode = (typeof UF_LIST)[number];

/** Popular UF chips shown first for teens. */
export const POPULAR_UF: UfCode[] = [
  "SP",
  "RJ",
  "MG",
  "BA",
  "RS",
  "PR",
  "PE",
  "CE",
  "DF",
  "SC",
];

export const SCHOOL_YEAR_OPTIONS = [
  "6º ano EF",
  "7º ano EF",
  "8º ano EF",
  "9º ano EF",
  "1º ano EM",
  "2º ano EM",
  "3º ano EM",
  "Já concluí o ensino médio",
  "Outro",
] as const;

export function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

export function parseIsoDate(value: string | null | undefined): {
  day: number;
  month: number;
  year: number;
} | null {
  if (!value) return null;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (iso) {
    return {
      year: Number(iso[1]),
      month: Number(iso[2]),
      day: Number(iso[3]),
    };
  }
  const br = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  if (br) {
    return {
      day: Number(br[1]),
      month: Number(br[2]),
      year: Number(br[3]),
    };
  }
  return null;
}

export function toIsoDate(day: number, month: number, year: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatDatePtBr(isoOrBr: string | null | undefined): string {
  const parsed = parseIsoDate(isoOrBr ?? null);
  if (!parsed) return "";
  return `${String(parsed.day).padStart(2, "0")}/${String(parsed.month).padStart(2, "0")}/${parsed.year}`;
}

export function ageFromIsoDate(iso: string, today = new Date()): number | null {
  const parsed = parseIsoDate(iso);
  if (!parsed) return null;
  const birth = new Date(parsed.year, parsed.month - 1, parsed.day);
  if (Number.isNaN(birth.getTime())) return null;
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
  if (age < 0 || age > 120) return null;
  return age;
}

export function parsePlace(value: string | null | undefined): {
  city: string;
  uf: string;
} {
  if (!value) return { city: "", uf: "" };
  const trimmed = value.trim();
  const dash = /^(.+?)\s*[-–—]\s*([A-Za-z]{2})$/.exec(trimmed);
  if (dash) return { city: dash[1].trim(), uf: dash[2].toUpperCase() };
  const comma = /^(.+?)\s*,\s*([A-Za-z]{2})$/.exec(trimmed);
  if (comma) return { city: comma[1].trim(), uf: comma[2].toUpperCase() };
  return { city: trimmed, uf: "" };
}

export function formatPlace(city: string, uf: string): string {
  const c = city.trim();
  const u = uf.trim().toUpperCase();
  if (c && u) return `${c} - ${u}`;
  if (c) return c;
  if (u) return u;
  return "";
}
