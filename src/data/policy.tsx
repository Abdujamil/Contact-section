import { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface AsideItem {
  id: string;
  title: string;
}

interface FaqItem {
  id: number;
  num: string;
  title: string;
  slug: string;
  fullAnswer: ReactNode;
  aside: AsideItem[];
  largeImgSrc: string | StaticImageData;
  editorId: number;
}

export const policyData: FaqItem[] = [
  {
    id: 1,
    num: "1",
    editorId: 1,
    title: "Транскрибация вакансии без опыта работы для школьников?",
    slug: "transkribatsiya-lektsii",
    largeImgSrc: "/blgLg1.png",
    fullAnswer: (
      <>
        <div className="policy-content">
          <section id="introduction">
            <h2>Введение</h2>
            {/* контент */}
          </section>

          <section id="data-collection">
            <h2>Интеллектуальные права</h2>
            {/* контент */}
          </section>

          <section id="data-usage">
            <h2>Конфиденциальность и защита информации</h2>
            {/* контент */}
          </section>

          <section id="dop-sved">
            <h2>Дополнительные сведения</h2>
          </section>

          {/* и так далее... */}
        </div>
      </>
    ),

    aside: [
      {
        id: "#introduction",
        title: "Введение",
      },
      {
        id: "#data-collection",
        title: "Интеллектуальные права",
        
      },
      {
        id: "#data-usage",
        title: "Конфиденциальность и защита информации",
      },
      {
        id: "#dop-sved",
        title: "Дополнительные сведения",
      }
    ],
  },
  {
    id: 2,
    num: "2",
    editorId: 2,
    title: "Транскрибация вакансии без опыта работы для школьников?",
    slug: "transkribatsiya-lektsii",
    largeImgSrc: "/blgLg1.png",
    fullAnswer: (
      <>
        <div className="policy-content">
          <section id="introduction">
            <h2>Введение</h2>
            {/* контент */}
          </section>

          <section id="data-collection">
            <h2>Интеллектуальные права</h2>
            {/* контент */}
          </section>

          <section id="data-usage">
            <h2>Конфиденциальность и защита информации</h2>
            {/* контент */}
          </section>

          <section id="dop-sved">
            <h2>Дополнительные сведения</h2>
          </section>

          {/* и так далее... */}
        </div>
      </>
    ),

    aside: [
      {
        id: "#introduction",
        title: "Введение",
      },
      {
        id: "#data-collection",
        title: "Интеллектуальные права",
        
      },
      {
        id: "#data-usage",
        title: "Конфиденциальность и защита информации",
      },
      {
        id: "#dop-sved",
        title: "Дополнительные сведения",
      }
    ],
  },

  {
    id: 3,
    num: "3",
    editorId: 3,
    title: "Транскрибация вакансии без опыта работы для школьников?",
    slug: "transkribatsiya-lektsii",
    largeImgSrc: "/blgLg1.png",
    fullAnswer: (
      <>
        <div className="policy-content">
          <section id="introduction">
            <h2>Введение</h2>
            {/* контент */}
          </section>

          <section id="data-collection">
            <h2>Интеллектуальные права</h2>
            {/* контент */}
          </section>

          <section id="data-usage">
            <h2>Конфиденциальность и защита информации</h2>
            {/* контент */}
          </section>

          <section id="dop-sved">
            <h2>Дополнительные сведения</h2>
          </section>

          {/* и так далее... */}
        </div>
      </>
    ),

    aside: [
      {
        id: "#introduction",
        title: "Введение",
      },
      {
        id: "#data-collection",
        title: "Интеллектуальные права",
        
      },
      {
        id: "#data-usage",
        title: "Конфиденциальность и защита информации",
      },
      {
        id: "#dop-sved",
        title: "Дополнительные сведения",
      }
    ],
  },
];
