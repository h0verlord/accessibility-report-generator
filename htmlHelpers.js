
function escapeHtml(unsafe) {
    if (typeof (unsafe) === null) {
        return
    } else if (typeof (unsafe) === 'string') {
        return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')

    } else {
        // console.log(`${unsafe} is not a string`);
        return
    }
}

function addHtmlElement(elementType, classes, id = undefined, otherAttr = [], innerHtml = "") {
    let htmlString = ''
    switch (elementType) {
        case 'div':
            htmlString += `\n<div`
            break;
        case 'ul':
            htmlString += `\n<ul`
            break;
        case 'li':
            htmlString += `\n<li`
            break;
        case 'span':
            htmlString += `\n<ul`
            break;
        case 'h5':
            htmlString += `\n<h5`
            break;
        default:
            break;
    }
    if (classes !== undefined) {
        htmlString += ` class="${classes}"`
    }
    if (id !== undefined) {
        htmlString += ` id="${id}"`
    }
    if (otherAttr !== undefined) {
        // TBD: Traverse Array of other attributes one
        // by one like aria stuff etc
    }
    if (innerHtml !== undefined) {
        htmlString += `>${innerHtml}`
    } else {
        htmlString += `>`
    }
    return htmlString
}

function addEnclosedHtmlElement(elementType, classes, id, otherAttr, innerHtml) {
    let htmlString = ""
    htmlString += addHtmlElement(elementType, classes, id, otherAttr, innerHtml)
    htmlString += encloseElement(elementType)
    return htmlString
}

function addLiElement() {
    // return `\n<li class="list-group-item d-flex justify-content-between align-items-center">`
    return `\n<li class="list-group-item d-flex justify-content-between">`
}

function addSpanElement(label, data) {
    return `\n<span class="input-group-text list-group-item-primary" id="basic-addon1">${label}</span>${data}`
}

function encloseElement(type, number = 1) {
    for (let index = 0; index < number; index++) {
        switch (type) {
            case 'div':
                return `</div>`
            case 'li':
                return `</li>`
            case 'ul':
                return `</ul>`
            case 'span':
                return `</span>`
            case 'h5':
                return `</h5>`

            default:
                return
        }
    }
}

function generateTagBadge(tag) {
    // generate nice looking tags badges
    // example here
    // <span class="badge bg-primary rounded-pill">14</span>
    return `\n<span class="badge mr-3 bg-primary rounded-pill">${tag}</span>`
}

export {
    escapeHtml,
    addLiElement,
    addSpanElement,
    encloseElement,
    generateTagBadge,
    addHtmlElement,
    addEnclosedHtmlElement
}