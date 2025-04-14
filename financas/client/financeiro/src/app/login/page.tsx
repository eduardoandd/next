import Link from "next/link";

function login() {
    return (
        <main className="bg-[url('https://img.freepik.com/fotos-premium/fundo-financeiro-grafico-do-mercado-de-acoes-tela-de-tecnologia_72615-38.jpg')] bg-no-repeat bg-cover flex min-h-screen flex-col items-center justify-center">
            <form className="flex flex-col bg-white px-8 py-14 rounded-2xl gap-8 text-gray-600">
                <h1 className="font-bold text-2xl">LOGIN</h1>
                <div className="flex flex-col justify-between items-start">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none" />
                </div>
                <div className="flex flex-col justify-between items-start">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none" />
                </div>
                <button className="bg-green-600 py-3 font-bold text-white rounded-2xl hover:bg-green-700">Entrar</button>
                <Link href="/register" className="text-center underline hover:text-gray-700">Cadastrar-se</Link>
            </form>
        </main>
    );
}

export default login