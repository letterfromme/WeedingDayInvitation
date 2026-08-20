export const event = {
  title: "MAJLIS PERKHAWINAN",
  tagline: "SyitheonefrKhalib",
  coupleShort: { bride: "Asyikin", groom: "Khalib" },
  coupleFull: {
    bride: "CHE ZAMIERA ASYIKIN BIN CHE ZAAZANY",
    groom: "AHMAD KHALIB BIN AHMAD ZAKARNO",
  },
  hosts: [
    { father: "CHE ZAAZANY BIN CHE YAHYA", mother: "SURIATI BINTI CHE SU" },
    { father: "CHE HUSAIN B. MUSA(WOK)", mother: "MEKDAH BINTI IBRAHIM" },
  ],
  date: {
    iso: "2026-10-17",
    displayMs: "Sabtu, 17 Oktober 2026",
    displayEn: "Saturday, 17 October 2026",
    monthEn: "OCTOBER",
    monthMs: "OKTOBER",
    weekdayEn: "SATURDAY",
    weekdayMs: "SABTU",
    day: "17",
  },
  time: {
    reception: "12 tengahari – 5 petang",
    arrival: "12 tengahari",
    startHour: 12,
    endHour: 17,
  },
  venue: {
    name: "Kampung Bukit Abal",
    address: "KAMPUNG BUKIT ABAL, 16800 PASIR PUTEH, KELANTAN",
    lat: 5.866169,
    lng: 102.337044,
    maps: "https://maps.google.com/?q=5.866169,102.337044",
    waze: "https://waze.com/ul?ll=5.866169%2C102.337044&navigate=yes",
  },
  contacts: [
    { name: "Wok Husain", phone: "60103313583" },
    { name: "Aza", phone: "60199079894" },
    { name: "Yati", phone: "60139468506" },
  ],
  copy: {
    greeting: "Assalamualaikum & salam sejahtera, kami",
    bersama: "Bersama",
    inviteMs:
      "Dengan segala hormatnya kami menjemput Dato’/Datin, Tuan/Puan, Encik/Cik ke majlis walimatulurus puteri dan putera kami.",
    inviteEn:
      "We would be honoured by your presence as we celebrate the wedding of our beloved children.",
    closingMs:
      "Semoga kehadiran anda memeriahkan lagi majlis kami. Kehadiran anda amat bermakna.",
  },
} as const;

export function kepadaLine(name: string) {
  return `Kepada ${name}, dengan penuh kasih`;
}

export function qrUrl(data: string, size = 180) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

export function calendarUrl() {
  const start = "20261017T040000Z";
  const end = "20261017T090000Z";
  const text = encodeURIComponent(
    `Majlis Perkahwinan ${event.coupleShort.bride} & ${event.coupleShort.groom}`,
  );
  const location = encodeURIComponent(event.venue.address);
  const details = encodeURIComponent(
    `Jamuan ${event.time.reception}. Ketibaan pengantin ${event.time.arrival}.`,
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${location}&details=${details}`;
}

export function waLink(phone: string) {
  return `https://wa.me/${phone}`;
}

export function telLink(phone: string) {
  return `tel:+${phone}`;
}
