export const ACTS = [
  { id: 1, title: 'Acto I: El Encuentro y los Números', chapters: [1, 2, 3, 4], color: 'from-emerald-500/20 to-teal-500/10' },
  { id: 2, title: 'Acto II: Conflictos y Descubrimientos', chapters: [5, 6, 7, 8], color: 'from-amber-500/20 to-orange-500/10' },
  { id: 3, title: 'Acto III: Despedida y Legado Eterno', chapters: [9, 10, 11], color: 'from-purple-500/20 to-pink-500/10' },
];

export const CHAPTERS = [
  {
    id: 1,
    act: 1,
    title: 'Los 80 Minutos y los Números Amigos',
    japaneseTitle: '80分の記憶と友愛数',
    badge: 'Capítulo 1',
    quote: '¿Cuál es tu número de calzado? ¿24? ¡Qué número tan espléndido! Es el factorial de 4: 4 × 3 × 2 × 1...',
    synopsis: 'Se presenta a la protagonista, una joven madre soltera que trabaja como asistenta doméstica, y al Profesor, un brillante matemático de 64 años. Tras un trágico accidente automovilístico en 1975, su memoria a corto plazo dura exactamente 80 minutos. Para recordar los hechos esenciales, lleva su traje cubierto de notas de papel sujetas con alfileres. Para romper el hielo, utiliza el lenguaje de los números.',
    keyPoints: [
      'El Profesor vive atrapado en una ventana temporal continua de 80 minutos; cada mañana conoce a la asistenta de nuevo.',
      'Su cuerpo y traje están llenos de notas adhesivas para no olvidar su condición ni a sus seres queridos.',
      'Descubren que el número grabado en el reloj del Profesor (284) y la fecha de cumpleaños de la asistenta (220) forman una de las parejas de Números Amigos más raras y bellas del universo.'
    ],
    mathConcept: {
      tag: 'Números Amigos (220 y 284)',
      latex: '220 \\longleftrightarrow 284',
      description: 'Dos números son "amigos" si la suma de los divisores propios de uno da exactamente el otro, y viceversa. Una conexión casi mágica y poética creada por la naturaleza matemática.',
      type: 'amicable-interactive',
      data: {
        numA: 220,
        divsA: [1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110], // sum = 284
        numB: 284,
        divsB: [1, 2, 4, 71, 142] // sum = 220
      }
    }
  },
  {
    id: 2,
    act: 1,
    title: 'El Nacimiento de "Root" y el Abrazo del Radical',
    japaneseTitle: 'ルートの誕生と根号の抱擁',
    badge: 'Capítulo 2',
    quote: 'Tienes una coronilla tan plana como el símbolo de la raíz cuadrada. A partir de hoy te llamaré Root.',
    synopsis: 'Al enterarse de que la asistenta tiene un hijo de 10 años que se queda solo en casa después de la escuela, el Profesor se indigna profundamente: para él, los niños son tesoros sagrados que jamás deben estar desprotegidos. Exige que el niño vaya a la cabaña todas las tardes. Al conocerlo y acariciar su cabeza plana, lo bautiza con cariño "Root" (Raíz), otorgándole un nombre que lo vincula para siempre a las matemáticas.',
    keyPoints: [
      'El Profesor demuestra una ternura y caballerosidad conmovedora hacia el hijo de la asistenta.',
      'La cabaña se llena de risas, meriendas y tareas escolares, transformando el solitario hogar del matemático.',
      'El símbolo del radical (√) no solo es una operación: es un techo seguro que cobija a los números desconocidos, irracionales y complejos con generosidad absoluta.'
    ],
    mathConcept: {
      tag: 'El Símbolo Radical (\\sqrt{\\quad})',
      latex: '\\sqrt{x} \\quad \\text{(El refugio infinito)}',
      description: 'El signo de la raíz cuadrada no rechaza a nadie: acoge a los enteros, a los números con infinitos decimales como √2, e incluso abre la puerta a los números imaginarios.',
      type: 'root-interactive',
      data: { defaultNum: 10 }
    }
  },
  {
    id: 3,
    act: 1,
    title: 'Números Primos, Números Perfectos y los Hanshin Tigers',
    japaneseTitle: '素数、完全数と阪神タイガース',
    badge: 'Capítulo 3',
    quote: 'El 28 es el segundo número perfecto más pequeño: 1 + 2 + 4 + 7 + 14 = 28. ¡Y es el dorsal de mi adorado Yutaka Enatsu!',
    synopsis: 'El lazo entre los tres se consolida a través de la comida casera, los deberes de la escuela y las fascinantes charlas del Profesor sobre números primos y perfectos. Descubren una pasión compartida y apasionada: el béisbol. El Profesor es devoto fanático de los Hanshin Tigers y de su legendario lanzador zurdo Yutaka Enatsu. Debido a su amnesia, cree con total convicción que aún es 1975 y que Enatsu sigue activo en el montículo.',
    keyPoints: [
      'Los números primos son los "átomos" solitarios que construyen todos los demás números en la aritmética.',
      'Los números perfectos (iguales a la suma de sus divisores propios, como el 6 y el 28) son joyas de infinita armonía.',
      'El número de camiseta de Enatsu (28) conecta la pasión terrenal del béisbol con la perfección divina de las matemáticas.'
    ],
    mathConcept: {
      tag: 'El Número Perfecto 28',
      latex: '28 = 1 + 2 + 4 + 7 + 14',
      description: 'El 28 es un número perfecto porque la suma de sus divisores (exceptuando el propio 28) da exactamente 28. Solo existen unos pocos en todo el universo de los números.',
      type: 'perfect-interactive',
      data: { number: 28, divisors: [1, 2, 4, 7, 14] }
    }
  },
  {
    id: 4,
    act: 1,
    title: 'Bajo los Cerezos y el Truco del Pequeño Gauss',
    japaneseTitle: '桜の下と天才ガウスの機知',
    badge: 'Capítulo 4',
    quote: 'Para sumar del 1 al 100 no necesitas sumar uno por uno. Empareja los extremos: 1+100=101, 2+99=101... ¡Cincuenta pares de 101!',
    synopsis: 'La asistenta se involucra de lleno en el universo del Profesor. Lo acompaña a cortarse el pelo y pasean juntos bajo los cerezos en flor mientras conversan sobre enigmas numéricos. Ella misma empieza a resolver problemas por su cuenta, descubriendo cómo el amor y entusiasmo del matemático están expandiendo su mente y transformando su visión de la realidad.',
    keyPoints: [
      'El Profesor le relata la legendaria anécdota del matemático Carl Friedrich Gauss de 10 años.',
      'La asistenta experimenta por primera vez el gozo estético de resolver un problema matemático.',
      'La relación trasciende el mero trabajo doméstico: florece una profunda complicidad intelectual y afectiva.'
    ],
    mathConcept: {
      tag: 'La Suma Triangular de Gauss',
      latex: '\\sum_{k=1}^n k = \\frac{n(n+1)}{2}',
      description: 'La brillante deducción de Gauss permite calcular la suma de los primeros n números enteros en un solo paso emparejando los valores opuestos.',
      type: 'gauss-interactive',
      data: { defaultN: 10 }
    }
  },
  {
    id: 5,
    act: 2,
    title: 'El Gran Partido en el Estadio y la Fiebre',
    japaneseTitle: '球場の熱狂と突然の発熱',
    badge: 'Capítulo 5',
    quote: 'Tener una memoria de 80 minutos hace que cada segundo sea tan intenso como la eternidad.',
    synopsis: 'La asistenta y Root deciden darle una sorpresa al Profesor llevándolo a un partido real de los Hanshin Tigers en el estadio. Organizar el viaje y sostener su frágil memoria de 80 minutos requiere un esfuerzo y cuidado conmovedores. Disfrutan enormemente del juego y la algarabía, pero el agotamiento físico, las emociones desbordadas y el frío nocturno provocan que el anciano caiga gravemente enfermo con una fiebre altísima.',
    keyPoints: [
      'Ver al Profesor emocionado en el estadio demuestra la humanidad y calidez viva detrás de su mente matemática.',
      'Gestionar la memoria en un entorno fuera de la cabaña revela la fragilidad de su condición médica.',
      'La fiebre debilita al Profesor, encendiendo las alarmas sobre su salud a largo plazo.'
    ],
    mathConcept: {
      tag: 'El Temporizador de los 80 Minutos',
      latex: 't = 80 \\text{ min} \\implies \\Delta M \\to 0',
      description: 'La memoria de trabajo del profesor es finita, pero las emociones genuinas dejan una huella invisible que la amnesia no puede borrar.',
      type: 'timer-interactive',
      data: { minutes: 80 }
    }
  },
  {
    id: 6,
    act: 2,
    title: 'La Noche en Vela y el Injusto Despido',
    japaneseTitle: '看病の夜と突然の解雇',
    badge: 'Capítulo 6',
    quote: 'No podía dejarlo solo ardiendo en fiebre en la oscuridad... Aunque eso costara mi empleo.',
    synopsis: 'Ante la gravedad del Profesor, la asistenta decide quedarse toda la noche en la cabaña para cuidarlo, aplicándole compresas frías y vigilando su respiración. Sin embargo, esto transgrede las estrictas reglas de privacidad impuestas por la viuda (la cuñada del Profesor, dueña de la casa principal). Furiosa al enterarse, la cuñada la despide de inmediato. La asistenta es transferida a casas con clientes fríos y monótonos, extrañando cada día al entrañable matemático.',
    keyPoints: [
      'El acto de compasión y dedicación de la asistenta choca contra la frialdad y las sospechas de la cuñada.',
      'Root y su madre sienten un profundo vacío al verse privados de la presencia del Profesor.',
      'Se evidencia la tensión y el misterio latente entre la cuñada y el pasado del anciano.'
    ],
    mathConcept: {
      tag: 'El Traje de Post-its y las Reglas',
      latex: '\\text{Memoria} = \\bigcup \\text{Notas con Alfileres}',
      description: 'Las notas del profesor son su único ancla a la realidad. Sin la asistenta para ordenarlas, la cabaña pierde su orden armónico.',
      type: 'postit-match',
      data: {}
    }
  },
  {
    id: 7,
    act: 2,
    title: 'La Ecuación de Euler: El Milagro de la Reconciliación',
    japaneseTitle: 'オイラーの公式：奇跡の和解',
    badge: 'Capítulo 7',
    quote: 'e^{i\\pi} + 1 = 0. En un solo trazo, el Profesor abrazó lo visible, lo imaginario, lo infinito y el silencio.',
    synopsis: 'Root, extrañando con toda su alma al Profesor, acude solo a visitarlo a la cabaña. La cuñada lo descubre y manda llamar furiosa a la asistenta, acusándola de usar al niño para obtener beneficios económicos. En medio de los gritos y la tensa discusión, el Profesor entra silenciosamente, toma un trozo de papel, escribe la Fórmula de Euler (e^(iπ) + 1 = 0) y la deposita sobre la mesa. El silencio cae sobre la habitación. La cuñada rompe en llanto y de inmediato le devuelve su puesto a la asistenta.',
    keyPoints: [
      'La fórmula de Euler une las cinco constantes más trascendentales: e, i, π, 1 y 0.',
      'El Profesor usa la elegancia pura de las matemáticas para detener la violencia verbal y restablecer la paz.',
      'La reacción quebrada de la cuñada revela un significado íntimo y sagrado que solo ellos dos comprenden.'
    ],
    mathConcept: {
      tag: 'La Identidad de Euler (e^{i\\pi}+1=0)',
      latex: 'e^{i\\pi} + 1 = 0',
      description: 'Considerada unánimemente por los matemáticos como la ecuación más bella jamás creada. Reúne el análisis (e), el álgebra compleja (i), la geometría (π), la aritmética (1) y el vacío primordial (0).',
      type: 'euler-interactive',
      data: {}
    }
  },
  {
    id: 8,
    act: 2,
    title: 'La Caja Secreta y la Tarjeta de Enatsu de 1975',
    japaneseTitle: '秘密の小箱と1975年の江夏カード',
    badge: 'Capítulo 8',
    quote: 'En el fondo de la caja no solo había teoremas... había una fotografía de dos almas jóvenes antes del accidente.',
    synopsis: 'La armonía y el cariño regresan a la cabaña. Con motivo de una ocasión especial, la asistenta y Root buscan incansablemente una valiosa y rarísima tarjeta de béisbol de Yutaka Enatsu de 1975 para regalársela al Profesor. Durante la búsqueda, descubren una antigua caja oculta. En su interior hallan la tesis doctoral del Profesor y una fotografía de su juventud junto a su cuñada, dejando entrever un amor prohibido, profundo e indestructible previo al trágico accidente.',
    keyPoints: [
      'La novela revela con infinita sutileza el amor imposible entre el Profesor y la viuda.',
      'El accidente de 1975 no solo congeló su memoria a 80 minutos, sino que petrificó ese momento de sus vidas para siempre.',
      'El regalo de la tarjeta representa el puente entre el pasado congelado del Profesor y el presente lleno de afecto que le brindan Root y su madre.'
    ],
    mathConcept: {
      tag: 'El Enigma del Año 1975 y el #28',
      latex: '1975 \\longleftrightarrow \\text{Enatsu } \\#28',
      description: 'Para el Profesor, el tiempo se detuvo en 1975. Cada detalle de ese año posee una precisión matemática intacta en su mente.',
      type: 'box-interactive',
      data: {}
    }
  },
  {
    id: 9,
    act: 3,
    title: 'El Gran Premio Matemático y el Crepúsculo de la Mente',
    japaneseTitle: '懸賞論文の受賞と記憶の黄昏',
    badge: 'Capítulo 9',
    quote: 'Las verdades eternas de las matemáticas descansan en el cuaderno de Dios. Nosotros solo tenemos la suerte de espiarlas.',
    synopsis: 'El Profesor gana un prestigioso y codiciado premio tras resolver un problema de investigación de altísima complejidad publicado en una revista científica internacional. La asistenta y Root planean una gran fiesta sorpresa para celebrar simultáneamente este logro y el cumpleaños número 11 de Root. Sin embargo, la asistenta percibe con dolor que la memoria del Profesor se deteriora a un ritmo más acelerado: ahora los 80 minutos comienzan a acortarse visiblemente.',
    keyPoints: [
      'A pesar del daño neurológico, el talento matemático superior del Profesor permanece intacto en su esencia más pura.',
      'La familia improvisada prepara una celebración llena de gratitud y cariño sincero.',
      'Se vislumbra con melancolía el inevitable avance del tiempo y la pérdida de la memoria.'
    ],
    mathConcept: {
      tag: 'El Problema Matemático Resuelto',
      latex: '\\mathcal{P} \\iff \\mathcal{Q} \\quad (\\text{Premio de la Revista})',
      description: 'El Profesor demostró una conjetura que otros científicos creían inalcanzable, trabajando en soledad con lápiz y papel en su mesa de madera.',
      type: 'prize-interactive',
      data: {}
    }
  },
  {
    id: 10,
    act: 3,
    title: 'La Última Fiesta en Casa y el Guante de Béisbol',
    japaneseTitle: '最後の祝宴と特製グラブの贈り物',
    badge: 'Capítulo 10',
    quote: 'Un guante de béisbol de cuero genuino para Root, y una tarjeta de Enatsu para el Profesor... El regalo perfecto.',
    synopsis: 'Se lleva a cabo la entrañable fiesta en la cabaña. El Profesor recibe emocionado hasta las lágrimas su ansiada tarjeta de Enatsu #28, y él le entrega a Root un guante de béisbol de cuero fino a su medida, con una dedicatoria grabada. Días después, la cuñada comunica a la asistenta que el Profesor debe ser trasladado a un asilo especializado, ya que su memoria casi ha desaparecido. La fiesta fue, en secreto, la última gran despedida en su hogar.',
    keyPoints: [
      'El intercambio de regalos simboliza la entrega del testigo y el amor incondicional entre el maestro y el niño.',
      'La cabaña queda en silencio, pero los recuerdos quedan grabados indeleblemente en los corazones de la madre y el hijo.',
      'El traslado a la residencia marca el cierre de una etapa dorada e inolvidable.'
    ],
    mathConcept: {
      tag: 'La Conservación del Afecto',
      latex: '\\lim_{t \\to \\infty} \\text{Amor}(t) = \\text{Constante}',
      description: 'Aunque la memoria neurológica del Profesor decayó a cero, el impacto transformador de su amor matemático permanecerá vivo para siempre.',
      type: 'farewell-interactive',
      data: {}
    }
  },
  {
    id: 11,
    act: 3,
    title: 'El Legado de Root y el Tributo Eterno (Epílogo)',
    japaneseTitle: 'ルートの未来と永遠の継承（エピローグ）',
    badge: 'Capítulo 11',
    quote: 'Root creció bajo el ala de aquel radical. Hoy es profesor de matemáticas, enseñando a otros niños a amar los números.',
    synopsis: 'Durante los siguientes 11 años, la asistenta y Root visitan fielmente al anciano en la residencia geriátrica. Hacen picnics en los jardines y Root juega a atrapar la pelota de béisbol con él, hasta que el Profesor fallece serenamente. La novela culmina con un conmovedor homenaje a su legado: Root, ya adulto, aprueba sus oposiciones docentes y se convierte en profesor de matemáticas de secundaria, llevando prendido en su solapa el cromo de Enatsu.',
    keyPoints: [
      'La paciencia y el amor del Profesor moldearon el destino y la vocación de Root.',
      'La muerte física del matemático no extingue su luz: su pasión reverbera en las nuevas generaciones de estudiantes.',
      'La historia demuestra que los lazos humanos más puros son tan eternos e indestructibles como los números primos.'
    ],
    mathConcept: {
      tag: 'El Legado Infinito',
      latex: '\\lim_{n \\to \\infty} \\int_{0}^{\\infty} \\text{Enseñanza} \\, dx = \\infty',
      description: 'El ciclo se completa: el niño protegido bajo el radical (Root) se convierte en el maestro que cobija a nuevos alumnos con la misma calidez del Profesor.',
      type: 'legacy-interactive',
      data: {}
    }
  }
];
