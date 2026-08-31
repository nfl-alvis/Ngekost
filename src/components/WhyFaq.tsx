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
          <AccordionTrigger className="gap-3">
            <span className="text-xs tabular-nums text-nk-text-muted">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <span className="tracking-tight text-nk-text">
              {t(`items.${i}.q`)}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-7">
            <p>{t(`items.${i}.a`)}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
