import React, { FormEvent, useState } from "react";
import appPreview from '../public/app-nlw-copa-preview.png'
import Image from 'next/image'
import logoImg from '../public/logo.svg'
import userAvatar from '../public/users-avatar-example.png'
import iconCheck from '../public/icon-check.svg'
import { api } from  '../lib/axios'
import { GetStaticProps } from 'next'

interface HomeProps {
  boloesCount: number;
  guessesCount: number;
  userCount: number;
}


export default function Home(props: HomeProps) {
  const [bolaoTitle, setBolaoTitle] = useState(" ")

  async function createBolao(event: FormEvent) {
    event.preventDefault( )

    try {
      const response = await api.post('bolao', {
        title: bolaoTitle,
      });

      const { code } = response.data

      await navigator.clipboard.writeText(code) //copiar content

      alert('Bolão criado com sucesso!')

      setBolaoTitle(" ")
    } catch (err) {
      console.log(err)
      alert('Falha ao criar bolão, tente novamente!')
    }
  }
  return (
        <div className="max-w-[1156px] min-h-screen px-4 pt-[3.75rem] pb-24 mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW cup"/>

        <h1 className="mt-14 text-white text-xl font-bold leading-tight"> 
        Faça o seu bolão e compartilhe com a galera
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatar} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-default-500">{props.userCount}</span> pessoas já estão no clima!
          </strong>
        </div>

        <form onSubmit={createBolao} className="mt-10  flex gap-2">
          <input className="flex-1 flex px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
          type="text" 
          required 
          placeholder="Qual o nome do seu bolão?" 
          onChange={event => setBolaoTitle(event.target.value)}
          value={bolaoTitle}
          />
         

          <button className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          type="submit">CRIAR MEU BOLÃO</button>
        </form>

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código!</p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div>
                <span className="font bold text-2xl">{props.boloesCount}</span> Bolões criados
              </div>
            </div>
            <div className="2-px h-14 bg-gray-600"></div>
            <div className="items-center gap-6 flex">
              <Image src={iconCheck} alt=""/>
              <div className="flex flex-col">
                <span className="font bold text-2xl">{props.guessesCount}</span> Palpites
              </div>
            </div>
          </div>
      </main>
      <footer className="flex">
        <Image 
        src={appPreview} alt="Dois Celulares exibidos" 
        quality={100}
        />
      </footer>
    </div>
  )
}

//consumindo a api
export const getStaticProps: GetStaticProps  = async () => {
  const [bolaoCountResponse,  guessesCountResponse, userCountResponse] = await Promise.all([
   api.get('bolao/count'),
   api.get('guess/count'),
   api.get('user/count')
  ])

  return {
    props: {
      bolaoCount:bolaoCountResponse.data.count,
      guessesCount:guessesCountResponse.data.count,
      userCount:userCountResponse.data.count,
    }
  }
}
