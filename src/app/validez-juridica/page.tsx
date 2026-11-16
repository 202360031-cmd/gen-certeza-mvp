import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, Section } from "@/components/legal/LegalDocument";

export const metadata: Metadata = { title: "Validez jurídica" };

export default function LegalValidityPage() {
  return (
    <LegalDocument
      current="/validez-juridica"
      title="Validez jurídica de los resultados"
      intro="Qué puede y qué no puede hacerse con un resultado genético ante un juzgado, el Registro Civil o un hospital en el estado de Veracruz."
    >
      <Section title="1. Dos tipos de resultado">
        <ul>
          <li>
            <strong>Dictamen pericial con cadena de custodia</strong> (prueba
            legal). Los participantes fueron identificados, las muestras se
            sellaron ante ellos y cada traslado quedó registrado. Está firmado
            por una persona perita en genética y puede presentarse ante una
            autoridad.
          </li>
          <li>
            <strong>Informe informativo</strong> (prueba privada). El análisis
            de laboratorio es el mismo, pero no se acredita de quién proviene
            cada muestra. Sirve para conocimiento personal y{" "}
            <strong>no tiene valor probatorio</strong>. Si después lo necesita
            ante una autoridad, deberá repetirse como prueba legal.
          </li>
        </ul>
      </Section>

      <Section title="2. Para qué sirve un dictamen con cadena de custodia">
        <ul>
          <li>
            <strong>Reconocimiento voluntario.</strong> Con un resultado claro,
            muchas familias resuelven sin juicio: el padre reconoce a la hija o
            al hijo ante el Registro Civil. El dictamen no sustituye ese
            trámite, pero suele ser lo que permite llegar a él.
          </li>
          <li>
            <strong>
              Juicios de reconocimiento, desconocimiento o impugnación de
              paternidad, y de alimentos.
            </strong>{" "}
            El dictamen puede ofrecerse como prueba. Su abogado decidirá la
            forma de hacerlo y, de ser necesario, la persona perita acude a
            ratificarlo.
          </li>
          <li>
            <strong>Posible cambio de recién nacidos.</strong> El informe
            respalda la reclamación ante el hospital y la denuncia ante la
            Fiscalía, que podrá ordenar sus propias diligencias.
          </li>
        </ul>
      </Section>

      <Section title="3. Lo que decide la autoridad, no el laboratorio">
        <p>
          Es importante que conozca los límites antes de contratar una prueba
          con fines legales:
        </p>
        <ul>
          <li>
            <strong>El juez valora la prueba.</strong> Ningún laboratorio puede
            garantizar que un dictamen privado será admitido o que bastará por
            sí solo. En Veracruz, la prueba pericial en genética molecular (ADN)
            está prevista expresamente en el Código Civil para acreditar la
            filiación, y es el juez quien vigila que se practique conforme a la
            ley y que el perito esté certificado en genética.
          </li>
          <li>
            <strong>El juez puede ordenar una nueva prueba.</strong> Dentro de
            un juicio es habitual que el juzgado ordene la pericial y que cada
            parte, o el propio juzgado, designe perito. En ese caso nuestro
            dictamen previo sirve como antecedente, y podemos participar como
            perito de parte si su abogado lo propone.
          </li>
          <li>
            <strong>Negativa a someterse a la prueba.</strong> Si en un juicio
            el presunto progenitor se niega sin causa justificada a la prueba
            ordenada por el juez, la legislación y los criterios de la Suprema
            Corte permiten presumir la paternidad, salvo prueba en contrario.
            Esa consecuencia solo opera frente a una orden judicial, no frente a
            una invitación privada.
          </li>
          <li>
            <strong>Prueba prenatal.</strong> Su resultado permite tomar
            decisiones y prepararse, pero la filiación se establece legalmente
            después del nacimiento. Para efectos judiciales lo habitual es
            confirmar con una prueba neonatal con cadena de custodia.
          </li>
        </ul>
      </Section>

      <Section title="4. Qué hace que un dictamen sea sólido">
        <ol>
          <li>
            <strong>Identificación fehaciente</strong> de cada participante, con
            identificación oficial, fotografía y huella.
          </li>
          <li>
            <strong>Consentimiento informado</strong> firmado por cada
            participante o su representante legal. Toda prueba genética requiere
            la aceptación expresa de la persona o de su representante.
          </li>
          <li>
            <strong>Toma por un tercero imparcial</strong> y muestras selladas
            con precinto numerado.
          </li>
          <li>
            <strong>Registro continuo de la custodia</strong>, de la toma al
            análisis.
          </li>
          <li>
            <strong>
              Perito con cédula profesional y especialidad acreditable
            </strong>
            , disponible para ratificar el dictamen.
          </li>
          <li>
            <strong>Laboratorio con acreditación vigente</strong> y métodos
            validados. [Indicar aquí la acreditación del laboratorio asociado.]
          </li>
        </ol>
        <p>
          El procedimiento completo se describe en{" "}
          <Link href="/consentimiento" className="text-navy underline">
            consentimiento informado y cadena de custodia
          </Link>
          .
        </p>
      </Section>

      <Section title="5. Marco normativo de referencia">
        <ul>
          <li>
            Constitución Política de los Estados Unidos Mexicanos, artículo 4.º
            (derecho a la identidad e interés superior de la niñez).
          </li>
          <li>Ley General de los Derechos de Niñas, Niños y Adolescentes.</li>
          <li>
            Ley General de Salud, título sobre el genoma humano (consentimiento
            expreso para estudios genéticos y no discriminación).
          </li>
          <li>
            Código Civil para el Estado de Veracruz, capítulos de paternidad y
            filiación (entre otros, artículos 289 Bis y 314).
          </li>
          <li>Legislación procesal civil y familiar aplicable en Veracruz.</li>
          <li>
            Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares (DOF 20 de marzo de 2025).
          </li>
        </ul>
      </Section>

      <Section title="6. Recomendación">
        <p>
          Esta página es informativa y no constituye asesoría legal. Si su
          objetivo es un procedimiento judicial o administrativo, consulte a una
          abogada o un abogado <strong>antes</strong> de la toma de muestra: en
          algunos casos conviene que la prueba se solicite y ordene directamente
          dentro del juicio.
        </p>
      </Section>
    </LegalDocument>
  );
}
