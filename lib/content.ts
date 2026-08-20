export const event = {
  coupleShort: { bride: "Asyikin", groom: "Khalib" },
  coupleFull: {
    bride: "Che Zamiera Asyikin binti Che Zaazany",
    groom: "Ahmad Khalib bin Ahmad Zakarno",
  },
  hosts: [
    { father: "Che Zaazany bin Che Yahya", mother: "Suriati binti Che Su" },
    { father: "Che Husain b. Musa (Wok)", mother: "Mekdah binti Ibrahim" },
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
    reception: "12.00 PM – 5.00 PM",
    arrival: "12.00 PM",
    startHour: 12,
    endHour: 17,
  },
  venue: {
    name: "Kg Bukit Abal",
    address: "Kampung Bukit Abal",
    maps: "https://www.google.com/maps/search/?api=1&query=Kampung+Bukit+Abal",
    waze: "https://waze.com/ul?q=Kampung%20Bukit%20Abal&navigate=yes",
  },
  contacts: [
    { name: "Aza", phone: "60199079894" },
    { name: "Wok", phone: "60103313583" },
    { name: "Yati", phone: "60139468506" },
    { name: "Syikin", phone: "601123443035" },
  ],
  copy: {
    greeting: "Assalamualaikum & salam sejahtera",
    inviteMs:
      "Dengan segala hormatnya kami menjemput Dato’/Datin, Tuan/Puan, Encik/Cik ke majlis walimatulurus puteri dan putera kami.",
    inviteEn:
      "We would be honoured by your presence as we celebrate the wedding of our beloved children.",
    closingMs:
      "Semoga kehadiran anda memeriahkan lagi majlis kami. Kehadiran anda amat bermakna.",
  },
} as const;

export function calendarUrl() {
  const start = "20261017T040000Z";
  const end = "20261017T090000Z";
  const text = encodeURIComponent(
    `Walimatulurus ${event.coupleShort.bride} & ${event.coupleShort.groom}`,
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
