import Html from 'next/head';
import Head from 'next/head';
import Image from 'next/image';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <div className="app-container">
      <Head>
        <title>MONAD SYSTEMS • Alkalmazkodj agilis technológiákkal</title>
        <meta
          name="description"
          content="Egyedi szoftverfejelsztés, fejlesztői képzés, szaktanácsadás agilis technológiákkal. Web, Mobile, IoT."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/" className="py-0 d-flex align-items-center">
              <Image
                src="/logo.svg"
                className="d-inline-block align-top"
                alt="MONAD SYSTEMS logo"
                width={135}
                height={38}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {/* <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Szolgáltatások</Nav.Link>
              <Nav.Link href="#">Technológiák</Nav.Link>
              <Nav.Link href="#">Blog</Nav.Link>
              <Nav.Link href="#">Kapcsolat</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
          </Container>
        </Navbar>
      </header>

      <main className="main-content mt-2">
        <Container>
          <div className="my-4 rounded-bottom">
            <div className="py-md-5">
              <h1 className="display-5 fw-bold">
                Alkalmazkodj agilis technológiákkal!
              </h1>
              <figure>
                <blockquote className="blockquote">
                  <p>Az egyetlen állandó a változás maga.</p>
                </blockquote>
                <figcaption className="blockquote-footer text-dark text-opacity-75">
                  Hérakleitosz
                </figcaption>
              </figure>
              <p className="fs-4">
                Az <em>állandó változás</em>t technológiai szempontból sem
                egyszerű feladat lekövetni. 2008 óta foglalkozunk{' '}
                <strong>egyedi szoftverfejlesztéssel</strong>,{' '}
                <strong>fejlesztői képzésekkel</strong> és{' '}
                <strong> szaktanácsadással</strong>. A felhalmozott
                szakértelemmel segítünk, hogy olyan pillérekre alapozz, ami a{' '}
                <strong>rugalmasság</strong>ának köszönhetően kiállja az idők
                próbáját.
              </p>
              <a
                className="btn btn-primary btn-lg"
                rel="noopener noreferrer nofollow"
                target="_blank"
                href="tel:+36306360775"
              >
                Beszéljünk!
              </a>
            </div>
          </div>
          <section className="my-4">
            <h1 className="mb-4 visually-hidden">Technológiák, metodológiák</h1>

            <Row as="article" className="align-items-center">
              <Col md="6" className="my-2">
                <div className="h-100 p-4 p-md-5 text-white bg-dark rounded">
                  <h2>Agilis, iteratív fejlesztés</h2>
                  <figure>
                    <blockquote className="blockquote">
                      <p>Alignment enables Autonomy</p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-light text-opacity-75">
                      Henry Kniberg
                    </figcaption>
                  </figure>
                  <p className="text-justify">
                    Minden termék és szolgáltatás életének <strong></strong>
                    természetes része a változás. Az <em>agilis módszertan</em>
                    nak köszönhetően az implementálás 1-2 hetes etapokban
                    zajlik. Ez nem jelenti azt, hogy hosszútávú stratégiai
                    célokat nem határozunk meg. Viszont az azokhoz vezető utat
                    nem kell induláskor bebetonoznunk, akár hetente
                    változtathatunk a részleteken. Így egy minőségi
                    terméket/szolgáltatást tudunk produkálni, ami nem okoz
                    csalódást.
                  </p>
                  <a
                    className="btn btn-outline-light"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    href="tel:+36306360775"
                  >
                    Beszéljünk!
                  </a>
                </div>
              </Col>
              <Col className="my-2">
                <div className="ratio ratio-16x9 bg-gray-100 px-4">
                  <Image
                    layout="fill"
                    alt="Iteratív fejelsztés"
                    objectFit="contain"
                    src="/undraw_season_change_f99v.svg"
                  />
                </div>
              </Col>
            </Row>
            <Row as="article" className="align-items-center">
              <Col className="my-2" md={{ order: 2, span: 6 }}>
                <div className="h-100 p-4 p-md-5 bg-light rounded">
                  <h2>Rugalmas technológiák</h2>
                  <figure>
                    <blockquote className="blockquote">
                      <p>Favor object composition over class inheritance.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-dark text-opacity-75">
                      Gang of Four{' '}
                      <cite title="Design Patterns">Design Patterns</cite>
                    </figcaption>
                  </figure>
                  <p>
                    Az adaptivitás elengedhetetlen azok számára, akik hosszútávú
                    célokat fogalmaznak meg és persze el is akarják azokat érni.
                    Segítünk, hogy olyan technológiákra, olyan architektúrára
                    alapozz, ami alkalmazkodik a – természetesen – változó
                    igényekhez.
                  </p>
                  <a
                    className="btn btn-outline-dark"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    href="tel:+36306360775"
                  >
                    Beszéljünk!
                  </a>
                </div>
              </Col>
              <Col className="my-2" md={{ order: 1 }}>
                <div className="ratio ratio-16x9 bg-gray-100 px-4">
                  <Image
                    layout="fill"
                    src="/undraw_building_blocks_re_5ahy.svg"
                    alt="Rugalmas technológiák"
                    objectFit="contain"
                  />
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>

      <footer className="bg-dark text-light py-2">
        <Container className="">
          <Row className="align-items-center text-center">
            <Col md="6" className="text-md-start my-2">
              <div>&copy; {new Date().getFullYear()} MONAD SYSTEMS Kft.</div>
              <div>
                <a
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  href="https://goo.gl/maps/Cp9aHGsBUxckaxX18"
                >
                  2100 Gödöllő, Szilhát utca 32.
                </a>
              </div>
            </Col>
            <Col className="text-md-end my-2">
              <a
                className="btn btn-primary me-3 my-2"
                rel="noopener noreferrer nofollow"
                target="_blank"
                href="tel:+36306360775"
              >
                +36 30 636 0775
              </a>
              <a
                className="btn btn-primary my-2"
                rel="noopener noreferrer nofollow"
                target="_blank"
                href="mailto:hello@monad.hu"
              >
                hello@monad.hu
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
