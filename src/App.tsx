// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// 1. DICCIONARIO CENTRALIZADO DE INTERNACIONALIZACIÓN (ES / EN / ZH)
//    CERO EMOJIS - 100% VECTORES SVG E INTERNACIONALIZACIÓN COMPLETA
// ============================================================================
const translations = {
  es: {
    appTitle: 'Feliz Cumpleaños, Lisa',
    backPrevContent: 'Regresar al contenido anterior',
    audioMuted: 'Silenciar',
    audioUnmuted: 'Sonido Activo',
    ytTapToUnmute: 'Toca aquí si tu navegador pausó el audio',
    // PANTALLA 1: LA SERENATA CON MARIACHI
    s1Badge: 'Tradición de Medianoche',
    s1CulturalTitle: 'La Serenata con Mariachi',
    s1CulturalDesc:
      'En México, cuando el reloj marca la medianoche del día de tu cumpleaños, la familia y los amigos más queridos llegan de sorpresa bajo tu ventana acompañados de un grupo de Mariachis. El mariachi canta varias canciones en el día de cumpleaños, y en especial he escogido para ti las que estás mirando y escuchando aquí, ya que son las más tradicionales y queridas de nuestra cultura.',
    s1PersonalSelectionNote:
      'Selección especial: Cada una de estas 5 canciones tradicionales fue elegida personalmente para celebrar tu vida al estilo mexicano.',
    s1TapContinue: 'Toca la pantalla para continuar',
    s1PlayingNow: 'Interpretando grabación original',
    s1MeaningLabel: 'Por qué escogí esta canción tradicional para ti',
    s1LyricsLabel: 'Letra completa de la canción',
    s1SongFinishedPrompt:
      'Toca a los mariachis para escuchar la siguiente canción o continúa dando tap al resto de la pantalla (puedes regresar en cualquier momento)',
    s1NextSongHint: 'Toca a los mariachis para escuchar la siguiente canción tradicional',
    // PANTALLA 2: EL FESTÍN MEXICANO
    s2Badge: 'Gastronomía Festiva',
    s2CulturalTitle: 'El Gran Festín Mexicano',
    s2CulturalDesc:
      'En México los cumpleaños se celebran con comida típica abundante en familia. La mesa se viste de fiesta ofreciendo guisos ancestrales preparados con maíz, chiles suaves, especias y mucho corazón. Toca cualquier platillo para conocer su historia culinaria y probarlo.',
    s2TapToEatPrompt: '¿Comer? Toca la comida para comerlo',
    s2DishFinished: '¡Delicioso! Te has terminado este platillo',
    s2CloseDish: 'Volver a la mesa',
    s2ContinueToCake: 'Avanzar al Pastel de Tres Leches',
    s2Dishes: {
      pozole: {
        name: 'Pozole Rojo Tradicional',
        subtitle: 'Caldo ceremonial de maíz cacahuazintle',
        history:
          'De raíces prehispánicas, el pozole es el platillo por excelencia de las grandes fiestas mexicanas. Se elabora con granos grandes de maíz cacahuazintle que florecen al hervir en un caldo perfumado con chile guajillo, acompañado de carne tierna, rábanos frescos, lechuga crujiente, orégano y limón.'
      },
      tacos: {
        name: 'Tacos al Pastor',
        subtitle: 'Tortilla de maíz con carne adobada y piña asada',
        history:
          'Símbolo de la alegría callejera y nocturna de México. La carne se marina en achiote, especias y chiles dulces, asándose verticalmente en un trompo coronado con piña fresca. Se sirven sobre tortillas de maíz recién hechas con cilantro, cebolla y salsa artesanal.'
      },
      tamales: {
        name: 'Tamales en Hoja de Maíz',
        subtitle: 'Masa esponjosa cocida al vapor en totomoxtle',
        history:
          'Envolver un tamal es como preparar un regalo sagrado de maíz. Su masa batida se rellena de salsas tradicionales y se cuece lentamente al vapor dentro de hojas de mazorca. Nunca faltan en las celebraciones familiares para compartir el calor del hogar.'
      },
      enchiladas: {
        name: 'Enchiladas de Mole Poblano',
        subtitle: 'Tortillas bañadas en salsa de cacao y especias',
        history:
          'El mole es la salsa más festiva de México: una alquimia barroca de más de veinte ingredientes que incluyen distintos chiles dulces, almendras, canela, plátano, ajonjolí y chocolate mexicano. En México decir "ya huele a mole" significa que hay gran fiesta.'
      }
    },
    // PANTALLA 3: EL PASTEL DE TRES LECHES
    s3Badge: 'El Momento Dulce',
    s3CulturalTitle: 'El Pastel de Tres Leches',
    s3CulturalDesc:
      'El pastel favorito de los cumpleaños en México es el famoso Pastel de Tres Leches: un bizcocho esponjoso bañado en tres tipos de leche (evaporada, crema espesa y leche condensada), decorado con merengue cremoso y frutas frescas. Mientras suenan "Las Mañanitas", pide tu deseo y apaga las velitas.',
    s3CandleCulturalDesc:
      'Justo antes de partir el pastel, se atenúan las luces del salón mientras todos cantan "Las Mañanitas". Es el momento de pedir tu deseo de cumpleaños y soplar las velitas.',
    s3BlowInstruction:
      'Sopla suavemente durante 1 segundo hacia tu micrófono para apagar las velitas',
    s3BlowPowerLabel: 'Progreso para apagar las velitas',
    s3BlowFallbackBtn: 'Apagar las velitas con toques aquí',
    s3TouchTipNote:
      'Tip: Si usas toques para apagar las velitas, da click con cuidado y a tu propio ritmo para que disfrutes de cada momento de la celebración.',
    s3MordidaChant: '¡Mordida, mordida!',
    s3MordidaOriginTitle: 'La Tradición de "¡La Mordida!"',
    s3MordidaOriginDesc:
      'En México, tras apagar las velas, nadie parte el pastel todavía. Toda la familia grita "¡Mordida, mordida!" para que el festejado muerda directamente el pastel con las manos atrás, mientras alguien empuja suavemente su rostro contra el betún cremoso entre carcajadas.',
    s3TouchToBite: 'Toca el pastel para darle una suave mordida',
    s3WipeInstruction: '¡Limpia la pantalla haciendo wipe con el dedo!',
    s3WipeProgress: 'Betún limpiado',
    s3PartaChant: '¡Que lo parta, que lo parta!',
    s3PartaInstruction: 'Toca el pastel para partirlo en rebanadas y servirlo en platos de fiesta',
    s3SlicedSuccess: '¡Pastel partido y servido para todos tus invitados!',
    s3ContinueToPinata: 'Continuar a la Piñata Tradicional',
    // PANTALLA 4: LA PIÑATA TRADICIONAL
    s4Badge: 'Juego y Simbolismo',
    s4CulturalTitle: 'La Piñata de Siete Picos',
    s4LeftExplainTitle: 'El Significado de los 7 Picos',
    s4LeftExplainDesc:
      'La piñata tradicional tiene 7 picos dorados que representan los 7 pecados capitales y sus colores vivos simbolizan la tentación. Cada pico requiere al menos 7 golpes certeros para desprenderse (49 impactos en total para vencer y romper la piñata).',
    s4RightExplainTitle: 'La Tonada del "Dale, Dale, Dale"',
    s4RightExplainDesc:
      'Mientras intentas golpear la piñata, toda la fiesta canta la tradicional tonada: "Dale, dale, dale, no pierdas el tino, porque si lo pierdes, pierdes el camino..." marcando el ritmo de cada batazo.',
    s4ChooseModePrompt: 'Selecciona una herramienta debajo de la piñata para comenzar:',
    s4StickTitle: 'El Palo Decorado',
    s4StickDesc:
      'Se quiebra la piñata a golpes directos tocando la pantalla. Cada uno de los 7 picos requiere 7 golpes certeros (49 en total).',
    s4StickAcceptBtn: 'Prepararse con el Palo',
    s4BlindfoldTitle: 'La Venda (A Ciegas)',
    s4BlindfoldDesc:
      'Representa la fe ciega: la pantalla se irá a negro y solo los toques dentro de la zona reducida donde se balancea la piñata contarán como acierto.',
    s4BlindfoldAcceptBtn: 'Aceptar el reto con Venda',
    s4PrepCountdownTitle: '¡Prepárate para quebrar la piñata!',
    s4GoDale: '¡DALE!',
    s4BlindPitchBlackPrompt:
      '¡Explora y pica en la oscuridad! Solo los toques dentro de la zona donde se balancea la piñata darán en el blanco.',
    s4BlindHitFeedback: '¡GOLPE CERTERO A LA PIÑATA!',
    s4BlindMissMessages: ['¡Al aire!', '¡Por ahí no está!', '¡Fallaste, busca más al centro!', '¡Sigue intentando!'],
    s4DirectHitPrompt:
      '¡Toca la piñata al ritmo de la canción! Cada pico necesita 7 impactos certeros para caer.',
    s4PeaksRemainingLabel: 'Picos restantes',
    s4HitsProgressLabel: 'Impactos certeros acumulados',
    s4CurrentPeakResistanceLabel: 'Golpes en el pico actual',
    s4DaleLyrics:
      '¡Dale, dale, dale, no pierdas el tino, porque si lo pierdes, pierdes el camino! ¡Ya le diste una, ya le diste dos, ya le diste tres y tu tiempo se acabó!',
    s4FruitCulturalExplanation:
      '¿Por qué fruta en la piñata? Tradicionalmente en México, las piñatas se rellenaban con frutas de la temporada (mandarinas, caña de azúcar, tejocotes y jícamas) y cacahuates, representando la abundancia y las bondades de la tierra que se comparten con la comunidad al vencer las tentaciones.',
    s4CollectPrompt: '¡Rápido, toma los dulces y la fruta!',
    s4CounterLabel: 'Dulces recolectados',
    s4NeedMoreHint: 'Recolecta al menos 15 elementos para habilitar la flecha',
    s4ContinueBtn: 'Toca aquí para continuar',
    // PANTALLA 5: LA CARTA Y EL GRAN REGALO
    s5Badge: 'Un Regalo Especial',
    s5PressGiftPrompt: 'Presiona el regalo para abrirlo',
    s5LetterHeader: 'Para nuestra querida amiga Lisa',
    s5DefaultLetter:
      'Querida Lisa:\n\nAunque nuestras raíces vengan de rincones distintos del mundo, la amistad verdadera habla un solo idioma: el del cariño sincero.\n\nHoy quise traerte un pedacito auténtico de México directo a tus manos. En mi cultura, celebrar un cumpleaños significa agradecer por tu vida con música de mariachi a medianoche, compartir una mesa desbordante de sabores ancestrales, reírnos juntas con el betún del pastel y romper la piñata de siete picos para que caigan sobre ti todas las frutas, dulzuras y bendiciones de la tierra.\n\nA pesar de que la distancia y nuestras agendas a veces nos impiden charlar a diario, quiero que sepas que eres una persona sumamente importante para mí y que siempre estás presente en mis pensamientos y en mis mejores deseos. En esta ocasión me tomé el tiempo de prepararte este regalo interactivo con todo mi corazón (¡ya que sigo sin descifrar bien cómo mandar transferencias internacionales sin enloquecer! 😂😅). Además, considerando las horas de diferencia horaria entre nuestros países, ¡tu cumpleaños técnicamente dura más de un día completo! 😉\n\nProgramé este sitio web pensando especialmente en ti, en lo mucho que disfrutarías descubrir cada detalle y en ese puente cultural tan bonito que al mismo tiempo nos desafía y nos une. Es también un pedacito de mí, de mi cultura y de cómo me gusta expresarme a nivel de ingeniería de software (¡aunque sigo aprendiendo y practicando cada día! 💻✨).\n\nEres una de mis amigas más íntimas y queridas. Agradezco con el alma cada momento compartido, sea largo o cortito. Admiro profundamente tu paciencia, tu dedicación y la mujer tan increíble, brillante y fuerte que eres; ten por seguro que muchas cosas de ti son un ejemplo e inspiración para mí. Gracias por abrirme las puertas de tu vida y por permitirme seguir en ella. Espero de todo corazón que muy pronto podamos abrazarnos en persona. 🫂♥️\n\nTe quiero muchísimo, Lisa, y te deseo una maravillosa vuelta al sol. Que este nuevo episodio de tu vida llegue repleto de salud inquebrantable, alegría, fortunas y amor; y que todo lo bueno que das al mundo, junto con cada centavo que inviertas o gastes, regrese a ti multiplicado por millones. Espero con ansias un buen respiro para retomar nuestras largas charlas.\n\n¡Espero que lo hayas disfrutado tanto como yo disfruté creándolo ♥️! \n\nCuando alguien de fuera se gana de verdad nuestro corazón, en México solemos decir con todo el orgullo:\n\n🌮🇲🇽✨ ¡Lisa, hermana, ya eres mexicana! ✨🇲🇽🌮',
    s5CloseLetterFooter: 'Presiona cualquier lado fuera de la carta para cerrarla',
    s5BtnPrev: 'Regresar al contenido anterior',
    s5BtnNext: 'Siguiente y última parte',
    s5BtnRestart: 'Volver a empezar desde el inicio',
    // PANTALLA 6: LA ROCOLA MEXICANA
    s6Badge: 'Repertorio Completo (6 Vinilos)',
    s6Title: 'La Rocola Mexicana de Lisa',
    s6Subtitle:
      'Una vitrina con los 6 discos de vinilo originales de tu celebración (las 5 canciones tradicionales que escogí para tu serenata más el tema clásico de la piñata). Toca o pasa el cursor sobre cualquier vinilo para girarlo y abrir su canción en YouTube.',
    s6OpenYoutube: 'Abrir en YouTube',
    s6PlayHere: 'Sonar aquí'
  },
  en: {
    appTitle: 'Happy Birthday, Lisa',
    backPrevContent: 'Return to previous content',
    audioMuted: 'Mute',
    audioUnmuted: 'Sound On',
    ytTapToUnmute: 'Tap here if your browser paused the audio',
    // SCREEN 1: SERENADE
    s1Badge: 'Midnight Tradition',
    s1CulturalTitle: 'The Mariachi Serenade',
    s1CulturalDesc:
      'In Mexico, when the clock strikes midnight on your birthday, family and closest friends arrive by surprise beneath your window with a Mariachi band. The mariachi sings several songs on a birthday, and I have specially chosen the ones you are seeing and hearing right here because they are the most traditional and cherished in our culture.',
    s1PersonalSelectionNote:
      'Special curation: Each of these 5 traditional songs was personally chosen for you to experience a true Mexican birthday.',
    s1TapContinue: 'Tap the screen to continue',
    s1PlayingNow: 'Playing Original Recording',
    s1MeaningLabel: 'Why I chose this traditional song for you',
    s1LyricsLabel: 'Complete Song Lyrics',
    s1SongFinishedPrompt:
      'Tap the mariachis to hear the next song or tap anywhere else on the screen to continue (you can go back anytime)',
    s1NextSongHint: 'Tap the mariachis to listen to the next traditional song',
    // SCREEN 2: THE FEAST
    s2Badge: 'Festive Gastronomy',
    s2CulturalTitle: 'The Great Mexican Feast',
    s2CulturalDesc:
      'In Mexico, birthdays are celebrated with abundant traditional food shared with family. The festive table offers ancestral dishes made from heirloom corn, mild chilies, spices, and love. Tap any dish to learn its culinary history and taste it.',
    s2TapToEatPrompt: 'Eat? Tap the food to eat it',
    s2DishFinished: 'Delicious! You finished this dish',
    s2CloseDish: 'Return to the table',
    s2ContinueToCake: 'Continue to the Tres Leches Cake',
    s2Dishes: {
      pozole: {
        name: 'Traditional Red Pozole',
        subtitle: 'Ceremonial hominy corn broth',
        history:
          'With pre-Hispanic roots, pozole is the ultimate celebratory dish in Mexican homes. Made from large cacahuazintle corn kernels that bloom when simmered in a rich guajillo broth, served with tender meat, crisp radishes, shredded lettuce, oregano, and lime.'
      },
      tacos: {
        name: 'Tacos al Pastor',
        subtitle: 'Corn tortilla with marinated pork & roasted pineapple',
        history:
          'An icon of Mexican evening joy. Thin cuts of meat are marinated in achiote, spices, and sweet dried chilies, roasted vertically on a spit crowned with fresh pineapple, and served on warm corn tortillas with cilantro, onion, and artisan salsa.'
      },
      tamales: {
        name: 'Corn Husk Tamales',
        subtitle: 'Fluffy corn masa steamed inside totomoxtle leaves',
        history:
          'Unwrapping a tamale is like opening a sacred culinary gift. Whipped corn dough is filled with traditional sauces and slowly steamed inside dried corn husks. They never miss a family gathering to share warmth and abundance.'
      },
      enchiladas: {
        name: 'Mole Poblano Enchiladas',
        subtitle: 'Corn tortillas bathed in cacao and spice sauce',
        history:
          'Mole is Mexico’s most festive sauce: a baroque alchemy of over twenty ingredients including sweet chilies, almonds, cinnamon, plantain, sesame seeds, and Mexican chocolate. Saying "it smells like mole" means a grand party is underway.'
      }
    },
    // SCREEN 3: THE CAKE
    s3Badge: 'The Sweet Moment',
    s3CulturalTitle: 'The Tres Leches Cake',
    s3CulturalDesc:
      'The most beloved birthday cake in Mexico is the famous Tres Leches ("Three Milks") cake: a light sponge cake soaked in evaporated milk, heavy cream, and sweetened condensed milk, crowned with whipped cream and fresh fruit. As "Las Mañanitas" plays right from the start, make your wish and blow out the candles.',
    s3CandleCulturalDesc:
      'As the room lights dim and everyone sings "Las Mañanitas", make your silent birthday wish and blow out the candles.',
    s3BlowInstruction:
      'Blow gently for about 1 second into your microphone to put out the candles',
    s3BlowPowerLabel: 'Candle Blowing Progress',
    s3BlowFallbackBtn: 'Blow out the candles with taps here',
    s3TouchTipNote:
      'Tip: If you use touches to blow out the candles, tap gently and at your own pace so you can enjoy every moment of the celebration.',
    s3MordidaChant: 'Mordida, mordida! (Take a bite!)',
    s3MordidaOriginTitle: 'The Playful Tradition of "La Mordida"',
    s3MordidaOriginDesc:
      'In Mexico, after blowing out the candles, nobody uses a knife yet! Everyone chants "¡Mordida, mordida!" so the birthday star leans in hands-free to take the first bite—while a playful relative gently nudges their face into the creamy frosting amidst laughter.',
    s3TouchToBite: 'Tap the cake to take a gentle bite',
    s3WipeInstruction: 'Wipe the screen clean with your finger!',
    s3WipeProgress: 'Frosting wiped',
    s3PartaChant: 'Que lo parta, que lo parta! (Slice the cake!)',
    s3PartaInstruction: 'Tap the cake to slice it and serve individual party plates',
    s3SlicedSuccess: 'Cake sliced and served for all your guests!',
    s3ContinueToPinata: 'Continue to the Traditional Piñata',
    // SCREEN 4: THE PIÑATA
    s4Badge: 'Play & Symbolism',
    s4CulturalTitle: 'The Traditional 7-Peak Piñata',
    s4LeftExplainTitle: 'Meaning of the 7 Peaks',
    s4LeftExplainDesc:
      'The traditional star piñata has 7 golden peaks representing the 7 deadly sins, while its bright colors symbolize temptation. Each peak requires at least 7 direct hits to detach (49 total hits to break the piñata completely).',
    s4RightExplainTitle: 'The "Dale, Dale, Dale" Song',
    s4RightExplainDesc:
      'While swinging at the piñata, everyone sings the classic tune: "Dale, dale, dale, do not lose your aim, because if you lose it, you lose your way..." setting the rhythm for every strike.',
    s4ChooseModePrompt: 'Choose a tool below the piñata to begin:',
    s4StickTitle: 'The Wooden Stick (El Palo)',
    s4StickDesc:
      'Break the piñata with direct strikes by tapping the screen. Each of the 7 peaks requires 7 direct hits (49 hits total).',
    s4StickAcceptBtn: 'Get Ready with the Stick',
    s4BlindfoldTitle: 'The Blindfold (La Venda)',
    s4BlindfoldDesc:
      'Symbolizing blind faith: the screen turns pitch black and only taps inside the small swinging zone of the piñata will count as a hit!',
    s4BlindfoldAcceptBtn: 'Accept the Blindfold Challenge',
    s4PrepCountdownTitle: 'Get ready to break the piñata!',
    s4GoDale: 'HIT IT!',
    s4BlindPitchBlackPrompt:
      'Explore and tap in the dark! Only touches inside the small area where the piñata is swinging will count as a hit.',
    s4BlindHitFeedback: 'DIRECT HIT ON THE PIÑATA!',
    s4BlindMissMessages: ['Swing and a miss!', 'Not over there!', 'Missed! Search closer to the center!', 'Keep searching!'],
    s4DirectHitPrompt:
      'Tap the piñata to the beat of the song! Each peak needs 7 direct hits to fall off.',
    s4PeaksRemainingLabel: 'Peaks remaining',
    s4HitsProgressLabel: 'Total direct hits',
    s4CurrentPeakResistanceLabel: 'Hits on current peak',
    s4DaleLyrics:
      'Dale, dale, dale! Do not lose your aim, because if you lose it, you lose the way! You hit it once, you hit it twice, you hit it three times and your time is up!',
    s4FruitCulturalExplanation:
      'Why fruit inside the piñata? Traditionally in Mexico, piñatas were filled with seasonal fruits (mandarins, sugar cane, tejocotes, and jícama) and peanuts, representing the abundance and goodness of the earth shared with the community after overcoming temptation.',
    s4CollectPrompt: 'Quick, grab the candies and fruit!',
    s4CounterLabel: 'Candies collected',
    s4NeedMoreHint: 'Collect at least 15 items to unlock the continue arrow',
    s4ContinueBtn: 'Tap here to continue',
    // SCREEN 5: THE GIFT & LETTER
    s5Badge: 'A Special Gift',
    s5PressGiftPrompt: 'Press the gift to open it',
    s5LetterHeader: 'For Our Dearest Friend Lisa',
    s5DefaultLetter:
      'Dearest Lisa:\n\nEven though our roots blossom in different corners of the world, true friendship speaks a single universal language: heartfelt affection.\n\nToday, I wanted to bring an authentic piece of Mexico straight into your hands. In my culture, celebrating a birthday means giving thanks for your life with midnight mariachi music, sharing a table overflowing with ancestral flavors, laughing together with cake frosting on our faces, and breaking the seven-peak piñata so all the sweetness, fruits, and blessings of the earth rain down upon you.\n\nEven though our schedules and time zones keep us from talking every single day, you are someone truly special to me, and your happiness is always on my mind. For this special occasion, I took the time to craft this little interactive gift just for you (since I still haven’t figured out how to send international bank transfers without losing my mind! 😂😅). Plus, thanks to the time difference between our countries, your birthday technically lasts more than a full day! 😉\n\nI built this web app thinking of you, how much you would enjoy discovering every little tradition, and the beautiful cultural bridge that both challenges and unites us. It is also a little piece of me, my home, and how I express myself through software engineering (still practicing and leveling up my code every day! 💻✨).\n\nYou are one of my closest, dearest friends, and I cherish every conversation we share, no matter how brief or long. I deeply admire your patience, your dedication, and the brilliant, inspiring woman you are. Thank you for welcoming me into your world and letting me be part of your journey. I truly hope we get to meet and hug each other in person very soon. 🫂♥️\n\nI love you dearly, Lisa, and I wish you the happiest trip around the sun. May this new chapter of your life be filled with radiant health, joy, boundless fortune, and love—and may every kindness you share and every penny you spend return to you multiplied by millions. I cannot wait for a well-deserved break so we can catch up on all our chats.\n\nI hope you enjoyed it as much as I enjoyed making it. ♥️! \n\nWhenever someone from across the globe truly touches our hearts, here in Mexico we say with pride and love:\n\n🌮🇲🇽✨ Lisa, hermana, ya eres mexicana! ✨🇲🇽🌮 (🌮🇲🇽✨ Lisa, sister, you’re Mexican now! ✨🇲🇽🌮)',
    s5CloseLetterFooter: 'Press anywhere outside the letter to close it',
    s5BtnPrev: 'Return to previous content',
    s5BtnNext: 'Next and final part',
    s5BtnRestart: 'Start over from the beginning',
    // SCREEN 6: THE MEXICAN JUKEBOX
    s6Badge: 'Complete Repertoire (6 Vinyls)',
    s6Title: 'Lisa’s Mexican Jukebox',
    s6Subtitle:
      'A showcase with the 6 original vinyl records from your celebration (the 5 traditional mariachi songs I specially chose for your serenade plus the classic piñata song). Tap or hover over any vinyl to spin it and open its song on YouTube.',
    s6OpenYoutube: 'Open on YouTube',
    s6PlayHere: 'Play here'
  },
  zh: {
    appTitle: '生日快乐，Lisa',
    backPrevContent: '返回上一页内容',
    audioMuted: '静音',
    audioUnmuted: '声音开启',
    ytTapToUnmute: '如果浏览器暂停了声音，请点击此处播放',
    // SCREEN 1: SERENADE
    s1Badge: '午夜传统',
    s1CulturalTitle: '玛利亚奇（Mariachi）午夜小夜曲',
    s1CulturalDesc:
      '在墨西哥，生日当天的午夜钟声敲响时，家人和挚友会带着玛利亚奇乐队来到窗下带来惊喜。玛利亚奇乐队会在生日这天演唱多首歌曲，而我特别为你精心挑选了你眼前所看到和听到的这几首，因为它们是我们文化中最传统、最受人喜爱的经典之作。',
    s1PersonalSelectionNote:
      '专属精选：这 5 首传统名曲是我专门为你挑选的，愿你感受最纯正热烈的墨西哥生日祝福。',
    s1TapContinue: '点击屏幕继续',
    s1PlayingNow: '正在播放原版名曲',
    s1MeaningLabel: '为什么我为你挑选这首传统歌曲',
    s1LyricsLabel: '完整歌词',
    s1SongFinishedPrompt:
      '点击玛利亚奇乐队收听下一首歌曲，或点击屏幕其他位置继续（您可以随时返回）',
    s1NextSongHint: '点击玛利亚奇乐队切换下一首传统名曲',
    // SCREEN 2: THE FEAST
    s2Badge: '节庆美食',
    s2CulturalTitle: '丰盛的墨西哥传统家宴',
    s2CulturalDesc:
      '在墨西哥，生日总是伴随着丰盛的传统家庭聚餐。餐桌上摆满由古老玉米、温和辣椒与香料慢炖而成的传统佳肴。点击任意菜肴了解它的美食历史并品尝吧！',
    s2TapToEatPrompt: '想品尝吗？点击美食开始享用',
    s2DishFinished: '太美味了！你已品尝完这道佳肴',
    s2CloseDish: '返回餐桌',
    s2ContinueToCake: '前往品尝三奶蛋糕',
    s2Dishes: {
      pozole: {
        name: '传统红波索尔汤 (Pozole Rojo)',
        subtitle: '开花大白玉米与香料慢炖的节庆浓汤',
        history:
          '波索尔汤起源于前哥伦布时期，是墨西哥重大庆典上最具代表性的灵魂美食。选用特制的大颗粒玉米（Cacahuazintle），在温和的红椒高汤中慢火熬煮至玉米粒如花朵般绽放，佐以嫩肉、鲜脆水萝卜、生菜丝、牛至叶与青柠汁。'
      },
      tacos: {
        name: '牧人烤肉塔可 (Tacos al Pastor)',
        subtitle: '秘制胭脂树籽烤肉配烤菠萝与玉米饼',
        history:
          '墨西哥街头与夜晚欢乐的象征。猪肉用胭脂树籽、温和干辣椒和香料腌制后，在顶端插着新鲜菠萝的旋转烤架上慢烤。切下焦香肉片与甜美菠萝，裹入温热的手工玉米饼中，撒上香菜、洋葱与秘制莎莎酱。'
      },
      tamales: {
        name: '玉米叶蒸塔玛利 (Tamales)',
        subtitle: '用干玉米苞叶包裹蒸制的松软玉米糕',
        history:
          '剥开一个塔玛利就像拆开一份来自大地的神圣礼物。蓬松细腻的玉米面团包裹着浓郁酱汁与肉馅，在玉米叶中慢火蒸熟。在墨西哥的家庭生日聚会中，它象征着团圆、温暖与富足。'
      },
      enchiladas: {
        name: '普埃布拉摩尔酱安吉拉达 (Enchiladas de Mole)',
        subtitle: '裹满可可与二十余种香料秘制酱汁的玉米卷',
        history:
          '摩尔酱（Mole）是墨西哥最具传奇色彩的国宴级酱汁：由温和辣椒、杏仁、肉桂、芝麻以及墨西哥黑巧克力等二十多种食材奇妙融合而成。在墨西哥俗语中，“闻到摩尔酱香”就意味着盛大的喜庆派对开始了。'
      }
    },
    // SCREEN 3: THE CAKE
    s3Badge: '甜蜜时刻',
    s3CulturalTitle: '墨西哥传统三奶蛋糕 (Pastel de Tres Leches)',
    s3CulturalDesc:
      '墨西哥生日派对上最受欢迎的主角莫过于“三奶蛋糕”：松软的海绵蛋糕饱吸了淡奶、浓奶油和甜炼乳三种乳品的精华，表面铺满轻盈的奶油霜与新鲜草莓、黄桃。伴随着一进入页面便响起的《清晨之歌》，默默许下心愿并吹灭蜡烛吧！',
    s3CandleCulturalDesc:
      '伴随《清晨之歌》的悠扬歌声与柔和的灯光，在心中许下美好的生日愿望，然后吹灭蜡烛吧。',
    s3BlowInstruction:
      '请对着手机麦克风温和持续吹气约 1 秒钟，即可吹灭生日蜡烛',
    s3BlowPowerLabel: '吹灭蜡烛进度',
    s3BlowFallbackBtn: '或者点击这里吹灭蜡烛',
    s3TouchTipNote:
      '温馨提示（Tip）：如果您使用点击屏幕的方式吹灭蜡烛，请按照您自己舒适的节奏慢慢点击，尽情享受庆典的每一刻。',
    s3MordidaChant: 'Mordida, mordida!（咬一口，咬一口！）',
    s3MordidaOriginTitle: '欢声笑语的“第一口蛋糕 (La Mordida)”传统',
    s3MordidaOriginDesc:
      '在墨西哥，吹灭蜡烛后大家还不会马上用刀切蛋糕！全家人会热情地高喊“¡Mordida, mordida!（咬一口！）”，让寿星双手背在身后，直接低头咬下第一口蛋糕——而淘气的亲友往往会在欢笑声中轻轻推一下寿星的脑袋，让脸颊沾满甜蜜的奶油！',
    s3TouchToBite: '点击蛋糕，温柔地咬下第一口吧',
    s3WipeInstruction: '用手指在屏幕上滑动，把满屏的奶油擦干净吧！',
    s3WipeProgress: '已擦净奶油',
    s3PartaChant: 'Que lo parta, que lo parta!（快切蛋糕吧！）',
    s3PartaInstruction: '点击蛋糕，将它切开装盘分给在场的每一位宾客',
    s3SlicedSuccess: '蛋糕已切好分盘，甜蜜分享给所有人！',
    s3ContinueToPinata: '前往敲传统七角星彩罐 (Piñata)',
    // SCREEN 4: THE PIÑATA
    s4Badge: '传统游戏与寓意',
    s4CulturalTitle: '七角星传统彩罐 (Piñata)',
    s4LeftExplainTitle: '七个金角的文化寓意',
    s4LeftExplainDesc:
      '传统的墨西哥彩罐有七个金色尖角，代表七宗罪，鲜艳的彩纸象征诱惑。每一个尖角都需要至少 7 次精准命中才能脱落（累计 49 次命中才能彻底敲破彩罐）。',
    s4RightExplainTitle: '经典歌谣《Dale, Dale, Dale》',
    s4RightExplainDesc:
      '当寿星挥杆敲击彩罐时，所有人会齐唱传统歌谣：“敲吧，敲吧，敲吧（Dale, dale, dale），别失去准头，因为一旦偏离就会迷失方向……”伴随着歌声击落全部七个尖角！',
    s4ChooseModePrompt: '请在彩罐下方选择一种传统工具开始：',
    s4StickTitle: '彩带木棍 (El Palo)',
    s4StickDesc: '使用缠满彩纸的木棍直接敲击。7 个金角中的每一个都需要至少 7 次命中才会掉落（共 49 次）。',
    s4StickAcceptBtn: '拿起木棍准备',
    s4BlindfoldTitle: '蒙眼布条 (La Venda)',
    s4BlindfoldDesc:
      '象征坚定的信念：屏幕将陷入漆黑，只有点击到彩罐摇摆所在的狭小区域内才算有效命中！',
    s4BlindfoldAcceptBtn: '接受蒙眼挑战',
    s4PrepCountdownTitle: '准备好敲破彩罐了吗！',
    s4GoDale: '开始敲吧 (¡DALE!)！',
    s4BlindPitchBlackPrompt:
      '在黑暗中探索点击！只有点中彩罐正在摇摆的中心小区域才算命中，点在外面会打空哦！',
    s4BlindHitFeedback: '精准命中彩罐！',
    s4BlindMissMessages: ['打空啦！', '不在那边哦！', '偏啦，往中间找找看！', '差一点点，继续摸索！'],
    s4DirectHitPrompt: '伴随着歌声点击彩罐！每个尖角需要 7 次命中才会脱落。',
    s4PeaksRemainingLabel: '剩余尖角',
    s4HitsProgressLabel: '累计精准命中',
    s4CurrentPeakResistanceLabel: '当前尖角承受击打',
    s4DaleLyrics:
      '敲吧，敲吧，敲吧！千万别失去准头，因为一旦偏离就会迷失方向！敲了一下，敲了两下，敲了三下，你的时间到啦！',
    s4FruitCulturalExplanation:
      '为什么彩罐里会有水果？在墨西哥传统中，彩罐里装满了时令鲜果（橘子、甘蔗、墨西哥山楂和凉薯）以及带壳花生，象征着战胜诱惑后，大地赐予人们共同分享的丰饶与恩惠。',
    s4CollectPrompt: '快！点击收集掉落的传统糖果和时令水果！',
    s4CounterLabel: '已收集糖果水果',
    s4NeedMoreHint: '至少收集 15 个糖果或水果即可解锁继续按钮',
    s4ContinueBtn: '点击这里继续前进',
    // SCREEN 5: THE GIFT & LETTER
    s5Badge: '来自心底的礼物',
    s5PressGiftPrompt: '点击礼盒解开丝带',
    s5LetterHeader: '致我们最亲爱的朋友 Lisa',
    s5DefaultLetter:
      '亲爱的 Lisa：\n\n虽然我们的根扎在世界的不同角落，但真挚的友谊永远只有一种语言：发自内心的温暖与牵挂。\n\n今天，我想把最地道的墨西哥生日传统亲手捧到你的面前。在我的文化里，庆祝生日意味着在午夜伴着玛利亚奇的琴声感谢你的诞生，在摆满传统佳肴的餐桌上大快朵颐，在沾满蛋糕奶油的笑闹中许下心愿，并敲碎七角星彩罐（Piñata），让丰收的鲜果、甜蜜的糖果与大地的全部祝福如雨般洒向你。\n\n虽然时差和各自忙碌的生活让我们无法每天联系，但你一直是我心里非常珍视的好朋友，我始终牵挂着你、祝愿着你。这次我特意花时间为你亲手写了这个互动小礼物（毕竟跨国汇款到现在我还搞不太明白，快被繁琐的手续逼疯啦！😂😅）。而且算上我们两国的时差，从技术上来说，你的生日可是能过上一整天还多呢！😉\n\n我在编写这个网站时一直想着你，想着你看到这些有趣文化时的笑容，也想着那座跨越文化差异却让我们心心相印的友谊之桥。这也是属于我的一份心意、我的家乡风情，以及我作为软件工程师表达爱意的方式（代码我还在每天努力练习和精进中！💻✨）。\n\n你是我最亲密无间的朋友之一，无论我们的交流有多长或多短，我都无比珍惜。我由衷钦佩你的耐心、专注，以及你身上闪闪发光的优秀品质；你的坚韧与美好一直是我学习的榜样。感谢你向我敞开心扉，让我成为你生命里的一部分。真希望能早日和你在线下见面，给你一个大大的拥抱！🫂♥️\n\nLisa，我超爱你！祝你新的一岁生日快乐，开启闪闪发光的新篇章。愿你的生活充满平安、喜乐、丰盛的财运与无限的爱意；愿你播下的每一份善意、花出的每一分钱，都能成千上万倍地回流到你的身边。期待很快能好好歇一歇，继续咱们聊不完的闺蜜夜话。\n\n希望你喜欢它，就像我享受创作它的过程一样！♥️ \n\n在墨西哥，当一个外国朋友真正住进我们心里时，我们总会自豪又亲切地对她说：\n\n🌮🇲🇽✨ ¡Lisa, Hermana, Ya Eres Mexicana!（Lisa，好姐妹，你已经是我们墨西哥人啦！）✨🇲🇽🌮',
    s5CloseLetterFooter: '点击信纸以外的任意区域即可合上信件',
    s5BtnPrev: '返回上一页内容',
    s5BtnNext: '前往最后一部分',
    s5BtnRestart: '从头重新体验',
    // SCREEN 6: THE MEXICAN JUKEBOX
    s6Badge: '完整典藏唱片柜（6 张黑胶）',
    s6Title: 'Lisa 的墨西哥音乐点唱机',
    s6Subtitle:
      '这里珍藏着陪伴你度过生日派对的 6 张原版黑胶唱片（我专门为你挑选的 5 首传统玛利亚奇名曲，以及敲彩罐传统歌谣）。点击或触摸任意黑胶唱片即可旋转并在 YouTube 打开原曲。',
    s6OpenYoutube: '在 YouTube 打开',
    s6PlayHere: '在此播放'
  }
};

// ============================================================================
// 2. REPERTORIO DE CANCIONES REALES (5 DE SERENATA + 1 DE PIÑATA PARA ROCOLA)
// ============================================================================
const SERENADE_SONGS = [
  {
    id: 'mananitas',
    title: 'Las Mañanitas',
    artist: 'Vicente Fernández',
    videoId: 'ixZO0j_LCj4',
    startSeconds: 0,
    youtubeUrl: 'https://youtu.be/ixZO0j_LCj4',
    vinylColor: '#E4007C',
    labelAccent: '#F5A623',
    lyrics: {
      es: [
        'Estas son las mañanitas que cantaba el Rey David,',
        'hoy por ser día de tu santo, te las cantamos a ti.',
        'Despierta, mi bien, despierta, mira que ya amaneció,',
        'ya los pajarillos cantan, la luna ya se metió.',
        '¡Qué linda está la mañana en que vengo a saludarte!',
        'Venimos todos con gusto y placer a felicitarte.',
        'El día en que tú naciste, nacieron todas las flores,',
        'y en la pila del bautismo cantaron los ruiseñores.',
        'Ya viene amaneciendo, ya la luz del día nos dio,',
        'levántate de mañana, mira que ya amaneció.',
        'Con jazmines y flores este día quiero adornar,',
        'hoy por ser día de tu santo, te venimos a cantar.'
      ],
      en: [
        'These are the morning songs that King David used to sing,',
        'today because it is your special day, we sing them all to you.',
        'Awake, my dear friend, awake, look how dawn has broken,',
        'the little birds are already singing, the moon has gone to rest.',
        'How lovely is this morning in which I come to greet you!',
        'We all come with joy and pleasure to wish you a happy birthday.',
        'On the very day you were born, all the flowers bloomed,',
        'and at the baptismal font the nightingales sang with joy.',
        'The dawn is already breaking, the daylight has arrived,',
        'arise this beautiful morning, look how the sun has risen.',
        'With jasmine and fresh flowers I want to adorn this day,',
        'today on your celebration, we come to sing to you.'
      ],
      zh: [
        '这是昔日大卫王曾深情吟唱的清晨赞歌，',
        '今天正逢你诞辰的美好日子，我们把它献给你。',
        '醒来吧，挚友快醒来，看那黎明已经破晓，',
        '枝头的小鸟已在欢唱，皎洁的月亮已悄然隐去。',
        '我前来向你问候的这个清晨是多么明媚动人！',
        '我们怀着满满的欢喜与祝福，共同祝贺你的生辰。',
        '在你诞生的那一天，世间所有的花朵都为你绽放，',
        '连夜莺也在圣洁的泉水旁为你婉转歌唱。',
        '晨曦已经渐渐亮起，温暖的阳光洒满大地，',
        '在这个美好的早晨起身吧，看那朝阳已经升起。',
        '我要用茉莉与鲜花装点这珍贵的一天，',
        '今天专程来到你窗前，为你唱响这首生日赞歌。'
      ]
    },
    meaning: {
      es: 'Escogí "Las Mañanitas" en primer lugar porque es el himno imprescindible de todo cumpleaños en México: es la primera canción que el mariachi entona para agradecer un año más de tu vida.',
      en: 'I chose "Las Mañanitas" first because it is the essential anthem of every birthday in Mexico—the very first song the mariachi sings to celebrate your life.',
      zh: '我首先为你挑选了《Las Mañanitas（清晨之歌）》，因为它是墨西哥每个生日必不可少的圣歌，也是玛利亚奇乐队为你唱响的第一首祝福曲。'
    }
  },
  {
    id: 'telopido',
    title: 'Te Lo Pido Por Favor',
    artist: 'Juan Gabriel',
    videoId: 'Of3Y_IcbbuU',
    startSeconds: 0,
    youtubeUrl: 'https://youtu.be/Of3Y_IcbbuU',
    vinylColor: '#006341',
    labelAccent: '#F5A623',
    lyrics: {
      es: [
        'Donde estés hoy y siempre, yo te llevo conmigo,',
        'necesito cuidados, necesito de ti.',
        'Si me voy donde vaya, si estás tú no estoy solo,',
        'en el tiempo y espacio, tú eres todo para mí.',
        'Estés donde estés, te lo pido por favor:',
        'no me olvides jamás, que sin ti no soy nada.',
        'Porque tú eres mi sol, eres mi eterno amor,',
        'el motivo de mi felicidad y de mi canción.',
        'Te lo pido por favor, que nunca me dejes,',
        'porque mi corazón vive agradecido por tu existir,',
        'y donde quiera que vayas, mi cariño va contigo.'
      ],
      en: [
        'Wherever you are today and always, I carry you with me,',
        'I cherish your care, I treasure having you in my life.',
        'Wherever I go, if you are there I am never alone,',
        'across all time and space, you mean the world to me.',
        'Wherever you may be, I ask this from my heart:',
        'never forget our bond, which fills our days with light.',
        'Because you are like the sun, a timeless affection,',
        'the reason behind our joy and this mariachi song.',
        'I ask you from the heart to always stay close in spirit,',
        'because my heart is forever grateful for your existence,',
        'and wherever life leads you, our affection goes with you.'
      ],
      zh: [
        '无论今天或永远你身在何方，我都将你珍藏在心底，',
        '我珍惜这份温暖的关怀，也感激生命中有你相伴。',
        '无论我走向何处，只要有你在，我便从不孤单，',
        '跨越时间与山海的距离，这份情谊无比珍贵。',
        '无论你身在何处，请收下我发自内心的祈愿：',
        '愿我们永远铭记这份情谊，它让岁月充满光芒。',
        '因为你就像温暖的阳光，是永恒而真挚的牵挂，',
        '也是我们今天欢聚与歌唱的理由。',
        '衷心祝愿我们的友谊永远紧密相连，',
        '我的心永远感激你的诞生与存在，',
        '无论你走到世界哪个角落，我们的祝福永远伴随你。'
      ]
    },
    meaning: {
      es: 'Escogí esta canción tradicional de Juan Gabriel porque en las serenatas de cumpleaños se dedica a las amistades y seres queridos que llevamos siempre en el corazón sin importar la distancia.',
      en: 'I chose this traditional Juan Gabriel song because in Mexican birthday serenades it is dedicated to cherished friends we carry in our hearts across any distance.',
      zh: '我为你挑选了 Juan Gabriel 的这首传统名曲，因为在生日小夜曲中，它专门献给那些无论相隔多远都永远珍藏在我们心底的挚友。'
    }
  },
  {
    id: 'labikina',
    title: 'La Bikina',
    artist: 'Luis Miguel',
    videoId: 'NCvJwzDQTBM',
    startSeconds: 0,
    youtubeUrl: 'https://youtu.be/NCvJwzDQTBM',
    vinylColor: '#6A1B9A',
    labelAccent: '#E4007C',
    lyrics: {
      es: [
        'Solitaria camina la Bikina,',
        'la gente se pone a murmurar.',
        'Dicen que tiene una pena,',
        'dicen que tiene una pena que la hace llorar.',
        'Altanera, preciosa y orgullosa,',
        'no permite la quieran consolar.',
        'Pasa luciendo su real majestad,',
        'pasa, camina y los mira sin verlos jamás.',
        'La Bikina tiene pena y dolor,',
        'la Bikina no conoce el amor.',
        'Altanera, preciosa y orgullosa,',
        'no permite la quieran consolar.'
      ],
      en: [
        'In solitary grace walks La Bikina,',
        'and the people begin to whisper as she passes by.',
        'They say she carries a deep memory in her soul,',
        'a secret story hidden behind her proud gaze.',
        'Haughty, precious, and fiercely proud,',
        'she never lets anyone console her spirit.',
        'She walks by displaying her royal majesty,',
        'striding forward with elegance and dignity.',
        'La Bikina guards her mystery and strength,',
        'like the crashing waves along the Mexican coast.',
        'Haughty, precious, and fiercely proud,',
        'celebrated by the soaring trumpets of the mariachi.'
      ],
      zh: [
        '微风中她优雅而独立地漫步，',
        '走过之处引来人们轻声赞叹与注视。',
        '人们说她心中藏着一段深邃的往事，',
        '一段隐秘在坚定目光背后的动人故事。',
        '高贵、美丽而又充满自豪的灵魂，',
        '从不需要任何人的怜悯与安慰。',
        '她迈着宛如女王般高雅的步伐从容走过，',
        '举手投足间尽显尊贵与洒脱的气度。',
        'La Bikina 守护着她内心的神秘与坚韧，',
        '如同墨西哥海岸边激荡的浪花。',
        '高贵、美丽而又充满自豪，',
        '伴随着激昂高亢的玛利亚奇小号与小提琴齐奏。'
      ]
    },
    meaning: {
      es: 'Escogí "La Bikina" porque es una de las piezas más alegres, majestuosas y tradicionales del mariachi; sus trompetas y violines llenan de energía festiva cualquier celebración mexicana.',
      en: 'I chose "La Bikina" because it is one of the most majestic and traditional mariachi pieces; its soaring trumpets and violins fill any Mexican celebration with festive energy.',
      zh: '我为你选择了《La Bikina》，因为它是玛利亚奇曲库中最恢弘、最欢快的传统名作之一，激昂的小号与小提琴能瞬间点燃整场生日庆典。'
    }
  },
  {
    id: 'hermosocarino',
    title: 'Hermoso Cariño',
    artist: 'Vicente Fernández',
    videoId: 'j9KY3R81STU',
    startSeconds: 0,
    youtubeUrl: 'https://youtu.be/j9KY3R81STU',
    vinylColor: '#00A896',
    labelAccent: '#F5A623',
    lyrics: {
      es: [
        'Hermoso cariño, hermoso cariño,',
        'que Dios me ha mandado nomás para mí.',
        'Precioso regalo del cielo ha llegado,',
        'y me ha colmado de dicha y amor.',
        'Hermoso cariño, hermoso cariño,',
        'ya estoy como quiero, ya tengo alegría,',
        'contento de veras me siento, vida mía.',
        'Como un niño con juguete nuevo,',
        'así estoy de alegre con este querer.',
        'A Dios doy las gracias por tanta ventura,',
        'por este cariño tan bello y tan fiel.'
      ],
      en: [
        'Beautiful affection, cherished blessing,',
        'that heaven has sent into our lives.',
        'A precious gift from the sky has arrived,',
        'filling our days with happiness and warmth.',
        'Beautiful affection, treasured bond,',
        'now our hearts are full, now we have true joy,',
        'truly happy and grateful to celebrate you.',
        'Just like a child with a brand new toy,',
        'that is how joyful we feel for this friendship.',
        'We thank the heavens for such good fortune,',
        'for an affection so noble, bright, and true.'
      ],
      zh: [
        '多么美好的情谊，多么珍贵的祝福，',
        '宛如上天赐予我们生命的一份厚礼。',
        '这份来自天空的礼物降临人间，',
        '让每一天都盈满欢欣、喜悦与温暖。',
        '多么美好的情谊，多么真挚的陪伴，',
        '如今我们心中充满欢愉与喜悦，',
        '由衷地为你感到高兴与骄傲。',
        '就像孩童得到了最心爱的崭新宝贝，',
        '拥有这份珍贵的情谊让我们如此快乐。',
        '感谢上天赐予我们这般幸运与福气，',
        '让我们拥有如此纯粹、美好而真诚的友谊。'
      ]
    },
    meaning: {
      es: 'Escogí "Hermoso Cariño" porque en los cumpleaños mexicanos siempre se canta para dar gracias al cielo por el regalo de tu amistad y el cariño sincero que compartimos.',
      en: 'I chose "Hermoso Cariño" because in Mexican birthdays it is traditionally sung to thank the heavens for the gift of your friendship and sincere affection.',
      zh: '我挑选了《Hermoso Cariño（美好的爱意）》，因为在墨西哥生日传统中，人们用这首歌感谢上天赐予真挚的友谊与珍贵的陪伴。'
    }
  },
  {
    id: 'amoreterno',
    title: 'Amor Eterno',
    artist: 'Juan Gabriel',
    videoId: 'RgKqxLAhRKE',
    startSeconds: 0,
    youtubeUrl: 'https://youtu.be/RgKqxLAhRKE',
    vinylColor: '#D62828',
    labelAccent: '#F5A623',
    lyrics: {
      es: [
        'Tú eres la tristeza de mis ojos,',
        'que lloran en silencio por tu amor.',
        'Me miro en el espejo y veo en mi rostro,',
        'el tiempo que he sufrido por tu adiós.',
        'Obligo a que te olvide el pensamiento,',
        'pues siempre estoy pensando en el ayer.',
        'Prefiero estar dormido que despierto,',
        'de tanto que me duele que no estés.',
        'Cómo quisiera, ¡ay!, que tú vivieras,',
        'que tus ojitos jamás se hubieran cerrado nunca,',
        'y estar mirándolos.',
        'Amor eterno e inolvidable,',
        'tarde o temprano estaré contigo,',
        'para seguir amándonos.'
      ],
      en: [
        'You are the deepest emotion in my eyes,',
        'shining in silence with eternal devotion.',
        'I look into the mirror of time and memory,',
        'measuring all the moments we hold dear.',
        'Every thought returns to our cherished yesterdays,',
        'keeping the warmth of love alive across the years.',
        'Through dreams and waking hours alike,',
        'true affection transcends every distance.',
        'How deeply the heart wishes for eternal life,',
        'for bright eyes that forever shine with light,',
        'looking upon the beauty of this world.',
        'Eternal and unforgettable love,',
        'uniting souls across time and space,',
        'to keep cherishing one another forever.'
      ],
      zh: [
        '你是我眼眸深处最温柔的牵挂，',
        '在静谧的岁月里闪耀着深情的光芒。',
        '我凝视着时光的镜子与过往的记忆，',
        '细数着每一段珍藏在心底的美好瞬间。',
        '思绪总是回到那些温暖的昨日，',
        '让真挚的情感在岁月中永远鲜活。',
        '无论是梦境还是清醒的时刻，',
        '真正的深情能够跨越世间一切距离。',
        '心中多么期盼美好的时光永远定格，',
        '愿那双明亮的眼睛永远闪烁着幸福的光彩，',
        '温柔地注视着这美丽的人间。',
        '永恒而难忘的深情（Amor Eterno），',
        '让心灵跨越时间与空间紧密相连，',
        '直到永远都彼此珍视与热爱。'
      ]
    },
    meaning: {
      es: 'Escogí "Amor Eterno" para cerrar la serenata porque ningún repertorio de mariachi en México está completo sin este himno inmortal que celebra los lazos que duran para siempre.',
      en: 'I chose "Amor Eterno" to close the serenade because no mariachi repertoire in Mexico is complete without this immortal anthem celebrating bonds that last forever.',
      zh: '我选择《Amor Eterno（永恒的爱）》作为小夜曲的压轴曲目，因为在墨西哥，任何一场玛利亚奇演出都少不了这首赞颂永恒情谊的不朽经典。'
    }
  }
];

const PINATA_SONG_ITEM = {
  id: 'pinata_song',
  title: 'Dale, Dale, Dale (La Piñata)',
  artist: 'Tradicional Mexicana',
  videoId: 'wvcYM_4xtVE',
  startSeconds: 8,
  youtubeUrl: 'https://youtu.be/wvcYM_4xtVE?si=PhyVnRQoiF9jFjoY&t=8',
  vinylColor: '#F5A623',
  labelAccent: '#006341'
};

const ALL_JUKEBOX_VINYLS = [...SERENADE_SONGS, PINATA_SONG_ITEM];

// ============================================================================
// 3. EFECTOS DE SONIDO INTERACTIVOS (BOCADOS, IMPACTOS, FALLOS Y APLAUSOS)
// ============================================================================
class SoundEffectsHelper {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  initOrResume() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playCrunch() {
    if (this.isMuted) return;
    const ctx = this.initOrResume();
    if (!ctx) return;

    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.035));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 920;

    const gain = ctx.createGain();
    gain.gain.value = 0.4;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }

  playWhooshMiss() {
    if (this.isMuted) return;
    const ctx = this.initOrResume();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(95, ctx.currentTime + 0.14);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  playApplause() {
    if (this.isMuted) return;
    const ctx = this.initOrResume();
    if (!ctx) return;

    for (let clap = 0; clap < 22; clap++) {
      setTimeout(() => {
        if (this.isMuted || !this.ctx) return;
        const dur = 0.085;
        const bufSize = Math.floor(this.ctx.sampleRate * dur);
        const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.sin((i / bufSize) * Math.PI);
        }
        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        const bpf = this.ctx.createBiquadFilter();
        bpf.type = 'bandpass';
        bpf.frequency.value = 1100 + Math.random() * 1000;
        const g = this.ctx.createGain();
        g.gain.value = 0.22;
        src.connect(bpf);
        bpf.connect(g);
        g.connect(this.ctx.destination);
        src.start();
      }, clap * 95 + Math.random() * 40);
    }
  }
}

const sfx = new SoundEffectsHelper();

// ============================================================================
// 4. COMPONENTES DE ILUSTRACIONES VECTORIALES SVG (100% INLINE, CERO EMOJIS)
// ============================================================================

const MariachiTrioSVG = ({ isPlaying }) => (
  <svg
    viewBox="0 0 380 300"
    className="w-full h-auto max-h-60 sm:max-h-72 drop-shadow-2xl select-none"
  >
    <defs>
      <radialGradient id="serenadeGlow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#E4007C" stopOpacity="0.14" />
        <stop offset="100%" stopColor="#0D1B2A" stopOpacity="0" />
      </radialGradient>
    </defs>

    <circle cx="42" cy="24" r="2" fill="#FEF08A" opacity="0.8" />
    <circle cx="338" cy="30" r="2.5" fill="#FEF08A" opacity="0.7" />
    <circle cx="190" cy="14" r="1.8" fill="#FEF08A" opacity="0.9" />
    <ellipse cx="190" cy="248" rx="170" ry="40" fill="url(#serenadeGlow)" />

    {isPlaying && (
      <g className="animate-bounce">
        <g transform="translate(46, 38)">
          <ellipse cx="8" cy="22" rx="6" ry="4.5" fill="#F5A623" />
          <rect x="12" y="4" width="2.8" height="18" fill="#F5A623" />
          <path d="M14,4 Q24,6 22,14" stroke="#F5A623" strokeWidth="2.8" fill="none" />
        </g>
        <g transform="translate(312, 32)">
          <ellipse cx="6" cy="20" rx="5.5" ry="4" fill="#E4007C" />
          <ellipse cx="22" cy="17" rx="5.5" ry="4" fill="#E4007C" />
          <rect x="10" y="3" width="2.5" height="17" fill="#E4007C" />
          <rect x="26" y="0" width="2.5" height="17" fill="#E4007C" />
          <line x1="10" y1="3" x2="28" y2="0" stroke="#E4007C" strokeWidth="3.5" />
        </g>
      </g>
    )}

    {/* MARIACHI 1: VIOLINISTA */}
    <g transform="translate(22, 48)">
      <ellipse cx="65" cy="44" rx="56" ry="15" fill="#1E1B4B" stroke="#F5A623" strokeWidth="3" />
      <path d="M38,42 Q65,-2 92,42 Z" fill="#1E1B4B" stroke="#F5A623" strokeWidth="2.5" />
      <path d="M16,44 Q40,36 65,44 Q90,52 114,44" stroke="#E4007C" strokeWidth="2.5" fill="none" />
      <circle cx="65" cy="66" r="17" fill="#F3C69F" />
      <circle cx="59" cy="63" r="2.2" fill="#1F2937" />
      <circle cx="71" cy="63" r="2.2" fill="#1F2937" />
      <path d="M53,72 Q65,67 77,72 Q65,77 53,72 Z" fill="#1F2937" />
      <path d="M36,86 L94,86 L102,165 L28,165 Z" fill="#111827" stroke="#F5A623" strokeWidth="1.5" />
      <polygon points="65,86 55,95 65,104 75,95" fill="#FFFFFF" />
      <polygon points="65,92 50,86 53,100" fill="#E4007C" />
      <polygon points="65,92 80,86 77,100" fill="#E4007C" />
      <circle cx="65" cy="92" r="3.5" fill="#F5A623" />
      {[100, 114, 128, 142, 156].map((y, idx) => (
        <g key={idx}>
          <circle cx="42" cy={y} r="2.5" fill="#F5A623" />
          <circle cx="88" cy={y} r="2.5" fill="#F5A623" />
        </g>
      ))}
      <rect x="40" y="165" width="21" height="58" rx="4" fill="#111827" />
      <rect x="69" y="165" width="21" height="58" rx="4" fill="#111827" />
      <g transform="translate(56, 92) rotate(-18)">
        <ellipse cx="14" cy="18" rx="11" ry="8" fill="#B45309" stroke="#FDE68A" strokeWidth="1.2" />
        <ellipse cx="26" cy="18" rx="9" ry="7" fill="#B45309" stroke="#FDE68A" strokeWidth="1.2" />
        <rect x="34" y="16" width="22" height="4" fill="#78350F" />
        <line x1="22" y1="-8" x2="28" y2="42" stroke="#FDE68A" strokeWidth="2" />
      </g>
    </g>

    {/* MARIACHI 2: TROMPETISTA */}
    <g transform="translate(232, 48)">
      <ellipse cx="65" cy="44" rx="56" ry="15" fill="#006341" stroke="#F5A623" strokeWidth="3" />
      <path d="M38,42 Q65,-2 92,42 Z" fill="#006341" stroke="#F5A623" strokeWidth="2.5" />
      <path d="M16,44 Q40,36 65,44 Q90,52 114,44" stroke="#F5A623" strokeWidth="2.5" fill="none" />
      <circle cx="65" cy="66" r="17" fill="#EAB68C" />
      <circle cx="59" cy="63" r="2.2" fill="#1F2937" />
      <circle cx="71" cy="63" r="2.2" fill="#1F2937" />
      <path d="M54,72 Q65,67 76,72 Q65,76 54,72 Z" fill="#1F2937" />
      <path d="M36,86 L94,86 L102,165 L28,165 Z" fill="#111827" stroke="#F5A623" strokeWidth="1.5" />
      <polygon points="65,92 50,86 53,100" fill="#00A896" />
      <polygon points="65,92 80,86 77,100" fill="#00A896" />
      <circle cx="65" cy="92" r="3.5" fill="#F5A623" />
      {[100, 114, 128, 142, 156].map((y, idx) => (
        <g key={idx}>
          <circle cx="42" cy={y} r="2.5" fill="#F5A623" />
          <circle cx="88" cy={y} r="2.5" fill="#F5A623" />
        </g>
      ))}
      <rect x="40" y="165" width="21" height="58" rx="4" fill="#111827" />
      <rect x="69" y="165" width="21" height="58" rx="4" fill="#111827" />
      <g transform="translate(8, 66)">
        <rect x="18" y="4" width="38" height="4" fill="#F5A623" />
        <polygon points="18,6 0,-4 0,16" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
        <rect x="28" y="8" width="16" height="6" rx="2" fill="#D97706" />
      </g>
    </g>

    {/* MARIACHI 3: CANTANTE PRINCIPAL Y GUITARRA */}
    <g transform="translate(120, 26)">
      <ellipse cx="70" cy="48" rx="66" ry="18" fill="#7E22CE" stroke="#F5A623" strokeWidth="3.5" />
      <path d="M38,46 Q70,-6 102,46 Z" fill="#7E22CE" stroke="#F5A623" strokeWidth="3" />
      <path d="M14,48 Q42,36 70,48 Q98,60 126,48" stroke="#F5A623" strokeWidth="3" fill="none" />
      <circle cx="70" cy="26" r="5" fill="#E4007C" stroke="#F5A623" strokeWidth="1.5" />
      <circle cx="70" cy="73" r="19" fill="#F3C69F" />
      <circle cx="63" cy="69" r="2.4" fill="#111827" />
      <circle cx="77" cy="69" r="2.4" fill="#111827" />
      <path d="M54,79 Q70,73 86,79 Q70,84 54,79 Z" fill="#111827" />
      <ellipse
        cx="70"
        cy="84"
        rx={isPlaying ? '5' : '3'}
        ry={isPlaying ? '4' : '1.5'}
        fill="#991B1B"
      />
      <path d="M35,94 L105,94 L114,182 L26,182 Z" fill="#111827" stroke="#F5A623" strokeWidth="2" />
      <polygon points="70,94 58,108 70,122 82,108" fill="#FFFFFF" />
      <polygon points="70,101 50,94 54,112" fill="#E4007C" />
      <polygon points="70,101 90,94 86,112" fill="#E4007C" />
      <circle cx="70" cy="101" r="4.5" fill="#F5A623" />
      <rect x="40" y="182" width="25" height="68" rx="5" fill="#111827" stroke="#F5A623" strokeWidth="1.2" />
      <rect x="75" y="182" width="25" height="68" rx="5" fill="#111827" stroke="#F5A623" strokeWidth="1.2" />
      <g transform="translate(26, 115) rotate(-14)">
        <path
          d="M20,10 C5,10 2,34 16,40 C4,48 6,72 28,72 C50,72 52,48 40,40 C54,34 51,10 36,10 Z"
          fill="#D97706"
          stroke="#FEF3C7"
          strokeWidth="2.2"
        />
        <circle cx="28" cy="40" r="9" fill="#451A03" stroke="#F5A623" strokeWidth="2" />
        <rect x="24" y="-26" width="8" height="38" fill="#78350F" />
        <rect x="20" y="54" width="16" height="4" fill="#451A03" />
        <line x1="26" y1="-24" x2="26" y2="54" stroke="#FEF3C7" strokeWidth="0.9" />
        <line x1="28" y1="-24" x2="28" y2="54" stroke="#FEF3C7" strokeWidth="0.9" />
        <line x1="30" y1="-24" x2="30" y2="54" stroke="#FEF3C7" strokeWidth="0.9" />
      </g>
    </g>
  </svg>
);

const DishSVG = ({ dishKey, bitesTaken = 0 }) => {
  const scaleFactor = Math.max(0.25, 1 - bitesTaken * 0.2);

  return (
    <motion.div
      animate={{ scale: scaleFactor, rotate: bitesTaken * 6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <svg viewBox="0 0 180 150" className="w-full h-full drop-shadow-xl">
        <defs>
          <mask id={`biteMask-${dishKey}-${bitesTaken}`}>
            <rect x="0" y="0" width="180" height="150" fill="white" />
            {bitesTaken >= 1 && <circle cx="138" cy="42" r="32" fill="black" />}
            {bitesTaken >= 2 && <circle cx="42" cy="45" r="34" fill="black" />}
            {bitesTaken >= 3 && <circle cx="130" cy="112" r="38" fill="black" />}
            {bitesTaken >= 4 && <circle cx="90" cy="75" r="95" fill="black" />}
          </mask>
        </defs>

        <g mask={`url(#biteMask-${dishKey}-${bitesTaken})`}>
          {dishKey === 'pozole' && (
            <g>
              <ellipse cx="90" cy="82" rx="72" ry="52" fill="#9A3412" stroke="#FEF08A" strokeWidth="3" />
              <ellipse cx="90" cy="76" rx="64" ry="44" fill="#DC2626" />
              {[
                [65, 65], [82, 58], [102, 64], [116, 76], [74, 84],
                [92, 78], [58, 78], [105, 88], [84, 94]
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r="6.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
              ))}
              <circle cx="68" cy="68" r="10" fill="#E11D48" />
              <circle cx="68" cy="68" r="7" fill="#FFF1F2" />
              <circle cx="112" cy="72" r="10" fill="#E11D48" />
              <circle cx="112" cy="72" r="7" fill="#FFF1F2" />
              <path
                d="M72,54 Q90,44 108,56 Q96,68 78,62 Z"
                fill="#22C55E"
                stroke="#15803D"
                strokeWidth="1.5"
              />
              <circle cx="90" cy="95" r="9" fill="#84CC16" stroke="#365314" strokeWidth="1.5" />
            </g>
          )}

          {dishKey === 'tacos' && (
            <g>
              <ellipse cx="90" cy="82" rx="74" ry="52" fill="#1E3A8A" stroke="#FEF08A" strokeWidth="3" />
              <ellipse cx="90" cy="82" rx="64" ry="43" fill="#EFF6FF" />
              {[56, 90, 124].map((xPos, idx) => (
                <g key={idx} transform={`translate(${xPos - 26}, 45)`}>
                  <ellipse cx="26" cy="36" rx="22" ry="30" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
                  <ellipse cx="26" cy="34" rx="14" ry="22" fill="#B91C1C" />
                  <polygon points="26,18 33,27 19,27" fill="#FACC15" />
                  <circle cx="22" cy="36" r="4" fill="#16A34A" />
                  <circle cx="30" cy="40" r="4" fill="#16A34A" />
                  <rect x="23" y="42" width="6" height="5" fill="#F8FAFC" />
                </g>
              ))}
            </g>
          )}

          {dishKey === 'tamales' && (
            <g>
              <ellipse cx="90" cy="82" rx="74" ry="52" fill="#006341" stroke="#FEF08A" strokeWidth="3" />
              <ellipse cx="90" cy="82" rx="62" ry="42" fill="#ECFDF5" />
              <path
                d="M36,75 Q90,34 144,75 Q90,118 36,75 Z"
                fill="#FDE68A"
                stroke="#D97706"
                strokeWidth="2"
              />
              <rect x="55" y="58" width="70" height="34" rx="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <path d="M66,68 Q90,60 114,70 Q95,85 68,80 Z" fill="#DC2626" />
              <path d="M78,72 Q92,68 106,76 Q90,84 78,72 Z" fill="#16A34A" />
            </g>
          )}

          {dishKey === 'enchiladas' && (
            <g>
              <ellipse cx="90" cy="82" rx="74" ry="52" fill="#E4007C" stroke="#FEF08A" strokeWidth="3" />
              <ellipse cx="90" cy="82" rx="64" ry="43" fill="#FFF1F2" />
              {[56, 78, 100].map((yPos, idx) => (
                <rect
                  key={idx}
                  x="44"
                  y={yPos - 10}
                  width="92"
                  height="20"
                  rx="9"
                  fill="#451A03"
                  stroke="#78350F"
                  strokeWidth="1.2"
                />
              ))}
              <path
                d="M52,55 Q70,95 90,55 Q110,95 128,55"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="72" cy="78" r="8" stroke="#A855F7" strokeWidth="2.5" fill="none" />
              <circle cx="108" cy="78" r="8" stroke="#A855F7" strokeWidth="2.5" fill="none" />
              {[62, 80, 90, 98, 116, 85, 74, 104].map((x, i) => (
                <circle key={i} cx={x} cy={68 + (i % 3) * 10} r="1.6" fill="#FDE68A" />
              ))}
            </g>
          )}
        </g>
      </svg>
    </motion.div>
  );
};

const TresLechesCakeSVG = ({ candlesLit, isBitten, isSliced }) => {
  if (isSliced) {
    return (
      <svg viewBox="0 0 360 230" className="w-full max-w-md h-auto drop-shadow-2xl select-none">
        {[
          { x: 24, y: 25, plateColor: '#F5A623' },
          { x: 190, y: 25, plateColor: '#00A896' },
          { x: 24, y: 125, plateColor: '#006341' },
          { x: 190, y: 125, plateColor: '#6A1B9A' }
        ].map((slice, idx) => (
          <g key={idx} transform={`translate(${slice.x}, ${slice.y})`}>
            <ellipse cx="72" cy="64" rx="66" ry="26" fill={slice.plateColor} stroke="#FFFFFF" strokeWidth="2.5" />
            <ellipse cx="72" cy="64" rx="52" ry="19" fill="#FFFBEB" />
            <ellipse cx="72" cy="66" rx="42" ry="12" fill="#FEF3C7" />
            <polygon points="35,62 108,62 85,28" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
            <polygon points="35,48 98,48 85,28" fill="#FFFFFF" />
            <path d="M74,28 C68,16 86,16 80,28 Z" fill="#E11D48" />
            <circle cx="77" cy="18" r="3" fill="#16A34A" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 340 260" className="w-full max-w-md h-auto drop-shadow-2xl select-none">
      <defs>
        <mask id="cakeBiteMask">
          <rect x="0" y="0" width="340" height="260" fill="white" />
          {isBitten && (
            <g>
              <circle cx="170" cy="128" r="38" fill="black" />
              <circle cx="145" cy="136" r="24" fill="black" />
              <circle cx="195" cy="136" r="24" fill="black" />
            </g>
          )}
        </mask>
      </defs>

      <ellipse cx="170" cy="225" rx="135" ry="24" fill="#006341" stroke="#F5A623" strokeWidth="4" />
      <ellipse cx="170" cy="221" rx="118" ry="18" fill="#FFFBEB" />

      <g mask="url(#cakeBiteMask)">
        <path
          d="M62,130 L62,205 C62,222 278,222 278,205 L278,130 Z"
          fill="#FDE68A"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <path d="M62,168 Q170,182 278,168 L278,178 Q170,192 62,178 Z" fill="#FFFBEB" />
        <ellipse cx="170" cy="130" rx="108" ry="28" fill="#FFFFFF" stroke="#F3F4F6" strokeWidth="2" />

        {[75, 102, 130, 158, 186, 214, 242, 265].map((xPos, i) => (
          <circle key={i} cx={xPos} cy="146" r="14" fill="#FFFFFF" />
        ))}

        {[92, 130, 170, 210, 248].map((xPos, i) => (
          <g key={i} transform={`translate(${xPos}, 122)`}>
            <path d="M-9,4 C-12,-12 12,-12 9,4 C5,10 -5,10 -9,4 Z" fill="#E11D48" />
            <path d="M-5,-6 L0,-11 L5,-6 Z" fill="#16A34A" />
          </g>
        ))}
      </g>

      {isBitten && (
        <g>
          <circle cx="135" cy="150" r="6" fill="#FFFFFF" />
          <circle cx="204" cy="148" r="7" fill="#FFFFFF" />
          <circle cx="168" cy="166" r="5" fill="#FDE68A" />
        </g>
      )}

      {[106, 138, 170, 202, 234].map((xPos, idx) => (
        <g key={idx} transform={`translate(${xPos}, 68)`}>
          <rect
            x="-5"
            y="14"
            width="10"
            height="42"
            rx="3"
            fill={idx % 2 === 0 ? '#006341' : '#F5A623'}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <line x1="-5" y1="26" x2="5" y2="22" stroke="#E4007C" strokeWidth="2" />
          <line x1="-5" y1="38" x2="5" y2="34" stroke="#E4007C" strokeWidth="2" />
          <line x1="0" y1="8" x2="0" y2="14" stroke="#1F2937" strokeWidth="2" />

          {candlesLit ? (
            <g className="origin-bottom animate-pulse">
              <circle cx="0" cy="0" r="14" fill="#F5A623" opacity="0.4" />
              <path d="M0,-14 C9,-3 8,8 0,10 C-8,8 -9,-3 0,-14 Z" fill="#F59E0B" />
              <path d="M0,-8 C5,-1 4,6 0,8 C-4,6 -5,-1 0,-8 Z" fill="#FEF08A" />
            </g>
          ) : (
            <motion.path
              initial={{ opacity: 0.9, y: 4 }}
              animate={{ opacity: [0.85, 0.4, 0], y: -26, x: [0, -5, 5, -2] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              d="M0,8 Q-7,-2 2,-12 Q9,-22 -3,-32"
              stroke="#E5E7EB"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </g>
      ))}
    </svg>
  );
};

// PIÑATA CON SUS 7 PICOS DEFINIDOS COMO CAPAS INDEPENDIENTES QUE SE DESPRENDEN CADA 7 GOLPES
const PinataSevenPeaksInteractiveSVG = ({ isSwinging, hitTrigger, detachedPeaksCount }) => {
  const peakAngles = [0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5];

  return (
    <motion.div
      animate={
        isSwinging
          ? {
              rotate: [-15, 15, -12, 12, 0],
              scale: hitTrigger ? [1, 1.16, 0.88, 1] : 1
            }
          : { rotate: [-4, 4, -4] }
      }
      transition={{
        rotate: { duration: isSwinging ? 0.75 : 3.2, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.22 }
      }}
      className="origin-top select-none"
    >
      <svg viewBox="0 0 300 300" className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-2xl overflow-visible">
        <line
          x1="150"
          y1="-10"
          x2="150"
          y2="65"
          stroke="#F5A623"
          strokeWidth="4.5"
          strokeDasharray="6 3"
        />

        {peakAngles.map((angle, idx) => {
          const isDetached = idx < detachedPeaksCount;
          return (
            <motion.g
              key={idx}
              initial={false}
              animate={
                isDetached
                  ? {
                      y: 235,
                      x: idx % 2 === 0 ? -70 : 70,
                      rotate: angle + 145,
                      opacity: 0
                    }
                  : {
                      y: 0,
                      x: 0,
                      rotate: 0,
                      opacity: 1
                    }
              }
              transition={{ duration: 0.65, ease: 'easeIn' }}
            >
              <g transform={`translate(150, 155) rotate(${angle})`}>
                <polygon
                  points="-23,-38 23,-38 0,-118"
                  fill="#F5A623"
                  stroke="#FEF08A"
                  strokeWidth="2.2"
                />
                <polygon points="-14,-66 14,-66 0,-118" fill="#D97706" opacity="0.5" />
                <path
                  d="M0,-118 Q-14,-134 -6,-144"
                  stroke="#E4007C"
                  strokeWidth="3.5"
                  fill="none"
                />
                <path
                  d="M0,-118 Q14,-134 8,-144"
                  stroke="#00A896"
                  strokeWidth="3.5"
                  fill="none"
                />
              </g>
            </motion.g>
          );
        })}

        <circle cx="150" cy="155" r="50" fill="#E4007C" stroke="#FEF08A" strokeWidth="3.5" />
        <path d="M103,138 Q150,158 197,138" stroke="#00A896" strokeWidth="10" fill="none" />
        <path d="M101,156 Q150,176 199,156" stroke="#F5A623" strokeWidth="10" fill="none" />
        <path d="M106,174 Q150,190 194,174" stroke="#6A1B9A" strokeWidth="10" fill="none" />
        <circle cx="150" cy="155" r="18" fill="#006341" stroke="#F5A623" strokeWidth="3" />
      </svg>
    </motion.div>
  );
};

const CandyOrFruitSVG = ({ type }) => {
  switch (type) {
    case 'cana':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12 drop-shadow-md">
          <g transform="rotate(-25 30 30)">
            <rect x="21" y="7" width="18" height="46" rx="5" fill="#D9F99D" stroke="#65A30D" strokeWidth="2.2" />
            <line x1="21" y1="22" x2="39" y2="22" stroke="#65A30D" strokeWidth="2.5" />
            <line x1="21" y1="37" x2="39" y2="37" stroke="#65A30D" strokeWidth="2.5" />
          </g>
        </svg>
      );
    case 'mandarina':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12 drop-shadow-md">
          <ellipse cx="30" cy="33" rx="20" ry="17" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <path d="M30,16 Q42,6 44,16 Q36,20 30,16 Z" fill="#16A34A" />
          <circle cx="24" cy="28" r="2.2" fill="#FFEDD5" opacity="0.65" />
        </svg>
      );
    case 'naranja':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12 drop-shadow-md">
          <circle cx="30" cy="32" r="19" fill="#FB923C" stroke="#EA580C" strokeWidth="2" />
          <circle cx="30" cy="14" r="3" fill="#15803D" />
          <circle cx="23" cy="26" r="2.5" fill="#FEF3C7" opacity="0.55" />
        </svg>
      );
    case 'tejocote':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12 drop-shadow-md">
          <circle cx="30" cy="33" r="15" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
          <path d="M30,18 L32,10" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="26" cy="29" r="1.8" fill="#92400E" />
          <circle cx="35" cy="36" r="1.8" fill="#92400E" />
        </svg>
      );
    case 'cacahuate':
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12 drop-shadow-md">
          <path
            d="M20,16 C12,16 12,30 22,32 C12,36 14,50 28,50 C42,50 44,36 36,32 C46,30 44,16 34,16 Z"
            fill="#FDE68A"
            stroke="#B45309"
            strokeWidth="2"
          />
          <line x1="22" y1="22" x2="34" y2="42" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 60 60" className="w-12 h-12 drop-shadow-md">
          <polygon points="6,20 18,30 6,40" fill="#E4007C" />
          <polygon points="54,20 42,30 54,40" fill="#E4007C" />
          <circle cx="30" cy="30" r="14" fill="#E4007C" stroke="#F5A623" strokeWidth="2.5" />
          <path d="M22,24 Q30,18 38,24" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        </svg>
      );
  }
};

const GiftBoxSVG = ({ isOpen }) => (
  <svg viewBox="0 0 280 250" className="w-60 h-60 sm:w-72 sm:h-72 drop-shadow-2xl select-none">
    <ellipse cx="140" cy="220" rx="125" ry="22" fill="#3B0764" stroke="#F5A623" strokeWidth="3" />
    <ellipse cx="140" cy="216" rx="108" ry="15" fill="#581C87" />

    {isOpen && (
      <g className="animate-pulse">
        <polygon points="140,18 146,36 164,42 146,48 140,66 134,48 116,42 134,36" fill="#F5A623" />
        <circle cx="72" cy="56" r="6" fill="#E4007C" />
        <circle cx="212" cy="56" r="6" fill="#00A896" />
      </g>
    )}

    <rect
      x="65"
      y="108"
      width="150"
      height="106"
      rx="8"
      fill="#E4007C"
      stroke="#F5A623"
      strokeWidth="3"
    />
    <rect x="126" y="108" width="28" height="106" fill="#F5A623" />
    <rect x="65" y="148" width="150" height="24" fill="#F5A623" />

    <motion.g
      animate={isOpen ? { y: -56, rotate: -12 } : { y: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
    >
      <path d="M140,86 C100,46 82,86 136,90 Z" fill="#F5A623" stroke="#FEF08A" strokeWidth="2" />
      <path d="M140,86 C180,46 198,86 144,90 Z" fill="#F5A623" stroke="#FEF08A" strokeWidth="2" />
      <circle cx="140" cy="86" r="9" fill="#006341" stroke="#FEF08A" strokeWidth="2" />
      <rect
        x="56"
        y="84"
        width="168"
        height="28"
        rx="6"
        fill="#C00068"
        stroke="#F5A623"
        strokeWidth="3"
      />
      <rect x="124" y="84" width="32" height="28" fill="#F5A623" />
    </motion.g>
  </svg>
);

const VinylRecordSVG = ({ color, accent, isSpinning, number }) => (
  <motion.svg
    animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
    transition={
      isSpinning
        ? { repeat: Infinity, duration: 2.4, ease: 'linear' }
        : { duration: 0.4 }
    }
    viewBox="0 0 140 140"
    className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl select-none shrink-0"
  >
    <circle cx="70" cy="70" r="66" fill="#111827" stroke="#374151" strokeWidth="2" />
    <circle cx="70" cy="70" r="56" fill="none" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="70" cy="70" r="46" fill="none" stroke="#1F2937" strokeWidth="1.5" />
    <circle cx="70" cy="70" r="36" fill="none" stroke="#1F2937" strokeWidth="1.5" />
    <path d="M70,70 L25,25 A64,64 0 0,1 55,8 Z" fill="#FFFFFF" opacity="0.1" />
    <path d="M70,70 L115,115 A64,64 0 0,1 85,132 Z" fill="#FFFFFF" opacity="0.1" />
    <circle cx="70" cy="70" r="24" fill={color} stroke={accent} strokeWidth="2.5" />
    <polygon points="70,50 75,65 90,70 75,75 70,90 65,75 50,70 65,65" fill={accent} opacity="0.45" />
    <text x="70" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
      VINILO #{number}
    </text>
    <circle cx="70" cy="70" r="5" fill="#111827" stroke="#FFFFFF" strokeWidth="1" />
  </motion.svg>
);

// ============================================================================
// 5. COMPONENTE PRINCIPAL DE LA APLICACIÓN INTERACTIVA
// ============================================================================
const HITS_PER_PEAK = 7; // Cada uno de los 7 picos requiere al menos 7 toques certeros
const TOTAL_PINATA_HITS_REQUIRED = 7 * HITS_PER_PEAK; // 49 impactos certeros en total

export default function MexicanBirthdayLisaApp() {
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  const [screen, setScreen] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // -------------------- REPRODUCTOR REAL YOUTUBE IFRAME API --------------------
  const ytPlayerRef = useRef(null);
  const [ytReady, setYtReady] = useState(false);
  const [activeVideoConfig, setActiveVideoConfig] = useState(null);
  const [isYtPlaying, setIsYtPlaying] = useState(false);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initYouTubePlayer();
      return;
    }
    const existingScript = document.getElementById('youtube-iframe-api-script');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      initYouTubePlayer();
    };
  }, []);

  const initYouTubePlayer = () => {
    if (ytPlayerRef.current) return;
    ytPlayerRef.current = new window.YT.Player('hidden-yt-audio-player', {
      height: '1',
      width: '1',
      videoId: SERENADE_SONGS[0].videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: () => {
          setYtReady(true);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsYtPlaying(true);
          } else if (
            event.data === window.YT.PlayerState.ENDED ||
            event.data === window.YT.PlayerState.PAUSED
          ) {
            setIsYtPlaying(false);
          }
        }
      }
    });
  };

  const playRealYouTubeTrack = useCallback(
    (videoId, startSeconds = 0) => {
      setActiveVideoConfig({ videoId, startSeconds });
      if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
        try {
          ytPlayerRef.current.loadVideoById({
            videoId,
            startSeconds
          });
          if (!isMuted) {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(100);
          }
          ytPlayerRef.current.playVideo();
        } catch (e) {}
      }
    },
    [isMuted]
  );

  const stopRealYouTubeTrack = useCallback(() => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.stopVideo === 'function') {
      try {
        ytPlayerRef.current.stopVideo();
      } catch (e) {}
    }
    setIsYtPlaying(false);
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sfx.isMuted = nextMuted;
    if (ytPlayerRef.current) {
      try {
        if (nextMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(100);
          ytPlayerRef.current.playVideo();
        }
      } catch (err) {}
    }
  };

  // -------------------- ESTADOS PANTALLA 1 (SERENATA SIN KARAOKE NI SCROLL) --------------------
  const [serenadeStarted, setSerenadeStarted] = useState(false);
  const [songIndex, setSongIndex] = useState(0);

  const currentSong = SERENADE_SONGS[songIndex];

  // -------------------- NAVEGACIÓN GLOBAL PARA REGRESAR --------------------
  const canGoBack = screen > 1 || (screen === 1 && serenadeStarted);

  const handleGlobalBack = (e) => {
    if (e) e.stopPropagation();
    // Si está en modo venda o cuenta regresiva de piñata, vuelve primero a selección de piñata
    if (screen === 4 && (pinataPhase === 'hitting' || pinataPhase === 'prep_countdown')) {
      stopRealYouTubeTrack();
      setPinataPhase('select');
      return;
    }
    // Si está en Pantalla 1 con serenata iniciada, regresa a la portada inicial de la Serenata
    if (screen === 1 && serenadeStarted) {
      stopRealYouTubeTrack();
      setSerenadeStarted(false);
      return;
    }
    if (screen > 1) {
      stopRealYouTubeTrack();
      setScreen((prev) => Math.max(1, prev - 1));
    }
  };

  const startSerenadeSong = useCallback(
    (idx) => {
      const target = SERENADE_SONGS[idx];
      playRealYouTubeTrack(target.videoId, target.startSeconds || 0);
    },
    [playRealYouTubeTrack]
  );

  const handleScreen1MainTap = () => {
    sfx.initOrResume();
    if (!serenadeStarted) {
      setSerenadeStarted(true);
      startSerenadeSong(0);
    } else {
      stopRealYouTubeTrack();
      setScreen(2);
    }
  };

  const handleMariachiTap = (e) => {
    e.stopPropagation();
    sfx.initOrResume();
    if (!serenadeStarted) {
      setSerenadeStarted(true);
      startSerenadeSong(0);
      return;
    }
    const nextIdx = (songIndex + 1) % SERENADE_SONGS.length;
    setSongIndex(nextIdx);
    startSerenadeSong(nextIdx);
  };

  // -------------------- ESTADOS PANTALLA 2 (EL FESTÍN) --------------------
  const [selectedDish, setSelectedDish] = useState(null);
  const [canEatDish, setCanEatDish] = useState(false);
  const [dishBites, setDishBites] = useState(0);
  const [eatenDishes, setEatenDishes] = useState({});
  const [biteParticles, setBiteParticles] = useState([]);

  useEffect(() => {
    if (!selectedDish) {
      setCanEatDish(false);
      setDishBites(0);
      return;
    }
    const timer = setTimeout(() => {
      setCanEatDish(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [selectedDish]);

  const handleEatDishTap = () => {
    if (!canEatDish) return;
    sfx.playCrunch();

    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      dx: (Math.random() - 0.5) * 160,
      dy: (Math.random() - 0.5) * 160,
      color: i % 2 === 0 ? '#FEF08A' : '#E4007C'
    }));
    setBiteParticles(newParticles);

    const nextBite = dishBites + 1;
    setDishBites(nextBite);

    if (nextBite >= 4) {
      setEatenDishes((prev) => ({ ...prev, [selectedDish]: true }));
      setTimeout(() => {
        setSelectedDish(null);
        setBiteParticles([]);
      }, 650);
    }
  };

  // -------------------- ESTADOS PANTALLA 3 (PASTEL: MÚSICA INMEDIATA Y MIC CALIBRADO) --------------------
  // Fases: 'dimmed' (inicia inmediatamente con música desde 0s) | 'mordida' | 'wipe' | 'parta' | 'sliced'
  const [cakePhase, setCakePhase] = useState('dimmed');
  const [blowEffortProgress, setBlowEffortProgress] = useState(0); // 0 a 100%
  const [micActive, setMicActive] = useState(false);
  const [wipePercent, setWipePercent] = useState(0);

  const frostingCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const micStreamRef = useRef(null);
  const micRafRef = useRef(null);
  const blowProgressRef = useRef(0);

  const stopMicrophoneListening = useCallback(() => {
    if (micRafRef.current) {
      cancelAnimationFrame(micRafRef.current);
      micRafRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    setMicActive(false);
  }, []);

  const completeCandleBlowout = useCallback(() => {
    stopMicrophoneListening();
    stopRealYouTubeTrack();
    sfx.playApplause();
    setBlowEffortProgress(100);
    blowProgressRef.current = 100;
    setCakePhase('mordida');
  }, [stopMicrophoneListening, stopRealYouTubeTrack]);

  // Al entrar a la Pantalla 3, comienza INMEDIATAMENTE Las Mañanitas desde el inicio (segundo 0)
  // y se calibra el micrófono para requerir solo ~0.8 a 1.0 segundo de soplido moderado continuo
  useEffect(() => {
    if (screen !== 3) {
      stopMicrophoneListening();
      return;
    }

    setCakePhase('dimmed');
    setBlowEffortProgress(0);
    blowProgressRef.current = 0;
    setWipePercent(0);

    // Reproducir Las Mañanitas inmediatamente desde el segundo 0
    playRealYouTubeTrack(SERENADE_SONGS[0].videoId, 0);

    let isCancelled = false;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (isCancelled) {
            stream.getTracks().forEach((tr) => tr.stop());
            return;
          }
          micStreamRef.current = stream;
          setMicActive(true);
          const ctx = sfx.initOrResume();
          if (ctx) {
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.5;
            source.connect(analyser);
            const freqData = new Uint8Array(analyser.frequencyBinCount);
            const timeData = new Uint8Array(analyser.fftSize);

            const evaluateAccessibleBlow = () => {
              analyser.getByteFrequencyData(freqData);
              analyser.getByteTimeDomainData(timeData);

              let lowFreqSum = 0;
              for (let i = 0; i < 30; i++) {
                lowFreqSum += freqData[i];
              }
              const lowFreqAvg = lowFreqSum / 30;

              let sumSquares = 0;
              for (let i = 0; i < timeData.length; i++) {
                const norm = (timeData[i] - 128) / 128;
                sumSquares += norm * norm;
              }
              const rms = Math.sqrt(sumSquares / timeData.length);

              // Calibración accesible: ~0.8 a 1.0s de soplido moderado continuo (~52 frames a 60fps sumando +1.95)
              if (lowFreqAvg > 45 || rms > 0.045) {
                blowProgressRef.current = Math.min(100, blowProgressRef.current + 1.95);
                setBlowEffortProgress(Math.round(blowProgressRef.current));

                if (blowProgressRef.current >= 100) {
                  completeCandleBlowout();
                  return;
                }
              }

              micRafRef.current = requestAnimationFrame(evaluateAccessibleBlow);
            };

            micRafRef.current = requestAnimationFrame(evaluateAccessibleBlow);
          }
        })
        .catch(() => {
          setMicActive(false);
        });
    }

    return () => {
      isCancelled = true;
      stopMicrophoneListening();
    };
  }, [screen, playRealYouTubeTrack, completeCandleBlowout, stopMicrophoneListening]);

  // Botón táctil alternativo: permite dar click con cuidado y a su propio ritmo (sin decaimiento punitivo)
  const handleGentleBlowTap = () => {
    sfx.initOrResume();
    const nextVal = Math.min(100, blowProgressRef.current + 20);
    blowProgressRef.current = nextVal;
    setBlowEffortProgress(Math.round(nextVal));
    if (nextVal >= 100) {
      completeCandleBlowout();
    }
  };

  // Inicializar Canvas de Mancha de Betún (Wipe con dedo)
  useEffect(() => {
    if (screen !== 3 || cakePhase !== 'wipe') return;
    const canvas = frostingCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 360;
    canvas.height = rect.height || 520;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';

    const grad = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      20,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.72
    );
    grad.addColorStop(0, '#FFFBEB');
    grad.addColorStop(0.6, '#FEF3C7');
    grad.addColorStop(1, 'rgba(253, 230, 138, 0.94)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        35 + Math.random() * 45,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.88)' : 'rgba(252,231,243,0.78)';
      ctx.fill();
    }

    const sprinkleColors = ['#E4007C', '#F5A623', '#006341', '#6A1B9A', '#00A896'];
    for (let i = 0; i < 60; i++) {
      ctx.save();
      ctx.translate(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillStyle = sprinkleColors[i % sprinkleColors.length];
      ctx.fillRect(-7, -3, 14, 6);
      ctx.restore();
    }
  }, [screen, cakePhase]);

  const eraseFrostingAtPoint = (clientX, clientY) => {
    const canvas = frostingCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    const step = 32;
    let totalSampled = 0;
    for (let i = 3; i < imgData.length; i += 4 * step) {
      totalSampled++;
      if (imgData[i] < 100) transparentPixels++;
    }
    const clearedRatio = Math.min(100, Math.round((transparentPixels / totalSampled) * 145));
    setWipePercent(clearedRatio);

    if (clearedRatio >= 85) {
      sfx.playApplause();
      setCakePhase('parta');
    }
  };

  // -------------------- ESTADOS PANTALLA 4 (LA PIÑATA: 49 GOLPES Y VENDA CON MARGEN DE FALLO) --------------------
  // Fases: 'select' | 'prep_countdown' | 'hitting' | 'broken'
  const [pinataPhase, setPinataPhase] = useState('select');
  const [selectedTool, setSelectedTool] = useState(null); // 'palo' | 'venda'
  const [prepCountdown, setPrepCountdown] = useState(3);
  const [pinataHits, setPinataHits] = useState(0); // 7 golpes por pico = 49 impactos certeros
  const [pinataHitPulse, setPinataHitPulse] = useState(false);
  const [blindFeedbacks, setBlindFeedbacks] = useState([]); // [{ id, x, y, isHit, text }]
  const [fallingCandies, setFallingCandies] = useState([]);
  const [collectedCandies, setCollectedCandies] = useState(0);
  const explosionCanvasRef = useRef(null);
  const blindTargetPosRef = useRef({ xPercent: 50, yPercent: 45 });

  const detachedPeaksCount = Math.min(7, Math.floor(pinataHits / HITS_PER_PEAK));
  const currentPeakHits = pinataHits % HITS_PER_PEAK;

  useEffect(() => {
    if (screen !== 4) return;
    setPinataPhase('select');
    setSelectedTool(null);
    setPrepCountdown(3);
    setPinataHits(0);
    setBlindFeedbacks([]);
  }, [screen]);

  // Movimiento pendular de la piñata oculta cuando se juega en Modo Venda (ojos vendados)
  useEffect(() => {
    if (screen !== 4 || pinataPhase !== 'hitting' || selectedTool !== 'venda') return;
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      // La piñata oscila entre 25% y 75% horizontalmente y entre 30% y 62% verticalmente
      const xPercent = 50 + Math.sin(elapsed * 1.7) * 24;
      const yPercent = 45 + Math.cos(elapsed * 2.3) * 15;
      blindTargetPosRef.current = { xPercent, yPercent };
    }, 60);
    return () => clearInterval(interval);
  }, [screen, pinataPhase, selectedTool]);

  const startPinataPrepCountdown = (toolMode) => {
    sfx.initOrResume();
    setSelectedTool(toolMode);
    setPinataHits(0);
    setPrepCountdown(3);
    setPinataPhase('prep_countdown');
  };

  useEffect(() => {
    if (screen !== 4 || pinataPhase !== 'prep_countdown') return;
    if (prepCountdown <= 0) {
      setPinataPhase('hitting');
      playRealYouTubeTrack(PINATA_SONG_ITEM.videoId, PINATA_SONG_ITEM.startSeconds);
      return;
    }
    const timer = setTimeout(() => {
      setPrepCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [screen, pinataPhase, prepCountdown, playRealYouTubeTrack]);

  const registerSuccessfulPinataHit = () => {
    sfx.playCrunch();
    setPinataHitPulse(true);
    setTimeout(() => setPinataHitPulse(false), 180);

    setPinataHits((prev) => {
      const nextHits = prev + 1;
      if (nextHits >= TOTAL_PINATA_HITS_REQUIRED) {
        setTimeout(() => {
          sfx.playApplause();
          setPinataPhase('broken');
        }, 450);
      }
      return nextHits;
    });
  };

  // Golpe directo en Modo Palo
  const handleDirectStrikePinata = () => {
    if (pinataPhase !== 'hitting') return;
    registerSuccessfulPinataHit();
  };

  // Toque en Modo Venda (Ojos vendados) con amplio margen de fallo fuera de la zona de la piñata
  const handleBlindfoldStrikeAttempt = (e) => {
    if (pinataPhase !== 'hitting') return;
    const clientX = e.clientX || window.innerWidth / 2;
    const clientY = e.clientY || window.innerHeight / 2;

    const clickXPercent = (clientX / window.innerWidth) * 100;
    const clickYPercent = (clientY / window.innerHeight) * 100;

    const { xPercent, yPercent } = blindTargetPosRef.current;
    const dist = Math.hypot(clickXPercent - xPercent, clickYPercent - yPercent);

    // Solo es acierto si el toque cae dentro de un radio reducido (16% de distancia porcentual)
    const isHit = dist <= 16.5;
    const missList = t.s4BlindMissMessages;
    const feedbackText = isHit
      ? `${t.s4BlindHitFeedback} (+1)`
      : missList[Math.floor(Math.random() * missList.length)];

    const fbId = Date.now() + Math.random();
    setBlindFeedbacks((prev) => [
      ...prev.slice(-7),
      { id: fbId, x: clientX, y: clientY, isHit, text: feedbackText }
    ]);

    if (isHit) {
      registerSuccessfulPinataHit();
    } else {
      sfx.playWhooshMiss();
    }
  };

  // Explosión festiva de confeti en <canvas> cuando se desprende el 7° pico (49 golpes)
  useEffect(() => {
    if (screen !== 4 || pinataPhase !== 'broken') return;
    const canvas = explosionCanvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#E4007C', '#F5A623', '#FFFFFF', '#00A896', '#FEF08A', '#6A1B9A'];
    const particles = Array.from({ length: 95 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 10;
      return {
        x: canvas.width / 2,
        y: canvas.height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      };
    });

    let rafId;
    const animateExplosion = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach((p) => {
        if (p.alpha <= 0.02) return;
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.alpha -= 0.013;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      });
      if (active) {
        rafId = requestAnimationFrame(animateExplosion);
      }
    };
    rafId = requestAnimationFrame(animateExplosion);
    return () => cancelAnimationFrame(rafId);
  }, [screen, pinataPhase]);

  // Lluvia continua de dulces y frutas de temporada
  useEffect(() => {
    if (screen !== 4 || pinataPhase !== 'broken') return;
    const candyTypes = ['cana', 'mandarina', 'naranja', 'tejocote', 'cacahuate', 'caramelo'];

    const spawnInterval = setInterval(() => {
      const id = Date.now() + Math.random();
      const lifespanMs = 2300 + Math.random() * 2600;
      const newCandy = {
        id,
        type: candyTypes[Math.floor(Math.random() * candyTypes.length)],
        leftPercent: 6 + Math.random() * 82,
        topPercent: 10 + Math.random() * 64,
        lifespanMs
      };

      setFallingCandies((prev) => [...prev.slice(-18), newCandy]);

      setTimeout(() => {
        setFallingCandies((prev) => prev.filter((item) => item.id !== id));
      }, lifespanMs);
    }, 330);

    return () => clearInterval(spawnInterval);
  }, [screen, pinataPhase]);

  const handleCollectCandy = (id, e) => {
    e.stopPropagation();
    sfx.playCrunch();
    setFallingCandies((prev) => prev.filter((item) => item.id !== id));
    setCollectedCandies((prev) => Math.min(99, prev + 1));
  };

  // -------------------- ESTADOS PANTALLA 5 (REGALO Y CARTA) --------------------
  const [giftOpened, setGiftOpened] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [hasClosedLetter, setHasClosedLetter] = useState(false);

  // -------------------- ESTADOS PANTALLA 6 (ROCOLA DE 6 VINILOS) --------------------
  const [spinningVinylId, setSpinningVinylId] = useState(null);

  const handleRestartExperience = () => {
    stopRealYouTubeTrack();
    setSerenadeStarted(false);
    setSongIndex(0);
    setSelectedDish(null);
    setCakePhase('dimmed');
    setPinataPhase('select');
    setPinataHits(0);
    setGiftOpened(false);
    setLetterModalOpen(false);
    setScreen(1);
  };

  // PALETA DE COLORES DE FONDO DISTINTIVA POR PANTALLA (SIN PAPEL PICADO)
  const screenBackgroundClasses = {
    1: 'bg-gradient-to-b from-[#0D1B2A] via-[#142136] to-[#1B263B]', // Azul Noche Colonial
    2: 'bg-gradient-to-b from-[#F5A623] via-[#EB9812] to-[#E08D03]', // Amarillo Cempasúchil
    3: 'bg-gradient-to-b from-[#E4007C] via-[#D30071] to-[#C20066]', // Rosa Mexicano
    4: 'bg-gradient-to-b from-[#006341] via-[#005739] to-[#004D32]', // Verde Bandera Festivo
    5: 'bg-gradient-to-b from-[#6A1B9A] via-[#5A1785] to-[#4A148C]', // Morado Fiesta
    6: 'bg-gradient-to-b from-[#B71C1C] via-[#9E1436] to-[#880E4E]'  // Rojo Carmín Mexicano
  };

  return (
    <div
      className={`relative w-full min-h-screen h-[100dvh] overflow-hidden text-white font-sans select-none flex flex-col justify-between transition-colors duration-700 ${
        screenBackgroundClasses[screen] || screenBackgroundClasses[1]
      }`}
    >
      {/* Reproductor real de YouTube IFrame API */}
      <div className="fixed -top-10 -left-10 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
        <div id="hidden-yt-audio-player" />
      </div>

      {/* BARRA SUPERIOR GLOBAL CON BOTÓN FLOTANTE DE REGRESAR EN TODAS LAS PANTALLAS */}
      <header className="relative z-50 flex items-center justify-between px-3 sm:px-6 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={handleGlobalBack}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 hover:bg-black/75 border border-[#F5A623] text-xs sm:text-sm font-extrabold text-white shadow-lg transition active:scale-95"
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current text-[#F5A623]">
                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
              </svg>
              <span>{t.backPrevContent}</span>
            </button>
          )}

          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 text-xs font-bold transition active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-amber-300">
              {isMuted ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              )}
            </svg>
            <span className="hidden sm:inline">{isMuted ? t.audioMuted : t.audioUnmuted}</span>
          </button>

          {activeVideoConfig && !isYtPlaying && ytReady && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playRealYouTubeTrack(activeVideoConfig.videoId, activeVideoConfig.startSeconds);
              }}
              className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold animate-pulse shadow"
            >
              {t.ytTapToUnmute}
            </button>
          )}
        </div>

        {/* Switch de Idioma Siempre Accesible (ES / EN / 中文) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center bg-black/45 backdrop-blur-md p-1 rounded-full border border-white/35 shadow-lg"
        >
          {[
            { code: 'es', label: 'ES' },
            { code: 'en', label: 'EN' },
            { code: 'zh', label: '中文' }
          ].map((option) => (
            <button
              key={option.code}
              onClick={() => setLang(option.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all ${
                lang === option.code
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      {/* CONTENEDOR DE LAS 6 PANTALLAS */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 pb-5 overflow-y-auto flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* ================================================================
              PANTALLA 1: LA SERENATA CON MARIACHI (LETRA LIMPIA SIN KARAOKE NI SCROLL)
          ================================================================ */}
          {screen === 1 && (
            <motion.section
              key="screen-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              onClick={handleScreen1MainTap}
              className="flex-1 flex flex-col justify-between cursor-pointer py-1"
            >
              {/* Explicación cultural y personal superior */}
              <div className="text-center max-w-3xl mx-auto bg-black/35 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-[#F5A623]/40 shadow-xl">
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4007C] text-white mb-1">
                  {t.s1Badge}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#F5A623]">
                  {t.s1CulturalTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-100 mt-1 leading-relaxed">
                  {t.s1CulturalDesc}
                </p>
              </div>

              {/* Zona Central: Mariachis (Slide-Left) + Letra Completa Limpia y Estilizada sin Scroll */}
              <div
                className={`my-2 flex-1 flex items-center ${
                  serenadeStarted
                    ? 'flex-col md:flex-row gap-3 sm:gap-5 items-center justify-between'
                    : 'flex-col justify-center'
                }`}
              >
                {/* Contenedor de los Mariachis */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                  onClick={handleMariachiTap}
                  className={`flex flex-col items-center ${
                    serenadeStarted
                      ? 'w-full md:w-5/12 bg-black/40 p-3 sm:p-4 rounded-2xl border border-[#F5A623]/50 hover:border-[#E4007C] transition'
                      : 'w-full max-w-sm'
                  }`}
                >
                  {serenadeStarted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full text-center mb-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E4007C] to-[#6A1B9A] border border-[#F5A623]"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-amber-200 font-bold">
                        {t.s1PlayingNow} ({songIndex + 1}/5)
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                        {currentSong.title} - {currentSong.artist}
                      </p>
                    </motion.div>
                  )}

                  <MariachiTrioSVG isPlaying={serenadeStarted} />

                  {serenadeStarted && (
                    <span className="mt-1.5 text-[11px] sm:text-xs text-center text-[#F5A623] font-bold underline">
                      {t.s1NextSongHint}
                    </span>
                  )}
                </motion.div>

                {/* Panel Derecho: Letra de la canción limpia, legible y estilizada SIN línea guía y SIN scroll */}
                {serenadeStarted && (
                  <motion.div
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45 }}
                    className="w-full md:w-7/12 flex flex-col gap-3 bg-black/45 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl"
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5A623]">
                        {t.s1LyricsLabel}
                      </span>
                      <div className="mt-2 space-y-1 text-center sm:text-left">
                        {currentSong.lyrics[lang].map((line, i) => (
                          <p
                            key={i}
                            className="text-xs sm:text-sm text-amber-50/95 font-medium leading-snug tracking-wide"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A896]">
                        {t.s1MeaningLabel}
                      </span>
                      <p className="text-xs text-slate-100 mt-1 leading-relaxed">
                        {currentSong.meaning[lang]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Indicador inferior */}
              <div className="text-center mt-1">
                {serenadeStarted ? (
                  <div className="inline-block max-w-xl px-4 py-2 rounded-2xl bg-[#006341] border-2 border-[#F5A623] text-xs sm:text-sm font-bold text-white shadow-lg">
                    {t.s1SongFinishedPrompt}
                  </div>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E4007C] to-[#F5A623] text-xs sm:text-sm font-extrabold text-white shadow-lg"
                  >
                    {t.s1TapContinue}
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* ================================================================
              PANTALLA 2: EL FESTÍN MEXICANO (FONDO AMARILLO CEMPASÚCHIL)
          ================================================================ */}
          {screen === 2 && (
            <motion.section
              key="screen-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col justify-between py-1"
            >
              <div className="text-center max-w-2xl mx-auto bg-black/35 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/30 shadow-xl">
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#006341] text-white mb-1">
                  {t.s2Badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {t.s2CulturalTitle}
                </h2>
                <p className="text-xs sm:text-sm text-amber-50 mt-1 leading-relaxed">
                  {t.s2CulturalDesc}
                </p>
              </div>

              <div className="relative my-3 p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#4A148C] via-[#6A1B9A] to-[#3B0764] border-4 border-white shadow-2xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-3 flex">
                  <div className="flex-1 bg-[#E4007C]" />
                  <div className="flex-1 bg-[#006341]" />
                  <div className="flex-1 bg-[#F5A623]" />
                  <div className="flex-1 bg-[#00A896]" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2">
                  {['pozole', 'tacos', 'tamales', 'enchiladas'].map((dishKey) => {
                    const dishInfo = t.s2Dishes[dishKey];
                    const isEaten = eatenDishes[dishKey];
                    return (
                      <motion.button
                        key={dishKey}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedDish(dishKey)}
                        className="relative flex flex-col items-center p-3 rounded-2xl bg-black/35 hover:bg-black/50 border border-white/25 transition group"
                      >
                        {isEaten && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#006341] text-white border border-amber-300">
                            OK
                          </span>
                        )}
                        <div className="w-28 h-24 sm:w-32 sm:h-28">
                          <DishSVG dishKey={dishKey} bitesTaken={0} />
                        </div>
                        <span className="mt-1.5 text-xs sm:text-sm font-extrabold text-amber-300 group-hover:text-white text-center">
                          {dishInfo.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleGlobalBack}
                  className="px-5 py-3 rounded-full bg-black/45 hover:bg-black/65 border border-white/40 text-white font-bold text-xs sm:text-sm transition"
                >
                  {t.backPrevContent}
                </button>
                <button
                  onClick={() => setScreen(3)}
                  className="px-6 py-3 rounded-full bg-[#E4007C] border-2 border-white text-white font-extrabold text-sm sm:text-base shadow-xl hover:brightness-110 active:scale-95 transition"
                >
                  {t.s2ContinueToCake}
                </button>
              </div>

              <AnimatePresence>
                {selectedDish && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedDish(null)}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.88, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.88, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-md rounded-3xl bg-[#1B263B] border-2 border-[#F5A623] p-5 text-center shadow-2xl"
                    >
                      <h3 className="text-xl font-extrabold text-[#F5A623]">
                        {t.s2Dishes[selectedDish].name}
                      </h3>
                      <p className="text-xs font-semibold text-[#E4007C] mt-0.5">
                        {t.s2Dishes[selectedDish].subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-amber-50/95 mt-2.5 leading-relaxed">
                        {t.s2Dishes[selectedDish].history}
                      </p>

                      <div
                        onClick={handleEatDishTap}
                        className="relative w-48 h-40 mx-auto my-3 cursor-pointer flex items-center justify-center"
                      >
                        <DishSVG dishKey={selectedDish} bitesTaken={dishBites} />
                        {biteParticles.map((pt) => (
                          <motion.span
                            key={pt.id}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{ x: pt.dx, y: pt.dy, opacity: 0, scale: 0.2 }}
                            transition={{ duration: 0.55 }}
                            className="absolute w-3 h-3 rounded-full pointer-events-none"
                            style={{ backgroundColor: pt.color }}
                          />
                        ))}
                      </div>

                      {canEatDish && dishBites < 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={handleEatDishTap}
                          className="cursor-pointer py-2 px-4 rounded-xl bg-[#E4007C] text-white font-bold text-xs sm:text-sm shadow-lg animate-bounce"
                        >
                          {t.s2TapToEatPrompt} ({4 - dishBites}/4)
                        </motion.div>
                      )}

                      {dishBites >= 4 && (
                        <p className="text-sm font-bold text-[#00A896]">{t.s2DishFinished}</p>
                      )}

                      <button
                        onClick={() => setSelectedDish(null)}
                        className="mt-3 text-xs text-amber-200 underline hover:text-white"
                      >
                        {t.s2CloseDish}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* ================================================================
              PANTALLA 3: EL PASTEL DE TRES LECHES (MÚSICA INMEDIATA + TIP AMABLE)
          ================================================================ */}
          {screen === 3 && (
            <motion.section
              key="screen-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex-1 flex flex-col justify-between py-1"
            >
              <div
                className={`fixed inset-0 pointer-events-none transition-colors duration-1000 z-0 ${
                  cakePhase === 'dimmed' ? 'bg-black/75' : 'bg-transparent'
                }`}
              />

              <div className="relative z-10 text-center max-w-2xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/30">
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5A623] text-slate-950 mb-1">
                  {t.s3Badge}
                </span>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white">
                  {cakePhase === 'mordida' ? t.s3MordidaOriginTitle : t.s3CulturalTitle}
                </h2>
                <p className="text-xs sm:text-sm text-amber-50 mt-1 leading-relaxed">
                  {cakePhase === 'dimmed' && t.s3CulturalDesc}
                  {(cakePhase === 'mordida' || cakePhase === 'wipe') && t.s3MordidaOriginDesc}
                  {(cakePhase === 'parta' || cakePhase === 'sliced') && t.s3CulturalDesc}
                </p>
              </div>

              {(cakePhase === 'mordida' || cakePhase === 'parta') && (
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  {[
                    { top: '24%', left: '4%' },
                    { top: '28%', right: '4%' },
                    { top: '62%', left: '6%' },
                    { top: '66%', right: '6%' }
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      style={pos}
                      animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="absolute px-3 py-1 rounded-full bg-[#006341] border-2 border-[#F5A623] text-white font-extrabold text-xs sm:text-sm shadow-lg"
                    >
                      {cakePhase === 'mordida' ? t.s3MordidaChant : t.s3PartaChant}
                    </motion.div>
                  ))}
                </div>
              )}

              <div
                onClick={() => {
                  if (cakePhase === 'mordida') {
                    sfx.playCrunch();
                    setCakePhase('wipe');
                  } else if (cakePhase === 'parta') {
                    sfx.playApplause();
                    setCakePhase('sliced');
                  }
                }}
                className={`relative z-10 my-2 flex flex-col items-center justify-center ${
                  cakePhase === 'mordida' || cakePhase === 'parta' ? 'cursor-pointer' : ''
                }`}
              >
                <TresLechesCakeSVG
                  candlesLit={cakePhase === 'dimmed'}
                  isBitten={cakePhase === 'wipe' || cakePhase === 'parta'}
                  isSliced={cakePhase === 'sliced'}
                />
              </div>

              <div className="relative z-20 text-center">
                {cakePhase === 'dimmed' && (
                  <div className="max-w-lg mx-auto bg-black/75 p-4 rounded-2xl border-2 border-[#F5A623] space-y-2.5 shadow-2xl">
                    <p className="text-xs sm:text-sm font-extrabold text-[#F5A623]">
                      {t.s3BlowInstruction}
                    </p>

                    <div className="w-full max-w-xs mx-auto">
                      <div className="flex justify-between text-[11px] font-bold text-amber-200 mb-1">
                        <span>{t.s3BlowPowerLabel}</span>
                        <span>{blowEffortProgress}% / 100%</span>
                      </div>
                      <div className="w-full h-3.5 bg-white/15 rounded-full overflow-hidden border border-white/30">
                        <div
                          className="h-full bg-gradient-to-r from-[#F5A623] via-[#00A896] to-[#22C55E] transition-all duration-150"
                          style={{ width: `${blowEffortProgress}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleGentleBlowTap}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E4007C] to-[#F5A623] text-white font-extrabold text-xs sm:text-sm shadow-lg active:scale-95 transition"
                    >
                      {t.s3BlowFallbackBtn} ({blowEffortProgress}%)
                    </button>

                    <p className="text-[11px] sm:text-xs text-amber-100/95 italic bg-white/10 p-2 rounded-xl border border-white/15">
                      {t.s3TouchTipNote}
                    </p>
                  </div>
                )}

                {cakePhase === 'mordida' && (
                  <motion.button
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    onClick={() => {
                      sfx.playCrunch();
                      setCakePhase('wipe');
                    }}
                    className="px-6 py-3 rounded-full bg-[#006341] border-2 border-[#F5A623] text-white font-extrabold text-sm shadow-xl"
                  >
                    {t.s3TouchToBite}
                  </motion.button>
                )}

                {cakePhase === 'parta' && (
                  <motion.button
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    onClick={() => {
                      sfx.playApplause();
                      setCakePhase('sliced');
                    }}
                    className="px-6 py-3 rounded-full bg-[#006341] border-2 border-[#F5A623] text-white font-extrabold text-sm shadow-xl"
                  >
                    {t.s3PartaInstruction}
                  </motion.button>
                )}

                {cakePhase === 'sliced' && (
                  <div className="space-y-2">
                    <p className="text-sm font-extrabold text-amber-200">{t.s3SlicedSuccess}</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={handleGlobalBack}
                        className="px-5 py-3 rounded-full bg-black/45 hover:bg-black/65 border border-white/40 text-white font-bold text-xs sm:text-sm transition"
                      >
                        {t.backPrevContent}
                      </button>
                      <button
                        onClick={() => setScreen(4)}
                        className="px-6 py-3 rounded-full bg-[#F5A623] text-slate-950 font-extrabold text-sm sm:text-base shadow-xl"
                      >
                        {t.s3ContinueToPinata}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {cakePhase === 'wipe' && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 touch-none">
                  <canvas
                    ref={frostingCanvasRef}
                    onMouseDown={(e) => {
                      isDrawingRef.current = true;
                      eraseFrostingAtPoint(e.clientX, e.clientY);
                    }}
                    onMouseMove={(e) => {
                      if (!isDrawingRef.current) return;
                      eraseFrostingAtPoint(e.clientX, e.clientY);
                    }}
                    onMouseUp={() => {
                      isDrawingRef.current = false;
                    }}
                    onTouchStart={(e) => {
                      isDrawingRef.current = true;
                      const touch = e.touches[0];
                      if (touch) eraseFrostingAtPoint(touch.clientX, touch.clientY);
                    }}
                    onTouchMove={(e) => {
                      const touch = e.touches[0];
                      if (touch) eraseFrostingAtPoint(touch.clientX, touch.clientY);
                    }}
                    onTouchEnd={() => {
                      isDrawingRef.current = false;
                    }}
                    className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                  />
                  <div className="relative z-10 pointer-events-none mt-14 px-5 py-3 rounded-2xl bg-slate-950/90 border-2 border-[#F5A623] text-center shadow-2xl">
                    <p className="text-sm sm:text-base font-extrabold text-[#F5A623]">
                      {t.s3WipeInstruction}
                    </p>
                    <p className="text-xs text-white mt-1">
                      {t.s3WipeProgress}: <strong>{wipePercent}%</strong>
                    </p>
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* ================================================================
              PANTALLA 4: LA PIÑATA DE 7 PICOS (49 GOLPES + MODO VENDA EXIGENTE)
          ================================================================ */}
          {screen === 4 && (
            <motion.section
              key="screen-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="relative flex-1 flex flex-col justify-between py-1"
            >
              <canvas
                ref={explosionCanvasRef}
                className="fixed inset-0 pointer-events-none z-20"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
                <div className="bg-black/35 backdrop-blur-md p-3 rounded-2xl border border-[#F5A623]/40">
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#F5A623]">
                    {t.s4LeftExplainTitle}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-amber-50 mt-1 leading-relaxed">
                    {t.s4LeftExplainDesc}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  {pinataPhase !== 'broken' ? (
                    <div
                      onClick={handleDirectStrikePinata}
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <PinataSevenPeaksInteractiveSVG
                        isSwinging={pinataPhase === 'hitting'}
                        hitTrigger={pinataHitPulse}
                        detachedPeaksCount={detachedPeaksCount}
                      />
                      {pinataPhase === 'hitting' && (
                        <div className="mt-1 px-3.5 py-1 rounded-full bg-black/60 border border-[#F5A623] text-xs font-extrabold text-[#F5A623]">
                          {t.s4PeaksRemainingLabel}: {7 - detachedPeaksCount}/7 |{' '}
                          {t.s4CurrentPeakResistanceLabel}: {currentPeakHits}/{HITS_PER_PEAK}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-1">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4007C] border-2 border-[#F5A623] text-xs sm:text-sm font-extrabold shadow-lg animate-bounce">
                        {t.s4CollectPrompt}
                      </span>
                      <p className="mt-1.5 text-base sm:text-xl font-black text-[#F5A623]">
                        {t.s4CounterLabel}: {collectedCandies}/99
                      </p>
                      <p className="text-[11px] text-amber-200">{t.s4NeedMoreHint}</p>
                    </div>
                  )}
                </div>

                <div className="bg-black/35 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                  <h3 className="text-xs sm:text-sm font-extrabold text-amber-300">
                    {t.s4RightExplainTitle}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-amber-50 mt-1 leading-relaxed">
                    {t.s4RightExplainDesc}
                  </p>
                </div>
              </div>

              {pinataPhase === 'select' && (
                <div className="my-2">
                  <p className="text-center text-xs sm:text-sm font-bold text-amber-200 mb-2">
                    {t.s4ChooseModePrompt}
                  </p>
                  <div className="flex items-stretch justify-center gap-3 sm:gap-5 max-w-2xl mx-auto">
                    <motion.div
                      animate={{
                        scale: selectedTool === 'palo' ? 1.05 : selectedTool === 'venda' ? 0.92 : 1
                      }}
                      onClick={() => setSelectedTool('palo')}
                      className={`flex-1 cursor-pointer p-3.5 rounded-2xl border-2 transition flex flex-col items-center text-center ${
                        selectedTool === 'palo'
                          ? 'bg-black/55 border-[#F5A623] shadow-2xl'
                          : 'bg-black/30 border-white/20'
                      }`}
                    >
                      <svg viewBox="0 0 120 50" className="w-28 h-12">
                        <rect
                          x="10"
                          y="18"
                          width="100"
                          height="14"
                          rx="6"
                          fill="#B45309"
                          stroke="#FDE68A"
                          strokeWidth="1.5"
                        />
                        <rect x="28" y="18" width="16" height="14" fill="#E4007C" />
                        <rect x="52" y="18" width="16" height="14" fill="#F5A623" />
                        <rect x="76" y="18" width="16" height="14" fill="#00A896" />
                      </svg>
                      <h4 className="text-sm font-extrabold text-[#F5A623] mt-1">
                        {t.s4StickTitle}
                      </h4>
                      {selectedTool === 'palo' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1.5 space-y-2"
                        >
                          <p className="text-xs text-white/90">{t.s4StickDesc}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startPinataPrepCountdown('palo');
                            }}
                            className="px-4 py-1.5 rounded-full bg-[#F5A623] text-slate-950 font-extrabold text-xs shadow"
                          >
                            {t.s4StickAcceptBtn}
                          </button>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      animate={{
                        scale: selectedTool === 'venda' ? 1.05 : selectedTool === 'palo' ? 0.92 : 1
                      }}
                      onClick={() => setSelectedTool('venda')}
                      className={`flex-1 cursor-pointer p-3.5 rounded-2xl border-2 transition flex flex-col items-center text-center ${
                        selectedTool === 'venda'
                          ? 'bg-black/55 border-[#F5A623] shadow-2xl'
                          : 'bg-black/30 border-white/20'
                      }`}
                    >
                      <svg viewBox="0 0 120 50" className="w-28 h-12">
                        <path
                          d="M18,25 Q60,8 102,25 Q60,42 18,25 Z"
                          fill="#E4007C"
                          stroke="#F5A623"
                          strokeWidth="2"
                        />
                        <path d="M98,24 L116,14 M98,26 L116,36" stroke="#E4007C" strokeWidth="4" />
                      </svg>
                      <h4 className="text-sm font-extrabold text-[#F5A623] mt-1">
                        {t.s4BlindfoldTitle}
                      </h4>
                      {selectedTool === 'venda' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1.5 space-y-2"
                        >
                          <p className="text-xs text-white/90">{t.s4BlindfoldDesc}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startPinataPrepCountdown('venda');
                            }}
                            className="px-4 py-1.5 rounded-full bg-[#E4007C] text-white font-extrabold text-xs shadow border border-[#F5A623]"
                          >
                            {t.s4BlindfoldAcceptBtn}
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              )}

              {pinataPhase === 'prep_countdown' && (
                <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-lg sm:text-2xl font-extrabold text-[#F5A623] mb-4">
                    {t.s4PrepCountdownTitle}
                  </p>
                  <motion.div
                    key={prepCountdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-28 h-28 rounded-full bg-[#E4007C] border-4 border-[#F5A623] text-white flex items-center justify-center text-5xl font-black shadow-2xl"
                  >
                    {prepCountdown > 0 ? prepCountdown : t.s4GoDale}
                  </motion.div>
                </div>
              )}

              {pinataPhase === 'hitting' && selectedTool === 'palo' && (
                <div
                  onClick={handleDirectStrikePinata}
                  className="my-2 p-3.5 rounded-2xl bg-black/50 border-2 border-[#F5A623] text-center cursor-pointer"
                >
                  <p className="text-xs sm:text-sm font-extrabold text-[#F5A623] animate-pulse">
                    {t.s4DirectHitPrompt}
                  </p>
                  <p className="text-xs text-white mt-1">
                    {t.s4HitsProgressLabel}: <strong>{pinataHits}/{TOTAL_PINATA_HITS_REQUIRED}</strong> (
                    {7 - detachedPeaksCount} {t.s4PeaksRemainingLabel.toLowerCase()})
                  </p>
                  <p className="mt-1.5 text-[11px] italic text-amber-200">"{t.s4DaleLyrics}"</p>
                </div>
              )}

              {/* MODO VENDA A CIEGAS CON MAYOR MARGEN DE ERROR */}
              {pinataPhase === 'hitting' && selectedTool === 'venda' && (
                <div
                  onClick={handleBlindfoldStrikeAttempt}
                  className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center p-6 text-center cursor-pointer"
                >
                  {blindFeedbacks.map((fb) => (
                    <motion.div
                      key={fb.id}
                      initial={{ scale: 0.6, opacity: 1, y: 0 }}
                      animate={{ scale: 1.25, opacity: 0, y: -30 }}
                      transition={{ duration: 0.75 }}
                      className={`fixed pointer-events-none px-3 py-1 rounded-full text-xs font-extrabold border shadow-lg ${
                        fb.isHit
                          ? 'bg-[#006341] border-[#F5A623] text-[#FEF08A]'
                          : 'bg-red-950/90 border-red-400 text-red-200'
                      }`}
                      style={{ left: Math.max(16, fb.x - 60), top: Math.max(50, fb.y - 24) }}
                    >
                      {fb.text}
                    </motion.div>
                  ))}

                  <p className="text-base sm:text-xl font-extrabold text-[#E4007C] max-w-md mb-4 animate-pulse">
                    {t.s4BlindPitchBlackPrompt}
                  </p>
                  <div className="px-5 py-3 rounded-2xl bg-white/10 border border-[#F5A623] space-y-1">
                    <p className="text-sm font-black text-[#F5A623]">
                      {t.s4PeaksRemainingLabel}: {7 - detachedPeaksCount} / 7
                    </p>
                    <p className="text-xs text-amber-200">
                      {t.s4CurrentPeakResistanceLabel}: {currentPeakHits} / {HITS_PER_PEAK}
                    </p>
                    <p className="text-xs text-white">
                      {t.s4HitsProgressLabel}: {pinataHits} / {TOTAL_PINATA_HITS_REQUIRED}
                    </p>
                  </div>
                  <p className="mt-5 text-xs sm:text-sm italic text-amber-200 max-w-md">
                    "{t.s4DaleLyrics}"
                  </p>
                </div>
              )}

              {pinataPhase === 'broken' && (
                <>
                  <div className="my-1.5 p-3 rounded-2xl bg-black/55 border-l-4 border-[#F5A623] text-xs sm:text-sm text-amber-50 shadow-lg">
                    {t.s4FruitCulturalExplanation}
                  </div>

                  <div className="relative flex-1 min-h-[180px] w-full rounded-3xl bg-black/35 border border-[#F5A623]/50 overflow-hidden my-1.5">
                    <AnimatePresence>
                      {fallingCandies.map((item) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, y: -30, scale: 0.5 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.2 }}
                          whileTap={{ scale: 1.35 }}
                          onClick={(e) => handleCollectCandy(item.id, e)}
                          style={{
                            left: `${item.leftPercent}%`,
                            top: `${item.topPercent}%`
                          }}
                          className="absolute p-1 cursor-pointer active:scale-125"
                        >
                          <CandyOrFruitSVG type={item.type} />
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="text-center">
                    <button
                      disabled={collectedCandies < 15}
                      onClick={() => {
                        stopRealYouTubeTrack();
                        setScreen(5);
                      }}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-extrabold text-sm sm:text-base transition shadow-xl ${
                        collectedCandies >= 15
                          ? 'bg-gradient-to-r from-[#E4007C] to-[#F5A623] text-white cursor-pointer animate-bounce'
                          : 'bg-white/15 text-white/45 cursor-not-allowed'
                      }`}
                    >
                      <span>
                        {t.s4ContinueBtn} ({Math.min(15, collectedCandies)}/15)
                      </span>
                      <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current">
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </motion.section>
          )}

          {/* ================================================================
              PANTALLA 5: LA CARTA Y EL GRAN REGALO (FONDO MORADO FIESTA)
          ================================================================ */}
          {screen === 5 && (
            <motion.section
              key="screen-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between items-center py-2"
            >
              <div className="text-center max-w-xl mx-auto bg-black/35 backdrop-blur-md rounded-2xl p-4 border border-[#F5A623]/40">
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4007C] text-white mb-1">
                  {t.s5Badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#F5A623]">
                  {t.s5PressGiftPrompt}
                </h2>
              </div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sfx.playApplause();
                  setGiftOpened(true);
                  setTimeout(() => {
                    setLetterModalOpen(true);
                  }, 420);
                }}
                className="cursor-pointer my-2"
              >
                <GiftBoxSVG isOpen={giftOpened} />
              </motion.div>

              <div className="w-full max-w-2xl">
                {hasClosedLetter ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                  >
                    <button
                      onClick={() => setScreen(4)}
                      className="px-4 py-3 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/30 text-xs sm:text-sm font-bold text-white transition"
                    >
                      {t.s5BtnPrev}
                    </button>
                    <button
                      onClick={() => setScreen(6)}
                      className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#E4007C] to-[#F5A623] text-xs sm:text-sm font-extrabold text-white shadow-xl hover:brightness-110 transition"
                    >
                      {t.s5BtnNext}
                    </button>
                    <button
                      onClick={handleRestartExperience}
                      className="px-4 py-3 rounded-2xl bg-[#006341] hover:bg-[#007A50] border border-[#F5A623] text-xs sm:text-sm font-bold text-white transition"
                    >
                      {t.s5BtnRestart}
                    </button>
                  </motion.div>
                ) : (
                  <div className="h-12" />
                )}
              </div>

              <AnimatePresence>
                {letterModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      setLetterModalOpen(false);
                      setHasClosedLetter(true);
                    }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.85, y: 24 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.85, y: 24 }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-lg rounded-3xl bg-[#FFFBEB] text-slate-900 border-4 border-[#E4007C] p-5 sm:p-7 shadow-2xl flex flex-col justify-between max-h-[84dvh]"
                    >
                      <div className="flex items-center justify-between border-b-2 border-[#F5A623] pb-3">
                        <h3 className="text-lg sm:text-xl font-black text-[#E4007C]">
                          {t.s5LetterHeader}
                        </h3>
                      </div>

                      <div className="my-4 overflow-y-auto pr-1 flex-1">
                        <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed font-medium text-stone-800">
                          {t.s5DefaultLetter}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-amber-300 text-center">
                        <p className="text-[11px] sm:text-xs font-bold text-[#6A1B9A]">
                          {t.s5CloseLetterFooter}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* ================================================================
              PANTALLA 6: LA ROCOLA MEXICANA CON 6 VINILOS (FONDO ROJO CARMÍN)
          ================================================================ */}
          {screen === 6 && (
            <motion.section
              key="screen-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between py-1"
            >
              <div className="text-center max-w-2xl mx-auto bg-black/35 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-[#F5A623]/40">
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5A623] text-slate-950 mb-1">
                  {t.s6Badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#F5A623]">
                  {t.s6Title}
                </h2>
                <p className="text-xs sm:text-sm text-amber-50 mt-1">
                  {t.s6Subtitle}
                </p>
              </div>

              <div className="my-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[56dvh] overflow-y-auto pr-1">
                {ALL_JUKEBOX_VINYLS.map((song, idx) => {
                  const isSpinning = spinningVinylId === song.id;
                  return (
                    <motion.div
                      key={song.id}
                      onMouseEnter={() => setSpinningVinylId(song.id)}
                      onMouseLeave={() => setSpinningVinylId(null)}
                      onTouchStart={() => setSpinningVinylId(song.id)}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-black/50 border-2 border-[#F5A623]/55 hover:border-white shadow-xl transition"
                    >
                      <a
                        href={song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <VinylRecordSVG
                          color={song.vinylColor}
                          accent={song.labelAccent}
                          isSpinning={isSpinning}
                          number={idx + 1}
                        />
                      </a>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-extrabold text-white truncate">
                          {song.title}
                        </p>
                        <p className="text-xs font-semibold text-[#F5A623] truncate">
                          {song.artist}
                        </p>

                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          <a
                            href={song.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E4007C] hover:bg-[#c8006b] text-white text-[11px] font-bold shadow transition"
                          >
                            <span>{t.s6OpenYoutube}</span>
                            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </a>

                          <button
                            onClick={() => {
                              setSpinningVinylId(song.id);
                              playRealYouTubeTrack(song.videoId, song.startSeconds || 0);
                            }}
                            className="px-2.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-amber-200 text-[11px] font-bold transition"
                          >
                            {t.s6PlayHere}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    stopRealYouTubeTrack();
                    setScreen(5);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 text-xs sm:text-sm font-bold text-white transition"
                >
                  {t.s5BtnPrev}
                </button>
                <button
                  onClick={handleRestartExperience}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#006341] to-[#F5A623] border border-white text-xs sm:text-sm font-extrabold text-slate-950 shadow-xl transition"
                >
                  {t.s5BtnRestart}
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}