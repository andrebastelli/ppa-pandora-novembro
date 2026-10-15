import { createFileRoute } from "@tanstack/react-router";
import { RDForm } from "@/components/RDForm";
import {
  Calendar,
  GraduationCap,
  Sparkles,
  Users,
  BookOpen,
  Trophy,
  MapPin,
  Monitor,
  School,
  Phone,
  CheckCircle2,
  Clock,
  Gift,
  ShieldCheck,
  Star,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { eventConfig } from "@/lib/event-config";
import { Reveal, CountUp } from "@/components/motion";
import { StickyCTA } from "@/components/StickyCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: eventConfig.meta.title },
      { name: "description", content: eventConfig.meta.description },
      { property: "og:title", content: eventConfig.meta.ogTitle },
      { property: "og:description", content: eventConfig.meta.ogDescription },
      { property: "og:image", content: "https://ppa.pandoraeducacional.com.br/logopndr.png" },
      { name: "twitter:image", content: "https://ppa.pandoraeducacional.com.br/logopndr.png" },
    ],
  }),
  component: Index,
});

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Users,
  Trophy,
  ShieldCheck,
  HeartHandshake,
  Gift,
};

function Index() {
  const cfg = eventConfig;

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      {/* TOP BAR */}
      <div className="bg-[#FF7626] py-3 text-center text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <img src="https://ppa.pandoraeducacional.com.br/logopndr.png" alt="Logo .pandora" className="h-10 w-auto brightness-0 invert" />
        </div>
      </div>

      {/* BANNER PROVISÓRIO (texto) */}
      <div className="relative w-full overflow-hidden bg-brand-blue-dark text-white">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_15%_30%,var(--brand-blue-mid),transparent_45%),radial-gradient(circle_at_85%_70%,var(--brand-orange),transparent_40%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-10 text-center sm:py-14">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-white/80 sm:text-sm">
            .pandora de portas abertas
          </span>
          <p className="text-3xl font-extrabold leading-tight sm:text-5xl">
            Matrículas Abertas <span className="text-brand-orange">Fundamental II</span>
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm font-bold sm:text-base">
            <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">11/11 · Online · 19h</span>
            <span className="rounded-full bg-brand-orange px-4 py-2">12/11 · Presencial · 19h</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="relative overflow-hidden bg-white text-brand-blue-dark">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#081037] px-4 py-1.5 text-sm font-semibold text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-orange" />
              </span>
              <Sparkles className="h-4 w-4" /> {cfg.hero.badge}
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {cfg.hero.title.map((line, i) => (
                <span
                  key={i}
                  className={
                    i === cfg.hero.title.length - 1
                      ? "mt-2 block text-brand-orange sm:text-4xl lg:text-5xl"
                      : "block text-brand-blue-dark"
                  }
                >
                  {line}
                </span>
              ))}
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <Pill icon={<Calendar className="h-4 w-4" />} label={cfg.event.date} />
              <Pill icon={<GraduationCap className="h-4 w-4" />} label={cfg.event.grades} />
              <Pill icon={<MapPin className="h-4 w-4" />} label={cfg.event.city} />
            </div>

            <p className="mt-8 max-w-xl text-lg text-brand-blue-dark/80 font-medium">{cfg.hero.description}</p>

            {/* ESCOLHA O FORMATO */}
            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
              {cfg.event.formats.map((f) => (
                <a
                  key={f.type}
                  href={`#${cfg.event.formAnchor}`}
                  className="group rounded-2xl border-2 border-brand-blue-mid/20 bg-white p-4 transition-colors hover:border-brand-orange"
                >
                  <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-brand-orange">
                    {f.type === "Online" ? <Monitor className="h-5 w-5" /> : <School className="h-5 w-5" />}
                    {f.type}
                  </div>
                  <p className="mt-1 text-2xl font-extrabold text-brand-blue-dark">
                    {f.date} <span className="text-base font-bold text-brand-blue-dark/70">· {f.time}</span>
                  </p>
                  <p className="text-xs font-semibold text-brand-blue-dark/60">{f.weekday}</p>
                </a>
              ))}
            </div>

            {/* EXCLUSIVO PRESENCIAL, destaque */}
            <div className="mt-6 max-w-xl rounded-2xl border-2 border-brand-blue-mid/20 bg-white/50 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-brand-blue-dark">
                <Gift className="h-5 w-5 text-brand-orange" />
                {cfg.hero.exclusivity.label}
              </div>
              <p className="mt-2 text-brand-blue-dark/90">{cfg.hero.exclusivity.text}</p>
            </div>

            <ul className="mt-6 grid gap-2 text-brand-blue-dark/90 sm:grid-cols-2">
              {cfg.event.benefits.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-orange" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* FORM CARD */}
          <div id="inscricao" className="relative scroll-mt-8">
            {/* Ribbon */}
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
              <div className="relative rounded-full bg-brand-dark px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-white shadow-glow animate-pulse-ring">
                🔥 Vagas Limitadas
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 pt-8 shadow-glow sm:p-8 sm:pt-10">
              <div className="mb-5 text-center">
                <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">Garanta sua vaga</h2>
                <p className="mt-1 text-sm text-muted-foreground">Inscrição gratuita · Escolha online (11/11) ou presencial (12/11)</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
                  <Sparkles className="h-3.5 w-3.5" /> Acesso às condições exclusivas do evento
                </div>
              </div>
              <RDForm />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Ao se inscrever você concorda em receber comunicações do {cfg.school.shortName}.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-white/20" />
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          <Stat value={cfg.school.years} label="anos de história" />
          <Stat value={String(cfg.school.units)} label="unidades" />
          <Stat value={cfg.school.families} label="famílias acompanhando" />
          <Stat value="100%" label="foco no aluno" />
        </div>
      </section>

      {/* PROPOSAL */}
      <section className="bg-gradient-soft py-16 sm:py-20">
        <Reveal className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">{cfg.proposal.label}</span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{cfg.proposal.title}</h2>
          <p className="mt-5 text-lg text-white/75">{cfg.proposal.text}</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {cfg.proposal.features.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <Reveal key={f.title} delay={i * 120}>
                  <Feature icon={Icon ? <Icon className="h-6 w-6" /> : null} title={f.title} text={f.text} />
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* VIDEO */}
      <section className="bg-white py-16 sm:py-20">
        <Reveal className="mx-auto max-w-5xl px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">{cfg.video.title}</h2>
            <p className="mt-3 text-muted-foreground">{cfg.video.subtitle}</p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-3xl shadow-card">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${cfg.video.youtubeId}`}
              title={cfg.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section className="bg-brand-dark py-16 text-white sm:py-20">
        <Reveal className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">{cfg.about.label}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{cfg.about.title}</h2>
            <p className="mt-5 text-white/80">{cfg.about.text}</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-[#081037] p-8 shadow-glow text-white">
            <h3 className="text-2xl font-extrabold">{cfg.about.ctaTitle}</h3>
            <p className="mt-2 text-white/90">{cfg.about.ctaText}</p>
            <a
              href={`#${cfg.event.formAnchor}`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-card transition-transform hover:-translate-y-0.5"
            >
              Quero minha vaga
            </a>
          </div>
        </Reveal>
      </section>

      {/* FORMATOS */}
      <section className="bg-white py-16 sm:py-20">
        <Reveal className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">Escolha como participar</span>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-dark sm:text-4xl">Online ou presencial: você decide</h2>
            <p className="mt-3 text-muted-foreground">O encontro é praticamente o mesmo nas duas datas. Escolha a que encaixa melhor na rotina da sua família.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {cfg.event.formats.map((f) => (
              <div key={f.type} className="flex flex-col rounded-3xl bg-gradient-soft p-8 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange text-white">
                  {f.type === "Online" ? <Monitor className="h-6 w-6" /> : <School className="h-6 w-6" />}
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-white">{f.type}</h3>
                <p className="mt-1 text-lg font-bold text-brand-orange">{f.weekday}, {f.date} · {f.time}</p>
                <p className="mt-3 flex-1 text-white/75">{f.text}</p>
                <a
                  href={`#${cfg.event.formAnchor}`}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-card transition-transform hover:-translate-y-0.5"
                >
                  Quero participar {f.type === "Online" ? "online" : "presencialmente"}
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* EVENT DETAILS */}
      <section className="bg-gradient-soft py-16 sm:py-20">
        <Reveal className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">O dia do evento</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Como vai funcionar o Portas Abertas</h2>
            <p className="mt-3 text-white/75">
              Um encontro pensado para você sentir, na prática, o que é estudar no {cfg.school.shortName}.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cfg.event.schedule.map((s, i) => (
              <Reveal key={s.time} delay={i * 120}>
                <Feature icon={<Clock className="h-6 w-6" />} title={`${s.time}, ${s.title}`} text={s.text} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16 sm:py-20">
        <Reveal className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">Quem já vive o .pandora</span>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-dark sm:text-4xl">Famílias que confiaram e recomendam</h2>
          </div>

          <div className="mt-8 relative max-w-lg mx-auto">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {cfg.testimonials.map((t) => (
                  <CarouselItem key={t.name} className="basis-full">
                    <div className="mx-auto rounded-3xl bg-[#081037] p-6 sm:p-8 shadow-sm min-h-[400px] flex flex-col justify-between">
                      <div>
                        <div className="mb-6 flex justify-center gap-1 text-brand-orange">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <p className="text-center text-base sm:text-lg italic text-white leading-relaxed font-medium">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="font-extrabold text-white text-lg">{t.name}</p>
                        <p className="text-sm text-white/70">{t.role}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8 lg:block">
                <CarouselPrevious className="static lg:absolute -left-16 top-1/2 lg:-translate-y-1/2 h-12 w-12 border-2 border-brand-orange/20 text-brand-orange hover:bg-brand-orange hover:text-white transition-all bg-white" />
                <CarouselNext className="static lg:absolute -right-16 top-1/2 lg:-translate-y-1/2 h-12 w-12 border-2 border-brand-orange/20 text-brand-orange hover:bg-brand-orange hover:text-white transition-all bg-white" />
              </div>
            </Carousel>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-soft py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">Perguntas frequentes</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Tire suas dúvidas</h2>
          </div>

          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {cfg.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border-0 bg-white px-5 shadow-card">
                <AccordionTrigger className="text-left text-base font-bold text-brand-dark hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* GUARANTEES */}
      <section className="bg-white py-12">
        <Reveal className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          {cfg.guarantees.map((g) => {
            const Icon = iconMap[g.icon];
            return <Guarantee key={g.title} icon={Icon ? <Icon className="h-5 w-5" /> : null} title={g.title} text={g.text} />;
          })}
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#081037] py-16 text-white sm:py-20">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Vagas limitadas, não deixe para depois</h2>
          <p className="mt-4 text-white/90">
            Reserve agora seu lugar no Portas Abertas e garanta as condições especiais de matrícula para {cfg.event.year}.
          </p>
          <a
            href={`#${cfg.event.formAnchor}`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-orange px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-card transition-transform hover:-translate-y-0.5"
          >
            Quero garantir minha vaga
          </a>
          <p className="mt-4 text-xs text-white/80">{cfg.event.fullDate}</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 text-center sm:grid-cols-2 sm:text-left">
          <div>
            <p className="text-lg font-extrabold text-brand-dark">{cfg.school.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{cfg.school.address}</p>
          </div>
          <div className="sm:text-right">
            <a
              href={`https://wa.me/${cfg.school.whatsapp}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
            >
              <Phone className="h-4 w-4" /> WhatsApp {cfg.school.whatsappLabel}
            </a>
            <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} {cfg.school.shortName} educacional</p>
          </div>
        </div>
      </footer>

      <StickyCTA targetId="inscricao" subtitle="Gratuito · Online 11/11 ou presencial 12/11 · 19h" />
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#081037] px-4 py-2 text-sm font-bold text-white">
      {icon} {label}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-brand-orange sm:text-4xl"><CountUp value={value} /></div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-left shadow-card">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-light text-white">{icon}</div>
      <h3 className="text-lg font-extrabold text-brand-dark">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Guarantee({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light text-white">{icon}</div>
      <div>
        <p className="font-extrabold text-brand-dark">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}