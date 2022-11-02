import React from "react";

interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <h1>contagem {props.count}</h1>
  )
}

//consumindo a api
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/boloes/count')
  const data = await response.json()

  console.log(data)

  return {
    props: {
      count: data.count,
    }
  }
}
