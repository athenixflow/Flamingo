export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  product: [
    { label: "All Products", href: "/products" },
    { label: "Tires & Wheels", href: "/products?filter=tires" },
    { label: "Ceramic", href: "/products?filter=ceramic" },
    { label: "Interior", href: "/products?filter=interior" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "General Inquiry", href: "/contact?type=general" },
    { label: "Become a Distributor", href: "/contact?type=distributor" },
  ],
};
