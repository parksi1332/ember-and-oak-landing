// Phosphor duotone icons (via Iconify, MIT — rev3 SUPERSEDE of Lucide) — bundled
// inline so `currentColor` inherits the surrounding text color; the duotone
// secondary layer (opacity .2) rides along automatically since both layers
// share `fill="currentColor"`. D1 01_design_direction.md §R3-C: src/icons/*.svg
// (16 total incl. coffee-bean bonus).
const modules = import.meta.glob("../icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const icons: Record<string, string> = {};
for (const path in modules) {
  const name = path.split("/").pop()!.replace(".svg", "");
  icons[name] = modules[path];
}

export type IconName =
  | "arrow-right"
  | "coffee"
  | "coffee-bean"
  | "droplet"
  | "flame"
  | "instagram"
  | "leaf"
  | "map-pin"
  | "mountain"
  | "package"
  | "scale"
  | "sprout"
  | "sun"
  | "thermometer"
  | "timer"
  | "truck";

export function Icon({
  name,
  className = "",
  ...rest
}: { name: IconName; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const svg = icons[name];
  if (!svg) return null;
  return (
    <span
      className={`icon ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  );
}
