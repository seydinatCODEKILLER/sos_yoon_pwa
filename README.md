# SOS Yoon — Site vitrine 🆘⚖️

Site de présentation de SOS Yoon, plateforme d'urgence juridique connectant, en quelques minutes, une personne confrontée à une situation urgente relevant du droit avec le professionnel disponible et géographiquement proche.

> **Statut actuel** : landing page de présentation, destinée à recueillir les retours des clients-testeurs sur le concept avant le développement de l'application.
>
> Ce dépôt est **volontairement séparé** du dépôt applicatif (`sos_yoon_app`). Il n'est pas configuré en PWA et ne contient pas de logique métier — c'est un site vitrine statique, pensé pour être léger et rapide à déployer. L'application (authentification, dépôt de demande, suivi, espace professionnel, admin) vit dans son propre projet. Voir la section [Pourquoi deux projets séparés](#pourquoi-deux-projets-séparés).

## À propos

SOS Yoon couvre les quatre métiers du droit au Sénégal :

- **Avocat**
- **Huissier**
- **Notaire**
- **Juriste-conseil**

L'utilisateur n'a pas à chercher lui-même un professionnel : il dépose sa demande (texte ou vocal), un moteur de triage intelligent identifie le bon métier, et il est orienté automatiquement vers le professionnel le plus pertinent selon sa spécialité, sa disponibilité et sa proximité.

Ce site présente le concept, le fonctionnement et les publics cibles du produit, avec un formulaire pour recueillir les retours des premiers testeurs.

## Stack technique

| Domaine | Technologie |
|---|---|
| Framework | React 19 + Vite |
| Langage | TypeScript |
| Style | TailwindCSS v4 |
| Composants UI | shadcn/ui (Base UI, preset Nova) |
| Animations | Motion (ex-Framer Motion) |
| Icônes | Lucide |
| Police de corps | Geist (Fontsource) |
| Police display | Fraunces |

Pas de routing, pas d'état serveur, pas de PWA — ce projet n'en a pas besoin. Ces briques vivent dans le dépôt applicatif.

## Prérequis

- Node.js ≥ 20
- [pnpm](https://pnpm.io/)

## Installation

```bash
git clone <url-du-repo>
cd sos_yoon_pwa
pnpm install
```

## Scripts disponibles

```bash
pnpm dev        # Lancer le serveur de développement
pnpm build      # Build de production
pnpm preview    # Prévisualiser le build de production
pnpm lint       # Linter le code
```

## Architecture du projet

```
src/
├── app/
│   └── App.tsx              # Point d'entrée, affiche LandingPage
├── features/
│   └── landing/
│       ├── components/
│       │   ├── Hero.tsx
│       │   ├── RadarPulse.tsx
│       │   ├── TrustBanner.tsx
│       │   ├── ProblemSection.tsx
│       │   ├── HowItWorks.tsx
│       │   ├── LegalDomainsGrid.tsx
│       │   ├── AppShowcase.tsx
│       │   ├── AudienceSection.tsx
│       │   ├── TrustSecurity.tsx
│       │   ├── FinalCta.tsx
│       │   ├── Footer.tsx
│       │   └── LandingPage.tsx   # Assemble toutes les sections
│       └── index.ts              # Export public de la feature
├── shared/
│   ├── components/
│   │   ├── ui/                   # Généré par shadcn — ne pas éditer à la main
│   │   ├── AnimatedSection.tsx   # Wrapper d'animation au scroll
│   │   └── StaggerGroup.tsx      # Cascade d'apparition (listes, grilles)
│   ├── hooks/
│   └── lib/
│       └── utils.ts              # Généré par shadcn (fonction cn)
├── index.css
└── main.tsx
```

Ce projet n'a qu'une seule feature (`landing`), donc pas de dossier `config/`, `layouts/` ou `types/` globaux pour l'instant — ils seront ajoutés seulement s'ils deviennent nécessaires.

La page est assemblée dans l'ordre suivant, avec une alternance de fond `ink` (sombre) / `paper` (clair) par blocs :

```
Hero → TrustBanner → ProblemSection → HowItWorks → LegalDomainsGrid
→ AppShowcase → AudienceSection → TrustSecurity → FinalCta → Footer
```

## Direction visuelle

| Rôle | Valeur |
|---|---|
| Couleur `ink` (fond sombre) | `#0B1220` |
| Couleur `paper` (fond clair) | `#FAF7F2` |
| Couleur `signal` (accent CTA) | `#F0A202` |
| Couleur `brass` (accent secondaire) | `#B8860B` |
| Police display | Fraunces |
| Police corps de texte | Geist |

Signature visuelle : un radar de dispatch animé (`RadarPulse`), représentant le mécanisme de mise en relation par proximité.

## Pourquoi deux projets séparés

Une PWA installée doit ouvrir directement l'usage réel du produit, pas un argumentaire marketing. Comme ce site n'a pour but que de présenter le concept et recueillir des retours, l'installer en tant qu'app n'aurait pas de sens pour l'utilisateur.

| | Ce dépôt (`sos_yoon_pwa`) | Dépôt applicatif (`sos_yoon_app`) |
|---|---|---|
| Rôle | Site vitrine / marketing | Application fonctionnelle |
| PWA | Non | Oui |
| Contenu | Landing page uniquement | Auth, demande urgente, suivi, messagerie, espace pro, admin |
| Première feature développée | `landing` (terminée) | `auth` (à venir) |

Les composants génériques réutilisables (`AnimatedSection`, `StaggerGroup`, configuration shadcn) sont dupliqués à l'identique entre les deux projets pour l'instant. Une mise en commun via un monorepo pourra être envisagée plus tard si la duplication devient un vrai coût de maintenance.

## Public cible

Particuliers, familles, entrepreneurs, PME, diaspora, organisations, ainsi que les professionnels du droit et cabinets souhaitant digitaliser leur service.

## Licence

À définir.

## Contact

À définir.