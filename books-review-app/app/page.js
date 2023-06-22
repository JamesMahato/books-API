import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      {/* <TestComponent/>
       */}
       <li>
          <Link href="/about">About</Link>
       </li>
       <li>
          <Link href="/contact">Contact</Link>
       </li>

    </div>
  )
}
