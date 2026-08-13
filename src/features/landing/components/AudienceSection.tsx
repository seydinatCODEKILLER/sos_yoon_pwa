import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const audiences = [
  {
    eyebrow: "Vous avez besoin d'aide",
    title: "Particuliers, familles, entreprises",
    description:
      "Vous, votre famille ou votre entreprise faites face à une situation juridique urgente. Diaspora comprise, où que vous soyez.",
    cta: "Décrire mon urgence",
    direction: -40,
  },
  {
    eyebrow: "Vous exercez le droit",
    title: "Avocats, notaires, huissiers, juristes",
    description:
      "Digitalisez votre pratique, recevez des demandes ciblées selon votre spécialité et votre disponibilité réelle.",
    cta: "Rejoindre en tant que professionnel",
    direction: 40,
  },
];

export function AudienceSection() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-2">
          {audiences.map((audience) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, x: audience.direction }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col justify-between bg-paper p-10 md:p-14"
            >
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brass">
                  {audience.eyebrow}
                </p>
                <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                  {audience.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {audience.description}
                </p>
              </div>

              <Button
                variant="ghost"
                className="group mt-8 h-auto justify-start gap-2 self-start p-0 text-ink hover:bg-transparent"
              >
                {audience.cta}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
