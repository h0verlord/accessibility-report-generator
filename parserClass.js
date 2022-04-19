import HtmlHelper from './htmlHelper.js';
var Parser = /** @class */ (function () {
    function Parser(jsonObject, htmlString) {
        this.htmlString = htmlString;
        this.jsonObject = jsonObject;
        this.html = new HtmlHelper(htmlString);
    }
    Parser.prototype.traverseJsonReport = function () {
        for (var index = 0; index < this.jsonObject.length; index++) {
            this.parseHostReport(this.jsonObject[index], index);
        }
        this.html.encloseHtmlDocument();
        return this.html.htmlString;
    };
    Parser.prototype.parseHostReport = function (jsonObject, index) {
        // prepare divs for Host section
        this.html.addElement('div', 'container-fluid mt-3');
        this.html.addElement('div', 'row');
        // write header for current host
        this.generateHeaderForHost(jsonObject);
        // Generate Rules
        this.generateCategoriesForHost(jsonObject, index);
        // Close all divs For Christ's Sake
        this.html.encloseElement('div', 1);
    };
    Parser.prototype.generateHeaderForHost = function (jsonObject) {
        var _this = this;
        // traverses given object in a specific order
        // given by the filter const
        // filter can later be passed in parameter
        // and this made a very generic method
        // Generate Header
        this.html.addElement('div', 'col-md-6 col-xxl-3 pt-3 border');
        this.html.addElement('div', 'row row-cols-1');
        var filter = [
            'url',
            'timestamp',
            'testEnvironment',
            'testEngine',
            'testRunner',
            'toolOptions',
        ];
        filter.forEach(function (property) {
            _this.writeTestReportHeader(jsonObject[property], property);
        });
        this.html.encloseElement('div', 2);
    };
    Parser.prototype.generateCategoriesForHost = function (jsonObject, index) {
        var _this = this;
        // traverses given object in a specific order
        // given by the filter const
        // filter can later be passed in parameter
        this.html.addElement('div', 'col-md-6 col-xxl-9 pt-3 border');
        var filter = ['violations', 'passes', 'incomplete', 'inapplicable'];
        // and this made a very generic method
        // Generate button group for collapsing categories
        this.writeTestReportCategoriesButtons(jsonObject, filter, index);
        filter.forEach(function (category) {
            _this.writeTestReportCategory(jsonObject[category], category, index);
        });
        this.html.encloseElement('div', 2);
    };
    Parser.prototype.writeTestReportHeader = function (jsonObject, property) {
        // Preapre Col and Ul for one header section
        this.html.addElement('div', 'col');
        this.html.addElement('ul', 'list-group mb-3');
        // section heading
        this.html.addElement('li', [
            'list-group-item',
            'list-group-item-primary',
            'd-flex',
            'justify-content-between',
        ]);
        this.html.addEnclosedElement('span', undefined, property);
        this.html.encloseElement('li');
        // If field exists
        if (typeof jsonObject == 'object') {
            for (var key in jsonObject) {
                if (Object.hasOwnProperty.call(jsonObject, key)) {
                    var element = jsonObject[key];
                    // generate Li elements for each key:value pairs
                    this.html.addElement('li', [
                        'list-group-item',
                        'd-flex',
                        'justify-content-between',
                    ]);
                    this.html.addEnclosedElement('span', undefined, key);
                    this.html.writeInnerHtml(element);
                    this.html.encloseElement('li');
                }
            }
        }
        else {
            this.html.addElement('li', [
                'list-group-item',
                'd-flex',
                'justify-content-between',
            ]);
            this.html.addEnclosedElement('span', undefined, property);
            this.html.writeInnerHtml(jsonObject);
            this.html.encloseElement('li');
        }
        this.html.encloseElement('div');
        this.html.encloseElement('ul');
    };
    Parser.prototype.writeTestReportCategoriesButtons = function (jsonObject, categories, index) {
        var _this = this;
        this.html.addElement('div', 'row');
        this.html.addElement('div', 'btn-group', undefined, undefined, [
            'role="group"',
            'aria-label="Categories Toggle Button"',
        ]);
        categories.forEach(function (category) {
            // let checked = ''
            // // Generate button
            // if (category == 'violations') {
            //   checked = ' checked'
            // }
            var categoryItems = jsonObject[category].length;
            _this.html.addEnclosedElement('input', 'btn-check', undefined, "".concat(category, "-").concat(index), [
                'data-bs-toggle="collapse"',
                "data-bs-target=\"#collapse-".concat(category, "-").concat(index, "\""),
                'autocomplete="off"',
                // 'aria-expanded="true"',
                // checked,
            ]);
            _this.html.addEnclosedElement('label', 'btn btn-outline-primary', "".concat(category, " (").concat(categoryItems, ")"), undefined, ["for=\"".concat(category, "-").concat(index, "\"")]);
        });
        this.html.encloseElement('div', 2);
    };
    Parser.prototype.writeTestReportCategory = function (jsonObject, category, index) {
        // Write the collapse wrapper div
        if (category == 'violations') {
            this.html.addElement('div', 'collapse', undefined, "collapse-".concat(category, "-").concat(index));
        }
        else {
            this.html.addElement('div', 'collapse', undefined, "collapse-".concat(category, "-").concat(index));
        }
        this.html.addElement('div', 'row');
        this.html.addEnclosedElement('h3', undefined, "".concat(category, " (").concat(jsonObject.length, ")"));
        this.html.encloseElement('div');
        this.html.addElement('div', 'row row-cols-1 row-cols-xl-2 row-cols-xxl-3');
        for (var key in jsonObject) {
            if (Object.hasOwnProperty.call(jsonObject, key)) {
                var element = jsonObject[key];
                this.writeTestReportCategoryRules(element, category, index);
            }
        }
        this.html.encloseElement('div', 2);
    };
    Parser.prototype.writeTestReportCategoryRules = function (object, category, index) {
        var _this = this;
        var orderedRuleFields = [
            'id',
            'impact',
            'tags',
            'description',
            'help',
            'helpUrl',
            'nodes',
        ];
        var id = object.id;
        this.html.addElement('div', 'col mb-3');
        this.html.addElement('ul', 'list-group');
        orderedRuleFields.forEach(function (field) {
            _this.writeTestReportRuleDetail(object[field], category, field, index, id);
        });
        this.html.encloseElement('ul');
        this.html.encloseElement('div');
    };
    Parser.prototype.writeTestReportRuleDetail = function (object, category, field, index, id) {
        // write Li elements based on some rules.
        if (object) {
            if (field == 'id') {
                this.html.addElement('li', [
                    'list-group-item',
                    'list-group-item-primary',
                    'text-md-center',
                    'fw-bolder',
                ], object);
            }
            else if (field == 'nodes') {
                // call modal gen method
                this.writeRuleDetailModal(object, category, index, id);
            }
            else {
                this.html.addElement('li', ['list-group-item']);
                this.html.addEnclosedElement('span', undefined, "".concat(field, ": "));
                this.html.writeInnerHtml(object);
            }
            this.html.encloseElement('li');
        }
    };
    Parser.prototype.writeRuleDetailModal = function (object, category, index, id) {
        // TBD
        // If nodes field is not empty, generate button
        // and div modal with info.
        var modalId = "modal-".concat(category, "-").concat(id, "-").concat(index);
        if (object.length > 0) {
            this.html.addEnclosedElement('button', 'btn btn-primary', 'More Info', undefined, [
                'type="button"',
                'data-bs-toggle="modal"',
                "data-bs-target=\"#".concat(modalId, "\""),
                'aria-expanded="false"',
                "aria-controls=\"".concat(modalId, "\""),
            ]);
            this.html.addElement('div', 'modal fade', undefined, modalId, [
                'tabindex="-1"',
                'aria-labelledby="moreInfoRule"',
                'aria-hidden="true"',
            ]);
            this.html.addElement('div', 'modal-dialog modal-lg');
            this.html.addElement('div', 'modal-content');
            // Modal Header
            this.html.addElement('div', 'modal-header');
            this.html.addEnclosedElement('h5', 'modal-title', id, id);
            this.html.addEnclosedElement('button', 'btn-close', undefined, undefined, ['type="button"', 'data-bs-dismiss="modal"', 'aria-label="Close"']);
            this.html.encloseElement('div');
            // Modal Body
            this.html.addElement('div', 'modal-body');
            for (var key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    var separateList = object[key];
                    this.writeModalInnerFields(separateList);
                }
            }
            this.html.encloseElement('div');
            // Modal Footer
            this.html.addElement('div', 'modal-footer');
            this.html.addEnclosedElement('button', 'btn btn-secondary', 'Close', undefined, ['type="button"', 'data-bs-dismiss="modal"']);
            this.html.encloseElement('div', 4);
        }
    };
    Parser.prototype.writeModalInnerFields = function (object) {
        var _this = this;
        var modalFields = ['impact', 'html', 'target', 'failureSummary'];
        this.html.addElement('ul', 'list-group mb-3');
        modalFields.forEach(function (field) {
            if (object[field] == null) {
                // do nothing
            }
            else {
                _this.html.addElement('li', 'list-group-item');
                _this.html.writeInnerHtml("".concat(field, ": "));
                _this.generateCodeStyle(object[field]);
                // TBD if Impact, generate colorful style
                _this.html.encloseElement('li');
            }
        });
        this.html.encloseElement('ul');
    };
    Parser.prototype.writeImpactStyle = function () {
        // TBD
    };
    Parser.prototype.writeRuleDetailTagStyle = function () {
        // TBD
    };
    Parser.prototype.generateCodeStyle = function (codeText) {
        // TBD
        // If array, first join with comma
        // else just escape and return the string.
        if (Array.isArray(codeText)) {
            codeText = codeText.join(', ');
        }
        var safeHtml = this.html.escapehtml(codeText);
        this.html.addEnclosedElement('code', undefined, safeHtml);
    };
    return Parser;
}());
export default Parser;
//# sourceMappingURL=parserClass.js.map