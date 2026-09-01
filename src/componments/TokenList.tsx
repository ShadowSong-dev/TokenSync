import { useEffect, useRef, useState } from "react";
import type { TokenItem } from "../utils/alchemy";

type Props = {
  tokens: TokenItem[];
};


const ROW_HEIGHT = 68;
const STEP = 10;
const WINDOW = 30;

const shortAddr = (addr: string) =>
  addr.length <= 10 ? addr : `${addr.slice(0, 6)}…${addr.slice(-4)}`;

// Human-readable amounts: compact above 1k, more precision for small holdings.
const formatAmount = (n: number) => {
  const abs = Math.abs(n);
  if (n === 0) return "0";
  if (abs >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (abs >= 1) return n.toLocaleString("en-US", { maximumFractionDigits: 6 });
  if (abs >= 1e-6) return n.toLocaleString("en-US", { maximumFractionDigits: 8 });
  return n.toExponential(2);
};

const formatValue = (n: number) => {
  if (n > 0 && n < 0.01) return `$${n.toFixed(4)}`;
  return n > 0 ? `$${n.toFixed(2)}` : "—";
};

export function TokenList({ tokens }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLLIElement>(null);
  const bottomSentinelRef = useRef<HTMLLIElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  const total = tokens.length;
  const maxStart = Math.max(0, total - WINDOW);
  const start = Math.min(startIndex, maxStart);
  const end = Math.min(start + WINDOW, total);

  useEffect(() => {
    const container = scrollRef.current;
    const top = topSentinelRef.current;
    const bottom = bottomSentinelRef.current;
    if (!container || !top || !bottom) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === top) {
            setStartIndex((prev) => Math.max(0, prev - STEP));
          } else if (entry.target === bottom) {
            setStartIndex((prev) => Math.min(Math.max(0, total - WINDOW), prev + STEP));
          }
        }
      },
      { root: container, threshold: 0 }
    );

    observer.observe(top);
    observer.observe(bottom);
    return () => observer.disconnect();
  }, [total]);

  const visibleTokens = tokens.slice(start, end);

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-border-light bg-white shadow-level-1">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="font-label-md text-label-md text-on-surface">Tokens</h2>
          <span className="font-body-sm text-body-sm text-tertiary">{total}</span>
        </div>
      </div>

      {/* Column header */}
      <div className="flex items-center justify-between border-b border-border-light bg-surface-subtle pl-5 pr-9 py-2">
        <span className="font-label-sm text-label-sm uppercase tracking-wide text-tertiary">Token</span>
        <div className="flex shrink-0 items-center gap-6">
          <span className="w-32 text-right font-label-sm text-label-sm uppercase tracking-wide text-tertiary">Amount</span>
          <span className="w-28 text-right font-label-sm text-label-sm uppercase tracking-wide text-tertiary">Value</span>
        </div>
      </div>

      {/* Virtualized rows — only WINDOW rows are mounted; the sentinels at the
          window edges slide the window as the user scrolls. */}
      <div ref={scrollRef} className="max-h-140 overflow-y-auto">
        <ul className="relative w-full" style={{ height: `${total * ROW_HEIGHT}px` }}>
          <li ref={topSentinelRef} aria-hidden="true" className="absolute left-0 w-px" style={{ top: start * ROW_HEIGHT, height: 1 }} />
          {visibleTokens.map((token, i) => {
            const index = start + i;
            const isNative = !token.address;
            return (
              <li
                key={`${token.network}:${token.address ?? "native"}`}
                className="absolute left-0 flex w-full items-center justify-between pl-5 pr-9 transition-colors hover:bg-surface-container-low"
                style={{ top: index * ROW_HEIGHT, height: ROW_HEIGHT }}
              >
                {/* Token identity */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">token</span>
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate font-label-md text-label-md text-on-surface">
                      {isNative ? "Native" : shortAddr(token.address!)}
                    </span>
                    <span className="block truncate font-data-mono text-data-mono text-tertiary">{token.network}</span>
                  </div>
                </div>

                {/* Amount & value */}
                <div className="flex shrink-0 items-center gap-6">
                  <div className="w-32 text-right truncate" title={formatAmount(token.balance)}>
                    <span className="font-data-mono text-data-mono text-on-surface">{formatAmount(token.balance)}</span>
                  </div>
                  <div className="w-28 text-right font-data-mono text-data-mono text-tertiary">
                    {formatValue(token.value)}
                  </div>
                </div>
              </li>
            );
          })}
          <li ref={bottomSentinelRef} aria-hidden="true" className="absolute left-0 w-px" style={{ top: end * ROW_HEIGHT, height: 1 }} />
        </ul>
      </div>
    </section>
  );
}
