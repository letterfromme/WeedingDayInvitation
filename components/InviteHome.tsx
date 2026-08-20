"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Cover } from "@/components/Cover";
import { Countdown } from "@/components/Countdown";
import { FloralFrame } from "@/components/FloralFrame";
import { RsvpForm } from "@/components/RsvpForm";
import { WishWall } from "@/components/WishWall";
import { calendarUrl, event, telLink, waLink } from "@/lib/content";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function InviteHome() {
  const [open, setOpen] = useState(false);
  const to = useSearchParams().get("to")?.trim();

  return (
    <>
      <AnimatePresence>
        {open ? null : <Cover key="cover" onOpen={() => setOpen(true)} />}
      </AnimatePresence>
      <main className="mx-auto max-w-lg px-4 pb-24 pt-8">
        {to ? (
          <p className="mb-6 text-center font-display text-[10px] tracking-[0.28em] text-[var(--gold)]">
            Kepada: {to}
          </p>
        ) : null}

        <FloralFrame>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="px-2"
          >
            <p className="font-display text-[10px] tracking-[0.45em] text-[var(--rose)]">
              SAVE THE DATE
            </p>
            <h1 className="font-script mt-5 text-[3.35rem] leading-[0.9] text-[var(--rose-deep)] drop-shadow-[0_1px_0_rgba(255,255,255,0.08)]">
              {event.coupleShort.bride}
            </h1>
            <p className="font-script my-1 text-3xl text-[var(--rose)]">&amp;</p>
            <h1 className="font-script text-[3.35rem] leading-[0.9] text-[var(--rose-deep)]">
              {event.coupleShort.groom}
            </h1>
            <p className="mx-auto mt-5 max-w-[16rem] text-sm leading-relaxed text-[var(--rose-deep)]/90">
              We want to share happiness with our loved ones. Come and celebrate our wedding.
            </p>
            <div className="mx-auto mt-6 w-full max-w-[15rem]">
              <div className="gold-line mb-3" />
              <p className="font-display text-[10px] tracking-[0.35em] text-[var(--rose)]">
                {event.date.monthEn}
              </p>
              <div className="mt-2 flex items-center justify-center gap-3 font-display text-[10px] tracking-[0.12em] text-[var(--rose-deep)]">
                <span>{event.date.weekdayEn}</span>
                <span className="text-4xl font-semibold tracking-normal">{event.date.day}</span>
                <span>AT 12 PM</span>
              </div>
              <div className="gold-line mt-3" />
              <p className="mt-4 font-display text-[9px] tracking-[0.22em] text-[var(--rose)]">
                {event.venue.address.toUpperCase()}
              </p>
            </div>
          </motion.div>
        </FloralFrame>

        <Section title="Jemputan">
          <p className="text-[var(--cream)]/70">{event.copy.greeting}</p>
          {to ? (
            <p className="mt-3 italic text-[var(--gold-soft)]">
              Ya {to}, kami menjemput anda ke majlis kami.
            </p>
          ) : null}
          {event.hosts.map((host) => (
            <div key={host.father} className="mt-6">
              <p className="font-display text-sm tracking-[0.08em] text-[var(--gold-soft)]">
                {host.father}
              </p>
              <p className="font-script text-xl text-[var(--rose)]">&amp;</p>
              <p className="font-display text-sm tracking-[0.08em] text-[var(--gold-soft)]">
                {host.mother}
              </p>
            </div>
          ))}
          <p className="mt-6 text-[var(--cream)]/75">{event.copy.inviteMs}</p>
          <p className="mt-2 text-sm italic text-[var(--cream)]/55">{event.copy.inviteEn}</p>
          <div className="mt-8">
            <p className="font-script text-4xl text-[var(--gold-soft)]">
              {event.coupleShort.bride}
            </p>
            <p className="my-1 text-[var(--rose)]">&amp;</p>
            <p className="font-script text-4xl text-[var(--gold-soft)]">
              {event.coupleShort.groom}
            </p>
            <p className="mt-4 text-sm text-[var(--cream)]/50">
              {event.coupleFull.bride}
              <br />
              {event.coupleFull.groom}
            </p>
          </div>
        </Section>

        <Section title="Atur cara">
          <p className="font-display tracking-[0.12em] text-[var(--gold)]">
            {event.date.displayMs}
          </p>
          <p className="text-sm text-[var(--cream)]/50">{event.date.displayEn}</p>
          <p className="mt-4">Jamuan: {event.time.reception}</p>
          <p>Ketibaan pengantin: {event.time.arrival}</p>
        </Section>

        <Section title="Lokasi">
          <p className="text-xl text-[var(--gold-soft)]">{event.venue.name}</p>
          <p className="text-[var(--cream)]/60">{event.venue.address}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a className="nav-btn" href={event.venue.maps} target="_blank" rel="noreferrer">
              Google Maps
            </a>
            <a className="nav-btn" href={event.venue.waze} target="_blank" rel="noreferrer">
              Waze
            </a>
          </div>
        </Section>

        <Section title="Hubungi">
          <div className="grid grid-cols-2 gap-4">
            {event.contacts.map((person) => (
              <div key={person.name} className="text-center">
                <p className="font-display tracking-[0.2em] text-[var(--gold)]">
                  {person.name}
                </p>
                <div className="mt-2 flex justify-center gap-3 text-sm">
                  <a href={waLink(person.phone)} className="underline decoration-[var(--gold)]/40">
                    WhatsApp
                  </a>
                  <a href={telLink(person.phone)} className="underline decoration-[var(--gold)]/40">
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Menghitung hari">
          <Countdown />
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="nav-btn mt-5 inline-flex w-full justify-center"
          >
            Tambah ke Google Calendar
          </a>
        </Section>

        <Section title="RSVP">
          <RsvpForm />
          <Link
            href="/kehadiran"
            className="mt-6 block text-center font-display text-[10px] tracking-[0.28em] text-[var(--gold)]"
          >
            LIHAT KEHADIRAN →
          </Link>
        </Section>

        <Section title="Ucapan">
          <WishWall />
        </Section>

        <p className="mt-16 text-center text-sm text-[var(--cream)]/50">
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
      viewport={{ once: true, amount: 0.25 }}
      className="mt-16 text-center"
    >
      <p className="font-display text-[11px] tracking-[0.42em] text-[var(--gold)]">
        {title.toUpperCase()}
      </p>
      <div className="gold-line mx-auto my-4 w-24" />
      <div className="text-base leading-relaxed">{children}</div>
    </motion.section>
  );
}
