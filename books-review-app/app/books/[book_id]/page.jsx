'use client'

import { useRouter } from "next/navigation";

export default function page({ params }) {
    const router = useRouter()

    const handledel = () => {
        router.push("/books")
    }

    console.log(params);
    return (
    <div>
      <p>This is book page for {params.book_id}</p>
      <button onClick={handledel}>delete</button>
    </div>
  )
}
