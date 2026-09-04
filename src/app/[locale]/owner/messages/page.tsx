"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "@/components/DashboardShell";
import { conversations, messageTemplates } from "@/lib/data/entities";
import { cn } from "@/lib/utils";

export default function OwnerMessagesPage() {
  const t = useTranslations("owner.messages");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [threads, setThreads] = useState(conversations);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const active = threads.find((c) => c.id === activeId) ?? null;

  const filtered = threads.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(search.toLowerCase()))
  );

  const send = () => {
    if (!draft.trim() || !active) return;
    setThreads((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              unread: 0,
              messages: [
                ...c.messages,
                {
                  id: `m-${c.id}-${c.messages.length + 1}`,
                  from: "owner" as const,
                  text: draft,
                  at: new Date().toISOString(),
                  channel: c.channel,
                },
              ],
            }
          : c
      )
    );
    setDraft("");
  };

  return (
    <DashboardShell role="owner">
      <div className="mb-6 flex items-center gap-3">
        {active && (
          <button
            type="button"
            onClick={() => {
              setActiveId(null);
              setTemplatesOpen(false);
            }}
            aria-label={t("back")}
            className="rounded-md border border-nk-border p-2 text-nk-text transition-colors hover:bg-nk-warm lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        <h1 className="text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>
      </div>

      <div className="grid h-[calc(100vh-16rem)] min-h-96 grid-cols-1 overflow-hidden rounded-lg border border-nk-border bg-nk-surface lg:grid-cols-[320px_1fr]">
        {/* list percakapan */}
        <div className={cn("flex min-h-0 flex-col", active && "hidden lg:flex")}>
          <div className="border-b border-nk-border p-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="w-full rounded-md border border-nk-border bg-nk-bg px-3 py-2 text-sm text-nk-text outline-none placeholder:text-nk-text-muted focus:border-nk-accent"
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-nk-border p-3.5 text-left transition-colors hover:bg-nk-warm/60",
                  activeId === c.id && "bg-nk-warm"
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-nk-warm text-sm font-medium text-nk-text">
                  {c.name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-nk-text">{c.name}</span>
                    <span className="shrink-0 text-[10px] text-nk-text-muted">
                      {new Date(c.messages[c.messages.length - 1]?.at ?? "").toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-2">
                    <span className="truncate text-xs text-nk-text-muted">
                      {c.messages[c.messages.length - 1]?.text}
                    </span>
                    {c.unread > 0 && (
                      <span className="shrink-0 rounded-full bg-nk-accent px-1.5 py-0.5 text-[10px] font-medium text-nk-text-inverse">
                        {c.unread}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* thread */}
        {active ? (
          <div className={cn("flex min-h-0 flex-col", !active && "hidden lg:flex")}>
            {/* header thread */}
            <div className="flex items-center justify-between gap-3 border-b border-nk-border p-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-nk-warm text-sm font-medium text-nk-text">
                  {active.name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-nk-text">{active.name}</span>
                  <span className="block truncate text-xs text-nk-text-muted">
                    {t(active.telegramConnected ? "telegram" : "noTelegram")}
                  </span>
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                    active.telegramConnected
                      ? "border-[#BFDCC5] bg-[#E9F4EC] text-[#2F6B3C]"
                      : "border-nk-border bg-nk-section text-nk-text-muted"
                  )}
                >
                  {active.channel === "telegram" ? t("telegram") : t("email")}
                </span>
              </div>
            </div>

            {/* pesan */}
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {active.messages.map((m) => (
                <div key={m.id} className={cn("flex", m.from === "owner" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3.5 py-2.5 text-sm",
                      m.from === "owner"
                        ? "bg-nk-accent text-nk-text-inverse"
                        : "border border-nk-border bg-nk-bg text-nk-text"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <p
                      className={cn(
                        "mt-1 text-[10px]",
                        m.from === "owner" ? "text-nk-text-inverse/60" : "text-nk-text-muted"
                      )}
                    >
                      {new Date(m.at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* composer */}
            <div className="border-t border-nk-border p-3">
              {templatesOpen && (
                <div className="mb-2 flex flex-col gap-1 rounded-md border border-nk-border bg-nk-bg p-1.5">
                  {messageTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => {
                        setDraft(tpl.body);
                        setTemplatesOpen(false);
                      }}
                      className="rounded px-2.5 py-2 text-left text-xs text-nk-text transition-colors hover:bg-nk-warm"
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => setTemplatesOpen((v) => !v)}
                  aria-label={t("useTemplate")}
                  className={cn(
                    "shrink-0 rounded-md border border-nk-border p-2.5 text-nk-text transition-colors hover:bg-nk-warm",
                    templatesOpen && "bg-nk-warm"
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </button>
                <textarea
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder={t("typeMessage")}
                  className="max-h-32 min-h-[42px] flex-1 resize-none rounded-md border border-nk-border bg-nk-bg px-3 py-2.5 text-sm text-nk-text outline-none placeholder:text-nk-text-muted focus:border-nk-accent"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!draft.trim()}
                  className="shrink-0 rounded-md bg-nk-accent px-4 py-2.5 text-sm font-medium text-nk-text-inverse transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  {t("send")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden items-center justify-center border-l border-nk-border text-sm text-nk-text-muted lg:flex">
            {t("empty")}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
