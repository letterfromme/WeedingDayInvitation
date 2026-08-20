"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Cover } from "@/components/Cover";
import { Countdown } from "@/components/Countdown";
import { FloralFrame } from "@/components/FloralFrame";
import { RsvpForm } from "@/components/RsvpForm";
import { calendarUrl, event, telLink, waLink } from "@/lib/content";

const fade = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export function InviteHome() {
  const [open, setOpen] = useState(false);
  const to = useSearchParams().get("to")?.trim();

  return (
    <>
      <AnimatePresence>
        {open ? null : <Cover key="cover" onOpen={() => setOpen(true)} />}
      </AnimatePresence>
      <main className="mx-auto max-w-lg px-4 pb-28 pt-10">
        {to ? (
          <p className="mb-7 text-center font-display text-[11px] tracking-[0.28em] text-[var(--gold)]">
            Kepada: {to}
          </p>
        ) : null}

        <FloralFrame>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <p className="font-display text-[11px] tracking-[0.45em] text-[var(--gold)]">
              SAVE THE DATE
            </p>
            <h1 className="type-hero font-script mt-6 text-[3.5rem] leading-[0.92]">
              {event.coupleShort.bride}
            </h1>
            <p className="font-script my-2 text-3xl text-[var(--gold)]">&amp;</p>
            <h1 className="type-hero font-script text-[3.5rem] leading-[0.92]">
              {event.coupleShort.groom}
            </h1>
            <p className="mx-auto mt-6 max-w-[17rem] text-[0.95rem] leading-relaxed text-[var(--ink)]">
              We want to share happiness with our loved ones. Come and celebrate our wedding.
            </p>
            <div className="mx-auto mt-8 w-full max-w-[16rem]">
              <div className="gold-line mb-4" />
              <p className="font-display text-[11px] tracking-[0.35em] text-[var(--gold)]">
                {event.date.monthEn}
              </p>
              <div className="mt-3 flex items-center justify-center gap-3 font-display text-[11px] tracking-[0.12em] text-[var(--ink)]">
                <span>{event.date.weekdayEn}</span>
                <span className="text-5xl font-semibold tracking-normal text-[var(--burgundy)]">
                  {event.date.day}
                </span>
                <span>AT 12 PM</span>
              </div>
              <div className="gold-line mt-4" />
              <p className="mt-5 font-display text-[10px] tracking-[0.22em] text-[var(--ink)]/75">
                {event.venue.address.toUpperCase()}
              </p>
            </div>
          </motion.div>
        </FloralFrame>

        <Section title="Jemputan">
          <div className="surface rounded-2xl px-6 py-10">
            <p>{event.copy.greeting}</p>
            {to ? (
              <p className="mt-3 italic text-[var(--burgundy)]">
                Ya {to}, kami menjemput anda ke majlis kami.
              </p>
            ) : null}
            {event.hosts.map((host) => (
              <div key={host.father} className="mt-7">
                <p className="font-display text-sm tracking-[0.08em] text-[var(--ink)]">
                  {host.father}
                </p>
                <p className="font-script text-xl text-[var(--gold)]">&amp;</p>
                <p className="font-display text-sm tracking-[0.08em] text-[var(--ink)]">
                  {host.mother}
                </p>
              </div>
            ))}
            <p className="mt-7">{event.copy.inviteMs}</p>
            <p className="mt-2 text-[0.95rem] italic text-[var(--ink)]/70">
              {event.copy.inviteEn}
            </p>
            <div className="mt-9">
              <p className="type-hero font-script text-4xl">{event.coupleShort.bride}</p>
              <p className="my-1 text-[var(--gold)]">&amp;</p>
              <p className="type-hero font-script text-4xl">{event.coupleShort.groom}</p>
              <p className="mt-4 text-sm text-[var(--ink)]/70">
                {event.coupleFull.bride}
                <br />
                {event.coupleFull.groom}
              </p>
            </div>
          </div>
        </Section>

        <Section title="Atur cara">
          <div className="surface rounded-2xl px-6 py-10">
            <p className="font-display tracking-[0.12em] text-[var(--gold)]">
              {event.date.displayMs}
            </p>
            <p className="text-sm text-[var(--ink)]/70">{event.date.displayEn}</p>
            <p className="mt-5">Jamuan: {event.time.reception}</p>
            <p>Ketibaan pengantin: {event.time.arrival}</p>
          </div>
        </Section>

        <Section title="Lokasi">
          <div className="surface rounded-2xl px-6 py-10">
            <p className="text-xl text-[var(--burgundy)]">{event.venue.name}</p>
            <p className="text-[var(--ink)]/75">{event.venue.address}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a className="nav-btn" href={event.venue.maps} target="_blank" rel="noreferrer">
                Google Maps
              </a>
              <a className="nav-btn" href={event.venue.waze} target="_blank" rel="noreferrer">
                Waze
              </a>
            </div>
          </div>
        </Section>

        <Section title="Hubungi">
          <div className="surface rounded-2xl px-6 py-10">
            <div className="grid grid-cols-2 gap-6">
              {event.contacts.map((person) => (
                <div key={person.name} className="text-center">
                  <p className="font-display tracking-[0.2em] text-[var(--gold)]">
                    {person.name}
                  </p>
                  <div className="mt-2 flex justify-center gap-3 text-sm">
                    <a href={waLink(person.phone)} className="underline decoration-[var(--gold)]/50">
                      WhatsApp
                    </a>
                    <a href={telLink(person.phone)} className="underline decoration-[var(--gold)]/50">
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Menghitung hari">
          <div className="surface rounded-2xl px-6 py-10">
            <Countdown />
            <a
              href={calendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="nav-btn mt-6 inline-flex w-full justify-center"
            >
              Tambah ke Google Calendar
            </a>
          </div>
        </Section>

        <Section title="RSVP">
          <div className="surface rounded-2xl px-6 py-10">
            <RsvpForm />
          </div>
        </Section>

        <p className="mt-16 text-center text-sm text-[var(--ink)]/65">
          {event.copy.closingMs}
        </p>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-20 text-center"
    >
      <p className="font-display text-[11px] tracking-[0.42em] text-[var(--gold)]">
        {title.toUpperCase()}
      </p>
      <div className="gold-line mx-auto my-5 w-24" />
      <div className="leading-relaxed">{children}</div>
    </motion.section>
  );
}
