import React, { FormEvent, useState } from "react";
import appPreview from '../public/app-nlw-copa-preview.png'
import Image from 'next/image'
import logoImg from '../public/logo.svg'
import userAvatar from '../public/users-avatar-example.png'
import iconCheck from '../public/icon-check.svg'
import { api } from  '../lib/axios'
import toast, { Toaster } from 'react-hot-toast';
import { GetStaticProps } from 'next'

interface HomeProps {
  boloesCount: number;
  guessesCount: number;
  userCount: number;
}


export default function Home(props: HomeProps) {
  const [bolaoTitle, setBolaoTitle] = useState<string>(" ");
  const [isCreatingPool, setIsCreatingPool] = useState<boolean>(false);


  async function createBolao(event: FormEvent) {
    setIsCreatingPool(true);
    event.preventDefault( )

    toast.promise(
			api
				.post(
					'pools',
					{
						title: poolTitle,
					},
					{
						timeout: 10000,
					}
				)
				.then(
					(response) =>
						new Promise((resolve) => {
							setTimeout(() => {
								const { code } = response.data;
								navigator.clipboard.writeText(code);
								setPoolTitle('');
								setIsCreatingPool(false);
								resolve(code);
							}, 1000);
						})
				)
				.catch((err) => {
					setPoolTitle('');
					setIsCreatingPool(false);
					throw err;
				}),

			{
				loading: 'Criando o bolão...',
				success:
					'Bolão criado com sucesso!',
				error: 'Erro ao criar o bolão, tente novamente!',
			},
			{
				className: 'toast-container',
				duration: 5000,
			}
		);
	}

  return (
        <div className="max-w-[1156px] min-h-screen px-4 pt-[3.75rem] pb-24 mx-auto grid grid-cols-2 gap-28 items-center">
          <main className='max-w-[680px]  lg:max-w-lg mx-auto'>
            <Image src={logoImg} alt="NLW Cup"/>

          <h1 className="mt-14 text-white text-xl font-bold leading-tight"> 
        Faça o seu bolão e compartilhe com a galera
          </h1>

        <div className="className='mt-10 flex flex-col gap-2 sm:flex-row sm:items-center'">
          <Image src={userAvatar} alt="" className='w-32 sm:w-36' />
          <strong className="text-gray-100 text-xl">
            <span className="text-default-500">{props.userCount}</span> pessoas já estão no clima!
          </strong>
        </div>

        <form
					onSubmit={createPool}
					className='mt-10 flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-2'>
					<input
						type='text'
						value={poolTitle}
						onChange={(event) => setPoolTitle(event.target.value)}
						required
						placeholder='Qual nome do seu bolão?'
						className='flex-1 w-full md:w-auto py-4 px-6 rounded bg-gray-800 placeholder:text-gray-200 text-gray-100 border border-gray-600 text-sm'
					/>

          <button
						type='submit'
						disabled={isCreatingPool}
						className='py-4 px-6 w-full md:w-auto rounded bg-nlw-yellow-500 text-sm uppercase font-bold text-gray-900 hover:bg-nlw-yellow-700 transition-colors'>
						Criar meu bolão
					</button>
				</form>


          <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código!</p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div className='flex flex-col gap-1'>
                <span className="font bold text-2xl">{props.boloesCount}</span>
                <span> Bolões criados </span>
              </div>
            </div>
            <div className="2-px h-14 bg-gray-600"></div>

            <div className="items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div className="flex flex-col gap-1">
                <span className="font bold text-2xl">{props.guessesCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
      </main>
      <Image
				src={appPreviewImg}
				alt='Dois celulares sendo exibidos'
				quality={100}
				className='pb-12 lg:pb-0'
			/>
      <Toaster />
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
    },
    revalidate: 15 * 60,
  }
}