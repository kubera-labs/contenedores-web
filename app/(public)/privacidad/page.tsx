import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Política de Privacidad | ${siteConfig.name}`,
  description: `Política de Privacidad y Tratamiento de Datos en ${siteConfig.name}.`,
};

export default function PrivacidadPage() {
  return (
    <div className="container-base py-24 md:py-32 max-w-4xl mx-auto">
      <h1 className="heading-2 mb-8">Política de Privacidad</h1>
      
      <div className="prose prose-slate prose-invert max-w-none" style={{ color: "var(--foreground-secondary)" }}>
        <p className="mb-4">
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </p>

        <p className="mb-4">
          La presente Política de Privacidad establece los términos en que <strong>{siteConfig.name}</strong> usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web y solicitar servicios de cotización, alquiler o compra de contenedores.
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>1. Información que es recogida</h2>
        <p className="mb-4">
          Nuestro sitio web podrá recoger información personal como: Nombre, información de contacto (correo electrónico, número de teléfono WhatsApp) y, si solicita logística o envío, información demográfica como dirección residencial.
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>2. Uso de la información</h2>
        <p className="mb-4">
          La información recogida es de uso exclusivo interno de {siteConfig.name} y se utiliza con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, elaborar presupuestos y cotizaciones en proyectos modulares y fines logísticos.
        </p>
        
        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>3. Protección de Datos</h2>
        <p className="mb-4">
          <strong>{siteConfig.name}</strong> está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado de terceros ni filtración de planos de diseño o datos comerciales.
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>4. Control de su información personal</h2>
        <p className="mb-4">
          En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es entregada a nuestro sitio web. {siteConfig.name} no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez mediante orden judicial.
        </p>

        <h2 className="heading-4 mt-8 mb-4" style={{ color: "var(--foreground)" }}>5. Sus Derechos</h2>
        <p className="mb-4">
          Como titular de los datos, tiene derecho a solicitar en cualquier momento el acceso, modificación o eliminación de su información en nuestras bases de datos contactándonos a través del correo: <a href={`mailto:${siteConfig.email}`} className="text-accent-500 hover:underline">{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}