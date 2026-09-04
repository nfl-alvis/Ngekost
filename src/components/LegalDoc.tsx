export type LegalSection = {
  heading: string;
  body: string;
  list?: string[];
};

/**
 * Render isi dokumen legal (S&K / Privasi) dari locale keys, dikirim sebagai props
 * oleh server page. Struktur: heading + body + optional bullet list.
 */
export default function LegalDoc({ sections }: { sections: LegalSection[] }) {
  return (
    <article className="flex flex-col gap-8">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="text-lg font-medium tracking-tight text-nk-text">{s.heading}</h2>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-nk-text/90">{s.body}</p>
          {s.list && (
            <ul className="mt-3 flex max-w-[70ch] flex-col gap-1.5">
              {s.list.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-nk-text-muted">
                  <span className="mt-[9px] size-1 shrink-0 rounded-full bg-nk-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
