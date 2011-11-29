/**
 *  Simple add / remove event from PPK
 */
function bind(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent('on' + type, fn);
    }
}

function unbind(obj, type, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
    }
    else if (obj.detachEvent) {
        obj.detachEvent('on' + type, fn);
    }
}

/**
 *  Stop event bubble, if ie, use e.cancelBubble = true; while other's following
 *  W3C standards, use e.stopPropagation().
 */
function stopBubble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        window.event.cancelBubble = true;
    }
}

/**
 *  Prevent event trigger the default event handler
 */
function preventDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    else {
        window.event.returnValue = false;
    }
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');    
    };
}

/**
 * from: http://www.dustindiaz.com/getelementsbyclass
 */
function getElementsByClass(searchClass, node, tag) {    
	var classElements = [],
	    node = node || document,
	    tag = tag || '*';
	    
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i=0, ele; ele=els[i]; i++){
	    if (pattern.test(ele.className)) {
	        classElements.push(ele);
	    }
	}
	return classElements;
}

function hasClass(element, className) {
	var s = ' ', cls = s + element.className + s;
	return s(s + className + s) !== -1;
}

function addClass(element, className) {
    var res = element.className,
        parts = className.split(/\s+/);

    parts.each(function(part) {
        if (! hasClass(element, part)) {
            res += ' ' + part;
        }
    });
    element.className = res.trim();
}

function removeClass(element, className) {
    var res = element.className.split(/\s+/),
        parts = className.split(/\s+/);

    parts.each(function(part) {
        res.each(function(aRes, i) {
            if (aRes == part) {
                res[i] = '';
            }
        });
    });
    element.className = res.join(' ');
}
/**
 *  A simple function to update old object with new object
 * @param oldObj
 * @param newObj
 * @param rewrite {boolean}, default true
 */
function updateObj(oldObj, newObj, rewrite) {
    if (arguments.length < 2) throw new error('needs 2 or 3 parameters');
    if (arguments.length < 3) rewrite = true;
    for (var item in newObj) {
        if (item in oldObj && !rewrite) continue;
        oldObj[item] = newObj[item];
    }
    return oldObj;
}

/*
 * from:
 * http://stackoverflow.com/questions/1700870/how-do-i-do-outerhtml-in-firefox
 */
function outerHTML(node) {
    // if IE, Chrome take the internal method otherwise build one
    return node.outerHTML || (
        function(n) {
            var div = document.createElement('div'), h;
            div.appendChild(n.cloneNode(true));
            h = div.innerHTML;
            div = null;
            return h;
        })(node);
}

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

/**
 * nodeType
 * 1: element node
 * 9: document node
 */
function isElement(o) {
    if (o.nodeType && (o.nodeType == 1 || o.nodeType == 9)) {
        return true;
    }
}

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

function isFunction(o) {
    return Object.prototype.toString.call(o) == '[object Function]';
}

function isBool(o) {
    //return Object.prototype.toString.call(o) === 'object Boolean]';
    return o === !!o;
}
/**
 * add an each to array
 */
Array.prototype.each = function() {
    var fn, item, index, l = this.length;

    if (arguments.length != 1) {
        throw new Error('need a function to be the parameter');
    }

    if (!isFunction(arguments[0])) {
        throw new Error('The parameter must be a function');
    }

    fn = arguments[0];

    for (var i = 0; i < l; i++) {
        fn.call(this, this[i], i);
    }
};

function $$(id){
    return document.getElementById(id);
}

/**
 * escape html as htmlspecialchars in php with ENT_QUOTES(htmlspecial(unsafe, ENT_QUOTES))
 * from: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
 * a more completed version: https://raw.github.com/kvz/phpjs/master/functions/strings/htmlspecialchars.js
 */
function escapeHtml(unsafe) {
  return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 *  Methods to create demos
 * 
 *  if not set config parameter, create all demos in the page with default config
 */
var LiveDemo = function(config){
    if (arguments.length == 0) config = {};
    this.config = {
        context: null, // if not given, get by contextClass
        contextClass: 'a',
        sourceHandleClass: 'a-a-a',
        renderHandleClass: 'a-a-b',
        currentClass: 'current',
        sourceTabClass: 'a-b-a',
        viewTabClass: 'a-b-b',
        formClass: 'a-b-a-f',
        textAreaClass: 'a-b-a-t',
        iframeClass: 'a-b-b-i'        
    };
    this.config = updateObj(this.config, config);
    this.init();
};

LiveDemo.prototype = {
    init: function(){
        var c = this.config;
        
        // if not give context, get by contextClass and make all        
        if (!c.context){
            var cons = getElementsByClass(c.contextClass);
            for (var i=0, con; con=cons[i]; i++) {
                var o = updateObj(c, {context: con});
                new LiveDemo(o);
            }
            return ;
        }
        
        // init context
        var context = c.context;
        this.context = context;
        this.sourceHandle = getElementsByClass(c.sourceHandleClass, context)[0];
        this.renderHandle = getElementsByClass(c.renderHandleClass, context)[0];
        this.sourceTab = getElementsByClass(c.sourceTabClass, context)[0];
        this.viewTab = getElementsByClass(c.viewTabClass, context)[0];
        this.formEle = getElementsByClass(c.formClass, context)[0];
        this.textArea = getElementsByClass(c.textAreaClass, context)[0];
        
        // generate a iframe to receive the response, 
        // iframe's name must be the same as the form's target
        var targetName = 'demoCodeRun' + new Date().getTime();
        this.formEle.target = targetName;
        this.viewTab.innerHTML = '<iframe frameborder="0" class="' + c.iframeClass + '" name="' + targetName + '"></iframe>';
        
        // save the handles and tabs for tab switch
        this.handles = [this.sourceHandle, this.renderHandle];
        this.tabs = [this.sourceTab, this.viewTab];
        
        // codemirror editor
        var ta = this.textArea;
        ta.value = (ta.textContent || ta.innerText || ta.innerHTML).replace(/^\s*/, "");
        this.originCode = ta.value;
        this.formatCode = '';
        this.editor = CodeMirror.fromTextArea(ta, {
            mode: "text/html",
            tabMode: "shift",
            lineNumbers: true, 
            matchBrackets: true,
            indentUnit: 4        
        });
        
        this.bind();
        return this;
    },
    switchTab: function(index) {
        var handles = this.handles,
            tabs = this.tabs,
            currentClass = this.config.currentClass;
            
        if (handles.length != tabs.length) {throw new error("missing tab or handler");}
        
        for (var i = 0, l = handles.length; i < l; i++) {
            if (index == i) {
                addClass(handles[i], currentClass);
                tabs[i].style.display = 'block';
            } else {
                removeClass(handles[i], currentClass);
                tabs[i].style.display = 'none';
            }
        }
    },
    bind: function() {
        var self = this,
            currentClass = self.config.currentClass;
        
        // switch to source view
        bind(self.sourceHandle, 'click', function(){
            if (hasClass(self.sourceHandle, currentClass)) return;
            self.switchTab(0);
            self.editor.setValue(self.originCode);
        });
        
        // switch to render view
        bind(self.renderHandle, 'click', function(){
            if (hasClass(self.renderHandle, currentClass)) return;
            self.switchTab(1);
            self.submit();
        });  
    },
    submit: function() {
        var self = this;
        
        self.originCode = self.editor.getValue();
        ///self.formatCode = self.originCode.replace(/<(\/)?script/ig, '<$1tpircs').replace(/onclick/ig, 'kcilcno');
        // needs translate before submit because of chrome's xss protection
        // ref: http://stackoverflow.com/questions/1547884/refused-to-execute-a-javascript-script-source-code-of-script-found-within-reque
        self.formatCode = escapeHtml(self.originCode);
        self.editor.setValue(self.formatCode);
        self.textArea.value = self.formatCode;  // IE needs this to make the submit value correct
        self.formEle.submit();
        //self.editor.setValue(self.originCode);
    }
};

/**
 * Fast method to generate html for the LiveDemo with the default settings.
 * There are two methods, from value or from textarea.
 * each can take two parameters, first will be the value/textarea, second will be the form action.
 * and they will return the html code.
 *
 * one more method: print will use document.write to insert the html. Should not use this after dom ready
 *
 * Notice: these methods only generate the html code for LiveDemo, but not init them with Demo,
 * so after generate them, run the LiveDemo methods to act as a code editor.
 */
var LiveDemoEditor = function(){
    var defaultAction = "try.php?onlyCode=true";
    
    var makeFromValue = function(value, action){
        action = action || defaultAction;
        value = value || '';
        return  '<div class="a"><div class="a-a"><span class="a-a-c a-a-a current">code</span>' +
                '<span class="a-a-c a-a-b">Render</span></div>' +
                '<div class="a-b"><div class="a-b-c a-b-a" style="display:block">' +
                '<form class="a-b-a-f" action="' + action + '" method="post" autocomplete="off">' +
                '<textarea name="demoCode" class="a-b-a-t">' + value + '</textarea></form>' +
                '</div><div class="a-b-c a-b-b"></div>' +
                '</div></div>';
    };

    var makeFromTextArea = function(textarea, action){
        return makeFromValue(textarea.value, action);
    };

    var print = function(str){
        document.write(str);
    };
    
    return {
        makeFromValue: makeFromValue,
        makeFromTextArea: makeFromTextArea,
        print: print
    }
}();
