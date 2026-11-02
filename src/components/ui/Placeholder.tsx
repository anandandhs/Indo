/**
 * Marks content that Indo still needs to supply or confirm.
 * Deliberately visible so nothing unverified ships unnoticed. The dashed border marks it;
 * the text keeps its surrounding colour at full strength so it stays readable (AA).
 */
export function Placeholder({ children }: { children: string }) {
  return (
    <span
      className="inline-block border border-dashed border-current/50 px-2 py-0.5 text-meta"
      title="Placeholder: awaiting confirmation from INDO"
    >
      {children}
    </span>
  );
}
