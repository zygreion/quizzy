import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-2 text-center text-xs">
      <span>Copyright &copy; </span>
      <Link href="https://github.com/zygreion" className="hover:underline">
        Zumi
      </Link>
    </footer>
  );
}
