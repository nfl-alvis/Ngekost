"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter as useI18nRouter } from "@/i18n/navigation";
import GoogleButton from "@/components/GoogleButton";
import { useSession } from "@/components/SessionProvider";
import { ADMIN_PROFILE } from "@/lib/data/entities";

export default function AdminLoginPage() {
  const t = useTranslations("admin.login");
  const i18nRouter = useI18nRouter();
  const { login } = useSession();
  const [error, setError] = useState(false);

  const attemptLogin = () => {
    login(ADMIN_PROFILE);
    i18nRouter.push("/admin/verification");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-lg border border-nk-border bg-nk-surface p-8">
        <div className="text-center">
          <span className="inline-block rounded-full border border-nk-border bg-nk-warm px-3 py-1 text-xs font-medium text-nk-text-muted">
            {t("badge")}
          </span>
          <h1 className="mt-4 text-2xl font-medium tracking-tight text-nk-text">{t("title")}</h1>
        </div>

        <GoogleButton label={t("google")} onClick={attemptLogin} className="mt-8" />

        {error && (
          <p className="mt-4 rounded-md border border-[#EBC4C0] bg-[#FAEAE8] p-3 text-center text-xs text-[#9C3B32]">
            {t("error")}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-nk-text-muted">{t("demo")}</p>
      </div>
    </div>
  );
}
