// Lucide icons (via Iconify, MIT) — bundled inline so `currentColor` inherits
// the surrounding text color. D1 asset manifest: src/icons/*.svg (15 total).
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
