let allPage = [{
        pagePreviewImg: "./assets/pagePreview/plotter1.png",
        pageTitle: "Sonificador de gradientes 0.a",
        pageSubtitle: "",
        pageDescription: "Introducimos la idea de traducir en sonido un gradiente, en este caso la pendiente de una funcion mas bien suave",
        pageUrl: "./plotter1/index.htm"
    },
    {
        pagePreviewImg: "./assets/pagePreview/plotter2.png",
        pageTitle: "Sonificador de gradientes 0.b",
        pageSubtitle: "",
        pageDescription: "Continuamos con la misma idea de traducir a sonido, ahora con un gradiente un poco mas 'rugoso'",
        pageUrl: "./plotter2/index.htm"
    },
    {
        pagePreviewImg: "./assets/pagePreview/fractal.png",
        pageTitle: "Sonificar un fractal",
        pageSubtitle: "",
        pageDescription: "Trasladamos la idea de sonificar un gradiente, al problema de entender intuitiva e interactivamente la rugosidad de un fractal",
        pageUrl: "./fractal/doc.htm"
    },
    {
        pagePreviewImg: "./assets/pagePreview/3dmap.jpeg",
        pageTitle: "Sonificar un terreno marciano",
        pageSubtitle: "",
        pageDescription: "Cualquier cosa que pueda ser expresada como 'mapas de calor puede' ser sonificada. Aquí sonificamos (y transformamos en modelo 3d) un mapa de calor que expresa las alturas de un territorio en Marte",
        pageUrl: "./3d/index.html"
    },
    {
        pagePreviewImg: "./assets/pagePreview/ai.png",
        pageTitle: "Realidad aumentada",
        pageSubtitle: "",
        pageDescription: "Usando inteligencia artificial, se toma video capturado en vivo con la webcam, y se traduce a posiciones tridimensionales, para manejar objetos virtuales",
        pageUrl: "https://damiansire.github.io/artificialIntelligenceAugmentedReality3dFigures/"
    }
]

function createPagePreview(page) {
    let divColRef = createElement("div", "col");
    divColRef.setAttribute("onclick", "location.href='" + page.pageUrl +"';")
    let divContainer = createElement("div", "container");
    /*
    <div class="front" style="background-image: url(https://unsplash.it/500/500/)">
        <div class="inner">
            <p>Diligord</p>
            <span>Lorem ipsum</span>
        </div>
    </div>
    */
    let divFont = createElement("div", "front");
    divFont.setAttribute("style", "background-image: url(" + page.pagePreviewImg + ");");
    let divInner = createElement("div", "inner");
    let elementP = createElementWithText("p", page.pageTitle)
    let elementSpan = createElementWithText("span", page.pageSubtitle)
    divInner.appendChild(elementP)
    divInner.appendChild(elementSpan)
    divFont.appendChild(divInner)
    divContainer.appendChild(divFont)
        /*
        <div class="back">
                <div class="inner">
                    <p> My text</p>
                </div>
            </div>
        */
    let divBlack = createElement("div", "back");
    divInner = createElement("div", "inner");
    let pElement = createElementWithText("p", page.pageDescription)
    divInner.appendChild(pElement)
    divBlack.appendChild(divInner)

    //Agrego los elementos creados
    divContainer.appendChild(divBlack)
    divColRef.appendChild(divContainer)
    return divColRef;
}

function createElement(elementType, className) {
    let elementRef = document.createElement(elementType)
    if (className != undefined) {
        elementRef.classList.add(className)
    }
    return elementRef;
}

function createElementWithText(elementType, text) {
    let elementRef = createElement(elementType);
    let myText = document.createTextNode(text)
    elementRef.appendChild(myText)
    return elementRef
}
/*
<div class="col">
    <div class="container">
    </div>
</div>
*/

function addPageToBoddy(page) {
    const pageCols = document.getElementsByClassName("cols")[0];
    let myPage = createPagePreview(page)
    pageCols.appendChild(myPage)
}



allPage.forEach(page => {
    addPageToBoddy(page)
})
