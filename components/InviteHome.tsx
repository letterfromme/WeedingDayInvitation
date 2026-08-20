"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Cover } from "@/components/Cover";
import { Countdown } from "@/components/Countdown";
import { FloralFrame } from "@/components/FloralFrame";
import { GoldFlourish } from "@/components/GoldFlourish";
import { RsvpForm } from "@/components/RsvpForm";
import { WishForm } from "@/components/WishWall";
import { cldAudio, cldPhoto, LAYERS } from "@/lib/cloudinary";
import { calendarUrl, event, qrUrl, telLink, waLink } from "@/lib/content";

const fade = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export function InviteHome() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const to = useSearchParams().get("to")?.trim();

  function startMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.play().catch(() => {});
  }

  function onOpen() {
    setOpen(true);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
    if (!audio.muted && audio.paused) {
      audio.play().catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src={cldAudio(LAYERS.song)} loop preload="auto" />
      <AnimatePresence>
        {open ? null : (
          <Cover key="cover" to={to} onOpen={onOpen} onStartMusic={startMusic} />
        )}
      </AnimatePresence>

      {open ? (
        <button
          type="button"
          onClick={toggleMute}
          className="mute-pill"
          aria-pressed={muted}
        >
          {muted ? "Senyap" : "Muzik"}
        </button>
      ) : null}

      <main className="mx-auto max-w-lg px-4 pb-28 pt-10">
        <FloralFrame>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <h1 className="type-hero font-script text-[3.5rem] leading-[0.92] sm:text-[3.8rem]">
              {event.coupleShort.bride}
            </h1>
            <p className="font-script my-0.5 text-3xl leading-none text-[var(--gold)]">&amp;</p>
            <GoldFlourish className="-mt-0.5 mb-1" />
            <h1 className="type-hero font-script text-[3.5rem] leading-[0.92] sm:text-[3.8rem]">
              {event.coupleShort.groom}
            </h1>
            <div className="mx-auto mt-4 w-full max-w-[14.5rem]">
              <div className="gold-line mb-3" />
              <p className="font-display text-[10px] tracking-[0.35em] text-[var(--gold)]">
                {event.date.monthEn}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2.5 font-display text-[9px] tracking-[0.12em] text-[var(--ink)]">
                <span>{event.date.weekdayEn}</span>
                <span className="text-4xl font-semibold tracking-normal text-[var(--burgundy)]">
                  {event.date.day}
                </span>
                <span>12 PM</span>
              </div>
              <div className="gold-line mt-3" />
              <p className="mt-3 font-display text-[9px] tracking-[0.18em] text-[var(--gold)]">
                #{event.tagline}
              </p>
            </div>
          </motion.div>
        </FloralFrame>

        <Section title="Jemputan">
          <p>{event.copy.greeting}</p>
          {to ? (
            <p className="mt-3 italic text-[var(--burgundy)]">
              Ya {to}, kami menjemput anda ke majlis kami.
            </p>
          ) : null}
          {event.hosts.map((host, index) => (
            <div key={host.father}>
              {index > 0 ? (
                <p className="mt-7 font-display text-[11px] tracking-[0.32em] text-[var(--gold)]">
                  {event.copy.bersama}
                </p>
              ) : null}
              <div className={index === 0 ? "mt-8" : "mt-4"}>
                <p className="font-display text-sm tracking-[0.08em] text-[var(--ink)]">
                  {host.father}
                </p>
                <p className="font-script text-xl text-[var(--gold)]">&amp;</p>
                <p className="font-display text-sm tracking-[0.08em] text-[var(--ink)]">
                  {host.mother}
                </p>
              </div>
            </div>
          ))}
          <p className="mt-8">{event.copy.inviteMs}</p>
          <p className="mt-2 text-[0.95rem] italic text-[var(--ink)]/70">
            {event.copy.inviteEn}
          </p>
          <div className="mt-9">
            <p className="type-hero font-script text-4xl">{event.coupleShort.bride}</p>
            <p className="my-1 text-[var(--gold)]">&amp;</p>
            <p className="type-hero font-script text-4xl">{event.coupleShort.groom}</p>
            <p className="mt-4 text-sm tracking-wide text-[var(--ink)]/70">
              {event.coupleFull.bride}
              <br />
              {event.coupleFull.groom}
            </p>
            <p className="mt-6 font-display text-[11px] tracking-[0.22em] text-[var(--gold)]">
              #{event.tagline}
            </p>
          </div>
        </Section>

        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16"
        >
          <p className="section-title text-center">Kenangan</p>
          <div className="section-ornament" />
          <div className="photo-duet">
            <figure className="photo-duet-main">
              <img
                src={cldPhoto(LAYERS.bride2, "f_auto,q_auto,c_fill,g_auto,w_900,h_1200")}
                alt="Asyikin dan Khalib"
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="photo-duet-inset">
              <div className="film-strip">
                <img
                  src={cldPhoto(LAYERS.bride3, "f_auto,q_auto,c_fill,g_auto,w_800,h_600")}
                  alt="Inai dan cincin"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </figure>
            <p className="photo-duet-caption font-script">
              {event.coupleShort.bride} &amp; {event.coupleShort.groom}
            </p>
          </div>
        </motion.section>

        <Section title="Atur cara">
          <p className="font-display tracking-[0.12em] text-[var(--gold)]">
            {event.date.displayMs}
          </p>
          <p className="text-sm text-[var(--ink)]/70">{event.date.displayEn}</p>
          <p className="mt-5">{event.time.reception}</p>
        </Section>

        <Section title="Lokasi">
          <div className="surface rounded-2xl px-6 py-10">
            <p className="text-xl text-[var(--burgundy)]">{event.venue.name}</p>
            <p className="mt-1 text-[var(--ink)]/75">{event.venue.address}</p>
            <img
              src={qrUrl(event.venue.maps, 168)}
              alt="Kod QR lokasi majlis"
              className="mx-auto mt-6 h-[168px] w-[168px] bg-white p-2"
            />
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
          <div className="grid grid-cols-3 gap-4">
            {event.contacts.map((person) => (
              <div key={person.name} className="text-center">
                <p className="font-display text-[10px] tracking-[0.16em] text-[var(--gold)]">
                  {person.name}
                </p>
                <div className="mt-2 flex flex-col gap-1 text-sm">
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
        </Section>

        <Section title="Menghitung hari">
          <Countdown />
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="nav-btn mt-8 inline-flex w-full justify-center"
          >
            Tambah ke Google Calendar
          </a>
        </Section>

        <Section title="RSVP">
          <div className="surface rounded-2xl px-6 py-10">
            <RsvpForm />
          </div>
        </Section>

        <Section title="Ucapan">
          <div className="surface rounded-2xl px-6 py-10">
            <WishForm />
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
      <p className="section-title">{title}</p>
      <div className="section-ornament" />
      <div className="leading-relaxed">{children}</div>
    </motion.section>
  );
}
