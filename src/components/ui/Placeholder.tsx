/**
 * Marks content that Indo still needs to supply or confirm.
 * Deliberately visible so nothing unverified ships unnoticed.
 */
export function Placeholder({ children }: { children: string }) {
  return (
    <span
      className="inline-block border border-dashed border-current/50 px-2 py-0.5 text-meta opacity-80"
      title="Placeholder: awaiting confirmation from Indo"
    >
      {children}
    </span>
  );
}
