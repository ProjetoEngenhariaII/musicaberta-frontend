import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Footer() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <footer className="bg-slate-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <p className="text-sm">
              Somos apaixonados por fornecer partituras de alta qualidade para
              músicos de todos os níveis. Você também pode fazer o upload da sua
              própria partitura.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Nossas redes</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img src="facebook.svg" className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="instagram.svg" className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img src="github.svg" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Músicaberta. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
