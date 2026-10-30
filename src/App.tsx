import { Fragment } from "react";
import { Hero } from "./components/Hero";
import { About, Brands, Certs, Closing, Impact, Kwik, Partners, Stats, Steps } from "./components/Sections";
import { Separator } from "./components/ui";

const SECTIONS = [Hero, Partners, About, Steps, Impact, Kwik, Stats, Brands, Certs, Closing];

export const LandingPage = () => (
  <div className="relative bg-white">
    <div aria-hidden className="em-rail absolute inset-y-0 left-0 z-20 hidden w-6 border-r border-line @bmd:block" />
    <div aria-hidden className="em-rail absolute inset-y-0 right-0 z-20 hidden w-6 border-l border-line @bmd:block" />
    {SECTIONS.map((S, i) => (
      <Fragment key={i}>
        {i > 0 && <Separator />}
        <S />
      </Fragment>
    ))}
  </div>
);

export const App = () => (
  <div className="[container-name:page] [container-type:inline-size]">
    <LandingPage />
  </div>
);
