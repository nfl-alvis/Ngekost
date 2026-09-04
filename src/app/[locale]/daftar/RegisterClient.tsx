"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import GoogleButton from "@/components/GoogleButton";

export default function RegisterClient() {
  return (
    <Suspense fallback={null}>
      <RegisterInner />
    </Suspense>
  );
}

function RegisterInner() {
  const t = useTranslations("daftar");
  const nav = useTranslations("nav");
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "owner" ? "owner" : "seeker";
  const [form, setForm] = useState({ name: "", email: "", wa: "", password: "", agree: false });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: k === "agree" ? e.target.checked : e.target.value }));

  const canSubmit =
    form.name.trim() !== "" &&
    /.+@.+\..+/.test(form.email) &&
    /^(\+62|0)8\d{7,12}$/.test(form.wa.replace(/[\s-]/g, "")) &&
    form.password.length >= 8 &&
    form.agree;

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-nk-bg px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label={nav("home")} className="inline-block">
            <Logo className="h-9 w-auto text-nk-accent" />
          </Link>
        </div>

        <div className="rounded-lg border border-nk-border bg-nk-surface p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-nk-accent/10 px-3 py-1 text-xs font-medium text-nk-accent">
              {role === "seeker" ? t("roleSeeker") : t("roleOwner")}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-light tracking-tight text-nk-text">{t("title")}</h1>
          <p className="mt-2 text-sm leading-relaxed text-nk-text-muted">{t("subtitle")}</p>

          {/* toggle role */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-nk-border bg-nk-warm p-1">
            <Link
              href="/daftar?role=seeker"
              className={`rounded-md px-3 py-2 text-center text-sm transition-colors ${
                role === "seeker"
                  ? "bg-nk-surface font-medium text-nk-text shadow-sm"
                  : "text-nk-text-muted hover:text-nk-text"
              }`}
            >
              {t("roleSeeker")}
            </Link>
            <Link
              href="/daftar?role=owner"
              className={`rounded-md px-3 py-2 text-center text-sm transition-colors ${
                role === "owner"
                  ? "bg-nk-surface font-medium text-nk-text shadow-sm"
                  : "text-nk-text-muted hover:text-nk-text"
              }`}
            >
              {t("roleOwner")}
            </Link>
          </div>

          <div className="mt-6">
            <GoogleButton label={t("google")} />
          </div>

          <div className="my-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-nk-border" />
            <span className="text-xs text-nk-text-muted">{t("or")}</span>
            <span className="h-px flex-1 bg-nk-border" />
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.alert("Auth stub — form submitted");
            }}
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-nk-text">{t("name")}</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={set("name")}
                placeholder={t("namePlaceholder")}
                className="h-11 rounded-lg border border-nk-border bg-nk-bg px-4 text-sm text-nk-text placeholder:text-nk-text-muted/60 focus:border-nk-accent focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-nk-text">{t("email")}</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                placeholder={t("emailPlaceholder")}
                className="h-11 rounded-lg border border-nk-border bg-nk-bg px-4 text-sm text-nk-text placeholder:text-nk-text-muted/60 focus:border-nk-accent focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-nk-text">{t("wa")}</span>
              <input
                type="tel"
                required
                value={form.wa}
                onChange={set("wa")}
                placeholder={t("waPlaceholder")}
                aria-describedby="wa-helper"
                className="h-11 rounded-lg border border-nk-border bg-nk-bg px-4 text-sm text-nk-text placeholder:text-nk-text-muted/60 focus:border-nk-accent focus:outline-none"
              />
              <span id="wa-helper" className="text-xs text-nk-text-muted">
                {t("waHelper")}
              </span>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-nk-text">{t("password")}</span>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={set("password")}
                placeholder={t("passwordPlaceholder")}
                aria-describedby="pw-helper"
                className="h-11 rounded-lg border border-nk-border bg-nk-bg px-4 text-sm text-nk-text placeholder:text-nk-text-muted/60 focus:border-nk-accent focus:outline-none"
              />
              <span id="pw-helper" className="text-xs text-nk-text-muted">
                {t("passwordHelper")}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-nk-text">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={set("agree")}
                className="mt-0.5 size-4 accent-[#3A2618]"
              />
              <span>
                {t("agree")}{" "}
                <Link href="/legal/syarat-ketentuan" className="text-nk-accent underline underline-offset-2">
                  {t("terms")}
                </Link>{" "}
                &amp;{" "}
                <Link href="/legal/privasi" className="text-nk-accent underline underline-offset-2">
                  {t("privacy")}
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-nk-accent px-6 text-sm font-medium text-nk-text-inverse transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("submit")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-nk-text-muted">
            {t("haveAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-nk-accent transition-colors hover:opacity-80"
            >
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
