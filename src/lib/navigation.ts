/** Whether a nav item should appear active for the current pathname. */
export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#") || href.startsWith("#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Products menu is active on product hubs and OpsSpark/OpsMeet pages. */
export function isProductsNavActive(pathname: string): boolean {
  if (pathname === "/" || pathname === "/products" || pathname.startsWith("/products/")) {
    return true;
  }
  return (
    pathname === "/platform" ||
    pathname === "/integrations" ||
    pathname.startsWith("/platform/") ||
    pathname.startsWith("/integrations/")
  );
}

/** Use cases menu is active on AI employee pages. */
export function isUseCasesNavActive(pathname: string): boolean {
  return pathname === "/ai-employees" || pathname.startsWith("/ai-employees/");
}
