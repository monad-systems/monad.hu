import Image from "next/image";
import { Col, Container, Navbar, Row } from "react-bootstrap";

export default function Layout({ children }) {
  return <div className="app-container">
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
                  href="https://maps.app.goo.gl/ctM3F974RHgVnerSA"
                >
                  2100 Gödöllő, Dózsa György út 13. I. em. 111.
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