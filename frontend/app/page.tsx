import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Compra&nbsp;</span>
        <span className={title({ color: "green" })}>facil&nbsp;</span>
        <br />
        <span className={title()}>
          La mejor experiencia en la compra de productos digitales.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Compra rapido y facil!.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "success",
            radius: "full",
            variant: "shadow",
          })}
        >
          Compra ahora
        </Link>
      </div>
    </section>
  );
}
