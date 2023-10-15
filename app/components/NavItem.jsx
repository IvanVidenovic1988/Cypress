import Link from "next/link";

export default function NavItem({ label, path }) {
  return (
    <Link data-test={`nav-item-${label}`} href={path}>
      {label}
    </Link>
  );
}
