"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WhyFaq() {
  const t = useTranslations("why.faq");

  return (
    <Accordion defaultValue={["0"]}>
      {[0, 1, 2, 3].map((i) => (
        <AccordionItem key={i} value={String(i)}>
          <AccordionTrigger className="text-left">
            {/* Single left group: number + question. The trigger uses
                justify-between, so this group hugs left and the chevron
                goes right. Splitting into two direct children would push
                the question toward the right edge. */}
            <span className="flex items-baseline gap-3 text-left">
              <span className="text-xs tabular-nums text-nk-ink-muted">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span className="tracking-tight text-nk-ink-fg">
                {t(`items.${i}.q`)}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-7 text-left">
            <p className="text-left">{t(`items.${i}.a`)}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
