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

function addHtmlElement(elementType, classes, innerHtml){
    let htmlString = ''
    switch (elementType) {
        case 'div':
            
            break;
        case 'ul':
            
            break;
        case 'li':
            
            break;
        case 'span':
            
            break;
        
        default:
            break;
    }
    return htmlString
}

function addLiElement() {
    // return `\n<li class="list-group-item d-flex justify-content-between align-items-center">`
    return `\n<li class="list-group-item d-flex justify-content-between">`
}

function addSpanElement(label, data) {
    return `\n<span class="input-group-text list-group-item-primary" id="basic-addon1">${label}</span>${data}`

}

function encloseElement(type) {
    if (type == 'div') {
        return `</div>`
    } else if (type == 'li') {
        return `</li>`
    } else if (type == 'ul') {
        return `</ul>`
    } else {
        return
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
    addHtmlElement
}