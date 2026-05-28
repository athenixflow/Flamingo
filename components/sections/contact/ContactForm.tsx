"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { INQUIRY_OPTIONS, type InquiryType } from "@/content/contact";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const params = useSearchParams();
  const initial = (params.get("type") as InquiryType) || "consumer";
  const [type, setType] = useState<InquiryType>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fromQuery = params.get("type") as InquiryType;
    if (fromQuery && INQUIRY_OPTIONS.find((o) => o.id === fromQuery)) {
      setType(fromQuery);
    }
  }, [params]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      type,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      country: String(data.get("country") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Unable to send. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unable to send.");
    }
  };

  return (
    <GlassCard className="p-8 sm:p-10">
      <span className="text-eyebrow text-flamingo-titanium">
        Inquiry Type
      </span>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {INQUIRY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setType(opt.id)}
            aria-pressed={type === opt.id}
            className={cn(
              "rounded-2xl border px-4 py-4 text-left transition-all no-tap-highlight",
              type === opt.id
                ? "border-flamingo-pink/60 bg-flamingo-pink/[0.08]"
                : "border-flamingo-titanium/15 hover:border-flamingo-titanium/35",
            )}
          >
            <div className="display text-xs uppercase tracking-ultra text-flamingo-soft">
              {opt.label}
            </div>
            <div className="mt-2 text-xs text-flamingo-titanium">
              {opt.description}
            </div>
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Country" name="country" required />
          <Field
            label={type === "consumer" ? "Vehicle (optional)" : "Company"}
            name="company"
            required={type !== "consumer"}
          />
        </div>
        <Field
          label="Message"
          name="message"
          required
          multiline
          placeholder={
            type === "oem"
              ? "Brief on the chemistry, MOQ, target market, and timeline..."
              : type === "distributor"
                ? "Region, channel, target volume, and contact preference..."
                : "What product, what surface, what question?"
          }
        />

        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-xs text-flamingo-titanium">
            We respond to inquiries within 2 business days.
          </p>
          <Button type="submit" magnetic={false} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Inquiry"}
          </Button>
        </div>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-flamingo-pink/40 bg-flamingo-pink/10 p-4 text-sm text-flamingo-soft"
            >
              Thank you. Your inquiry is in the queue — we&rsquo;ll be in touch.
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </GlassCard>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
}

function Field({
  label,
  name,
  type = "text",
  required,
  multiline,
  placeholder,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="display text-[10px] uppercase tracking-ultra text-flamingo-titanium">
        {label}
        {required && <span className="ml-1 text-flamingo-pink">*</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className="rounded-2xl border border-flamingo-titanium/15 bg-flamingo-obsidian/50 px-4 py-3 text-sm text-flamingo-soft outline-none transition-colors placeholder:text-flamingo-titanium/60 focus:border-flamingo-pink/60"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="rounded-2xl border border-flamingo-titanium/15 bg-flamingo-obsidian/50 px-4 py-3 text-sm text-flamingo-soft outline-none transition-colors placeholder:text-flamingo-titanium/60 focus:border-flamingo-pink/60"
        />
      )}
    </label>
  );
}
