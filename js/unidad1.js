/* ==========================================================
   Aquella vez 2 · Unidad 1
   Textos del manual de Luis Fader. Glosario en ruso: [[palabra|перевод]]
   ========================================================== */
window.UNIDAD = {
  numero: 1,
  secciones: [
    /* ======================================================
       A. ME GUSTA
       ====================================================== */
    {
      id: "a", letra: "A", titulo: "Me gusta", corto: "Me gusta",
      ru: "Мне нравится · вкусы и увлечения",
      lema: "Me gustan mil cosas, pero contigo todas me encantan.",
      bloques: [
        { tipo: "figura", src: "u1-a-dialogo", alt: "Luis y Natalia pasean por Buenos Aires, toman café y conversan" },
        {
          tipo: "dialogo", num: "1", titulo: "Leer el diálogo", ru: "Прочитайте диалог. Наведите курсор или нажмите на подчёркнутое слово, чтобы увидеть перевод.",
          lineas: [
            { p: "Luis", t: "Natalia, [[quiero conocerte|хочу узнать тебя]] [[un poco más|немного лучше]]. ¿Qué te gusta hacer en tu [[tiempo libre|свободное время]]?" },
            { p: "Natalia", t: "Me gustan [[muchas cosas|многое]]. Me gusta [[caminar|гулять, ходить пешком]] por la ciudad, visitar [[cafés tranquilos|тихие кафе]] y [[escuchar|слушать]] música. También [[me encanta|мне очень нравится, обожаю]] leer [[novelas románticas|любовные романы]]." },
            { p: "Luis", t: "[[Qué lindo|Как мило!]]. ¿Y qué [[tipo de música|какую музыку]] escuchas [[normalmente|обычно]]?" },
            { p: "Natalia", t: "[[Depende del día|Зависит от дня]]. Cuando estoy [[tranquila|спокойна]], escucho [[música clásica|классическая музыка]]. Pero cuando estoy [[contenta|довольна, в хорошем настроении]], [[prefiero|предпочитаю]] [[canciones alegres|весёлые песни]]. ¿Y a ti, Luis? ¿Qué te gusta hacer?" },
            { p: "Luis", t: "A mí me gusta [[tocar el piano|играть на пианино]], leer, [[aprender idiomas|учить языки]] y mirar [[partidos de fútbol|футбольные матчи]]. También me gusta [[pasear|гулять, прогуливаться]] [[sin prisa|не спеша]], [[especialmente|особенно]] cuando la ciudad está [[bonita|красивая]]." },
            { p: "Natalia", t: "[[Entonces|Значит, тогда]] tenemos [[algo en común|что-то общее]]: [[a los dos|нам обоим]] nos gusta caminar." },
            { p: "Luis", t: "Sí, [[es verdad|это правда]]. ¿Te gusta caminar por [[lugares nuevos|новые места]]?" },
            { p: "Natalia", t: "Sí, mucho. Me gusta [[descubrir|открывать для себя]] [[calles|улицы]], [[plazas|площади]] y [[pequeños restaurantes|маленькие рестораны]]. Pero no me gustan los lugares con [[demasiado ruido|слишком много шума]]." },
            { p: "Luis", t: "[[A mí tampoco|Мне тоже нет]]. Prefiero los lugares tranquilos, [[donde se puede hablar|где можно поговорить]] bien." },
            { p: "Natalia", t: "Entonces [[un día|однажды, как-нибудь]] podemos pasear [[juntos|вместе]] por Buenos Aires." },
            { p: "Luis", t: "[[Me encantaría|С удовольствием! (Мне бы очень хотелось)]]. Podemos [[tomar un café|выпить кофе]], caminar por una [[avenida|проспект]] bonita y [[después|потом]] [[elegir|выбрать]] un lugar para [[cenar|ужинать]]." },
            { p: "Natalia", t: "[[Me parece|Мне кажется]] un [[plan perfecto|отличный план]]." },
          ],
        },
        {
          tipo: "vf", num: "2", titulo: "Comprensión del diálogo", ru: "Отметьте: верно (V) или неверно (F).",
          imagen: "u1-a-img39", recorte: true, alt: "Natalia",
          items: [
            { t: "Natalia dice que le gusta caminar por la ciudad.", r: true },
            { t: "Natalia prefiere los lugares con mucho ruido.", r: false, nota: "No le gustan los lugares con demasiado ruido." },
            { t: "Luis dice que le gusta tocar el piano.", r: true },
            { t: "A Luis no le gusta aprender idiomas.", r: false, nota: "A Luis le gusta aprender idiomas." },
            { t: "A los dos les gusta caminar.", r: true },
            { t: "Natalia quiere pasear por Buenos Aires con Luis.", r: true },
          ],
        },
        {
          tipo: "pista", titulo: "Recuerda: gustar, encantar, preferir",
          html: `
            <p>Usamos <b>gustar</b> para hablar de gustos. <span class="g" tabindex="0" data-ru="нравиться">gustar</span> concuerda con lo que gusta, no con la persona.</p>
            <table class="tabla-formas">
              <tr><th>¿A quién?</th><th>Pronombre</th><th>+ singular / infinitivo</th><th>+ plural</th></tr>
              <tr><td>a mí</td><td><b>me</b></td><td>me gusta el café</td><td>me gustan los libros</td></tr>
              <tr><td>a ti</td><td><b>te</b></td><td>te gusta leer</td><td>te gustan las plazas</td></tr>
              <tr><td>a él / a ella / a usted</td><td><b>le</b></td><td>le gusta caminar</td><td>le gustan las novelas</td></tr>
              <tr><td>a nosotros/as</td><td><b>nos</b></td><td>nos gusta pasear</td><td>nos gustan los cafés</td></tr>
              <tr><td>a ellos / a ellas / a ustedes</td><td><b>les</b></td><td>les gusta la música</td><td>les gustan los lugares tranquilos</td></tr>
            </table>
            <p><b>encantar</b> = gustar mucho: <i>A Natalia le encanta leer novelas.</i></p>
            <p><b>preferir</b> = elegir una cosa: <i>Luis prefiere los lugares tranquilos.</i></p>`,
        },
        {
          tipo: "huecos", num: "3", titulo: "Completar: G = gustar; E = encantar", ru: "Вставьте gustar (G) или encantar (E) в правильной форме: le gusta, les gustan…",
          imagen: "u1-a-img41", recorte: true, alt: "Una matrioshka y un cubo de Rubik", lista: true,
          parrafos: [
            "1. A Natalia {{le gusta}} caminar. **(G)**",
            "2. A Natalia {{le encantan}} las novelas. **(E)**",
            "3. A Natalia {{le gusta}} la música clásica. **(G)**",
            "4. A Luis {{le gusta}} tocar el piano. **(G)**",
            "5. A los dos {{les gustan}} los lugares tranquilos. **(G)**",
            "6. A Natalia no {{le gustan}} los lugares [[ruidosos|шумные]]. **(G)**",
          ],
        },
        {
          tipo: "abierta", num: "4", titulo: "Responder con tus ideas", ru: "Ответьте своими словами. Ваши ответы сохраняются на этом устройстве.",
          imagen: "u1-a-img40", recorte: true, alt: "Luis con un cubo de Rubik",
          preguntas: [
            { q: "¿Qué te gusta hacer en tu tiempo libre?", modelo: "En mi tiempo libre me gusta leer, caminar por el parque y escuchar música." },
            { q: "¿Qué tipo de música escuchas normalmente?", modelo: "Normalmente escucho música pop, pero cuando estoy tranquilo/a prefiero la música clásica." },
            { q: "¿Prefieres los lugares tranquilos o los lugares con mucho ruido? ¿Por qué?", modelo: "Prefiero los lugares tranquilos, porque allí se puede hablar bien." },
            { q: "¿Te gusta caminar por lugares nuevos?", modelo: "Sí, me encanta descubrir calles, plazas y cafés nuevos." },
            { q: "Invita a una persona a pasear contigo. Escribe una frase.", modelo: "¿Quieres pasear conmigo el sábado por el centro? Después podemos tomar un café." },
          ],
        },
      ],
    },

    /* ======================================================
       B. ¿DÓNDE ESTUVISTE AYER?
       ====================================================== */
    {
      id: "b", letra: "B", titulo: "¿Dónde estuviste ayer?", corto: "¿Dónde estuviste?",
      ru: "Где ты был(а) вчера? · прошедшее время (pretérito indefinido)",
      lema: "Hasta en mis sueños de ayer, el destino me llevaba hacia ti.",
      bloques: [
        { tipo: "figura", src: "u1-b-banner", alt: "Silueta de un tren antiguo bajo la luna", recorte: true, ancha: true },
        {
          tipo: "dialogo", num: "1", titulo: "Leer el diálogo", ru: "Прочитайте диалог.",
          imagen: "u1-b-cartas", alt: "Alicia lee las cartas a Natalia",
          intro: "Natalia [[fue a visitar|пошла в гости к]] a su amiga Alicia.",
          lineas: [
            { p: "Alicia", t: "[[Ayer|вчера]] [[vi|я увидела (ver)]] algo en [[las cartas|гадальные карты]]." },
            { p: "Natalia", t: "¿[[Qué viste|Что ты увидела?]]?" },
            { p: "Alicia", t: "Vi a Luis, [[tu novio|твой парень, жених]]." },
            { p: "Natalia", t: "¡[[Qué curioso|Как интересно!]]! [[Anoche|вчера вечером, прошлой ночью]] [[soñé con|мне приснился]] un [[tren|поезд]]." },
            { p: "Alicia", t: "Yo [[estuve|я была (estar)]] en [[ese tren|в том поезде]]." },
            { p: "Natalia", t: "¿[[De verdad|Правда? Серьёзно?]]? ¿Y [[qué más|что ещё]] viste en las cartas?" },
            { p: "Alicia", t: "Vi a muchos [[estudiantes|студенты]] [[estudiando|изучающих]] español con un [[manual|учебник]]." },
            { p: "Natalia", t: "¿Qué manual [[usaban|использовали]]?" },
            { p: "Alicia", t: "Aquella vez, el manual de español." },
          ],
        },
        {
          tipo: "pista", titulo: "Recuerda: el pretérito indefinido",
          html: `
            <p>Usamos el <b>pretérito indefinido</b> para hablar de acciones terminadas en el pasado.</p>
            <ul class="ejemplos">
              <li>Ayer Natalia <em>soñó</em> con un tren fantasma.</li>
              <li>Alicia <em>vio</em> algo extraño en las cartas.</li>
              <li>Luis <em>armó</em> el cubo de Rubik.</li>
            </ul>
            <table class="tabla-formas">
              <tr><th>Regulares</th><th>él / ella</th><th>Irregulares</th><th>él / ella</th></tr>
              <tr><td>hablar</td><td><b>habló</b></td><td>ver</td><td><b>vio</b></td></tr>
              <tr><td>estudiar</td><td><b>estudió</b></td><td>hacer</td><td><b>hizo</b></td></tr>
              <tr><td>vivir</td><td><b>vivió</b></td><td>tener</td><td><b>tuvo</b></td></tr>
              <tr><td>escribir</td><td><b>escribió</b></td><td>estar</td><td><b>estuvo</b></td></tr>
              <tr><td>nacer</td><td><b>nació</b></td><td>ir / ser</td><td><b>fue</b></td></tr>
              <tr><td>volver</td><td><b>volvió</b></td><td>morir</td><td><b>murió</b></td></tr>
            </table>`,
        },
        {
          tipo: "vf", num: "2", titulo: "Verdadero (V) o falso (F)", ru: "Верно (V) или неверно (F)?",
          items: [
            { t: "Natalia fue a visitar a su amiga Alicia.", r: true },
            { t: "Alicia vio a Luis en las cartas.", r: true },
            { t: "Luis es el novio de Alicia.", r: false, nota: "Luis es el novio de Natalia." },
            { t: "Natalia soñó con un avión.", r: false, nota: "Natalia soñó con un tren." },
            { t: "Alicia dijo que estuvo en el tren del sueño de Natalia.", r: true },
            { t: "Alicia vio a un solo estudiante en las cartas.", r: false, nota: "Vio a muchos estudiantes." },
            { t: "Los estudiantes estudiaban español.", r: true },
            { t: "Los estudiantes usaban el manual Aquella vez.", r: true },
          ],
        },
        {
          tipo: "unir", num: "3", titulo: "Unir cada pregunta con la respuesta correcta", ru: "Соедините каждый вопрос с правильным ответом.",
          items: [
            { q: "¿A quién fue a visitar Natalia?", r: "c" },
            { q: "¿Quién es Luis?", r: "f" },
            { q: "¿Con qué soñó Natalia?", r: "a" },
            { q: "¿Quién estuvo en ese tren?", r: "e" },
            { q: "¿Qué estudiaban los estudiantes?", r: "d" },
            { q: "¿Qué manual usaban?", r: "b" },
          ],
          opciones: { a: "Con un tren.", b: "Aquella vez.", c: "A su amiga Alicia.", d: "Español.", e: "Alicia.", f: "El novio de Natalia." },
        },
        {
          tipo: "huecos", num: "4", titulo: "Completar el texto con las palabras del recuadro", ru: "Заполните пропуски словами из рамки: сначала нажмите на пропуск, потом на слово.",
          imagen: "u1-b-egipto", alt: "Las desventuras de Luis en Egipto",
          encabezado: "Las peores vacaciones de Luis en Egipto",
          banco: [["vacaciones", "отпуск"], ["aeropuerto", "аэропорт"], ["maleta", "чемодан"], ["hotel", "гостиница"], ["calor", "жара"], ["agua", "вода"], ["pirámides", "пирамиды"], ["camello", "верблюд"], ["fotos", "фотографии"], ["taxi", "такси"], ["mapa", "карта"], ["enfermo", "больной"], ["restaurante", "ресторан"], ["noche", "вечер, ночь"], ["dinero", "деньги"], ["volvió", "вернулся"]],
          parrafos: [
            "El año pasado Luis [[viajó|поехал, путешествовал]] a Egipto para pasar sus {{vacaciones}}. [[Al principio|сначала]] estaba muy [[contento|доволен]], pero todo [[empezó mal|началось плохо]] en el {{aeropuerto}}. Su [[vuelo|рейс]] [[llegó tarde|прилетел с опозданием]] y, cuando fue a buscar su [[equipaje|багаж]], no encontró su {{maleta}}.",
            "Después tomó un {{taxi}} para ir al {{hotel}}, pero el [[conductor|водитель]] no conocía bien la [[dirección|адрес]]. Luis llegó [[cansado|уставший]] y con mucho {{calor}}. En la habitación no había [[aire acondicionado|кондиционер]] y tampoco había [[suficiente|достаточно]] {{agua}} para beber.",
            "[[Al día siguiente|на следующий день]], Luis visitó las {{pirámides}}. Quería [[sacar|сделать (фото)]] muchas {{fotos}}, pero [[se olvidó|забыл]] la cámara en el hotel. Luego [[subió a|сел на]] un {{camello}}, pero el animal caminó muy rápido y Luis [[casi se cayó|чуть не упал]].",
            "Más tarde, Luis [[perdió|потерял]] el {{mapa}} y no pudo encontrar el [[camino correcto|правильная дорога]]. Entró en un {{restaurante}} para [[descansar|отдохнуть]], pero comió algo muy [[picante|острое]] y [[se sintió|почувствовал себя]] {{enfermo}}.",
            "Por la {{noche}}, quiso comprar un [[recuerdo|сувенир]], pero [[descubrió|обнаружил]] que no tenía suficiente {{dinero}}. [[Al final|в конце концов]], Luis {{volvió}} a Argentina muy cansado. Dijo: «Egipto fue [[hermoso|прекрасный]], pero mis vacaciones fueron un [[desastre|катастрофа]]».",
          ],
        },
        {
          tipo: "huecos", num: "5", titulo: "Completar con el verbo estar o ir en pretérito indefinido", ru: "Вставьте глагол estar или ir в pretérito indefinido.",
          antes: `<table class="tabla-formas">
              <tr><th></th><th>yo</th><th>tú</th><th>él / ella</th><th>nosotros</th><th>ellos / ellas</th></tr>
              <tr><td><b>estar</b></td><td>estuve</td><td>estuviste</td><td>estuvo</td><td>estuvimos</td><td>estuvieron</td></tr>
              <tr><td><b>ir</b></td><td>fui</td><td>fuiste</td><td>fue</td><td>fuimos</td><td>fueron</td></tr>
            </table>`,
          lista: true,
          parrafos: [
            "1. El año pasado Luis {{fue}} de vacaciones a Egipto.",
            "2. El primer día, Luis {{estuvo}} tres horas en el aeropuerto buscando su maleta.",
            "3. Después {{fue}} al hotel en taxi, pero el conductor [[se perdió|заблудился]].",
            "4. —¿Dónde {{estuviste}} ayer, Luis? —{{Estuve}} en las pirámides de Guiza.",
            "5. Por la tarde, Luis y el [[guía|гид]] {{fueron}} al [[desierto|пустыня]] en camello.",
            "6. Luis {{estuvo}} enfermo dos días [[por culpa de|из-за]] la comida picante.",
            "7. —¿{{Fuiste}} al Museo Egipcio? —No, no {{fui}} porque no tenía dinero.",
            "8. [[Mientras tanto|тем временем]], Natalia y Alicia {{estuvieron}} en Buenos Aires todo el mes.",
            "9. Cuando Luis volvió, él y Natalia {{fueron}} a un café tranquilo y él le [[contó|рассказал]] todo.",
            "10. Nosotros nunca {{estuvimos}} en Egipto, pero ya conocemos las [[aventuras|приключения]] de Luis.",
          ],
        },
        {
          tipo: "sabias",
          texto: "«Ir» y «ser» tienen el mismo pretérito indefinido: **fui, fuiste, fue…** Solo el contexto los distingue: «Fui a Egipto» (ir) / «Fui muy feliz» (ser).",
          ru: "У глаголов ir (идти, ехать) и ser (быть) одинаковые формы в pretérito indefinido. Различить их можно только по контексту.",
        },
      ],
    },

    /* ======================================================
       C. UN DÍA DE MI VIDA
       ====================================================== */
    {
      id: "c", letra: "C", titulo: "Un día de mi vida", corto: "Un día de mi vida",
      ru: "Один день моей жизни · распорядок дня",
      lema: "Mi rutina favorita es despertarme con la ilusión de verte.",
      bloques: [
        {
          tipo: "texto", num: "1", titulo: "Leer el texto", ru: "Прочитайте текст о Софии.",
          imagen: "u1-c-sofia", alt: "Sofía junto a la ventana, con un piano y la nieve del norte", capitular: true,
          encabezado: "Un día en la vida de Sofía",
          parrafos: [
            "Hola, [[me llamo|меня зовут]] Sofía. Vivo en [[el norte|север]], en un lugar tranquilo, [[frío|холодный]] y muy bonito. Mi vida [[parece|кажется]] normal, pero siempre [[siento|чувствую]] que hay una música [[secreta|тайная]] [[cerca de mí|рядом со мной]].",
            "Todos los días [[me despierto|просыпаюсь]] [[temprano|рано]]. Primero abro los ojos y escucho el [[silencio|тишина]] de la mañana. Después [[me levanto|встаю]], [[me lavo la cara|умываюсь]] y [[me visto|одеваюсь]]. Normalmente llevo [[ropa cómoda|удобная одежда]], porque camino mucho [[durante el día|в течение дня]].",
            "Luego [[desayuno|завтракаю]] en la cocina. Tomo [[té caliente|горячий чай]] y como [[pan con mantequilla|хлеб с маслом]]. [[Mientras|пока, в то время как]] desayuno, miro por la [[ventana|окно]]. A veces veo [[nieve|снег]], a veces veo [[niebla|туман]], y a veces el [[cielo|небо]] está [[claro|ясное]] y azul.",
            "Después [[salgo de casa|выхожу из дома]]. Camino por las calles tranquilas y [[saludo|здороваюсь]] a algunas personas. Me gusta caminar [[despacio|медленно]], porque así puedo pensar. Muchas veces escucho una [[melodía|мелодия]] en mi [[cabeza|голова]]. No sé [[de dónde viene|откуда она]], pero siempre [[vuelve|возвращается]].",
            "Por la mañana estudio, leo y escribo en mi [[cuaderno|тетрадь]]. También [[ayudo en casa|помогаю по дому]] y [[ordeno mis cosas|навожу порядок в вещах]]. Cuando tengo tiempo, toco algunas [[notas|ноты]] en el piano. La música [[me calma|меня успокаивает]], pero también me hace [[recordar|вспоминать]] algo que [[todavía no comprendo|ещё не понимаю]].",
            "[[Al mediodía|в полдень]] [[almuerzo|обедаю]] algo [[simple|простое]]. Después [[descanso|отдыхаю]] un poco y leo. Me gustan las historias de viajes, de amor y de [[lugares lejanos|далёкие места]]. A veces [[sueño con|мечтаю о]] conocer a una persona que también [[escuche|слышала бы]] la misma melodía.",
            "Por la tarde salgo [[otra vez|снова]]. Camino cerca del [[río|река]] o por el [[bosque|лес]]. [[Respiro|дышу]] el aire frío y [[observo el paisaje|любуюсь пейзажем]]. El norte es [[silencioso|тихий]], pero nunca está [[vacío|пустой]]. Para mí, cada [[árbol|дерево]], cada [[piedra|камень]] y cada [[nube|облако]] tiene una [[voz|голос]].",
            "Por la noche [[vuelvo a casa|возвращаюсь домой]]. [[Ceno|ужинаю]], preparo un poco de té y escribo en mi [[diario|дневник]]. Escribo [[lo que hago|то, что делаю]], [[lo que siento|то, что чувствую]] y lo que escucho. [[Antes de dormir|перед сном]], miro por la ventana y pienso en la melodía.",
            "[[Finalmente|наконец]] [[me acuesto|ложусь спать]]. [[Cierro los ojos|закрываю глаза]] y [[espero|жду]]. A veces la música [[aparece|появляется]] en mis [[sueños|сны]]. Entonces comprendo que mi vida no es una vida [[común|обычная]]. Algo [[me llama|меня зовёт]] [[desde lejos|издалека]], y yo sé que [[algún día|когда-нибудь]] voy a descubrir qué [[significa|означает]].",
          ],
        },
        { tipo: "figura", src: "u1-c-paisaje", alt: "Siluetas: Sofía lee, toca el piano y pasea por el bosque nevado", recorte: true, ancha: true },
        {
          tipo: "huecos", num: "2", titulo: "Completar el texto con los verbos del recuadro en presente", ru: "Вставьте глаголы из рамки в настоящем времени.",
          encabezado: "El día de Sofía",
          banco: [["se despierta", "просыпается"], ["se levanta", "встаёт"], ["se lava", "умывает"], ["se viste", "одевается"], ["desayuna", "завтракает"], ["mira", "смотрит"], ["sale", "выходит"], ["camina", "гуляет"], ["lee", "читает"], ["escribe", "пишет"], ["toca", "играет"], ["vuelve", "возвращается"], ["cena", "ужинает"], ["se acuesta", "ложится спать"]],
          parrafos: [
            "Sofía vive en el norte, en un lugar frío y tranquilo. Todos los días {{se despierta}} temprano. Primero abre los ojos y escucha el silencio de la mañana. Después {{se levanta}} de la cama, {{se lava}} la cara y {{se viste}} con ropa cómoda.",
            "Luego {{desayuna}} en la cocina. Toma té caliente y come pan con mantequilla. Mientras desayuna, {{mira}} por la ventana. A veces ve nieve y a veces ve las [[montañas|горы]].",
            "Después {{sale}} de casa. Sofía {{camina}} por las calles tranquilas y piensa en una melodía [[misteriosa|загадочная]]. Por la mañana {{lee}} libros y {{escribe}} en su cuaderno.",
            "Cuando tiene tiempo, {{toca}} algunas notas en el piano. La música la calma y la hace soñar.",
            "Por la tarde, Sofía [[pasea|гуляет]] cerca del río. Por la noche {{vuelve}} a casa, {{cena}} algo simple y prepara té.",
            "Antes de dormir, escribe en su diario. Finalmente {{se acuesta}} y cierra los ojos. A veces la melodía aparece en sus sueños.",
          ],
        },
        {
          tipo: "huecos", num: "3", titulo: "Completar libremente con los adverbios del recuadro", ru: "Вставьте наречия из рамки. Каждое — только один раз. Возможны разные варианты.",
          imagen: "u1-c-rosa", alt: "La mujer de rosa explica los adverbios de frecuencia en la pizarra",
          encabezado: "La mujer de rosa", libre: true, mezclar: false, bancoFijo: true,
          textoBanco: "Cada adverbio, una sola vez",
          banco: [["siempre", "всегда"], ["normalmente", "обычно"], ["a menudo", "часто"], ["muchas veces", "много раз"], ["a veces", "иногда"], ["rara vez", "редко"], ["nunca", "никогда"]],
          parrafos: [
            "La mujer de rosa vive en una casa tranquila, con [[flores|цветы]] y libros [[antiguos|старинные]].",
            "{{?}} se despierta temprano y abre la ventana. {{?}} prepara una [[taza|чашка]] de té y lee un libro [[junto a|рядом с]] la mesa.",
            "{{?}} escribe en su cuaderno, porque tiene muchos [[pensamientos|мысли]]. {{?}} camina por el [[jardín|сад]] y mira las [[rosas|розы]].",
            "{{?}} escucha música romántica y [[recuerda|вспоминает]] historias del pasado. La mujer de rosa {{?}} habla de sus [[secretos|секреты]], porque es muy misteriosa.",
            "Pero {{?}} [[olvida|забывает]] sus sueños. Por la noche, escribe en su diario y espera un día bonito.",
          ],
          propuesta: "Siempre se despierta temprano… Normalmente prepara una taza de té… A menudo escribe en su cuaderno… Muchas veces camina por el jardín… A veces escucha música romántica… La mujer de rosa rara vez habla de sus secretos… Pero nunca olvida sus sueños.",
        },
      ],
    },

    /* ======================================================
       D. GRAMÁTICA
       ====================================================== */
    {
      id: "d", letra: "D", titulo: "Gramática", corto: "Gramática",
      ru: "Грамматика · наречия частотности",
      lema: "A veces sueño contigo; siempre te llevo en el corazón.",
      bloques: [
        {
          tipo: "teoria", imagen: "u1-d-img50", recorte: true, alt: "La mujer de rosa escribe en su diario",
          html: `
            <h3>Los adverbios de frecuencia</h3>
            <p>Los adverbios de frecuencia indican <b>cuántas veces</b> hacemos una acción.</p>
            <p class="ru" style="color:var(--tinta-suave);font-size:15px">Наречия частотности показывают, как часто мы что-то делаем.</p>
            <h4>Ejemplos</h4>
            <ul class="ejemplos">
              <li>La mujer de rosa <em>siempre</em> toma té por la mañana.</li>
              <li>La mujer de rosa <em>a veces</em> escucha música romántica.</li>
              <li>La mujer de rosa <em>nunca</em> olvida sus sueños.</li>
            </ul>`,
        },
        {
          tipo: "escala", num: "1", titulo: "Los adverbios", ru: "От «всегда» (100 %) до «никогда» (0 %).",
          imagen: "u1-d-img52", recorte: true, alt: "La mujer de rosa con una rosa",
          filas: [
            { pct: 100, es: "siempre", ru: "всегда", ej: "La mujer de rosa siempre escribe en su diario." },
            { pct: 80, es: "normalmente / por lo general", ru: "обычно, как правило", ej: "Normalmente lee un libro junto a la ventana." },
            { pct: 70, es: "a menudo / muy seguido", ru: "часто", ej: "A menudo camina por el jardín." },
            { pct: 60, es: "muchas veces", ru: "много раз, часто", ej: "Muchas veces mira las rosas." },
            { pct: 40, es: "a veces", ru: "иногда", ej: "A veces escucha música romántica." },
            { pct: 10, es: "rara vez", ru: "редко", ej: "Rara vez habla de sus secretos." },
            { pct: 0, es: "nunca", ru: "никогда", ej: "Nunca olvida sus sueños." },
          ],
        },
        {
          tipo: "teoria", imagen: "u1-d-img51", recorte: true, alt: "Luis con un cuaderno", imagenIzq: true,
          html: `
            <h3>2. Posición en la frase</h3>
            <p>Normalmente, los adverbios de frecuencia pueden ir:</p>
            <div class="posiciones">
              <div class="posicion"><h5>A) Antes del verbo</h5>
                <p>La mujer de rosa <mark>siempre</mark> prepara té.</p>
                <p>Luis <mark>normalmente</mark> estudia por la mañana.</p>
                <p>Natalia <mark>a veces</mark> camina por la ciudad.</p></div>
              <div class="posicion"><h5>B) Al principio de la frase</h5>
                <p><mark>Siempre</mark> prepara té.</p>
                <p><mark>Normalmente</mark> lee un libro.</p>
                <p><mark>A veces</mark> escucha música.</p></div>
              <div class="posicion"><h5>C) Al final de la frase</h5>
                <p>La mujer de rosa escribe en su diario <mark>muchas veces</mark>.</p>
                <p>Natalia visita cafés tranquilos <mark>a menudo</mark>.</p></div>
            </div>
            <h3 style="margin-top:28px">3. Atención: «nunca»</h3>
            <p>Con <b>nunca</b> antes del verbo, el verbo va en forma <b>afirmativa</b>.</p>
            <p class="ru" style="color:var(--tinta-suave);font-size:15px">Если «nunca» стоит перед глаголом, отрицание «no» не нужно.</p>
            <div class="correcto">La mujer de rosa nunca olvida sus sueños.</div>
            <div class="incorrecto">La mujer de rosa nunca no olvida sus sueños.</div>`,
        },
        {
          tipo: "ordenar", num: "2", titulo: "Ordenar las palabras", etiqueta: "Práctica",
          ru: "Составьте предложения: нажимайте на слова по порядку.",
          nota: "Toca las palabras en el orden correcto. Si te equivocas, toca una palabra de tu frase para quitarla.",
          items: [
            { palabras: ["siempre", "Sofía", "se despierta", "temprano"], variantes: ["Sofía siempre se despierta temprano", "Siempre Sofía se despierta temprano", "Sofía se despierta temprano siempre", "Sofía se despierta siempre temprano"] },
            { palabras: ["normalmente", "Luis", "desayuna", "en casa"], variantes: ["Luis normalmente desayuna en casa", "Normalmente Luis desayuna en casa", "Luis desayuna en casa normalmente", "Luis desayuna normalmente en casa"] },
            { palabras: ["a menudo", "Natalia", "visita", "librerías"], variantes: ["Natalia a menudo visita librerías", "A menudo Natalia visita librerías", "Natalia visita librerías a menudo", "Natalia visita a menudo librerías"] },
            { palabras: ["a veces", "Alicia", "lee", "por la noche"], variantes: ["Alicia a veces lee por la noche", "A veces Alicia lee por la noche", "Alicia lee por la noche a veces", "Alicia lee a veces por la noche"] },
            { palabras: ["nunca", "Roberto", "olvida", "sus llaves"], variantes: ["Roberto nunca olvida sus llaves", "Nunca Roberto olvida sus llaves"] },
            { palabras: ["rara vez", "Marcos", "llega tarde"], variantes: ["Marcos rara vez llega tarde", "Rara vez Marcos llega tarde", "Marcos llega tarde rara vez"] },
            { palabras: ["muchas veces", "Nátasha", "cocina", "en casa"], variantes: ["Nátasha muchas veces cocina en casa", "Muchas veces Nátasha cocina en casa", "Nátasha cocina en casa muchas veces", "Nátasha cocina muchas veces en casa"] },
          ],
        },
        {
          tipo: "abierta", num: "3", titulo: "Responder las preguntas con frases completas", etiqueta: "Práctica",
          ru: "Ответьте полными предложениями. Используйте наречия частотности.",
          imagen: "u1-d-img245", recorte: true, alt: "Un pequeño zorro",
          ejemplo: "¿Con qué frecuencia tomas té? → **Normalmente tomo té por la mañana.**",
          preguntas: [
            { q: "¿Con qué frecuencia lees libros?", modelo: "Leo libros a menudo, casi todas las noches." },
            { q: "¿Con qué frecuencia escribes en un cuaderno?", modelo: "A veces escribo en un cuaderno cuando estudio español." },
            { q: "¿Con qué frecuencia escuchas música romántica?", modelo: "Rara vez escucho música romántica; prefiero el rock." },
            { q: "¿Con qué frecuencia caminas por la ciudad?", modelo: "Siempre camino por la ciudad los fines de semana." },
          ],
        },
      ],
    },

    /* ======================================================
       E. CULTURA
       ====================================================== */
    {
      id: "e", letra: "E", titulo: "Cultura", corto: "Cultura",
      ru: "Культура · Латинская Америка или Испанская Америка?",
      bloques: [
        {
          tipo: "texto", titulo: "¿Latinoamérica o Hispanoamérica?", ru: "Прочитайте текст.",
          imagen: "u1-e-mapa", alt: "Luis señala un mapa de Hispanoamérica",
          parrafos: [
            "Las [[expresiones|выражения]] «Latinoamérica», «América Latina» e «Hispanoamérica» están [[relacionadas|связаны]], pero no son [[sinónimas|синонимы]]. Para hablar [[específicamente|именно]] de los países americanos donde el español es la [[lengua principal|основной язык]], en este manual usamos «Hispanoamérica».",
            "Esta [[denominación|название]] incluye Argentina, México, Colombia, Perú, Chile, Cuba, Venezuela, Paraguay, Uruguay y otros países [[hispanohablantes|испаноязычные]]. También [[se aplica|относится]] a [[territorios|территории]] como Puerto Rico, que no es un [[Estado independiente|независимое государство]]. Brasil [[forma parte de|входит в]] América Latina, pero no de Hispanoamérica, porque en él [[predomina|преобладает]] el portugués. En Haití se habla principalmente [[criollo haitiano|гаитянский креольский язык]] y francés.",
            "Durante el [[siglo XIX|XIX век]], [[pensadores|мыслители]] americanos y europeos [[difundieron|распространили]] la expresión «América Latina», que [[adoptó|приобрело]] diferentes [[sentidos|значения]] culturales y políticos.",
            "«Hispanoamérica» [[se refiere|относится к]] específicamente a los países americanos [[de habla española|испаноязычные]], mientras que «América Latina» [[suele abarcar|обычно охватывает]] una región más [[amplia|широкая]]. En este manual preferimos «Hispanoamérica» para hablar de esa [[comunidad|сообщество]].",
          ],
        },
        {
          tipo: "abierta", num: "1", titulo: "Preguntas de cultura", ru: "Вопросы по тексту. Ответьте, а потом проверьте себя.",
          imagen: "u1-e-img54", recorte: true, alt: "Mapa antiguo con brújula y pluma", textoModelo: "Ver respuesta",
          preguntas: [
            { q: "¿Por qué «Hispanoamérica» es más específico que «América Latina»?", modelo: "Porque se refiere solo a los países americanos de habla española; «América Latina» abarca una región más amplia." },
            { q: "¿Qué significa exactamente «Hispanoamérica»?", modelo: "Los países americanos donde el español es la lengua principal." },
            { q: "¿Por qué Brasil no forma parte de Hispanoamérica?", modelo: "Porque en Brasil predomina el portugués." },
            { q: "¿En qué siglo se difundió el concepto de «América Latina»?", modelo: "En el siglo XIX." },
          ],
        },
        {
          tipo: "elegir", num: "2", titulo: "¿Hispanoamérica o América Latina?", rejilla: true,
          ru: "H — Испанская Америка; L — Латинская Америка, но не Испанская Америка.",
          opciones: [["H", "H", "Hispanoamérica"], ["L", "L", "América Latina, pero no Hispanoamérica"]],
          items: [
            { t: "México", r: "H" }, { t: "Brasil", r: "L", nota: "Se habla portugués." }, { t: "Argentina", r: "H" }, { t: "Cuba", r: "H" },
            { t: "Haití", r: "L", nota: "Criollo haitiano y francés." }, { t: "Colombia", r: "H" }, { t: "Perú", r: "H" }, { t: "Uruguay", r: "H" },
            { t: "Bolivia", r: "H" }, { t: "República Dominicana", r: "H" }, { t: "Chile", r: "H" }, { t: "Venezuela", r: "H" },
          ],
        },
        {
          tipo: "abierta", num: "3", titulo: "¿Qué país de Hispanoamérica te gustaría conocer? ¿Por qué?", ru: "Какую страну Испанской Америки ты хотел(а) бы посетить? Почему?",
          preguntas: [{ q: "Escribe tu respuesta (3–4 frases).", lineas: 4, modelo: "Me gustaría conocer Perú, porque quiero ver Machu Picchu y probar la comida peruana. También me interesa la historia de los incas." }],
        },
      ],
    },

    /* ======================================================
       F. HISTORIETA
       ====================================================== */
    {
      id: "f", letra: "F", titulo: "Historieta", corto: "Historieta",
      ru: "Комикс",
      bloques: [
        {
          tipo: "historieta", num: "1", titulo: "Leer la historieta", ru: "Прочитайте комикс. Нажмите на картинку, чтобы увеличить.",
          src: "u1-f-historieta", alt: "Historieta: Luis le pregunta a Sofía cómo es la vida en el norte",
        },
        {
          tipo: "abierta", num: "2", titulo: "Y tú, ¿cómo es tu día?", ru: "А как проходит твой день? Расскажи в 4–5 предложениях. Используй наречия частотности.",
          preguntas: [{ q: "Describe un día normal de tu vida.", lineas: 5, modelo: "Normalmente me despierto a las siete. Siempre desayuno café con pan. Después voy al trabajo en metro. Por la tarde a veces paseo por el parque y por la noche leo un libro." }],
        },
      ],
    },
  ],
};
