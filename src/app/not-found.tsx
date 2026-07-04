import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container className="max-w-xl text-center">
        <p className="text-small font-semibold uppercase tracking-wider text-brand-primary">
          404
        </p>
        <h1 className="mt-3 font-display text-h1 font-bold text-text-primary">
          Page not found
        </h1>
        <p className="mt-4 text-body text-text-secondary">
          The page you are looking for does not exist or may have moved.
        </p>
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-body font-medium"
          aria-label="Helpful links"
        >
          <Link href="/" className="text-brand-primary hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-brand-primary hover:underline">
            About
          </Link>
          <Link href="/privacy" className="text-brand-primary hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-brand-primary hover:underline">
            Terms of Service
          </Link>
          <Link href="/#contact" className="text-brand-primary hover:underline">
            Contact
          </Link>
          <Link href="/compare" className="text-brand-primary hover:underline">
            Compare
          </Link>
          <Link href="/blog" className="text-brand-primary hover:underline">
            Blog
          </Link>
        </nav>
      </Container>
    </main>
  );
}
