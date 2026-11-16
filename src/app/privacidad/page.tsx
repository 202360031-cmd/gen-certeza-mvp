import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, Section } from "@/components/legal/LegalDocument";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = { title: "Aviso de privacidad" };

export default function PrivacyPage() {
  return (
    <LegalDocument
      current="/privacidad"
      title="Aviso de privacidad integral"
      intro="Este aviso explica qué datos personales recabamos, para qué los usamos y cómo puede usted controlar su uso, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
    >
      <Section title="1. Responsable del tratamiento">
        <p>
          <strong>{LEGAL.razonSocial}</strong>, que opera bajo el nombre
          comercial {LEGAL.nombreComercial} (en adelante, «el Responsable»), con
          domicilio en {LEGAL.domicilio}, es responsable del tratamiento de sus
          datos personales.
        </p>
        <p>
          Para cualquier asunto relacionado con sus datos puede escribir a{" "}
          <strong>{LEGAL.correoPrivacidad}</strong>.
        </p>
      </Section>

      <Section title="2. Datos personales que tratamos">
        <p>Según el servicio que solicite, tratamos estas categorías:</p>
        <ul>
          <li>
            <strong>Identificación y contacto:</strong> nombre completo, correo
            electrónico, teléfono, ciudad, domicilio o lugar para la toma de
            muestra, y los datos de su identificación oficial.
          </li>
          <li>
            <strong>Datos de los participantes en la prueba:</strong> nombre,
            fecha de nacimiento, parentesco declarado, fotografía, firma y
            huella dactilar asentadas en el acta de toma de muestra.
          </li>
          <li>
            <strong>Datos de menores de edad:</strong> los del recién nacido,
            niña, niño o adolescente que participa, así como los documentos que
            acreditan quién ejerce la patria potestad o la tutela.
          </li>
          <li>
            <strong>Datos del servicio:</strong> folio, servicio y modalidad
            elegidos, fechas y estatus de la muestra.
          </li>
        </ul>
        <p>
          <strong>Datos personales sensibles.</strong> Para realizar la prueba
          tratamos datos que la ley considera sensibles y que protegemos con
          medidas reforzadas:
        </p>
        <ul>
          <li>
            muestras biológicas (hisopado bucal y, en la prueba prenatal, sangre
            de la madre gestante);
          </li>
          <li>
            el perfil genético obtenido de esas muestras, limitado a los
            marcadores necesarios para comparar el parentesco;
          </li>
          <li>
            el resultado de la prueba (existencia o no de vínculo biológico);
          </li>
          <li>
            en la prueba prenatal, datos de salud indispensables, como las
            semanas de gestación.
          </li>
        </ul>
        <p>
          El análisis se limita a marcadores de identificación. No analizamos ni
          informamos sobre enfermedades, predisposiciones ni otros rasgos
          genéticos.
        </p>
      </Section>

      <Section title="3. Finalidades del tratamiento">
        <p>
          Usamos sus datos únicamente para las siguientes finalidades, todas
          necesarias para prestar el servicio que usted solicita:
        </p>
        <ol>
          <li>
            Registrar su solicitud y coordinar la cita de toma de muestra.
          </li>
          <li>
            Verificar la identidad de los participantes y recabar su
            consentimiento.
          </li>
          <li>
            Tomar, trasladar y analizar las muestras, documentando la cadena de
            custodia cuando el servicio la incluye.
          </li>
          <li>
            Emitir y entregar el informe de resultados o el dictamen pericial.
          </li>
          <li>
            Permitirle consultar el estatus de su caso mediante su folio y un
            código de verificación.
          </li>
          <li>
            Cumplir obligaciones legales y atender requerimientos de autoridad
            competente.
          </li>
        </ol>
        <p>
          <strong>
            No usamos sus datos para publicidad, mercadotecnia ni elaboración de
            perfiles
          </strong>
          , y no existen finalidades secundarias. Si en el futuro quisiéramos
          usar sus datos para un fin distinto, le pediremos antes un nuevo
          consentimiento.
        </p>
      </Section>

      <Section title="4. Consentimiento">
        <p>
          Por tratarse de datos sensibles, necesitamos su{" "}
          <strong>consentimiento expreso</strong>. Lo recabamos en dos momentos:
        </p>
        <ul>
          <li>
            al enviar su solicitud en este sitio, marcando la casilla de
            aceptación, que queda registrada con fecha, hora y versión de este
            aviso; y
          </li>
          <li>
            por escrito y con firma autógrafa de cada participante el día de la
            toma de muestra, en el formato de{" "}
            <Link href="/consentimiento" className="text-navy underline">
              consentimiento informado
            </Link>
            .
          </li>
        </ul>
        <p>
          Por las personas menores de edad consiente quien ejerce la patria
          potestad o la tutela. No procesamos muestras de ninguna persona sin su
          consentimiento o el de su representante legal, salvo mandato de
          autoridad judicial.
        </p>
      </Section>

      <Section title="5. Con quién compartimos sus datos">
        <p>
          <strong>No vendemos ni cedemos sus datos.</strong> Solo los
          comunicamos en estos casos:
        </p>
        <ul>
          <li>
            <strong>
              Laboratorio de análisis y personal de toma de muestra
            </strong>
            , que actúan por cuenta nuestra como encargados, bajo contrato de
            confidencialidad y únicamente para realizar la prueba. Las muestras
            viajan identificadas por folio, no por nombre.
          </li>
          <li>
            <strong>Proveedores tecnológicos</strong> (alojamiento del sitio,
            base de datos y envío de correo), algunos ubicados fuera de México,
            que procesan la información por cuenta nuestra. Sus datos de
            contacto se almacenan cifrados.
          </li>
          <li>
            <strong>Autoridades competentes</strong>, cuando exista un mandato
            fundado y motivado, o cuando usted mismo nos pida presentar el
            dictamen ante un juzgado o una autoridad.
          </li>
        </ul>
        <p>Cualquier otra transferencia requerirá su consentimiento previo.</p>
      </Section>

      <Section title="6. Sus derechos (ARCO) y cómo ejercerlos">
        <p>
          Usted puede, en todo momento, <strong>acceder</strong> a sus datos,{" "}
          <strong>rectificarlos</strong> si son inexactos,{" "}
          <strong>cancelarlos</strong> cuando considere que no se requieren para
          las finalidades señaladas, u <strong>oponerse</strong> a su
          tratamiento. También puede <strong>revocar su consentimiento</strong>{" "}
          o pedir que limitemos el uso o divulgación de sus datos.
        </p>
        <p>Para hacerlo, envíe una solicitud a {LEGAL.correoPrivacidad} con:</p>
        <ol>
          <li>su nombre y un medio para comunicarle la respuesta;</li>
          <li>
            copia de su identificación oficial y, en su caso, el documento que
            acredite la representación;
          </li>
          <li>su folio de seguimiento, si lo tiene;</li>
          <li>
            la descripción clara del derecho que desea ejercer y de los datos a
            los que se refiere.
          </li>
        </ol>
        <p>
          Le responderemos en un plazo máximo de [20] días hábiles y, si su
          solicitud procede, la haremos efectiva dentro de los [15] días hábiles
          siguientes. El ejercicio de estos derechos es gratuito.
        </p>
        <p>
          Tenga en cuenta que, si revoca su consentimiento antes de que concluya
          el análisis, no podremos emitir el resultado; y que no podremos
          eliminar la información que debamos conservar por obligación legal o
          por mandato de autoridad.
        </p>
      </Section>

      <Section title="7. Conservación y destrucción">
        <ul>
          <li>
            <strong>Muestras biológicas:</strong> se destruyen de forma segura{" "}
            {LEGAL.diasConservacionMuestra} días naturales después de entregado
            el resultado, salvo que usted solicite por escrito un plazo distinto
            o que una autoridad ordene su resguardo.
          </li>
          <li>
            <strong>Expediente</strong> (dictamen, acta de cadena de custodia y
            consentimientos): se conserva {LEGAL.aniosConservacionExpediente}{" "}
            años para poder ratificar el dictamen ante una autoridad, y después
            se elimina.
          </li>
          <li>
            <strong>Solicitudes que no se concretan:</strong> se eliminan a los
            [90] días naturales.
          </li>
        </ul>
      </Section>

      <Section title="8. Cómo protegemos su información">
        <ul>
          <li>
            Sus datos de contacto se guardan cifrados; ni siquiera quien
            administra la base de datos puede leerlos sin la clave.
          </li>
          <li>
            El estatus de su caso solo se muestra tras confirmar un código
            enviado a su correo, con intentos limitados.
          </li>
          <li>
            El resultado de la prueba nunca se publica en este sitio: se entrega
            únicamente al solicitante, previa verificación de identidad.
          </li>
          <li>
            El personal y los proveedores con acceso a la información están
            sujetos a obligaciones de confidencialidad.
          </li>
        </ul>
        <p>
          Si ocurriera una vulneración de seguridad que afecte de forma
          significativa sus derechos, se lo informaremos sin demora.
        </p>
      </Section>

      <Section title="9. Cookies">
        <p>
          Este sitio no usa cookies publicitarias ni de seguimiento. Únicamente
          utiliza una cookie técnica, de 15 minutos de duración, para mantener
          abierta su consulta de estatus después de verificar su código.
        </p>
      </Section>

      <Section title="10. Cambios a este aviso">
        <p>
          Publicaremos cualquier modificación en esta misma página, indicando la
          fecha y la versión. Si el cambio afecta la forma en que tratamos datos
          de un caso en curso, se lo comunicaremos por el medio de contacto que
          nos proporcionó.
        </p>
      </Section>

      <Section title="11. Autoridad">
        <p>
          Si considera que su derecho a la protección de datos personales ha
          sido vulnerado, puede acudir a la Secretaría Anticorrupción y Buen
          Gobierno, autoridad federal competente en la materia.
        </p>
      </Section>
    </LegalDocument>
  );
}
