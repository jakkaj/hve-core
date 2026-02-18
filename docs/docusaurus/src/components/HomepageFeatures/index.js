import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '📋 Shape the Work',
    description: (
      <>
        Turn ambiguity into actionable plans. PRD builders, backlog management
        flows, architecture decision records, and sprint planning — from idea
        to prioritized work items.
      </>
    ),
    link: '/docs/shape-the-work/overview',
  },
  {
    title: '🔨 Build the Work',
    description: (
      <>
        The RPI workflow (Research → Plan → Implement → Review) brings
        disciplined, phase-separated AI assistance to coding. Six language
        standards apply automatically as you write.
      </>
    ),
    link: '/docs/build-the-work/overview',
  },
  {
    title: '🚀 Ship It',
    description: (
      <>
        Close the feedback loop from production back to planning. Incident
        response, IaC conventions, and a clear roadmap for release management
        and observability tooling.
      </>
    ),
    link: '/docs/ship-it/overview',
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md" style={{paddingTop: '2rem'}}>
        <Heading as="h3">
          <a href={link} style={{textDecoration: 'none', color: 'inherit'}}>{title}</a>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
