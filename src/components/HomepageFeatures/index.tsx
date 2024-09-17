import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to use",
    Svg: require("@site/static/img/user-interface.svg").default,
    description: (
      <>
        LiveMock has a simple, good-looking user interface. Anyone can use it
        easily. It works on the web, Windows, and Mac. You can choose the
        version you like best
      </>
    ),
  },
  {
    title: "Dynamic mocking",
    Svg: require("@site/static/img/start-up.svg").default,
    description: (
      <>
        Change API responses instantly without restarting the server. You can
        update mock data on the fly
      </>
    ),
  },
  {
    title: "Logging and analytics",
    Svg: require("@site/static/img/data-collection.svg").default,
    description: (
      <>
        LiveMock records every API request. Use filters to sort through logs
        easily. Customize which data you want to see. View data in a JSON tree
        format for better understanding
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
