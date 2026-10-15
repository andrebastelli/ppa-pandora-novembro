import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    RDStationForms?: new (id: string, ua: string) => { createForm: () => void };
  }
}

const FORM_ID = "ppa-2026-591c2d899a5f536bef03";
const SCRIPT_SRC = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

export function RDForm() {
  const mounted = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    // Safety check: ensure document and window are available (though useEffect covers this)
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const init = () => {
      try {
        if (window.RDStationForms) {
          new window.RDStationForms(FORM_ID, "UA-104096068-1").createForm();
        } else {
          console.warn("RDStationForms not found after script load");
        }
      } catch (err) {
        console.error("Error initializing RD Station form:", err);
        setError("Erro ao carregar o formulário.");
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if (window.RDStationForms) {
        init();
      } else {
        existing.addEventListener('load', init);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load RD Station script");
      setError("Erro ao carregar o script do formulário.");
    };
    script.onload = init;
    document.body.appendChild(script);

    return () => {
      // Optional cleanup if needed, though RD script usually manages itself
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 text-center text-sm text-destructive bg-destructive/10 rounded-lg">
        {error} <br />
        <a href="#contato" onClick={() => window.location.reload()} className="underline font-bold">Tente atualizar a página</a>
      </div>
    );
  }

  return <div className="rd-form-wrapper" role="main" id={FORM_ID} />;
}
