import Head from 'next/head';
import Image from 'next/image';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

import Layout from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <div className="bg-light">
        <main className="main-content my-2">
          <Container>
            <div className="my-4">
              <div className="py-md-5">
                <h1 className="display-5 fw-bold">Empowering Innovation</h1>
                <h2 className="display-6 fw-normal mb-4">
                  Your Partner in Lean-Agile Software Development and Technology
                  Consulting
                </h2>
                <p className="fs-4">
                  As a Lean-Agile software development company,{' '}
                  <strong>
                    we specialize in building high-quality, flexible, and
                    scalable applications
                  </strong>{' '}
                  that propel your organization forward. But that&apos;s just
                  the beginning – we also offer{' '}
                  <strong>expert technology consulting</strong> and{' '}
                  <strong>developer training</strong> services to help you stay
                  ahead in today&apos;s rapidly evolving digital landscape.{' '}
                  <br />
                  At MʘNΛD we&apos;re passionate about crafting cutting-edge
                  software solutions that not only meet but exceed your
                  expectations. With a commitment to agile principles, we
                  embrace change, value collaboration, and deliver results that
                  drive your business forward.
                </p>
              </div>
            </div>
            <section className="my-4">
              <h2 className="mb-1">Partners</h2>
              <Row as="article" className="align-items-center">
                <Col xl="3" md="6" className="my-2">
                  <div
                    className="rounded border border-dark d-flex align-items-center mx-auto mb-3 justify-content-center"
                    style={{
                      width: '240px',
                      height: '120px',
                    }}
                  >
                    <Image
                      src="/fizz.svg"
                      width="186"
                      height="72"
                      alt="Fizz"
                      loading="lazy"
                      style={{
                        filter: 'brightness(0%) blur(0.5px)',
                      }}
                    />
                  </div>
                  <h3 className="h6 text-center">OTP Ecosystem Ltd.</h3>
                </Col>
                <Col xl="3" md="6" className="my-2">
                  <div
                    className="rounded border border-dark d-flex align-items-center mx-auto mb-3 justify-content-center"
                    style={{
                      width: '240px',
                      height: '120px',
                    }}
                  >
                    <Image
                      src="/netrisk.svg"
                      width="157"
                      height="22"
                      alt="Netrisk"
                      loading="lazy"
                      style={{
                        filter: 'brightness(0%) blur(0.5px)',
                      }}
                    />
                  </div>
                  <h3 className="h6 text-center">Netrisk Hungary Ltd.</h3>
                </Col>
                <Col xl="3" md="6" className="my-2">
                  <div
                    className="rounded border border-dark d-flex align-items-center mx-auto mb-3 justify-content-center"
                    style={{
                      width: '240px',
                      height: '120px',
                    }}
                  >
                    <Image
                      src="/idbc.svg"
                      width="178"
                      height="75"
                      alt="IDBC"
                      loading="lazy"
                      style={{
                        filter: 'brightness(0%) blur(0.5px)',
                      }}
                    />
                  </div>
                  <h3 className="h6 text-center">
                    IDBC Creative Solutions Ltd.
                  </h3>
                </Col>
                <Col xl="3" md="6" className="my-2">
                  <div
                    className="rounded border border-dark d-flex align-items-center mx-auto mb-3 justify-content-center"
                    style={{
                      width: '240px',
                      height: '120px',
                    }}
                  >
                    <Image
                      src="/webshippy-light.svg"
                      width="227"
                      height="82"
                      alt="Webshippy"
                      loading="lazy"
                      style={{
                        filter: 'brightness(0%) blur(0.5px)',
                      }}
                    />
                  </div>
                  <h3 className="h6 text-center">WEBSHIPPY Hungary Ltd.</h3>
                </Col>
              </Row>
            </section>

            <section className="my-4">
              <h2 className="mb-1">Services</h2>
              <Row>
                <Col md="4" className="my-3">
                  <article className="h-100 p-4 p-md-5 bg-light rounded mb-2">
                    <h3>Custom Software Development</h3>

                    <p className="text-justify">
                      From web and mobile applications to enterprise solutions,
                      we have the expertise to bring your ideas to life. Our
                      Lean-Agile development process ensures{' '}
                      <strong>
                        rapid delivery without compromising on quality
                      </strong>
                      .
                    </p>
                  </article>
                </Col>
                <Col md="4" className="my-3">
                  <article className="h-100 p-4 p-md-5 bg-light rounded mb-2">
                    <h3>Technology Consulting</h3>

                    <p className="text-justify">
                      Leverage our years of experience and deep industry
                      knowledge to make{' '}
                      <strong>informed technology decisions</strong> that drive
                      your business forward. Whether you need help with
                      architecture design, system integration, or digital
                      transformation, our consultants are here to guide you
                      every step of the way.
                    </p>
                  </article>
                </Col>
                <Col md="4" className="my-3">
                  <article className="h-100 p-4 p-md-5 bg-light rounded mb-2">
                    <h3>Developer Trainings</h3>

                    <p className="text-justify">
                      Invest in your team&apos;s success with our{' '}
                      <strong>comprehensive developer training programs</strong>
                      . From lean/agile methodologies to the latest tech stacks,
                      we offer hands-on workshops and courses designed to
                      sharpen your team&apos;s skills and keep them ahead of the
                      curve.
                    </p>
                  </article>
                </Col>
              </Row>
            </section>

            {
              <section className="my-4">
                <h2 className="mb-1">Blog</h2>
                <Row>
                  {allPostsData.map(({ id, date, title, lead }, idx) => (
                    <Col md="4" className="my-3" key={id}>
                      <article className="h-entry h-100 p-4 p-md-5 bg-light rounded my-3 d-grid position-relative">
                        <h3 className="p-name">{title}</h3>
                        <p className="p-summary">{lead}</p>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <time className="dt-published" dateTime={date}>
                            {new Intl.DateTimeFormat('en-GB', {
                              dateStyle: 'short',
                              timeZone: 'UTC',
                            }).format(new Date(date))}
                          </time>
                          <Link
                            className="btn btn-primary stretched-link"
                            href={`/posts/${id}`}
                          >
                            Read more{' '}
                            <span className="visually-hidden">
                              about {title}
                            </span>
                          </Link>
                        </div>
                      </article>
                    </Col>
                  ))}
                </Row>
              </section>
            }

            <section className="my-4">
              <h2 className="mb-1">Values</h2>

              <Row as="article" className="align-items-center">
                <Col md="6" className="my-4">
                  <div className="h-100 p-4 p-md-5 text-white bg-dark rounded">
                    <h3>Lean-Agile Software Development</h3>

                    <p className="text-justify">
                      We embrace agility as a core principle, allowing us to
                      adapt quickly to changing requirements and deliver value
                      iteratively. From concept to deployment, our agile
                      approach ensures that your project stays on track and
                      delivers results that exceed expectations.
                    </p>
                  </div>
                </Col>
                <Col className="my-2">
                  <div className="ratio ratio-16x9 bg-gray-100 px-4">
                    <Image
                      layout="fill"
                      alt="Lean-Agile software development"
                      className="object-fit-contain"
                      src="/undraw_season_change_f99v.svg"
                    />
                  </div>
                </Col>
              </Row>
              <Row as="article" className="align-items-center">
                <Col className="my-2" md={{ order: 2, span: 6 }}>
                  <div className="h-100 p-4 p-md-5 text-white bg-dark rounded">
                    <h3>Flexibility</h3>

                    <p>
                      Your needs are unique, and so are our solutions. We
                      prioritize flexibility in our development approach,
                      allowing us to tailor our services to your specific
                      requirements and business goals.
                    </p>
                  </div>
                </Col>
                <Col className="my-2" md={{ order: 1 }}>
                  <div className="ratio ratio-16x9 bg-gray-100 px-4">
                    <Image
                      layout="fill"
                      src="/undraw_building_blocks_re_5ahy.svg"
                      alt="Flexible solutions"
                      className="object-fit-contain"
                    />
                  </div>
                </Col>
              </Row>
              <Row as="article" className="align-items-center">
                <Col md="6" className="my-4">
                  <div className="h-100 p-4 p-md-5 text-white bg-dark rounded">
                    <h3>High-Quality Applications</h3>

                    <p className="text-justify">
                      Quality is non-negotiable. Our team of seasoned developers
                      and QA engineers is dedicated to delivering software of
                      the highest caliber, with rigorous testing and continuous
                      improvement baked into every step of the development
                      process.
                    </p>
                  </div>
                </Col>
                <Col className="my-2">
                  <div className="ratio ratio-16x9 bg-gray-100 px-4">
                    <Image
                      layout="fill"
                      alt="Quality assurance"
                      className="object-fit-contain"
                      src="/undraw_real_time_sync_re_nky7.svg"
                    />
                  </div>
                </Col>
              </Row>
              <Row as="article" className="align-items-center">
                <Col className="my-2" md={{ order: 2, span: 6 }}>
                  <div className="h-100 p-4 p-md-5 text-white bg-dark rounded">
                    <h3>Scalability</h3>
                    <p>
                      We design applications with scalability in mind, laying a
                      solid foundation that can grow seamlessly as your business
                      expands. Whether you&apos;re serving a handful of users or
                      millions, our solutions can handle the load.
                    </p>
                  </div>
                </Col>
                <Col className="my-2" md={{ order: 1 }}>
                  <div className="ratio ratio-16x9 bg-gray-100 px-4">
                    <Image
                      layout="fill"
                      src="/undraw_startup_life_re_8ow9.svg"
                      alt="Scalable solutions"
                      className="object-fit-contain"
                    />
                  </div>
                </Col>
              </Row>
            </section>
          </Container>
        </main>
      </div>
    </Layout>
  );
}
