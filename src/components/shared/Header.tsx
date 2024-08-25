import { Link } from "react-router-dom";
import { MobileNavBar } from "./MobileNavBar";
import { NavBar } from "./NavBar";
import { Container } from "./container";

export function Header() {
  return (
    <Container>
      <header className="flex h-16 w-full items-center justify-between">
        <Link to="/">
          <img
            width={64}
            height={64}
            src="/vite.svg"
            className="h-8 w-auto max-sm:h-6"
            alt="logo"
          />
        </Link>
        <NavBar />
        <MobileNavBar /> {/* its hidden until the width got 768px */}
      </header>
    </Container>
  );
}
