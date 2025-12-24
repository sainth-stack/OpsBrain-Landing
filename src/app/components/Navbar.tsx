"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { ContactModal } from "./ContactModal";
import clsx from "clsx";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Platform", href: "/platform" },
    { label: "AI Agents", href: "/agents" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Security", href: "/security" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-enterprise border-obs-border py-3"
            : "bg-white border-transparent py-5"
        )}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-48 h-12">
              <Image
                src="/opsbrain/opsbrain_logo_wordmark_dark.png"
                alt="OpsBrain"
                fill
                className="object-cover object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-obs-text hover:text-obs-navy transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-transparent text-obs-navy hover:bg-obs-surface hover:text-obs-accent-blue"
              onClick={() => setIsModalOpen(true)}
            >
              Contact Us
            </Button>
            <Button
              variant="primary"
              size="md"
              className="shadow-lg shadow-obs-accent-blue/20 font-semibold px-6"
              onClick={() => setIsModalOpen(true)}
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-obs-navy"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-obs-border shadow-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-obs-surface text-obs-navy font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 text-obs-text-muted" />
              </Link>
            ))}
            <div className="h-px bg-obs-border my-2" />
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
            >
              Contact Us
            </Button>
            <Button
              className="w-full justify-center"
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
            >
              Book Demo
            </Button>
          </div>
        )}
      </header>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
