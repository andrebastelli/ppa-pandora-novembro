import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

/**
 * Barra fixa no rodapé do celular com o botão de inscrição.
 * Aparece depois que a pessoa rola a página e some quando o formulário está visível.
 */
export function StickyCTA({ targetId, subtitle }: { targetId: string; subtitle: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById(targetId);
    let obs: IntersectionObserver | undefined;
    if (target && typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.2 });
      obs.observe(target);
    } else {
      setFormVisible(false);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, [targetId]);

  const show = scrolled && !formVisible;

  const goToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#081037]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.4)] backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a
        href={`#${targetId}`}
        onClick={goToForm}
        tabIndex={show ? 0 : -1}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-card active:scale-[0.98]"
      >
        Faça sua inscrição <ArrowDown className="h-4 w-4" />
      </a>
      <p className="mt-1.5 text-center text-[11px] font-medium text-white/70">{subtitle}</p>
    </div>
  );
}
