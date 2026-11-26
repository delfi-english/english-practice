/* Get By · Mapa del curso (fuente única).
   - El ORDEN de 'modulos' es el orden de estudio sugerido, y también el de la teoría y el menú lateral.
   - Para agregar un juego: sumá su ficha en 'juegos' y su id en 'juegos' del módulo.
   - 'proximamente' son ideas del backlog.
   - 'nivel' es una propuesta (A1/A2) a revisar. */
window.CURSO = {
  "modulos": [
    {
      "id": "primeros-pasos",
      "emoji": "🆘",
      "titulo": "Primeros pasos",
      "nivel": "A1",
      "desc": "Saludos, frases salvavidas, vocabulario básico y a quién se refiere cada palabra (yo, vos, mi, tu).",
      "teoria": [
        {
          "id": "survival",
          "label": "Survival Chunks",
          "emoji": "🆘"
        },
        {
          "id": "basicvocab",
          "label": "Vocabulario básico",
          "emoji": "🔢"
        },
        {
          "id": "pronouns",
          "label": "Pronouns & Possessives",
          "emoji": "👤"
        }
      ],
      "juegos": [
        "flashcards-basicos",
        "sopa-letras"
      ],
      "proximamente": [
        {
          "titulo": "Chat Reply",
          "idea": "Elegí la respuesta que suena natural en un saludo o charla corta, no la de manual."
        },
        {
          "titulo": "Whose is it?",
          "idea": "Asigná objetos a personas con his, hers, theirs y mine."
        }
      ]
    },
    {
      "id": "ciudad",
      "emoji": "🗺️",
      "titulo": "Ubicarte en la ciudad",
      "nivel": "A1",
      "desc": "Preguntar y entender direcciones, y describir dónde está cada cosa.",
      "teoria": [
        {
          "id": "places",
          "label": "Places & Directions",
          "emoji": "🗺️"
        },
        {
          "id": "thereis",
          "label": "There is / There are",
          "emoji": "📍"
        }
      ],
      "juegos": [
        "gps-navigator",
        "spot-object"
      ],
      "proximamente": []
    },
    {
      "id": "viajar",
      "emoji": "✈️",
      "titulo": "Viajar: aeropuerto y hotel",
      "nivel": "A1",
      "desc": "Moverte por un aeropuerto, pasar la aduana, hacer el check-in y resolver problemas en el hotel.",
      "teoria": [
        {
          "id": "airport",
          "label": "Airport & Customs",
          "emoji": "✈️"
        },
        {
          "id": "hotel",
          "label": "Hotel & Check-in",
          "emoji": "🏨"
        }
      ],
      "juegos": [
        "airport-scramble",
        "hotel-checkin"
      ],
      "proximamente": []
    },
    {
      "id": "comer-comprar",
      "emoji": "🛍️",
      "titulo": "Comer y comprar",
      "nivel": "A1",
      "desc": "Pedir en un café, preguntar precios, cantidades y pagar.",
      "teoria": [
        {
          "id": "shopping",
          "label": "Shopping & Food",
          "emoji": "🛍️"
        },
        {
          "id": "quantifiers",
          "label": "Quantifiers",
          "emoji": "🔢"
        }
      ],
      "juegos": [
        "cafe-dialogue"
      ],
      "proximamente": [
        {
          "titulo": "Mystery Shopper",
          "idea": "Presupuesto de $100: elegí qué decirle al vendedor para comprar lo que necesitás."
        },
        {
          "titulo": "Supermarket Run",
          "idea": "Arrastrá productos al carrito y elegí some, any, much o many."
        }
      ]
    },
    {
      "id": "salud",
      "emoji": "🚑",
      "titulo": "Salud y emergencias",
      "nivel": "A1",
      "desc": "Explicar cómo te sentís y pedir ayuda en una farmacia o con un médico.",
      "teoria": [
        {
          "id": "health",
          "label": "Health & Emergencies",
          "emoji": "🚑"
        }
      ],
      "juegos": [
        "pharmacy-match"
      ],
      "proximamente": []
    },
    {
      "id": "rutina",
      "emoji": "☕",
      "titulo": "Tu rutina: el presente",
      "nivel": "A1",
      "desc": "Hablar de lo que hacés todos los días y de lo que está pasando ahora.",
      "teoria": [
        {
          "id": "present",
          "label": "Presente Simple & Continuo",
          "emoji": "☕"
        }
      ],
      "juegos": [
        "fill-blanks"
      ],
      "proximamente": [
        {
          "titulo": "Word Order Builder",
          "idea": "Ordená palabras para armar oraciones de tu rutina."
        },
        {
          "titulo": "Right Now",
          "idea": "Mirá escenas ilustradas y decí qué está haciendo cada persona."
        }
      ]
    },
    {
      "id": "pasado-futuro",
      "emoji": "⏳",
      "titulo": "Pasado y futuro",
      "nivel": "A2",
      "desc": "Contar lo que pasó y hablar de planes, promesas y predicciones.",
      "teoria": [
        {
          "id": "past",
          "label": "Past Simple",
          "emoji": "🕰️"
        },
        {
          "id": "future",
          "label": "Future (Will / Going to)",
          "emoji": "🚀"
        }
      ],
      "juegos": [
        "chronos-arcade"
      ],
      "proximamente": [
        {
          "titulo": "Yesterday Detective",
          "idea": "Línea de tiempo para practicar verbos regulares e irregulares."
        },
        {
          "titulo": "Plan or Promise?",
          "idea": "Clasificá frases: plan, decisión del momento, predicción u horario."
        }
      ]
    },
    {
      "id": "comparar",
      "emoji": "⚖️",
      "titulo": "Comparar y describir",
      "nivel": "A2",
      "desc": "Comparar personas, lugares y cosas, y decir cuál es el mejor o el más…",
      "teoria": [
        {
          "id": "comparatives",
          "label": "Comparatives & Superlatives",
          "emoji": "⚖️"
        }
      ],
      "juegos": [
        "comparatives-module"
      ],
      "proximamente": []
    },
    {
      "id": "modales",
      "emoji": "🚦",
      "titulo": "Pedir, permitir y aconsejar",
      "nivel": "A2",
      "desc": "Pedir cosas con educación, dar consejos y entender reglas y carteles.",
      "teoria": [
        {
          "id": "modals",
          "label": "Modal Verbs",
          "emoji": "🚦"
        }
      ],
      "juegos": [],
      "proximamente": [
        {
          "titulo": "Modal Detective",
          "idea": "Descubrí qué modal encaja en cada situación."
        },
        {
          "titulo": "Sign Decoder",
          "idea": "Interpretá carteles reales: No parking, Must show ID."
        },
        {
          "titulo": "Polite or Rude?",
          "idea": "Elegí cuál de dos pedidos suena educado."
        }
      ]
    },
    {
      "id": "pronunciacion",
      "emoji": "🎙️",
      "titulo": "Pronunciación",
      "nivel": "Todos",
      "desc": "Entrená el oído y los sonidos que más cuestan. Se practica en paralelo a todos los módulos.",
      "teoria": [],
      "juegos": [
        "phonetics-studio"
      ],
      "proximamente": [
        {
          "titulo": "Sound Studio",
          "idea": "Pares mínimos y habla conectada, con audios grabados."
        }
      ]
    }
  ],
  "juegos": {
    "flashcards-basicos": {
      "titulo": "Flashcards: vocabulario básico",
      "desc": "Tarjetas con audio para aprender saludos, lugares, cosas cotidianas, colores y familia.",
      "emoji": "🎴",
      "bg": "bg-indigo",
      "tags": [
        "Vocab",
        "Listening",
        "Audio"
      ],
      "practica": true
    },
    "phonetics-studio": {
      "titulo": "Phonetics Studio",
      "desc": "Entrena tu oído y mejora tu pronunciación con el estudio de fonética.",
      "emoji": "🎙️",
      "bg": "bg-pink",
      "tags": [
        "Pronunciation",
        "Speaking"
      ]
    },
    "chronos-arcade": {
      "titulo": "Time Hopper (Chronos)",
      "desc": "Detecta la pista de tiempo y repara la oración antes de que la línea temporal colapse.",
      "emoji": "⏳",
      "bg": "bg-dark",
      "tags": [
        "Past",
        "Present",
        "Future"
      ]
    },
    "comparatives-module": {
      "titulo": "Comparison Clash",
      "desc": "Duelos de estructura. Supera las trampas de los comparativos, superlativos y la estructura as...as.",
      "emoji": "⚔️",
      "bg": "bg-warning",
      "tags": [
        "Comparatives",
        "Superlatives"
      ]
    },
    "airport-scramble": {
      "titulo": "Airport Scramble",
      "desc": "Ordena las palabras perdidas en la cinta de equipaje para armar frases clave de aeropuerto.",
      "emoji": "✈️",
      "bg": "bg-info",
      "tags": [
        "Travel",
        "Chunks"
      ]
    },
    "hotel-checkin": {
      "titulo": "Hotel Check-in",
      "desc": "Practica frases esenciales para hacer el check-in y resolver problemas en tu habitación de hotel.",
      "emoji": "🏨",
      "bg": "bg-rose",
      "tags": [
        "Travel",
        "Dialogues"
      ]
    },
    "cafe-dialogue": {
      "titulo": "Sunny Side Cupcakes",
      "desc": "Interactúa como cliente en una cafetería y aprende a pedir comida y bebida de manera cortés.",
      "emoji": "☕",
      "bg": "bg-orange",
      "tags": [
        "Food",
        "Requests"
      ]
    },
    "pharmacy-match": {
      "titulo": "Pharmacy Match",
      "desc": "Relaciona síntomas con los medicamentos correctos (Over The Counter vs Prescription).",
      "emoji": "💊",
      "bg": "bg-success",
      "tags": [
        "Health",
        "Vocabulary"
      ]
    },
    "gps-navigator": {
      "titulo": "GPS Navigator",
      "desc": "Aprende a dar y entender indicaciones para moverte por la ciudad sin perderte.",
      "emoji": "🗺️",
      "bg": "bg-teal",
      "tags": [
        "Directions",
        "City"
      ]
    },
    "spot-object": {
      "titulo": "Spot the Object",
      "desc": "Agudiza la vista y encuentra lugares y objetos escondidos practicando preposiciones de lugar.",
      "emoji": "🕵️",
      "bg": "bg-purple",
      "tags": [
        "Prepositions",
        "Places"
      ]
    },
    "fill-blanks": {
      "titulo": "Fill the Blanks",
      "desc": "Rellena los espacios vacíos en conversaciones cotidianas para practicar estructuras gramaticales.",
      "emoji": "📝",
      "bg": "bg-lime",
      "tags": [
        "Grammar",
        "Practice"
      ]
    },
    "sopa-letras": {
      "titulo": "Word Search",
      "desc": "Encuentra el vocabulario escondido en esta clásica sopa de letras interactiva.",
      "emoji": "🔍",
      "bg": "bg-danger",
      "tags": [
        "Vocabulary",
        "Mini-game"
      ]
    }
  }
};
