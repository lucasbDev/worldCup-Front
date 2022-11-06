import React from "react";
import appPreview from '../assets/app-nwl-preview.png'
import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import userAvatar from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'

interface HomeProps {
  boloesCount: number;
}


export default function Home(props: HomeProps) {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW cup"/>

        <h1 className="mt-14 text-white text-xl font-bold leading-tight"> Faça o seu bolão e compartilhe com a galera</h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatar} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-default-500">+20.992</span> pessoas já estão no clima!
          </strong>
        </div>

        <form className="mt-10  flex gap-2">
          <input className="flex-1 flex px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm"type="text" required placeholder="Qual o nome do seu bolão?" />
          <button className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"type="submit">CRIAR MEU BOLÃO</button>
        </form>

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código!</p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div>
                <span className="font bold text-2xl">{props.boloesCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>
            <div className="2-px h-14 bg-gray-600"></div>
            <div className="flex items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div>
                <span className="font bold text-2xl">+1643</span>
                <span>Bolões Palpites</span>
              </div>
            </div>
          </div>
      </main>

      <Image 
      src={appPreview} alt="Dois Celulares exibidos" 
      quality={100}
      />
    </div>
  )
}

//consumindo a api
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/boloes/count')
  const data = await response.json()

  console.log(data)

  return {
    props: {
      bolaoCount: data.count,
    }
  }
}
