var HtmlHelper = /** @class */ (function () {
    function HtmlHelper(htmlString) {
        this.htmlString = htmlString;
    }
    HtmlHelper.prototype.escapehtml = function (unsafeHtml) {
        if (typeof unsafeHtml === null) {
            //  Do nothing
        }
        else if (typeof unsafeHtml == 'string') {
            return (unsafeHtml
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                // eslint-disable-next-line quotes
                .replaceAll("'", '&#039;'));
        }
        else {
            return unsafeHtml;
        }
    };
    HtmlHelper.prototype.encloseElement = function (type, numberOfElements) {
        if (numberOfElements === void 0) { numberOfElements = 1; }
        for (var element = 0; element < numberOfElements; element++) {
            switch (type) {
                case 'div':
                    this.htmlString += "\n</div>";
                    break;
                case 'li':
                    this.htmlString += "\n</li>";
                    break;
                case 'ul':
                    this.htmlString += "\n</ul>";
                    break;
                case 'span':
                    this.htmlString += "</span>";
                    break;
                case 'h3':
                    this.htmlString += "</h3>";
                    break;
                case 'h5':
                    this.htmlString += "</h5>";
                    break;
                case 'a':
                    this.htmlString += "</a>";
                    break;
                case 'input':
                    break;
                case 'label':
                    this.htmlString += "</label>";
                    break;
                case 'button':
                    this.htmlString += "</button>";
                    break;
                case 'code':
                    this.htmlString += "</code>";
                    break;
                default:
                    return;
            }
        }
    };
    HtmlHelper.prototype.addElement = function (type, classes, innerHtml, id, otherAttr) {
        switch (type) {
            case 'div':
                this.htmlString += "\n<div";
                break;
            case 'ul':
                this.htmlString += "\n<ul";
                break;
            case 'li':
                this.htmlString += "\n<li";
                break;
            case 'span':
                this.htmlString += "\n<span";
                break;
            case 'h3':
                this.htmlString += "\n<h3";
                break;
            case 'h5':
                this.htmlString += "\n<h5";
                break;
            case 'p':
                this.htmlString += "\n<p";
                break;
            case 'input':
                this.htmlString += "\n<input type=\"checkbox\"";
                break;
            case 'button':
                this.htmlString += "\n<button";
                break;
            case 'label':
                this.htmlString += "\n<label";
                break;
            case 'a':
                this.htmlString += "\n<a";
                break;
            case 'code':
                this.htmlString += "\n<code";
                break;
            default:
                break;
        }
        if (classes) {
            this.htmlString += " class=\"";
            if (typeof classes === 'string') {
                this.htmlString += "".concat(classes);
            }
            else {
                this.htmlString += "".concat(classes.join(' '));
            }
            this.htmlString += "\"";
        }
        if (id) {
            this.htmlString += " id=\"".concat(id, "\"");
        }
        if (otherAttr && otherAttr.length > 0) {
            // TBD: Traverse Array of other attributes one
            // by one like aria stuff etc
            this.htmlString += " ".concat(otherAttr.join(' '));
        }
        if (innerHtml) {
            this.htmlString += ">".concat(innerHtml);
        }
        else {
            this.htmlString += ">";
        }
    };
    HtmlHelper.prototype.writeInnerHtml = function (innerHtml) {
        // check if link, if yes, put in <a> tag
        var safeHtml = this.escapehtml(innerHtml);
        if (typeof safeHtml == 'string') {
            if (safeHtml.includes('://')) {
                var splitUrl = safeHtml.split('/');
                var domain = splitUrl[2];
                this.addEnclosedElement('a', undefined, domain, undefined, [
                    "href=\"".concat(safeHtml, "\""),
                    'target="_blank"',
                ]);
            }
            else {
                this.htmlString += "".concat(safeHtml);
            }
        }
        else {
            this.htmlString += "".concat(safeHtml);
        }
    };
    HtmlHelper.prototype.addEnclosedElement = function (type, classes, innerHtml, id, otherAttr) {
        this.addElement(type, classes, innerHtml, id, otherAttr);
        this.encloseElement(type);
    };
    HtmlHelper.prototype.encloseHtmlDocument = function () {
        this.htmlString += "\n<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js\"";
        // eslint-disable-next-line max-len
        this.htmlString += "integrity=\"sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p\"";
        this.htmlString += "crossorigin=\"anonymous\"></script>";
        this.htmlString += '\n</body>\n</html>';
    };
    return HtmlHelper;
}());
export default HtmlHelper;
//# sourceMappingURL=htmlHelper.js.map