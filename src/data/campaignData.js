export const CAMPAIGN_CHAPTERS = [
  {
    id: 1,
    act: 1,
    title: 'Los 80 Minutos del Profesor',
    subtitle: 'El Encuentro y el Traje de Notas',
    badge: 'Capítulo 1',
    icon: 'Pin',
    difficulty: 'Fácil',
    unlockedByDefault: true,
    rewardCard: {
      name: 'Reloj de Bolsillo 284',
      type: 'Reliquia',
      desc: 'El reloj grabado con el 284, número amigo del 220.'
    },
    quote: '¿Cuál es tu número de calzado? ¿24? ¡Qué número tan espléndido! Es el factorial de 4...',
    synopsis: 'Una asistenta llega a la solitaria cabaña de un brillante matemático de 64 años cuya memoria a corto plazo dura exactamente 80 minutos tras un accidente en 1975. Su traje está cubierto de notas para no olvidar quién es.',
    game: {
      type: 'notes_catcher',
      title: 'El Viento y los Post-its',
      instruction: '¡Un golpe de viento ha desprendido las notas del Profesor! Atrapa las 8 notas con tu cursor antes de que caigan al vacío y se pierda su memoria.',
      goal: 8,
      timeLimit: 15
    }
  },
  {
    id: 2,
    act: 1,
    title: 'El Nacimiento de "Root"',
    subtitle: 'Un Refugio Bajo el Radical',
    badge: 'Capítulo 2',
    icon: 'Shield',
    difficulty: 'Normal',
    unlockedByDefault: false,
    rewardCard: {
      name: 'El Paraguas Radical √',
      type: 'Símbolo',
      desc: 'El techo protector que acoge a todos los niños sin juzgarlos.'
    },
    quote: 'Tienes la coronilla plana como una raíz cuadrada. Te llamaré Root.',
    synopsis: 'El Profesor no permite que un niño de 10 años esté solo en casa y le exige ir a la cabaña después de la escuela. Lo apoda "Root" con infinita ternura.',
    game: {
      type: 'rain_shelter',
      title: 'El Paraguas de Root',
      instruction: '¡Comienza a llover sobre Root! Mueve el paraguas radical con las flechas o el mouse para cubrir al niño y evitar que se moje 10 gotas.',
      goal: 15,
      timeLimit: 20
    }
  },
  {
    id: 3,
    act: 1,
    title: 'Pasión por los Hanshin Tigers',
    subtitle: 'El Béisbol y el Ídolo de 1975',
    badge: 'Capítulo 3',
    icon: 'Flame',
    difficulty: 'Desafiante',
    unlockedByDefault: false,
    rewardCard: {
      name: 'Pelota de Béisbol Firmada',
      type: 'Objeto de Colección',
      desc: 'Un recuerdo del legendario lanzador zurdo Yutaka Enatsu (#28).'
    },
    quote: 'El 28 es un número perfecto: 1+2+4+7+14=28. ¡Y el dorsal de mi adorado Enatsu!',
    synopsis: 'Descubren una pasión compartida por el béisbol. Debido a su amnesia, el Profesor cree fervientemente que aún es 1975 y que Enatsu sigue activo en el montículo.',
    game: {
      type: 'homerun_timing',
      title: 'Bateo de Gran Slam',
      instruction: 'Haz clic justo cuando la pelota entre en la Zona Dorada para batear 4 cuadrangulares seguidos sin fallar.',
      goal: 4,
      timeLimit: 25
    }
  },
  {
    id: 4,
    act: 1,
    title: 'Bajo los Cerezos en Flor',
    subtitle: 'El Paseo y los Acertijos',
    badge: 'Capítulo 4',
    icon: 'Sparkles',
    difficulty: 'Normal',
    unlockedByDefault: false,
    rewardCard: {
      name: 'Pétalo Dorado de Sakura',
      type: 'Recuerdo',
      desc: 'El momento en que la asistenta abrió su mente al gozo de pensar.'
    },
    quote: 'Para sumar del 1 al 100 empareja los extremos: 1+100=101, 2+99=101...',
    synopsis: 'Pasean bajo los cerezos mientras la asistenta se adentra fascinada en el mundo de los enigmas mentales, transformando su visión de la vida.',
    game: {
      type: 'sakura_memory',
      title: 'Armonía de los Cerezos',
      instruction: 'Memoriza y repite la secuencia de 4 patrones de campanas y flores de cerezo.',
      goal: 3,
      timeLimit: 30
    }
  },
  {
    id: 5,
    act: 2,
    title: 'El Partido en el Estadio',
    subtitle: 'La Salida y la Fiebre',
    badge: 'Capítulo 5',
    icon: 'Thermometer',
    difficulty: 'Difícil',
    unlockedByDefault: false,
    rewardCard: {
      name: 'Boleto del Estadio Koshien',
      type: 'Entrada Vintage',
      desc: 'El viaje donde el Profesor presenció su gran partido real.'
    },
    quote: 'Tener 80 minutos hace que cada emoción sea tan viva como la eternidad.',
    synopsis: 'Llevan al Profesor al estadio de béisbol real. La emoción desbordada y el frío de la noche hacen que caiga gravemente enfermo con fiebre alta.',
    game: {
      type: 'fever_compress',
      title: 'Compresas Frías a Tiempo',
      instruction: '¡La fiebre del Profesor sube rápidamente! Haz clic rápidamente en las compresas de hielo para enfriar su frente antes de que el termómetro llegue al rojo.',
      goal: 20,
      timeLimit: 12
    }
  },
  {
    id: 6,
    act: 2,
    title: 'La Noche en Vela y el Despido',
    subtitle: 'La Vigilancia y la Injusticia',
    badge: 'Capítulo 6',
    icon: 'Moon',
    difficulty: 'Desafiante',
    unlockedByDefault: false,
    rewardCard: {
      name: 'La Llave de la Cabaña',
      type: 'Símbolo',
      desc: 'El lazo de lealtad que no se rompe a pesar del despido.'
    },
    quote: 'No podía dejarlo solo ardiendo en fiebre en la oscuridad...',
    synopsis: 'La asistenta cuida al Profesor toda la noche, pero la cuñada (la viuda) la despide injustamente por violar las estrictas reglas de privacidad.',
    game: {
      type: 'stealth_balance',
      title: 'Sigilo en la Noche',
      instruction: 'Mantén la barra de silencio en la zona verde sin hacer ruido mientras llevas la medicina a la habitación del Profesor.',
      goal: 100,
      timeLimit: 15
    }
  },
  {
    id: 7,
    act: 2,
    title: 'La Fórmula de la Paz',
    subtitle: 'La Identidad de Euler',
    badge: 'Capítulo 7',
    icon: 'Heart',
    difficulty: 'Épico',
    unlockedByDefault: false,
    rewardCard: {
      name: 'El Papiro de Euler: e^(iπ) + 1 = 0',
      type: 'Obra Maestra',
      desc: 'La ecuación más bella del universo que desarmó el odio y reconcilió a la familia.'
    },
    quote: 'e^{i\\pi} + 1 = 0. En un solo trazo, el Profesor abrazó lo visible, lo imaginario y la paz.',
    synopsis: 'Root visita a escondidas al Profesor y la cuñada acusa a la asistenta. El Profesor entra y escribe la fórmula de Euler, conmoviendo a la cuñada y recuperando el empleo.',
    game: {
      type: 'euler_constellation',
      title: 'El Trazo Sagrado de Euler',
      instruction: 'Conecta las 5 esferas celestiales (e, i, π, 1, 0) en el orden exacto trazando con tu cursor para liberar la onda de luz reconciliadora.',
      goal: 5,
      timeLimit: 20
    }
  },
  {
    id: 8,
    act: 2,
    title: 'La Caja de los Recuerdos',
    subtitle: 'El Secreto de 1975',
    badge: 'Capítulo 8',
    icon: 'Box',
    difficulty: 'Desafiante',
    unlockedByDefault: false,
    rewardCard: {
      name: 'Fotografía Antigua de 1975',
      type: 'Recuerdo Íntimo',
      desc: 'La foto del Profesor de joven junto a su cuñada antes de la tragedia.'
    },
    quote: 'En el fondo de la caja no solo había teoremas... había una fotografía de dos almas jóvenes.',
    synopsis: 'Buscando la tarjeta de Enatsu, descubren una caja secreta con una fotografía de la juventud del Profesor y su cuñada, revelando un amor previo al accidente.',
    game: {
      type: 'hidden_card_search',
      title: 'Búsqueda en el Baúl Vintage',
      instruction: 'Inspecciona y retira los periódicos y cajas de 1975 para desenterrar la tarjeta de Enatsu oculta antes de que expire el tiempo.',
      goal: 3,
      timeLimit: 15
    }
  },
  {
    id: 9,
    act: 3,
    title: 'El Gran Premio de la Revista',
    subtitle: 'La Mente en el Crepúsculo',
    badge: 'Capítulo 9',
    icon: 'Trophy',
    difficulty: 'Difícil',
    unlockedByDefault: false,
    rewardCard: {
      name: 'Medalla de Oro de la Revista Científica',
      type: 'Trofeo',
      desc: 'El reconocimiento internacional a la brillantez del Profesor.'
    },
    quote: 'Las verdades eternas descansan en el cuaderno de Dios.',
    synopsis: 'El Profesor gana un codiciado premio matemático internacional. La asistenta y Root planean una fiesta, aunque su memoria decae cada vez más rápido.',
    game: {
      type: 'logic_circuit',
      title: 'Los Engranajes del Teorema',
      instruction: 'Alinea los 4 engranajes giratorios en el ángulo dorado para completar la demostración matemática del Profesor.',
      goal: 4,
      timeLimit: 18
    }
  },
  {
    id: 10,
    act: 3,
    title: 'La Última Fiesta y el Guante',
    subtitle: 'El Regalo Perfecto y la Despedida',
    badge: 'Capítulo 10',
    icon: 'Gift',
    difficulty: 'Desafiante',
    unlockedByDefault: false,
    rewardCard: {
      name: 'Guante de Béisbol de Cuero Grabado',
      type: 'Reliquia Familiar',
      desc: 'El regalo del Profesor a Root con una bendición para su futuro.'
    },
    quote: 'Un guante de béisbol de cuero genuino para Root, y una tarjeta de Enatsu para el Profesor...',
    synopsis: 'Celebran la fiesta de cumpleaños de Root y el premio. Le regalan la tarjeta de Enatsu y el Profesor le da a Root un guante de béisbol. Es su última noche en la cabaña.',
    game: {
      type: 'catch_baseball_glove',
      title: 'Atrapa el Lanzamiento del Guante',
      instruction: 'Mueve el nuevo guante de béisbol para atrapar 10 pelotas consecutivas lanzadas a gran velocidad.',
      goal: 10,
      timeLimit: 20
    }
  },
  {
    id: 11,
    act: 3,
    title: 'El Legado de Root (Epílogo)',
    subtitle: 'El Profesor de Matemáticas',
    badge: 'Capítulo 11',
    icon: 'GraduationCap',
    difficulty: 'Legendario',
    unlockedByDefault: false,
    rewardCard: {
      name: 'La Tiza Dorada del Maestro Root',
      type: 'Legado Eterno',
      desc: 'Root, ya adulto y profesor, transmitiendo el amor del Profesor a una nueva generación.'
    },
    quote: 'Root creció bajo el ala de aquel radical. Hoy es profesor de matemáticas...',
    synopsis: 'Durante 11 años visitan al Profesor en el asilo hasta su partida. Root se convierte en profesor de matemáticas, portando la tarjeta de Enatsu en su solapa.',
    game: {
      type: 'chalk_legacy_rush',
      title: 'El Aula del Futuro',
      instruction: '¡Ayuda a Root a inspirar a su clase! Toca las 12 bombillas de curiosidad de los alumnos antes de que termine la clase.',
      goal: 12,
      timeLimit: 15
    }
  }
];
