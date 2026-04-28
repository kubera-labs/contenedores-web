import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Términos y Condiciones | ${siteConfig.name}`,
  description: `Términos y condiciones de uso de los servicios de ${siteConfig.name}.`,
};

export default function TerminosPage() {
  return (
    <div className="container-base py-24 md:py-32 max-w-4xl mx-auto">
      <h1 className="heading-2 mb-8">Términos y Condiciones</h1>
      
      <div className="prose prose-slate prose-invert max-w-none" style={{ color: "var(--foreground-secondary)" }}>
        <p className="mb-4">
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>1. Alquiler y Venta</h2>
        <p className="mb-4">
          Todos los servicios de venta, alquiler temporario o prolongado de unidades, y modificaciones de contenedores brindados por {siteConfig.name} están sujetos a los presentes términos. Las cotizaciones emitidas tienen una validez de 7 días corridos, salvo que se exprese lo contrario por escrito.
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>2. Envíos y Logística</h2>
        <p className="mb-4">
          La entrega y descarga requiere que el terreno esté nivelado, sea firme y de fácil acceso para los vehículos de carga pesada. En caso de no cumplir con estos requisitos, los costos adicionales generados correrán por cuenta del cliente.
        </p>
        
        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>3. Garantías</h2>
        <p className="mb-4">
          {siteConfig.name} ofrece una garantía estandar de 3 meses sobre modificaciones estructurales y sobre la estanqueidad de las unidades de vivienda, contados a partir de la entrega. La garantía se anula si se constata dolo, modificaciones no autorizadas o mal uso de la estructura. 
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>4. Pagos y Financiación</h2>
        <p className="mb-4">
          Los pagos podrán gestionarse mediante transferencia bancaria o a través de nuestros canales oficiales. La financiación en cuotas queda sujeta a la aprobación y análisis crediticio bajo normativa vigente en unidades indexadas.
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>5. Contacto</h2>
        <p className="mb-4">
          Para cualquier consulta referida a estos términos, comuníquese con nosotros a través de nuestro correo electrónico: <a href={`mailto:${siteConfig.email}`} className="text-accent-500 hover:underline">{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}