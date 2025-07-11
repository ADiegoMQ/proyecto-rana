document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('mainHeader');
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');

    if (mainHeader) {
        if (isIndexPage) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 60) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            });
            if (window.scrollY > 60) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        } else {
            mainHeader.classList.add('scrolled');
        }
    }

    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#') && (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'))) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.getElementById('mainHeader').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 10;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            } else if (this.getAttribute('href').startsWith('#') && !isIndexPage) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                window.location.href = `index.html${targetId}`;
            }
        });
    });

    const animateElements = document.querySelectorAll('.animate__animated');

    const animateOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate__active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(element => {
        if (
            !element.classList.contains('main-header') &&
            !element.classList.contains('faq-header') &&
            !element.classList.contains('team-page-header') &&
            !element.classList.contains('resources-banner')
        ) {
            animateOnScroll.observe(element);
        } else {
            element.style.visibility = 'visible';
            element.classList.add('animate__active');
        }
    });

    const heroBgParallax = document.querySelector('.hero-bg-parallax');
    if (heroBgParallax) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            heroBgParallax.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    const axisCards = document.querySelectorAll('.axis-card');
    const axisDetailModalLabel = document.getElementById('axisDetailModalLabel');
    const axisDetailModalBody = document.getElementById('axisDetailModalBody');

    const axisContents = {
        comunicacion: {
            title: 'Componente 1: Comunicación',
            description: 'Este componente tiene como objetivo fortalecer los procesos comunicacionales sobre salud y nutrición en la comunidad educativa de Atuncolla, considerando el contexto cultural, lingüístico y territorial de la población. Las acciones se desarrollan desde un enfoque intercultural, educativo y comunitario, y buscan sensibilizar, informar y movilizar a la población frente a la problemática de la anemia infantil.',
            points: [
                {
                    letter: 'a',
                    description: 'Aplicar estrategias educativas con enfoque cultural y lingüístico pertinente.',
                    actions: [
                        '<strong>Murales en quechua y español</strong>: Se elaboran e instalan seis murales bilingües (quechua y español) en puntos estratégicos de la comunidad, como escuelas, mercados y centros de salud. Estos murales contienen mensajes visuales claros, culturalmente pertinentes y diseñados con el apoyo de artistas locales y docentes. Su contenido se orienta a la prevención, detección y tratamiento de la anemia infantil, incluyendo imágenes ilustrativas, frases motivadoras y consejos nutricionales adaptados al entorno. Esta acción no solo cumple una función informativa, sino también estética y de apropiación comunitaria del espacio público.',
                        '<strong>Talleres lúdicos con títeres o teatro campesino</strong>: Se desarrollan al menos tres talleres lúdicos dirigidos a niños y padres de familia, utilizando herramientas como títeres, dramatizaciones y teatro campesino para transmitir mensajes clave sobre salud, nutrición y prevención de la anemia. Estas actividades buscan crear un ambiente de aprendizaje participativo y emocionalmente significativo, donde el conocimiento se transmite de manera creativa y cercana. La metodología empleada facilita la interacción familiar, refuerza valores comunitarios y permite resignificar prácticas tradicionales desde un enfoque saludable.'
                    ]
                },
                {
                    letter: 'b',
                    description: 'Usar lenguaje accesible y comprensible para las familias.',
                    actions: [
                        '<strong>Recetario visual y bilingüe</strong>: Se diseña y distribuye un recetario visual y bilingüe (quechua-español), dirigido a hogares con niños menores de cinco años. Este material incluye recetas nutritivas basadas en insumos locales ricos en hierro —como sangrecita, hígado, quinua y cañihua—, acompañadas de imágenes ilustrativas que explican paso a paso la preparación. Su diseño considera los niveles de alfabetización de las familias, facilitando su comprensión y uso cotidiano. El recetario promueve la revalorización de la cocina tradicional como estrategia concreta para mejorar la nutrición infantil.',
                        '<strong>Campaña radial con mensajes breves</strong>: Se implementa una campaña radial bilingüe con la emisión de al menos diez mensajes breves en quechua y español. Estos mensajes se difunden a través de radios locales en horarios de alta audiencia, abordando temas como el consumo de hierro, prácticas alimentarias saludables, higiene y control de salud. La campaña se diseña con lenguaje accesible y tono cercano, validado previamente por profesionales de salud y representantes comunitarios. Se busca así ampliar el alcance informativo del proyecto a zonas más dispersas o de difícil acceso.'
                    ]
                },
                {
                    letter: 'c',
                    description: 'Generar mayor presencia de medios y formatos adaptados a contextos rurales.',
                    actions: [
                        '<strong>Perifoneo semanal en quechua</strong>: Se organiza un sistema de perifoneo semanal en quechua, mediante altoparlantes móviles que recorren calles, centros poblados y sectores rurales. Cada sesión transmite mensajes breves sobre prevención de la anemia, convocatorias a actividades comunitarias o consejos nutricionales, asegurando que la información llegue incluso a quienes no tienen acceso a medios masivos. Esta estrategia aprovecha un medio tradicional y eficaz en contextos rurales para reforzar la visibilidad del proyecto y fortalecer la comunicación directa con la población.',
                        '<strong>Canciones o coplas grabadas por niños</strong>: Se graban y difunden cinco canciones o coplas creadas e interpretadas por niños de la comunidad, con contenido relacionado a la alimentación saludable, el cuidado de la salud y la prevención de la anemia. Estas producciones son difundidas en espacios comunitarios, centros educativos y actividades del proyecto, generando un vínculo emocional con el público y fortaleciendo la participación infantil en la campaña. La iniciativa rescata formas tradicionales de expresión oral y musical, integrándolas al proceso comunicativo desde una perspectiva lúdica e inclusiva.'
                    ]
                }
            ],
            verification: 'Cada una de estas acciones cuenta con medios de verificación como fotografías, grabaciones, guiones, listas de asistencia, retroalimentación comunitaria y cronogramas de ejecución. Aunque el desarrollo de este componente se apoya en alianzas con artistas locales, docentes, medios de comunicación y autoridades comunales, también se identifican posibles riesgos, como el desinterés de algunos sectores, fallas técnicas, problemas logísticos o escasa comprensión de los mensajes, los cuales se abordan mediante estrategias de mitigación y ajustes metodológicos. Este componente es esencial para instalar capacidades comunicativas sostenibles en la comunidad y generar un entorno social informado, participativo y comprometido con la erradicación de la anemia infantil.'
        },
        participacion: {
            title: 'Componente 2: Participación',
            description: 'Este componente tiene como finalidad incrementar la participación familiar y comunitaria en espacios de diálogo sobre salud, promoviendo una implicación activa y sostenida de las familias, líderes y actores sociales en torno a la prevención y manejo de la anemia infantil. La participación se entiende aquí como un proceso colectivo, horizontal y transformador, que valora los saberes locales y fortalece los lazos entre escuela, hogar y comunidad.',
            points: [
                {
                    letter: 'a',
                    description: 'Promover la apropiación colectiva del problema de la anemia.',
                    actions: [
                        '<strong>Tardes de diálogo comunitario</strong>: Se organizan tres jornadas denominadas "Tardes de diálogo comunitario", orientadas a convocar a madres, padres, líderes locales y otros actores comunitarios para conversar de forma abierta sobre las causas, consecuencias y soluciones frente a la anemia infantil. Estas sesiones se desarrollan en espacios accesibles y acogedores, con metodologías participativas, lenguaje claro y moderadores capacitados. Se busca que cada encuentro cuente con al menos 20 adultos asistentes, generando reflexión colectiva, intercambio de experiencias y compromisos compartidos para actuar desde los distintos espacios sociales.',
                        '<strong>Exposición comunal con dibujos y relatos</strong>: Como parte del proceso de apropiación del problema, se organiza una exposición comunal compuesta por al menos 30 producciones infantiles, como dibujos, cuentos, relatos o collages, elaborados por niñas y niños de la comunidad. Estas creaciones expresan su comprensión sobre la anemia, sus causas y posibles soluciones desde su mirada infantil. La exposición se realiza durante una jornada pública, abierta a las familias y autoridades locales, como una forma de sensibilizar desde las voces más jóvenes y fomentar el reconocimiento del tema como un problema común que debe ser abordado de manera colectiva.'
                    ]
                },
                {
                    letter: 'b',
                    description: 'Activar y dinamizar los espacios comunitarios de reflexión.',
                    actions: [
                        '<strong>Ruta del hierro con degustaciones</strong>: Se diseña e implementa una actividad vivencial denominada "Ruta del hierro", la cual recorre al menos cuatro estaciones comunitarias (puestos o paradas) en donde se brinda información y se ofrece degustación de alimentos ricos en hierro, preparados con insumos locales como sangrecita, hígado, quinua y cañihua. En cada estación, se entregan pequeñas porciones acompañadas de explicaciones sobre el valor nutricional del plato y su preparación. Esta experiencia busca ser dinámica, educativa y sabrosa, reforzando de forma práctica y directa el vínculo entre alimentación, cultura y salud.',
                        '<strong>Talleres de cocina madre-hijo</strong>: Se desarrollan dos talleres de cocina intergeneracionales, con la participación activa de al menos 10 familias, en los que madres e hijos cocinan juntos recetas nutritivas utilizando productos locales. Durante estas sesiones, se comparten conocimientos sobre higiene alimentaria, combinaciones ricas en hierro, preparación adecuada de alimentos y hábitos saludables. La actividad promueve el fortalecimiento del vínculo familiar, la transmisión de saberes, la corresponsabilidad en la alimentación del hogar y la valorización de la cocina como espacio educativo.'
                    ]
                },
                {
                    letter: 'c',
                    description: 'Establecer y fortalecer vínculos activos entre actores educativos, sanitarios y familias.',
                    actions: [
                        '<strong>Círculos de diálogo con moderador comunitario</strong>: Con el objetivo de consolidar canales de comunicación permanentes entre los actores involucrados, se implementan tres círculos de diálogo, cada uno con la participación de al menos diez personas, entre familias, docentes, promotores de salud y líderes comunales. Estos círculos son moderados por representantes de la propia comunidad previamente capacitados y se convierten en espacios seguros para expresar preocupaciones, compartir experiencias y construir propuestas conjuntas de acción frente a la anemia. La frecuencia y continuidad de los encuentros permite generar confianza y sostenibilidad en el proceso participativo.',
                        '<strong>Grupo de madres facilitadoras</strong>: Se conforma y capacita un grupo de cinco madres facilitadoras, seleccionadas de manera participativa y valorando su liderazgo natural dentro de la comunidad. Estas madres asumen el rol de agentes multiplicadoras de conocimientos, acompañando a otras familias en la implementación de prácticas alimentarias saludables y participando activamente en las actividades del proyecto. Su formación incluye temas de salud, nutrición, comunicación y liderazgo comunitario. El fortalecimiento de este grupo contribuye a empoderar a las mujeres como protagonistas del cambio en sus hogares y en su comunidad.'
                    ]
                }
            ],
            verification: 'Todas las acciones de este componente se verifican mediante registros de asistencia, informes de talleres, fotografías y testimonios. La participación activa de las familias y líderes comunitarios es crucial para el éxito, y se gestionan posibles desafíos como la falta de tiempo o la resistencia al cambio a través de flexibilidad en la programación y comunicación constante.'
        },
        cultura: {
            title: 'Componente 3: Revalorizar la cultura orientada a prácticas alimentarias saludables',
            description: 'Este componente se enfoca en rescatar, visibilizar y fortalecer los saberes culturales relacionados con la alimentación saludable, promoviendo el reconocimiento de prácticas ancestrales y su integración con conocimientos nutricionales actuales. Se parte de la premisa de que la cultura local, lejos de ser un obstáculo, constituye un recurso fundamental para transformar hábitos alimenticios, generar confianza en las intervenciones y fomentar el cuidado de la salud infantil desde una mirada comunitaria, identitaria y sostenible.',
            points: [
                {
                    letter: 'a',
                    description: 'Reconocer los signos de anemia como alertas para el cuidado infantil.',
                    actions: [
                        '<strong>Cuento ilustrado narrado en la escuela</strong>: Se elabora un cuento ilustrado dirigido a la infancia, que narra de manera accesible y lúdica la historia de un niño o niña que aprende a identificar los signos de la anemia (como el cansancio, la palidez o la falta de apetito) y busca, con ayuda de su comunidad, soluciones a través de una alimentación adecuada. Este material se presenta en dos sesiones escolares, con apoyo del personal docente y en formatos visuales atractivos. La actividad promueve la identificación temprana de señales de alerta y fomenta en los niños y niñas una actitud proactiva en el cuidado de su salud, con lenguaje adaptado a su nivel de comprensión y contexto cultural.',
                        '<strong>Taller participativo con juegos de roles</strong>: Se desarrollan dos talleres participativos con juegos de roles, dirigidos a niños y padres, en los que los participantes representan escenas de la vida cotidiana relacionadas con la alimentación, la salud y el cuidado infantil. Estas dinámicas permiten explorar de forma vivencial las emociones, conocimientos y decisiones que influyen en la prevención de la anemia. Al mismo tiempo, fortalecen la comunicación entre generaciones, promueven la empatía y refuerzan los aprendizajes del cuento ilustrado. Se espera que al menos 30 personas participen activamente en cada taller, registrando niveles de retención del mensaje a través de evaluaciones breves y observación directa.'
                    ]
                },
                {
                    letter: 'b',
                    description: 'Integrar alimentos locales con otros más nutritivos en la dieta cotidiana.',
                    actions: [
                        '<strong>Festival del alimento que da fuerza</strong>: Se organiza un festival comunitario bajo el lema “El alimento que da fuerza”, donde se presentan recetas locales mejoradas a partir de la combinación de insumos tradicionales con alimentos nutritivos externos, como suplementos o productos fortificados. El evento incluye muestras gastronómicas, presentaciones culturales, estands informativos y espacios de diálogo. Participan al menos 50 personas, y se exhiben 10 recetas elaboradas por madres, promotores o instituciones. Esta acción busca valorar la riqueza alimentaria local, incentivar la creatividad culinaria y generar orgullo en torno a las prácticas saludables propias del territorio.',
                        '<strong>Feria del trueque de saberes</strong>: Como parte del festival o en una jornada específica, se realiza una feria de trueque de saberes, donde las familias comparten sus conocimientos y experiencias sobre recetas, cultivos, crianza de animales menores o técnicas de preparación. Esta actividad propicia el intercambio horizontal de saberes, fortalece el tejido social y reconoce el rol protagónico de las mujeres y personas mayores como guardianes de la cultura alimentaria. Además, se promueve el consumo consciente, la diversidad de la dieta y la soberanía alimentaria. Se registran los alimentos expuestos, las recetas compartidas y las interacciones entre los participantes, documentando los aprendizajes colectivos.'
                    ]
                },
                {
                    letter: 'c',
                    description: 'Generar confianza hacia suplementos o alimentos fortificados mediante información adecuada.',
                    actions: [
                        '<strong>Dramatización con títeres o sketchs</strong>: Se presentan dos dramatizaciones o sketchs breves, realizados por niños, promotores o grupos culturales, que abordan los beneficios del consumo de suplementos de hierro o alimentos fortificados, desmontando mitos y generando confianza en su uso. Estas representaciones se preparan con lenguaje coloquial, sentido del humor y mensajes claros, y se presentan en espacios abiertos o en el marco de ferias y actividades escolares. El formato lúdico permite romper barreras emocionales y culturales frente al uso de suplementos, y se evalúa su impacto a través de encuestas cortas realizadas antes y después de la intervención.',
                        '<strong>Muestra familiar con degustación y explicaciones</strong>: Se organiza una muestra familiar en la que se presentan alimentos fortificados y suplementos disponibles, acompañados de explicaciones claras y demostraciones prácticas sobre cómo usarlos, combinarlos y administrarlos en el hogar. La actividad incluye una pequeña degustación guiada, con respuestas a dudas frecuentes, testimonios de uso positivo y material educativo impreso. Participan al menos 20 familias, y se aplica una evaluación breve que mide el cambio en la percepción y disposición al uso de suplementos. Esta acción busca desmitificar y legitimar los suplementos como parte de una estrategia integral de prevención de la anemia.'
                    ]
                }
            ],
            verification: 'Todas las acciones están documentadas mediante fotografías, registros audiovisuales, encuestas, fichas de recetas, actas comunales y testimonios. La implementación del componente se basa en el interés del personal educativo, la valoración de los alimentos tradicionales y la disponibilidad institucional de insumos y materiales informativos. No obstante, se consideran posibles riesgos como la baja comprensión de conceptos por parte de los niños si no se adapta adecuadamente el contenido, el prejuicio hacia alimentos nuevos o la resistencia a los suplementos debido a mitos o desinformación previa, los cuales son atendidos mediante estrategias pedagógicas, validación cultural y mensajes cuidadosamente diseñados. Este componente contribuye significativamente a fortalecer la identidad cultural, posicionar el conocimiento local como fuente de soluciones, y construir confianza en las herramientas modernas de intervención, integrándolas desde el respeto y el diálogo intercultural.'
        },
        articulacion: {
            title: 'Componente 4: Articulación entre Actores Clave',
            description: 'Este componente busca consolidar una red de colaboración estructurada y sostenible entre los actores educativos, familiares y sanitarios, para abordar de forma conjunta y coherente la problemática de la anemia infantil en la comunidad de Atuncolla. Se reconoce que el impacto de las intervenciones mejora significativamente cuando existe coordinación, seguimiento compartido y retroalimentación constante entre quienes educan, cuidan y brindan atención en salud.',
            points: [
                {
                    letter: 'a',
                    description: 'Aperturar un espacio de coordinación sistemática entre docentes y personal sanitario.',
                    actions: [
                        '<strong>Reuniones bimensuales con dinámicas y compromisos conjuntos</strong>: Se establecen tres reuniones bimensuales entre docentes y personal de los servicios de salud, con participación de representantes de las familias y directivos escolares. Estos encuentros incluyen dinámicas participativas, exposiciones breves y acuerdos concretos, con el objetivo de coordinar esfuerzos, compartir información sobre casos detectados y definir acciones conjuntas para prevenir o tratar la anemia. Se espera lograr la asistencia del 80% de los actores convocados, dejando constancia mediante actas firmadas. Estas reuniones fomentan la confianza interinstitucional, el enfoque preventivo y la planificación colaborativa, elementos clave para sostener el proyecto más allá de su ejecución inicial.',
                        '<strong>Cartelera de salud compartida, actualizada por estudiantes</strong>: Paralelamente, se implementa y mantiene una cartelera de salud escolar como medio de comunicación visual sobre temas de nutrición y prevención de la anemia. Esta cartelera se actualiza al menos dos veces por mes, con información relevante que es elaborada o seleccionada por los propios estudiantes, guiados por sus docentes o facilitadores. La actividad promueve el rol activo de los niños y niñas como comunicadores de salud, fortalece sus competencias informativas y refuerza los contenidos aprendidos en el aula. Las fotografías de la cartelera y los registros de participación estudiantil constituyen evidencias del involucramiento colectivo y del enfoque educativo del proyecto.'
                    ]
                },
                {
                    letter: 'b',
                    description: 'Integrar la nutrición en el currículo y en la práctica pedagógica.',
                    actions: [
                        '<strong>Juegos y canciones en clase sobre alimentación saludable</strong>: Se integran actividades lúdicas relacionadas con la nutrición en al menos tres áreas del currículo escolar, como Comunicación, Ciencia y Ambiente o Personal Social. Se emplean canciones, juegos, rimas, dibujos y dramatizaciones que abordan el valor de los alimentos ricos en hierro, la higiene en la preparación de comidas, y la importancia de una alimentación variada. Estas estrategias innovadoras permiten reforzar los aprendizajes de manera significativa, adaptada al contexto local y con alto nivel de participación infantil. El interés del cuerpo docente es un factor clave para implementar esta propuesta pedagógica de forma transversal.',
                        '<strong>Miniclub escolar de “niños saludables”</strong>: Se consolida un miniclub escolar denominado “niños saludables”, conformado por al menos 10 estudiantes activos, quienes participan en reuniones semanales o quincenales para aprender, crear y difundir mensajes sobre prácticas alimentarias sanas. Los integrantes del club elaboran productos comunicacionales como murales, canciones, periódicos murales o presentaciones teatrales, que luego se difunden en actividades escolares o comunitarias. El club actúa como espacio de liderazgo infantil y empoderamiento, con seguimiento por parte de docentes interesados en promover prácticas pedagógicas creativas e integradoras.'
                    ]
                },
                {
                    letter: 'c',
                    description: 'Crear mecanismos sostenidos de seguimiento y retroalimentación.',
                    actions: [
                        '<strong>Cuaderno familiar de nutrición con dibujos y observaciones</strong>: Se implementa un cuaderno familiar de nutrición dirigido a los hogares con niños diagnosticados con anemia o en riesgo. Este cuaderno contiene espacios para dibujos, observaciones cotidianas, anotaciones sobre alimentación diaria, consejos y recomendaciones, que las familias completan de manera autónoma o con el acompañamiento de facilitadores. Se espera que el cuaderno sea utilizado por al menos el 60% de las familias objetivo, y que sirva como una herramienta práctica y reflexiva para mejorar los hábitos alimentarios. Su diseño considera el nivel de alfabetización local, la estética cultural y la necesidad de mantener un tono cercano y no sancionador.',
                        '<strong>Visitas domiciliarias con fichas de seguimiento</strong>: Como complemento del cuaderno, se realizan al menos 15 visitas domiciliarias a lo largo del proyecto, especialmente dirigidas a familias con mayor vulnerabilidad o casos de anemia persistente. Estas visitas tienen fines educativos y de seguimiento, nunca fiscalizadores, y son ejecutadas por profesionales de salud o facilitadores comunitarios con formación previa. En cada visita, se aplican fichas de observación y retroalimentación, se responden dudas, se refuerzan mensajes clave y se identifican posibles barreras en la alimentación familiar. Esta estrategia permite personalizar las recomendaciones, construir confianza con las familias y documentar progresos o necesidades específicas.'
                    ]
                }
            ],
            verification: 'Las acciones de este componente se verifican mediante actas, fotografías, planes de clase, productos estudiantiles, registros de visitas y reportes de uso de los cuadernos familiares. Su implementación se sostiene en la disposición de coordinación interinstitucional, el interés docente y la apertura familiar, aunque se identifican posibles riesgos, como agendas recargadas, falta de tiempo, desinterés puntual de alguno de los actores o rechazo a la intervención domiciliaria. Estos escenarios se previenen mediante una planificación participativa, estrategias de motivación y ajustes metodológicos según el contexto. Este componente constituye la columna vertebral del enfoque articulador del proyecto, donde la escuela, la familia y el centro de salud trabajan juntos por el bienestar de la infancia, compartiendo información, responsabilidades y decisiones clave para erradicar la anemia infantil de forma sostenible y culturalmente pertinente.'
        }
    };

    axisCards.forEach(card => {
        card.addEventListener('click', function () {
            const axisType = this.dataset.axis;
            const content = axisContents[axisType];

            if (content) {
                axisDetailModalLabel.textContent = content.title;
                let bodyHtml = `<p class="fw-bold">${content.description}</p>`;
                bodyHtml += `<div class="mt-3">`;
                content.points.forEach(point => {
                    bodyHtml += `<h6 class="mt-3"><strong>${point.letter.toUpperCase()}. ${point.description}</strong></h6>`;
                    bodyHtml += `<ul class="list-unstyled mb-3">`;
                    point.actions.forEach(action => {
                        bodyHtml += `<li class="mb-2 ms-3"><i class="fas fa-check-circle text-success me-2"></i>${action}</li>`;
                    });
                    bodyHtml += `</ul>`;
                });
                bodyHtml += `</div>`;

                // Aquí se añade la sección de verificación y consideraciones
                if (content.verification) {
                    bodyHtml += `<h6 class="mt-4"><strong>Medios de Verificación y Consideraciones:</strong></h6>`;
                    bodyHtml += `<p class="small text-muted">${content.verification}</p>`;
                }

                axisDetailModalBody.innerHTML = bodyHtml;
            } else {
                axisDetailModalLabel.textContent = 'Información no disponible';
                axisDetailModalBody.innerHTML = '<p>Lo sentimos, no hay información detallada para este componente.</p>';
            }
        });
    });
});