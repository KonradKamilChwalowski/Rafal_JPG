const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Wychodzisz na dwór odetchnąć - każdemu należy się przerwa. Z za drzewa wychodzi tajemnicza postać widzisz tylko kontur wielkiego wojownika!',
        tlo: 'url("img/Boisko.png")',
        options: [
            {
                text: '"Kim jesteś!? Lepiej się pokaż!" (rozmowa)',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Zza drzewa wychodzi... Pan Rafał! "Witaj młody adepcie sztuk walki."',
        tlo: 'url("img/Rafał.png")',
        options: [
            {
                text: '"Conichiwa! Przepraszam za zniesławienie!" Padasz na kolana przed mistrzem! (powitaj mistrza)',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: '"Dobrze dobrze, możesz wstać" mówi mistrz gładząc brodę. "Możesz mówić."',
        tlo: 'url("img/Rafał.png")',
        options: [
            {
                text: '"Jak dobrze, że Mistrza widzę! Zły urok przemienił nauczycieli w potwory! Potrzebuję pomocy!" (rozmowa)',
                nextText: "Pomocy"
            },
            {
                text: '"Fantastycznie Mistrza wygląda, nie wiedziałem, że ma Mistrza czarny pas!" (rozmowa)',
                nextText: "Strój"
            },
            {
                text: '"Czarny pas? Wow, może pokaże mi Mistrza jakąś sztuczkę!" (prośba!)',
                nextText: "Sztuczka"
            },
            {
                text: '"Czarny pas? Pewnie podrabiany haha!" (udaj, że atakujesz)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Pomoc",
        text: '"Pomoc wymaga haraczu. Co możesz mi zaoferować?"',
        tlo: 'url("img/Rafał.png")',
        options: [
            {
                text: '"Zechce Mistrz Kanapkę?" (daj prezent)',
                nextText: "Kanapka"
            },
            {
                text: '"Mam wodę, może Mistrz zechce?" (daj prezent)',
                nextText: "Woda"
            },
            {
                text: '"Jak mi Mistrz pomoże to już zawsze będę się uczył na japoński!" (rozmowa)',
                nextText: "Japoński"
            },
            {
                text: '"Mistrz powinien nam pomóc z dobroci serca!" (rozmowa)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Demon",
        text: '"Tak, dokładnie, jestem demonem! Nazywam się Rengu hahaha!"',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"Niech mnie Mistrz nie zjada!" (rozmowa)',
                nextText: "Zjadanie"
            },
            {
                text: '"Czemu Mistrz ma troje oczu?" (rozmowa)',
                nextText: "Oczy"
            }
        ]
    },
    {
        id: "Zjadanie",
        text: '"Hahaha, spokojnie, mam bardziej przyziemne cele, zależy mi tylko na wodzie z miętą!"',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"Nie mam takiej, przepraszam mistrzu!" (przeproś mistrza)',
                nextText: "Przeprosiny"
            }
        ]
    },
    {
        id: "Oczy",
        text: '"Oczu mam 15, ale 12 gałek jest plecach hahaha!"',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"Mmm... okej. Czy mistrz mnie zje?" (rozmowa)',
                nextText: "Zjadanie"
            }
        ]
    },
    {
        id: "Przeprosiny",
        text: '"No nic, w takim razie znikam, a ty rób dalej co robiłeś!"',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"Niech mistrz zaczeka!" (rozmowa)',
                nextText: "Sukces"
            }
        ]
    },
    {
        id: "Sztuczka",
        text: '"Żadna sztuczka nie zastąpi lat treningu w górach Yamamote. Nie mniej jednak, widzę, że coś Cię trapi. Opowiadaj natychamiast"',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"Zły urok przemienił nauczycieli w potwory! Potrzebuję pomocy!" (rozmowa)" (panikujesz)',
                nextText: "Pomoc"
            }
        ]
    },
    {
        id: "Kanapka",
        text: '"Myślisz, że przekupisz mnie byle kanapką!? Choćby była z Almette, to wciąż za mało!" Widzisz jak Mistrz Rafał zmienia się w demona!',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"O NIE, MISTRZ JEST DEMONEM!" (panikujesz)',
                nextText: "Demon"
            }
        ]
    },
    {
        id: "Woda",
        text: '"Uuuu, a z miętą czy zwykłą?"',
        tlo: 'url("img/Rafał.png")',
        options: [
            {
                text: '"Zwykłą!" Odkręcasz wodę i podajesz (daj prezent)',
                nextText: "Woda2"
            }
        ]
    },
    {
        id: "Woda2",
        text: '"Bez mięty to nie woda! Piję tylko z miętą!" Widzisz jak Mistrz Rafał zmienia się w demona!',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"AAAAAA" Ochlap wodą demona! (panikujesz)',
                nextText: "Spokojny"
            }
        ]
    },
    {
        id: "Spokojny",
        text: 'Widzisz jak Mistrz Rafał zmienia się z powrotem w człowieka. Przepraszam za moje zachowanie. Lepiej dam Ci już spokój, zanim zrobię Ci krzywdę!"',
        tlo: 'url("img/Rafał.png")',
        options: [
            {
                text: '"Niech Pan poczeka! (rozmowa)',
                nextText: "Sukces"
            }
        ]
    },
    {
        id: "Atak",
        text: '"JAK ŚMIESZ?!" Mistrz Rafał nagle przemienia się w demona, łapie Cię za rękę i powala w mgnieniu oka. Kiedy zerkasz na niego ponownie, znów stoi wyprostowany z rękoma z tyłu.',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"O NIE, MISTRZ JEST DEMONEM!" (panikujesz)',
                nextText: "Demon"
            }
        ]
    },
    {
        id: "Japoński",
        text: '"JAK ŚMIESZ?! NAUKA NA JAPOŃSKI TO TWÓJ OBOWIĄZEK!" Mistrz Rafał nagle przemienia się w demona!',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"O NIE, MISTRZ JEST DEMONEM!" (panikujesz)',
                nextText: "Demon"
            }
        ]
    },
    {
        id: "Sukces",
        text: 'Mistrz Rafał znika, a zagrożenie minęło!',
        tlo: 'url("img/Boisko.png")',
        options: [
            {
                text: 'Kliknij, aby zagrać ponownie',
                nextText: "Start1"
            }
        ]
    }
]

startGame()