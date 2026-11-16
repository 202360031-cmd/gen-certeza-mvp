import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, Section } from "@/components/legal/LegalDocument";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Consentimiento informado y cadena de custodia",
};

export default function ConsentPage() {
  return (
    <LegalDocument
      current="/consentimiento"
      title="Consentimiento informado y cadena de custodia"
      intro="Este es el contenido del documento que cada participante lee y firma el día de la toma de muestra. Lo publicamos para que pueda conocerlo con anticipación."
    >
      <Section title="1. Qué se va a hacer">
        <p>
          La prueba compara marcadores genéticos de los participantes para
          determinar si existe o no un vínculo biológico entre ellos. Según el
          servicio, la muestra es:
        </p>
        <ul>
          <li>
            <strong>Hisopado bucal:</strong> se frota suavemente un hisopo
            estéril en la cara interna de la mejilla. Es indoloro y no implica
            riesgo, incluso en recién nacidos.
          </li>
          <li>
            <strong>Sangre venosa de la madre gestante</strong> (solo prueba
            prenatal): una extracción convencional del brazo. Puede causar
            molestia leve o un pequeño hematoma en el sitio de punción. No
            implica riesgo para el embarazo.
          </li>
        </ul>
        <p>
          El análisis se limita a marcadores de identificación. No se estudian
          enfermedades ni otros rasgos genéticos.
        </p>
      </Section>

      <Section title="2. Lo que debe saber antes de firmar">
        <ul>
          <li>
            <strong>El resultado puede no ser el esperado</strong> y tener
            consecuencias emocionales, familiares y legales para usted y para
            terceros. Le sugerimos considerar con quién y cómo lo compartirá.
          </li>
          <li>
            <strong>Alcance del resultado.</strong> Una exclusión de paternidad
            es concluyente. Una inclusión se expresa como probabilidad,
            habitualmente superior al 99.9 %. En casos poco frecuentes
            (parientes cercanos entre los posibles padres, mutaciones, muestra
            insuficiente) puede requerirse una nueva muestra o un análisis
            ampliado.
          </li>
          <li>
            <strong>Prueba prenatal:</strong> requiere al menos 7 semanas de
            gestación. Si la cantidad de ADN fetal en la sangre materna es
            insuficiente, se le pedirá una nueva muestra más adelante. No es
            apta, o tiene limitaciones, en embarazos múltiples o cuando los
            posibles padres son parientes cercanos; informe de ello al
            coordinador.
          </li>
          <li>
            <strong>Participación voluntaria.</strong> Nadie está obligado a
            participar. Puede retirar su consentimiento en cualquier momento
            antes de que concluya el análisis; en ese caso su muestra se
            destruye y no se emite resultado.
          </li>
        </ul>
      </Section>

      <Section title="3. Quién debe consentir">
        <ul>
          <li>
            <strong>Personas mayores de edad:</strong> cada participante firma
            por sí mismo. No se aceptan muestras obtenidas sin el conocimiento
            de la persona a quien pertenecen (cabello, cepillos, utensilios u
            otros objetos).
          </li>
          <li>
            <strong>Personas menores de edad:</strong> firma quien ejerce la
            patria potestad o la tutela, y debe acreditarlo con el acta o el
            certificado de nacimiento y su identificación. Si la patria potestad
            corresponde a ambos progenitores y uno de ellos se opone, la prueba
            solo puede realizarse por orden de un juez. A partir de los 12 años
            se recaba también la opinión de la persona adolescente.
          </li>
          <li>
            <strong>Prueba prenatal:</strong> el consentimiento de la madre
            gestante es indispensable; sin él no se toma ni se analiza muestra
            alguna.
          </li>
          <li>
            <strong>Verificación de identidad neonatal:</strong> consiente la
            madre por sí misma y por el recién nacido, y el padre si participa.
          </li>
        </ul>
      </Section>

      <Section title="4. Cadena de custodia">
        <p>
          La cadena de custodia es el registro ininterrumpido de quién tuvo la
          muestra en cada momento, desde que se toma hasta que se analiza. En
          los servicios que la incluyen se sigue este procedimiento:
        </p>
        <ol>
          <li>
            <strong>Identificación.</strong> Cada participante presenta
            identificación oficial vigente con fotografía. Se anexa copia, se
            toma una fotografía en el acto y se recaba su huella dactilar. Por
            el menor se presenta acta o certificado de nacimiento.
          </li>
          <li>
            <strong>Toma por tercero imparcial.</strong> La muestra la toma
            personal sanitario que no tiene interés en el resultado. Los
            participantes nunca manipulan las muestras.
          </li>
          <li>
            <strong>Sellado.</strong> Cada muestra se guarda en un sobre
            individual con un precinto numerado e inviolable, que se cierra en
            presencia de los participantes. Ellos y quien toma la muestra firman
            sobre el cierre.
          </li>
          <li>
            <strong>Acta de toma de muestra.</strong> Se asientan lugar, fecha y
            hora, datos de los participantes, parentesco declarado, números de
            precinto y nombre y firma de quien tomó la muestra.
          </li>
          <li>
            <strong>Traslado y recepción.</strong> Cada entrega se registra con
            nombre, firma, fecha y hora. El laboratorio verifica que los
            precintos estén íntegros y coincidan con el acta; si no es así,
            rechaza la muestra y se programa una nueva toma sin costo.
          </li>
          <li>
            <strong>Dictamen.</strong> El dictamen pericial lo firma una persona
            perita en genética e incorpora la referencia al acta y a los
            precintos.
          </li>
        </ol>
        <p>
          La <strong>prueba informativa</strong> no documenta cadena de
          custodia. Su resultado sirve para conocimiento personal y no puede
          presentarse como dictamen ante un juzgado. Consulte las diferencias en{" "}
          <Link href="/validez-juridica" className="text-navy underline">
            validez jurídica
          </Link>
          .
        </p>
      </Section>

      <Section title="5. Entrega del resultado y confidencialidad">
        <ul>
          <li>
            El resultado se entrega únicamente al solicitante y a los
            participantes adultos que así lo hayan pedido al firmar, previa
            verificación de identidad. No se da información por teléfono.
          </li>
          <li>
            No se entrega a terceros, salvo autorización escrita del solicitante
            o mandato de autoridad competente.
          </li>
          <li>
            Las muestras se destruyen {LEGAL.diasConservacionMuestra} días
            naturales después de entregado el resultado, y no se usan para
            ningún otro fin.
          </li>
          <li>
            El tratamiento de los datos personales se rige por el{" "}
            <Link href="/privacidad" className="text-navy underline">
              aviso de privacidad
            </Link>
            .
          </li>
        </ul>
      </Section>

      <Section title="6. Declaración que se firma">
        <p>
          El día de la toma de muestra, cada participante firma lo siguiente:
        </p>
        <blockquote className="rounded-md border border-line bg-surface p-5 text-ink">
          <p>
            «Declaro, bajo protesta de decir verdad, que los datos y documentos
            que proporciono son verdaderos; que se me explicó en qué consiste la
            prueba, sus alcances y limitaciones, y que resolvieron mis dudas;
            que participo de manera libre y voluntaria; que la muestra que se
            identifica con mi nombre fue tomada de mi persona [o de la persona
            menor de edad a quien represento, sobre quien ejerzo la patria
            potestad o la tutela] y sellada en mi presencia; y que otorgo mi
            consentimiento expreso para que {LEGAL.razonSocial} trate mis datos
            personales, incluidos los sensibles y mi muestra biológica,
            exclusivamente para realizar la prueba solicitada, conforme al aviso
            de privacidad que tuve a la vista.»
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Nombre completo · Firma autógrafa · Huella dactilar · Lugar, fecha y
            hora · Nombre y firma de quien toma la muestra
          </p>
        </blockquote>
      </Section>
    </LegalDocument>
  );
}
