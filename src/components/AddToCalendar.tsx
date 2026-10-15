import { CalendarPlus } from "lucide-react";

type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  /** Início e fim em UTC, formato YYYYMMDDTHHMMSSZ */
  startUtc: string;
  endUtc: string;
  uid: string;
};

function googleUrl(ev: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${ev.startUtc}/${ev.endUtc}`,
    details: ev.description,
    location: ev.location,
    ctz: "America/Sao_Paulo",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function downloadIcs(ev: CalendarEvent) {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//pandora//Portas Abertas//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ev.uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${ev.startUtc}`,
    `DTEND:${ev.endUtc}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    `DESCRIPTION:${escapeIcs(ev.description)}`,
    `LOCATION:${escapeIcs(ev.location)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(ev.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portas-abertas-pandora.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function AddToCalendar({ event }: { event: CalendarEvent }) {
  return (
    <div className="mt-5">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/60">
        <CalendarPlus className="h-4 w-4" /> Adicionar à agenda
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <a
          href={googleUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-white px-3 py-2.5 text-xs font-extrabold text-[#081037] transition-transform hover:-translate-y-0.5"
        >
          Google Agenda
        </a>
        <button
          type="button"
          onClick={() => downloadIcs(event)}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-3 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-white/10"
        >
          iPhone / Outlook
        </button>
      </div>
    </div>
  );
}
