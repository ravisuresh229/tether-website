/* Official Tether mark, extracted from brand art and recolored to ink.
   A white variant exists at /brand-mark-white.png for dark surfaces. */
export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand-mark.png" alt="" width={30} height={30} />
    </span>
  );
}
