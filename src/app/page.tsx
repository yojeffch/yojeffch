import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <section className="relative flex flex-1 flex-col justify-end overflow-hidden px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_color-mix(in_srgb,#F9BF3D_18%,transparent)_0%,_transparent_50%),linear-gradient(180deg,_#f4f0ea_0%,_#ebe4d8_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-xl space-y-8">
          <div className="space-y-4">
            <p className="font-display text-sm tracking-[0.14em] text-olive uppercase">
              Kit de orientação profissional
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-charcoal sm:text-6xl">
              Mapa da Clareza
            </h1>
            <p className="max-w-md text-lg text-charcoal/80">
              Partes curtas, no seu ritmo. Uma decisão por tela — com pausas
              tipográficas entre blocos. Suas respostas ficam neste aparelho.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/assessment/1"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-olive px-5 py-2.5 text-base font-medium text-primary-foreground transition-colors hover:bg-olive-soft sm:min-w-[12rem]"
            >
              Começar · Quem é você
            </Link>
            <Link
              href="/assessment/2"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-charcoal/15 bg-surface px-4 text-sm text-charcoal/80 transition-colors hover:border-gold/60 hover:bg-surface-muted"
            >
              Ir às aptidões
            </Link>
          </div>

          <ul className="max-w-md space-y-1.5 text-sm text-charcoal/60">
            <li>Cap. 1 em três partes · Cap. 2 em aptidões + interesses</li>
            <li>Pode sair e voltar — o rascunho é salvo aqui</li>
            <li>Sem conta nesta fase</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
