import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Monitor, School, Phone, MapPin, ArrowLeft } from "lucide-react";
import { eventConfig } from "@/lib/event-config";
import { Reveal } from "@/components/motion";
import { AddToCalendar } from "@/components/AddToCalendar";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Inscrição confirmada | Portas Abertas .pandora" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Obrigado,
});

function Obrigado() {
  const cfg = eventConfig;

  return (
    <div className="flex min-h-screen flex-col bg-[#081037] text-white">
      {/* TOP BAR */}
      <div className="bg-[#FF7626] py-3 text-center shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <img
            src="https://ppamedio.pandoraeducacional.com.br/__l5e/assets-v1/f14aca42-86f4-46dc-9d5e-2fa63c1c38ad/logo-pandora.png"
            alt="Logo .pandora"
            className="h-10 w-auto"
          />
        </div>
      </div>

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_15%_20%,var(--brand-blue-mid),transparent_45%),radial-gradient(circle_at_85%_80%,var(--brand-orange),transparent_40%)]" />

        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          <Reveal>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange shadow-glow">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <span className="mt-8 block text-sm font-extrabold uppercase tracking-[0.25em] text-brand-orange">
              Inscrição confirmada
            </span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
              Sua vaga no Portas Abertas está garantida!
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Obrigado pelo interesse no {cfg.school.shortName}. Em breve nossa equipe entra em contato com todos os
              detalhes do encontro que você escolheu.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2">
            {cfg.event.formats.map((f, i) => (
              <Reveal key={f.type} delay={150 + i * 120}>
                <div className="flex h-full flex-col rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-brand-orange">
                    {f.type === "Online" ? <Monitor className="h-5 w-5" /> : <School className="h-5 w-5" />}
                    {f.type}
                  </div>
                  <p className="mt-2 text-2xl font-extrabold">
                    {f.weekday}, {f.date} · {f.time}
                  </p>
                  {f.type === "Online" ? (
                    <p className="mt-2 text-sm text-white/70">Ao vivo, de onde você estiver.</p>
                  ) : (
                    <p className="mt-2 flex items-start gap-1.5 text-sm text-white/70">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {cfg.school.address}
                    </p>
                  )}
                  <AddToCalendar
                    event={{
                      title: `Portas Abertas ${cfg.school.shortName}, ${f.type.toLowerCase()} (Fundamental II)`,
                      description:
                        f.type === "Online"
                          ? `Portas Abertas online do ${cfg.school.shortName}, Ensino Fundamental II. A equipe do ${cfg.school.shortName} envia as informações de acesso. Dúvidas: WhatsApp ${cfg.school.whatsappLabel}.`
                          : `Portas Abertas presencial do ${cfg.school.shortName}, Ensino Fundamental II. Dúvidas: WhatsApp ${cfg.school.whatsappLabel}.`,
                      location: f.type === "Online" ? "Online" : `${cfg.school.name}, ${cfg.school.address}`,
                      startUtc: f.startUtc,
                      endUtc: f.endUtc,
                      uid: `ppa-${f.type.toLowerCase()}-${f.startUtc}@pandoraeducacional.com.br`,
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/${cfg.school.whatsapp}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-card transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" /> Falar no WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar para a página
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="relative border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {cfg.school.shortName} educacional · {cfg.school.address}
      </footer>
    </div>
  );
}
