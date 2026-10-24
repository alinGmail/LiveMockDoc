import clsx from "clsx";
import Heading from "@theme/Heading";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.feature.easy.title">Easy to use</Translate>
    ),
    Svg: require("@site/static/img/user-interface.svg").default,
    description: (
      <Translate id="homepage.feature.easy.description">
        A self-hosted dashboard anyone can pick up in minutes. Match requests on
        method, path, headers, query and body, in groups with their own
        priority. Run it in Docker or from source.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.feature.dynamic.title">Dynamic mocking</Translate>
    ),
    Svg: require("@site/static/img/start-up.svg").default,
    description: (
      <Translate id="homepage.feature.dynamic.description">
        Change API responses instantly without restarting the server. Return
        custom JSON or Mock.js templates, proxy to a real backend (WebSocket
        included), or serve a folder from disk.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.feature.logging.title">
        Logging and analytics
      </Translate>
    ),
    Svg: require("@site/static/img/data-collection.svg").default,
    description: (
      <Translate id="homepage.feature.logging.description">
        Every request is recorded. Filter with presets or custom JSON paths,
        choose the columns you need, read WebSocket messages, and turn any
        captured request into a mock in one click.
      </Translate>
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
