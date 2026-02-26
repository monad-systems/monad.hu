import Layout from '../components/Layout';

const caseStudies = [
  {
    title: 'Fizz',
    category: 'Platform Engineering',
    description:
      'Stabilized and modernized a cost-inefficient distributed monolith by introducing spec-first (API design-first) delivery, quality gates, and production-grade observability. Improved reliability and security posture while enabling a cleaner evolution toward microservices. Search synchronization was sped up significantly and infrastructure costs were cut by about 90%.',
    tags: [
      'API Design-First',
      'Quality Gates',
      'Observability',
      'Cost Optimization',
    ],
    highlight: true,
  },
  {
    title: 'IdomSoft',
    category: 'Full-Stack Modernization',
    description:
      'Modernized a national-scale voting information system with a modular React frontend and a cloud-ready platform foundation. Improved scalability, observability, and long-term maintainability with better developer experience and operational readiness.',
    tags: ['React', 'Observability', 'Cloud-Ready', 'Modular Frontend'],
    highlight: true,
  },
  {
    title: 'Netrisk',
    category: 'Cloud Architecture',
    description:
      'Designed a Node.js microservices architecture with Kafka-based eventing to support high-throughput insurance purchases. Added resilience patterns and end-to-end observability to improve reliability, scalability, and operational confidence.',
    tags: ['Node.js', 'Kafka', 'Event-Driven', 'Microservices'],
  },
  {
    title: 'IDBC',
    category: 'Banking Infrastructure',
    description:
      'Built core foundations for a scalable banking platform using Node.js and Kafka-based event-driven architecture. Delivered complex legacy integrations and data migration into a unified, extensible platform.',
    tags: ['Node.js', 'Kafka', 'Event-Driven', 'Data Migration'],
  },
  {
    title: 'Webshippy',
    category: 'Backend Decomposition',
    description:
      'Decomposed a PHP monolith into a dedicated backend API and a modular Vue.js frontend. Containerized the system to enable independent releases, clearer boundaries, and a smoother path toward service-oriented evolution.',
    tags: ['Vue.js', 'PHP', 'Docker', 'API Design', 'Microservices'],
  },
];

export default function Work() {
  return (
    <Layout>
      <section className="work-hero relative overflow-hidden pb-20 pt-32">
        <div className="work-hero-bg" />
        <div className="site-container">
          <div className="relative z-[1] max-w-[780px]">
            <div className="section-eyebrow animate-fade-in">Case Studies</div>
            <h1 className="work-title animate-slide-up">
              Real Problems,{' '}
              <span className="gradient-text">Real Solutions.</span>
            </h1>
            <p className="work-subtitle animate-slide-up delay-200">
              We help engineering teams modernize legacy systems, adopt
              microservices, and build platforms that scale — with better DX and
              lower costs.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <article
                key={`${study.title}-${index}`}
                className={`card hover-lift work-card overflow-hidden p-10 transition-[border-color] duration-500 md:p-11 ${
                  study.highlight && index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="card-glow" />
                <div className="relative z-[1] flex h-full flex-col">
                  <div className="work-category">{study.category}</div>
                  <h3 className="work-card-title">{study.title}</h3>
                  <p className="work-card-description">{study.description}</p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
