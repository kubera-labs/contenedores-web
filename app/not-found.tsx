import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | Contenedores Web",
  description: "Lo sentimos, no pudimos encontrar la página que buscas dentro de nuestro sitio de contenedores modulares y marítimos.",
};

export default function NotFound() {
  return (
    <main className="flex h-[80vh] flex-col items-center justify-center text-center px-4 gap-6">
      <h1 className="text-9xl font-black text-gray-900 leading-none">404</h1>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Página no encontrada
      </h2>
      <p className="max-w-xl text-lg text-gray-600">
        Parece que el contenedor que buscas no se encuentra en nuestro puerto o fue movido.
      </p>
      <div className="mt-8 flex justify-center gap-x-4">
        <Link
          href="/"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href="/contacto"
          className="inline-block rounded-md px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
        >
          Contactar soporte <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </main>
  );
}