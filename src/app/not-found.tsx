import Link from "next/link";
export default function NotFound() {
  return (
    <div className="auth">
      <h1>404</h1>
      <h2>This page isn't on our shelves.</h2>
      <p>It may have moved, or never existed.</p>
      <Link className="btn" href="/">
        Back to home
      </Link>
    </div>
  );
}
