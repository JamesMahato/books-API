'use client'

import Counter from "@/components/counter";
import Feedback from "@/components/feedback";
import { useState } from "react";

const Hello = () => {  //props is an object type.
  return(
    <>
    <p> Hello World </p>
    </>

  )
}

// const Hello = (props) => {
//   console.log(props);
//   // const {name, age} = props;
//   return (
//     <>
//       <p>Hello {props.name}, you're {props.age} years old </p>
//     </>
//     )
// }

export default function Home() {
  const now = new Date();
  const friends = [
    {name: 'Jessie', age : 25},
    {name: 'Gustavo', age : 52},
    {name: 'Hank', age : 49}
  ]
  // const name = 'Walter White';

  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  return (
    // <>

    // <h1>Welcome to React</h1>
    // <p>It is {now.toString()}.</p>
    // {/* <Hello name={name} age={47}/> */}
    // {friends.map((friend, index) => (
    //           <Hello key={index} name={friend.name} age={friend.age} />
    // ))}
    
    // <Counter count={count} handleClick={handleClick}/>
    // <Counter count={count} handleClick={handleClick}/> 

    // <p> . </p>
    // <p> . </p>
    
    // {/* <h1> Hello World, React! </h1> */}
    // {/* <p> Current time is {now.toString()}. </p> */}


    // {/* <Task1/> */}


    // {/* <Task2/> */}


    // <Feedback/>


    // </>
  )
}


  

