let allPage = [{
        pagePreviewImg: "https://unsplash.it/500/500/",
        pageTitle: "Diligord",
        pageSubtitle: "Algo",
        pageDescription: "algo",
        pageUrl: "www.prueba.com"
    },
    {
        pagePreviewImg: "https://unsplash.it/500/500/",
        pageTitle: "Aca pone la pagina 2",
        pageSubtitle: "Algo",
        pageDescription: "algo",
        pageUrl: "www.prueba.com"
    },
    {
        pagePreviewImg: "https://unsplash.it/500/500/",
        pageTitle: "Aca la pagina 3",
        pageSubtitle: "Algo",
        pageDescription: "algo",
        pageUrl: "www.prueba.com"
    },
    {
        pagePreviewImg: "https://unsplash.it/500/500/",
        pageTitle: "Aca la pagina 4",
        pageSubtitle: "Algo",
        pageDescription: "algo",
        pageUrl: "www.prueba.com"
    }
]

function createPagePreview(page) {
    let divColRef = createElement("div", "col");
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