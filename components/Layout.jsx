import Image from "next/image";
import Head from 'next/head';
import { Col, Container, Navbar, Row } from "react-bootstrap";

export default function Layout({ children }) {
  return <div className="app-container">
   <Head>
        <title>
          MONAD SYSTEMS Lean-Agile software development & consulting
        </title>
        <meta
          name="description"
          content="Lean-Agile software development, training and consulting services"
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

    <main className="main-content my-2">
      <Container>
        {children}
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
                  href="https://maps.app.goo.gl/uFjyTQaFcXLALQpx7"
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
  </div>;
}