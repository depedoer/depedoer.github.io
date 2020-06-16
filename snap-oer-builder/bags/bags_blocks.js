/* Change set for blocks.js */

Morph.prototype.executeAlgebra = function()
{
    //call getAlgebra
    var algebraCode = "";
    var currentBlock = this.topBlock();
    
    if(currentBlock.nextBlock() == null)
        algebraCode = currentBlock.getAlgebra(true);
    else
        currentBlock.getAlgebra(false);
    
    while(currentBlock.nextBlock() != null)
    {
        currentBlock = currentBlock.nextBlock();
        
        if(currentBlock.nextBlock() == null)
            algebraCode = currentBlock.getAlgebra(true);
        else
            currentBlock.getAlgebra(false);
    }
    
    alertAlgebra( algebraCode );
}

Morph.prototype.getAlgebra = function(lastInSequence)
{
    this.codeIn = this.parent.codeOut;

    var algebraCode = ""; 
    var alert = true;
    alert = lastInSequence;
    
    if(this instanceof CommandBlockMorph && ( this.category === "basics" || this.category === "movies" || this.category === "vlds" ) )
    {
        algebraCode = this.blockSpec;
    }
    else if(this.selector === "customData")
    {
        algebraCode = this.children[0].children[0].text;
    }
    else if(this instanceof InputSlotMorph)
    {
        algebraCode = this.children[0].text;
    }
    else if(this instanceof StringMorph)
    {
        algebraCode = this.text;
    }
    else if(this.selector == "theDropdown")
    {
        var column = "";
        
        column = this.children[0].children[0].text;
        
        algebraCode = column;
    }
    else if(this.selector == "reportLessThan")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].getAlgebra(true);
            
        algebraCode = slot1 + " < " + slot2;
    }
    else if(this.selector == "reportEquals")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].getAlgebra(true);
        
        algebraCode = slot1 + " = " + slot2;
    }
    else if(this.selector == "reportGreaterThan")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].getAlgebra(true);
            
        algebraCode = slot1 + " > " + slot2;
    }
    else if(this.selector == "reportAnd")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[1] != null)
            slot1 = this.children[1].getAlgebra(true);
            
        if(this.children[3] != null)
            slot2 = this.children[3].getAlgebra(true);
            
        algebraCode = "(" + slot1 + ") \\and (" + slot2 + ")";
    }
    else if(this.selector == "reportOr")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0] != null)
            slot1 = this.children[0].getAlgebra(true);
            
        if(this.children[2] != null)
            slot2 = this.children[2].getAlgebra(true);
            
        algebraCode = "(" + slot1 + ") \\or (" + slot2 + ")";
    }
    else if(this.selector == "reportNot")
    {
        var slot1 = "";
        
        if(this.children[1] != null)
            slot1 = this.children[1].getAlgebra(true);
            
        algebraCode = "not " + slot1;
    }
    else if(this.selector == "reportTrue")
    {
        algebraCode = "true";
    }
    else if(this.selector == "reportFalse")
    {
        algebraCode = "false";
    }
    else if(this.selector == "reportIsNull")
    {
        var slot1 = "";
        
        if(this.children[0] != null)
            slot1 = this.children[0].getAlgebra(true);
            
        algebraCode = slot1 + " is null";
    }
    else if(this.selector == "reportIsNotNull")
    {
        var slot1 = "";
        
        if(this.children[0] != null)
            slot1 = this.children[0].getAlgebra(true);
            
        algebraCode = slot1 + " is \\not null";
    }
    else if(this.selector == "union")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].children[0].getAlgebra(true);
        
        algebraCode = slot1 + " \\union " + slot2;
    }
    else if(this.selector == "intersect")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].children[0].getAlgebra(true);
            
        algebraCode = slot1 + " \\inter " + slot2;
    }
    else if(this.selector == "difference")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].children[0].getAlgebra(true);
            
        algebraCode = slot1 + " \\diff " + slot2;
    }
    else if(this.selector == "cartesian")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
            
        if(this.children[2].children[0] != null)
            slot2 = this.children[2].children[0].getAlgebra(true);
            
        algebraCode = slot1 + " \\cross " + slot2;
    }
    else if(this.selector == "select")
    {
        var slot1 = "";
        
        if(this.children[1].children[0] != null)
            slot1 = this.children[1].getAlgebra(true);
        
        algebraCode = "\\\select_{" + slot1 + "} (" + this.codeIn + ")";
    }
    else if(this.selector == "project")
    {
        var columns = "";
        
        for(var i = 1; i < this.children[1].children.length - 1; i++)
        {
            if(this.children[1].children[i] != null)
            {
                if(i != this.children[1].children.length - 2)
                {
                    columns = columns + this.children[1].children[i].getAlgebra(true) + ", ";
                }
                else
                {
                    columns = columns + this.children[1].children[i].getAlgebra(true);
                }
            }
        }
        
        algebraCode = "\\project_{" + columns + "} (" + this.codeIn + ")";
    }
    else if(this.selector == "rename")
    {
        var newRelation = "";
        var tuples = "";
        
        if(this.children[1].children[0] != null)
        {
            newRelation = this.children[1].children[0].getAlgebra(true);
        }
        
        if(this.children[3].children[0] != null)
        {
            tuples = this.children[3].children[0].getAlgebra(true);
        }
        
        algebraCode = "\\rename_{" + newRelation + ", " + tuples + "}" + " (" + this.codeIn + ")";
    }
    else if(this.selector == "natural")
    {
        var slot1 = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
            
        if(this.children[3].children[0] != null)
            slot2 = this.children[3].children[0].getAlgebra(true);
            
        algebraCode = slot1 + " \\join " + slot2;
    }
    else if(this.selector == "theta")
    {
        var slot1 = "";
        var select = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
        
        if(this.children[4].children[0] != null)
            select = this.children[4].getAlgebra(true);
            
        if(this.children[5].children[0] != null)
            slot2 = this.children[5].children[0].getAlgebra(true);
            
        algebraCode = "\\select_{" + select + "} (" + slot1 + " \\join " + slot2 + ")";
    }
    else if(this.selector == "outer") 
    {
        var slot1 = "";
        var direction = "";
        var select = "";
        var slot2 = "";
        
        if(this.children[0].children[0] != null)
            slot1 = this.children[0].children[0].getAlgebra(true);
            
        direction = this.children[3].children[0].text;
        
        if(this.children[4] != null)
            select = this.children[4].getAlgebra(true);
            
        if(this.children[5].children[0] != null)
            slot2 = this.children[5].children[0].getAlgebra(true);
            
        algebraCode = "\\select{" + direction + ", " + select + "} (" + slot1 + " \\join " + slot2 + ")";
    }
    else if(this.selector == "dupElim")
    {
        algebraCode = " \\nodup (" + this.codeIn + ")";
    }
    else if(this.selector == "group")
    {
        var columns = "";
        
        for(var i = 1; i < this.children[2].children.length - 1; i++)
        {
            if(this.children[2].children[i] != null)
            {
                if(i != this.children[2].children.length - 2)
                {
                    columns = columns + this.children[2].children[i].getAlgebra(true) + ", ";
                }
                else
                {
                    columns = columns + this.children[2].children[i].getAlgebra(true);
                }
            }
        }
        
        algebraCode = "\\group{" + columns + "} (" + this.codeIn + ")";
    }
    else if(this.selector == "agg") 
    {
        var operations = "";
        var options = "";
        
        for(var i = 1; i < this.children[1].children.length - 1; i++)
        {
            if(this.children[1].children[i] != null)
            {
                if(i != this.children[1].children.length - 2)
                {
                    operations = operations + this.children[1].children[i].getAlgebra(true) + ", ";
                }
                else
                {
                    operations = operations + this.children[1].children[i].getAlgebra(true);
                }
            }
        }
        
        for(var i = 1; i < this.children[2].children.length - 1; i++)
        {
            if(this.children[2].children[i] != null)
            {
                if(i != this.children[2].children.length - 2)
                {
                    options = options + this.children[2].children[i].getAlgebra(true) + ", ";
                }
                else
                {
                    options = options + this.children[2].children[i].getAlgebra(true);
                }
            }
        }
        
        if(options != "")
            options = "(" + options + ")";
        
        algebraCode = "\\aggregate{" + operations + options + "} (" + this.codeIn + ")";
    }
    else if(this.selector == "order") 
    {
        var columns = "";
        
        for(var i = 1; i < this.children[2].children.length - 1; i++)
        {
            if(this.children[2].children[i] != null)
            {
                if(i != this.children[2].children.length - 2)
                {
                    columns = columns + this.children[2].children[i].getAlgebra(true) + ", ";
                }
                else
                {
                    columns = columns + this.children[2].children[i].getAlgebra(true);
                }
            }
        }
        
        algebraCode = "\\order{" + columns + "} (" + this.codeIn + ")";
    }
    else if(this.selector == "limit") 
    {
        var limit = "";
        
        limit = this.children[1].children[0].text;
        
        algebraCode = "\\limit{" + limit + "} (" + this.codeIn + ")";
    }
    
    this.codeOut = algebraCode;
    
    if(alert === true)
        return algebraCode;
    else
    {
        var empty = "";
        return empty;
    }
}

SyntaxElementMorph.prototype.labelPart = function (spec) {
    var part;
    if (spec[0] === '%' &&
            spec.length > 1 &&
            this.selector !== 'reportGetVar') {
        // check for variable multi-arg-slot:
        if ((spec.length > 5) && (spec.slice(0, 5) === '%mult')) {
            part = new MultiArgMorph(spec.slice(5));
            part.addInput();
            return part;
        }

        // single-arg and specialized multi-arg slots:
        switch (spec) {
        case '%inputs':
            part = new MultiArgMorph('%s', 'with inputs');
            part.isStatic = false;
            part.canBeEmpty = false;
            break;
        case '%scriptVars':
            part = new MultiArgMorph('%t', null, 1, spec);
            part.canBeEmpty = false;
            break;
        case '%parms':
            part = new MultiArgMorph('%t', 'Input Names:', 0, spec);
            part.canBeEmpty = false;
            break;
        case '%ringparms':
            part = new MultiArgMorph(
                '%t',
                'input names:',
                0,
                spec
            );
            break;
        case '%cmdRing':
            part = new RingMorph();
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyScript';
            part.setSpec('%rc %ringparms');
            part.isDraggable = true;
            break;
        case '%repRing':
            part = new RingMorph();
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyReporter';
            part.setSpec('%rr %ringparms');
            part.isDraggable = true;
            part.isStatic = true;
            break;
        case '%predRing':
            part = new RingMorph(true);
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyPredicate';
            part.setSpec('%rp %ringparms');
            part.isDraggable = true;
            part.isStatic = true;
            break;
        case '%words':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput(); // allow for default value setting
            part.addInput(); // allow for default value setting
            part.isStatic = false;
            break;
        case '%exp':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            break;
        case '%br':
            part = new Morph();
            part.setExtent(new Point(0, 0));
            part.isBlockLabelBreak = true;
            part.getSpec = function () {
                return '%br';
            };
            break;
        case '%inputName':
            part = new ReporterBlockMorph();
            part.category = 'variables';
            part.color = SpriteMorph.prototype.blockColor.variables;
            part.setSpec(localize('Input name'));
            break;
        case '%s':
            part = new InputSlotMorph();
            break;
        case '%anyUE':
            part = new InputSlotMorph();
            part.isUnevaluated = true;
            break;
        case '%txt':
            part = new InputSlotMorph();
            part.minWidth = part.height() * 1.7; // "landscape"
            part.fixLayout();
            break;
        case '%obj':
            part = new ArgMorph('object');
            break;
        case '%n':
            part = new InputSlotMorph(null, true);
            break;
        case '%dir':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(90) right' : 90,
                    '(-90) left' : -90,
                    '(0) up' : '0',
                    '(180) down' : 180
                }
            );
            part.setContents(90);
            break;
        case '%inst':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(1) Acoustic Grand' : 1,
                    '(2) Bright Acoustic' : 2,
                    '(3) Electric Grand' : 3,
                    '(4) Honky Tonk' : 4,
                    '(5) Electric Piano 1' : 5,
                    '(6) Electric Piano 2' : 6,
                    '(7) Harpsichord' : 7
                }
            );
            part.setContents(1);
            break;
        case '%month':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'January' : ['January'],
                    'February' : ['February'],
                    'March' : ['March'],
                    'April' : ['April'],
                    'May' : ['May'],
                    'June' : ['June'],
                    'July' : ['July'],
                    'August' : ['August'],
                    'September' : ['September'],
                    'October' : ['October'],
                    'November' : ['November'],
                    'December' : ['December']
                },
                true // read-only
            );
            break;
        case '%ida':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '1' : 1,
                    last : ['last'],
                    '~' : null,
                    all : ['all']
                }
            );
            part.setContents(1);
            break;
        case '%idx':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '1' : 1,
                    last : ['last'],
                    any : ['any']
                }
            );
            part.setContents(1);
            break;
        case '%spr':
            part = new InputSlotMorph(
                null,
                false,
                'objectsMenu',
                true
            );
            break;
        case '%col': // collision detection
            part = new InputSlotMorph(
                null,
                false,
                'collidablesMenu',
                true
            );
            break;
        case '%dst': // distance measuring
            part = new InputSlotMorph(
                null,
                false,
                'distancesMenu',
                true
            );
            break;
        case '%cln': // clones
            part = new InputSlotMorph(
                null,
                false,
                'clonablesMenu',
                true
            );
            break;
        case '%cst':
            part = new InputSlotMorph(
                null,
                false,
                'costumesMenu',
                true
            );
            break;
        case '%eff':
            part = new InputSlotMorph(
                null,
                false,
                {
                /*
                    color : 'color',
                    fisheye : 'fisheye',
                    whirl : 'whirl',
                    pixelate : 'pixelate',
                    mosaic : 'mosaic',
                    brightness : 'brightness',
                */
                    ghost : ['ghost']
                },
                true
            );
            part.setContents(['ghost']);
            break;
        case '%snd':
            part = new InputSlotMorph(
                null,
                false,
                'soundsMenu',
                true
            );
            break;
        case '%key':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'up arrow': ['up arrow'],
                    'down arrow': ['down arrow'],
                    'right arrow': ['right arrow'],
                    'left arrow': ['left arrow'],
                    space : ['space'],
                    a : ['a'],
                    b : ['b'],
                    c : ['c'],
                    d : ['d'],
                    e : ['e'],
                    f : ['f'],
                    g : ['g'],
                    h : ['h'],
                    i : ['i'],
                    j : ['j'],
                    k : ['k'],
                    l : ['l'],
                    m : ['m'],
                    n : ['n'],
                    o : ['o'],
                    p : ['p'],
                    q : ['q'],
                    r : ['r'],
                    s : ['s'],
                    t : ['t'],
                    u : ['u'],
                    v : ['v'],
                    w : ['w'],
                    x : ['x'],
                    y : ['y'],
                    z : ['z'],
                    '0' : ['0'],
                    '1' : ['1'],
                    '2' : ['2'],
                    '3' : ['3'],
                    '4' : ['4'],
                    '5' : ['5'],
                    '6' : ['6'],
                    '7' : ['7'],
                    '8' : ['8'],
                    '9' : ['9']
                },
                true
            );
            part.setContents(['space']);
            break;
        case '%keyHat':
            part = this.labelPart('%key');
            part.isStatic = true;
            break;
        case '%msg':
            part = new InputSlotMorph(
                null,
                false,
                'messagesMenu',
                true
            );
            break;
        case '%msgHat':
            part = new InputSlotMorph(
                null,
                false,
                'messagesReceivedMenu',
                true
            );
            part.isStatic = true;
            break;
        case '%att':
            part = new InputSlotMorph(
                null,
                false,
                'attributesMenu',
                true
            );
            part.isStatic = true;
            break;
        case '%fun':
            part = new InputSlotMorph(
                null,
                false,
                {
                    abs : ['abs'],
                    sqrt : ['sqrt'],
                    sin : ['sin'],
                    cos : ['cos'],
                    tan : ['tan'],
                    asin : ['asin'],
                    acos : ['acos'],
                    atan : ['atan'],
                    ln : ['ln'],
                    // log : 'log',
                    'e^' : ['e^']
                    // '10^' : '10^'
                },
                true
            );
            part.setContents(['sqrt']);
            break;
        case '%typ':
            part = new InputSlotMorph(
                null,
                false,
                {
                    number : ['number'],
                    text : ['text'],
                    Boolean : ['Boolean'],
                    list : ['list'],
                    command : ['command'],
                    reporter : ['reporter'],
                    predicate : ['predicate']
                    // ring : 'ring'
                    // object : 'object'
                },
                true
            );
            part.setContents(['number']);
            break;
        case '%var':
            part = new InputSlotMorph(
                null,
                false,
                'getVarNamesDict',
                true
            );
            part.isStatic = true;
            break;
        case '%lst':
            part = new InputSlotMorph(
                null,
                false,
                {
                    list1 : 'list1',
                    list2 : 'list2',
                    list3 : 'list3'
                },
                true
            );
            break;
        case '%l':
            part = new ArgMorph('list');
            break;
        case '%b':
        case '%boolUE':
            part = new BooleanSlotMorph(null, true);
            break;
        case '%cmd':
            part = new CommandSlotMorph();
            break;
        case '%rc':
            part = new RingCommandSlotMorph();
            part.isStatic = true;
            break;
        case '%rr':
            part = new RingReporterSlotMorph();
            part.isStatic = true;
            break;
        case '%rp':
            part = new RingReporterSlotMorph(true);
            part.isStatic = true;
            break;
        case '%c':
            part = new CSlotMorph();
            part.isStatic = true;
            break;
        case '%cs':
            part = new CSlotMorph(); // non-static
            break;
        case '%clr':
            part = new ColorSlotMorph();
            part.isStatic = true;
            break;
        case '%t':
            part = new TemplateSlotMorph('a');
            break;
        case '%upvar':
            part = new TemplateSlotMorph('\u2191'); // up-arrow
            break;
        case '%f':
            part = new FunctionSlotMorph();
            break;
        case '%r':
            part = new ReporterSlotMorph();
            break;
        case '%p':
            part = new ReporterSlotMorph(true);
            break;

    // symbols:

        case '%turtle':
            part = new SymbolMorph('turtle');
            part.size = this.fontSize * 1.2;
            part.color = new Color(255, 255, 255);
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%turtleOutline':
            part = new SymbolMorph('turtleOutline');
            part.size = this.fontSize;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%clockwise':
            part = new SymbolMorph('turnRight');
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%counterclockwise':
            part = new SymbolMorph('turnLeft');
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%greenflag':
            part = new SymbolMorph('flag');
            part.size = this.fontSize * 1.5;
            part.color = new Color(0, 200, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%stop':
            part = new SymbolMorph('octagon');
            part.size = this.fontSize * 1.5;
            part.color = new Color(200, 0, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        // a placeholder dropdown block for when it is snapped
        case '%schema':
            part = new InputSlotMorph(null, false, { });
            break;
        // slot that allows multiple dropdown blocks to be set
        case '%ms':
            part = new MultiArgMorph('%f', null, 1);
            part.isStatic = true;
            break;
        case '%oj':
            part = new InputSlotMorph(
                null,
                true,
                {
                    'left' : 'left',
                    'right' : 'right',
                    'full' : 'full'
                }
            );
            part.setContents('left');
            break;
        case '%agfun':
            part = new InputSlotMorph(
                null,
                true,
                {
                    'countall' : 'count *',
                    'count' : 'count',
                    'avg' : 'avg',
                    'max' : 'max',
                    'min' : 'min',
                    'sum' : 'sum'
                }
            );
            part.setContents('count *');
            break;
        case '%customData':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '' : '',
                }
            );
            part.setContents('');
            break;
        default:
            // nop();
        }
    } else {
        part = new StringMorph(spec);
        part.fontName = this.labelFontName;
        part.fontStyle = this.labelFontStyle;
        part.fontSize = this.fontSize;
        part.color = new Color(255, 255, 255);
        part.isBold = true;
        part.shadowColor = this.color.darker(this.labelContrast);
        part.shadowOffset = this.embossing;
        part.drawNew();
    }
    return part;
};
// CommandBlockMorph inherits from BlockMorph:

CommandBlockMorph.prototype = new BlockMorph();
CommandBlockMorph.prototype.constructor = CommandBlockMorph;
CommandBlockMorph.uber = BlockMorph.prototype;

// CommandBlockMorph instance creation:
/** Creates a command block
* file - the name of a dataset
*/
function CommandBlockMorph(file) {
    // isData is a flag used for various procedures throughout
    // the program.
    if(file == null) { 
       this.isData = false;
       this.init(); 
    } else if(this.selector === "customData") {
       this.isData = true;
       this.init();
    } else {
       this.isData = true;
       this.init();
       this.load(file)
    }
}

CommandBlockMorph.prototype.init = function () {
    CommandBlockMorph.uber.init.call(this);
    this.setExtent(new Point(200, 100));
    //The following are initialzed so that every command block has
    // these variables
    this.dataIn = '';
    this.dataOut = '';
    this.schemaIn = '';
    this.schemaOut = '';
    
    //for relation algebra
    this.codeIn = '';
    this.codeOut = '';
};

// CommandBlockMorph enumerating:

CommandBlockMorph.prototype.blockSequence = function () {
    var nb = this.nextBlock(),
        result = [this];
    if (nb) {
        result = result.concat(nb.blockSequence());
    }
    return result;
};

CommandBlockMorph.prototype.bottomBlock = function () {
    // topBlock() also exists - inherited from SyntaxElementMorph
    if (this.nextBlock()) {
        return this.nextBlock().bottomBlock();
    }
    return this;
};

CommandBlockMorph.prototype.nextBlock = function (block) {
    // set / get the block attached to my bottom
    if (block) {
        var nb = this.nextBlock(),
            affected = this.parentThatIsA(CommandSlotMorph);
        this.add(block);
        if (nb) {
            block.bottomBlock().nextBlock(nb);
        }
        this.fixLayout();
        if (affected) {
            affected.fixLayout();
        }
    } else {
        return detect(
            this.children,
            function (child) {
                return child instanceof CommandBlockMorph
                    && !child.isPrototype;
            }
        );
    }
};

// CommandBlockMorph attach targets:

CommandBlockMorph.prototype.topAttachPoint = function () {
    return new Point(
        this.dentCenter(),
        this.top()
    );
};

CommandBlockMorph.prototype.bottomAttachPoint = function () {
    return new Point(
        this.dentCenter(),
        this.bottom()
    );
};

CommandBlockMorph.prototype.dentLeft = function () {
    return this.left()
        + this.corner
        + this.inset;
};

CommandBlockMorph.prototype.dentCenter = function () {
    return this.dentLeft()
        + this.corner
        + (this.dent * 0.5);
};

CommandBlockMorph.prototype.attachTargets = function () {
    var answer = [];
    if (!(this instanceof HatBlockMorph)) {
        if (!(this.parent instanceof SyntaxElementMorph)) {
            answer.push({
                point: this.topAttachPoint(),
                element: this,
                loc: 'top',
                type: 'block'
            });
        }
    }
    if (!this.isStop()) {
        answer.push({
            point: this.bottomAttachPoint(),
            element: this,
            loc: 'bottom',
            type: 'block'
        });
    }
    return answer;
};

CommandBlockMorph.prototype.allAttachTargets = function (newParent) {
    var myself = this,
        target = newParent || this.parent,
        answer = [],
        topBlocks;

    topBlocks = target.children.filter(function (child) {
        return (child !== myself) &&
            child instanceof SyntaxElementMorph &&
            !child.isTemplate;
    });
    topBlocks.forEach(function (block) {
        block.forAllChildren(function (child) {
            if (child.attachTargets) {
                child.attachTargets().forEach(function (at) {
                    answer.push(at);
                });
            }
        });
    });
    return answer;
};

CommandBlockMorph.prototype.closestAttachTarget = function (newParent) {
    var target = newParent || this.parent,
        bottomBlock = this.bottomBlock(),
        answer = null,
        thresh = Math.max(
            this.corner * 2 + this.dent,
            this.minSnapDistance
        ),
        dist,
        ref = [],
        minDist = 1000;

    if (!(this instanceof HatBlockMorph)) {
        ref.push(
            {
                point: this.topAttachPoint(),
                loc: 'top'
            }
        );
    }
    if (!this.isStop()) {
        ref.push(
            {
                point: bottomBlock.bottomAttachPoint(),
                loc: 'bottom'
            }
        );
    }

    this.allAttachTargets(target).forEach(function (eachTarget) {
        ref.forEach(function (eachRef) {
            if (eachRef.loc !== eachTarget.loc) {
                dist = eachRef.point.distanceTo(eachTarget.point);
                if ((dist < thresh) && (dist < minDist)) {
                    minDist = dist;
                    answer = eachTarget;
                }
            }
        });
    });
    return answer;
};

CommandBlockMorph.prototype.snap = function () {
    var target = this.closestAttachTarget(),
        next,
        offsetY,
        affected;

    if (target === null) {
        this.startLayout();
        this.fixBlockColor();
        this.endLayout();
        CommandBlockMorph.uber.snap.call(this); // align stuck comments
        return;
    }
    this.startLayout();
    if (target.loc === 'bottom') {
        if (target.type === 'slot') {
            this.removeHighlight();
            target.element.nestedBlock(this);
        } else {
            target.element.nextBlock(this);
        }
        if (this.isStop()) {
            next = this.nextBlock();
            if (next) {
                this.parentThatIsA(ScriptsMorph).add(next);
                next.moveBy(this.extent().floorDivideBy(2));
                affected = this.parentThatIsA(CommandSlotMorph);
                if (affected) {
                    affected.fixLayout();
                }
            }
        }
        // sets schema/data in/out when snapped
        this.setRelation();
        
    } else if (target.loc === 'top') {
        target.element.removeHighlight();
        offsetY = this.bottomBlock().bottom() - this.bottom();
        this.setBottom(target.element.top() + this.corner - offsetY);
        this.setLeft(target.element.left());
        this.bottomBlock().nextBlock(target.element);
    }
    this.fixBlockColor();
    this.endLayout();
    CommandBlockMorph.uber.snap.call(this); // align stuck comments
    if (this.snapSound) {
        this.snapSound.play();
    }
};

CommandBlockMorph.prototype.isStop = function () {
    return ([
        'doStop',
        'doStopBlock',
        'doStopAll',
        'doForever',
        'doReport',
        'removeClone'
    ].indexOf(this.selector) > -1);
};

// CommandBlockMorph deleting

CommandBlockMorph.prototype.userDestroy = function () {
    var cslot = this.parentThatIsA(CSlotMorph);
    this.destroy();
    if (cslot) {
        cslot.fixLayout();
    }
};

// CommandBlockMorph drawing:

CommandBlockMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    // draw the 'flat' shape:
    this.drawTop(context);
    this.drawBody(context);
    this.drawBottom(context);

    // add 3D-Effect:
    this.drawTopDentEdge(context, 0, 0);
    this.drawBottomDentEdge(context, 0, this.height() - this.corner);
    this.drawLeftEdge(context);
    this.drawRightEdge(context);
    this.drawTopLeftEdge(context);
    this.drawBottomRightEdge(context);

    // erase CommandSlots
    this.eraseHoles(context);
};

CommandBlockMorph.prototype.drawBody = function (context) {
    context.fillRect(
        0,
        Math.floor(this.corner),
        this.width(),
        this.height() - Math.floor(this.corner * 3) + 1
    );
};

CommandBlockMorph.prototype.drawTop = function (context) {
    context.beginPath();

    // top left:
    context.arc(
        this.corner,
        this.corner,
        this.corner,
        radians(-180),
        radians(-90),
        false
    );

    // dent:
    this.drawDent(context, 0, 0);

    // top right:
    context.arc(
        this.width() - this.corner,
        this.corner,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    context.closePath();
    context.fill();
};

CommandBlockMorph.prototype.drawBottom = function (context) {
    var y = this.height() - (this.corner * 2);

    context.beginPath();

    // bottom left:
    context.arc(
        this.corner,
        y,
        this.corner,
        radians(180),
        radians(90),
        true
    );

    if (!this.isStop()) {
        this.drawDent(context, 0, this.height() - this.corner);
    }

    // bottom right:
    context.arc(
        this.width() - this.corner,
        y,
        this.corner,
        radians(90),
        radians(0),
        true
    );

    context.closePath();
    context.fill();
};

CommandBlockMorph.prototype.drawDent = function (context, x, y) {
    var indent = x + this.corner * 2 + this.inset;

    context.lineTo(x + this.corner + this.inset, y);
    context.lineTo(indent, y + this.corner);
    context.lineTo(indent + this.dent, y + this.corner);
    context.lineTo(x + this.corner * 3 + this.inset + this.dent, y);
    context.lineTo(this.width() - this.corner, y);
};

CommandBlockMorph.prototype.drawTopDentEdge = function (context, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        leftGradient,
        lgx;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    upperGradient = context.createLinearGradient(
        0,
        y,
        0,
        y + this.edge
    );
    upperGradient.addColorStop(0, this.cachedClrBright);
    upperGradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(this.corner, y + shift);
    context.lineTo(x + this.corner + this.inset, y + shift);
    context.stroke();

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(
        x + this.corner * 3 + this.inset + this.dent + shift,
        y + shift
    );
    context.lineTo(this.width() - this.corner, y + shift);
    context.stroke();

    lgx = x + this.corner + this.inset;
    leftGradient = context.createLinearGradient(
        lgx - this.edge,
        y + this.edge,
        lgx,
        y
    );
    leftGradient.addColorStop(0, this.cachedClr);
    leftGradient.addColorStop(1, this.cachedClrBright);

    context.strokeStyle = leftGradient;
    context.beginPath();
    context.moveTo(x + this.corner + this.inset, y + shift);
    context.lineTo(indent, y + this.corner + shift);
    context.stroke();

    lowerGradient = context.createLinearGradient(
        0,
        y + this.corner,
        0,
        y + this.corner + this.edge
    );
    lowerGradient.addColorStop(0, this.cachedClrBright);
    lowerGradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = lowerGradient;
    context.beginPath();
    context.moveTo(indent, y + this.corner + shift);
    context.lineTo(indent + this.dent, y + this.corner + shift);
    context.stroke();
};

CommandBlockMorph.prototype.drawBottomDentEdge = function (context, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        rightGradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    upperGradient = context.createLinearGradient(
        0,
        y - this.edge,
        0,
        y
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(this.corner, y - shift);
    if (this.isStop()) {
        context.lineTo(this.width() - this.corner, y - shift);
    } else {
        context.lineTo(x + this.corner + this.inset - shift, y - shift);
    }
    context.stroke();

    if (this.isStop()) {    // draw straight bottom edge
        return null;
    }

    lowerGradient = context.createLinearGradient(
        0,
        y + this.corner - this.edge,
        0,
        y + this.corner
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = lowerGradient;
    context.beginPath();
    context.moveTo(indent + shift, y + this.corner - shift);
    context.lineTo(indent + this.dent, y + this.corner - shift);
    context.stroke();

    rightGradient = context.createLinearGradient(
        x + indent + this.dent - this.edge,
        y + this.corner - this.edge,
        x + indent + this.dent,
        y + this.corner
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = rightGradient;
    context.beginPath();
    context.moveTo(x + indent + this.dent, y + this.corner - shift);
    context.lineTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    context.stroke();

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    context.lineTo(this.width() - this.corner, y - shift);
    context.stroke();
};

CommandBlockMorph.prototype.drawLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient = context.createLinearGradient(0, 0, this.edge, 0);

    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, this.corner);
    context.lineTo(shift, this.height() - this.corner * 2 - shift);
    context.stroke();
};

CommandBlockMorph.prototype.drawRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.width(),
        gradient;

    gradient = context.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(x - shift, this.corner + shift);
    context.lineTo(x - shift, this.height() - this.corner * 2);
    context.stroke();
};

CommandBlockMorph.prototype.drawTopLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient;

    gradient = context.createRadialGradient(
        this.corner,
        this.corner,
        this.corner,
        this.corner,
        this.corner,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(
        this.corner,
        this.corner,
        this.corner - shift,
        radians(-180),
        radians(-90),
        false
    );
    context.stroke();
};

CommandBlockMorph.prototype.drawBottomRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.width() - this.corner,
        y = this.height() - this.corner * 2,
        gradient;

    gradient = context.createRadialGradient(
        x,
        y,
        this.corner,
        x,
        y,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(
        x,
        y,
        this.corner - shift,
        radians(90),
        radians(0),
        true
    );
    context.stroke();
};

/** This file loads the data from the datasets.js file to
* a specific dataset block
* file - the name of the dataset to be loaded
*/
CommandBlockMorph.prototype.load = function(file) {    
    this.schema = window["data_" + file + "_schema"];
    this.data = window["data_" + file + "_data"];

    this.schemaOut = this.schema;
    this.dataOut = this.data;
};

/**This function defines how the relational algebra blocks
* are executed. 
*/
CommandBlockMorph.prototype.execute = function() {
    this.setRelation();
    if (this.selector == "select") {
    //Process for a select
        if (this.children[1] instanceof ReporterBlockMorph) {
            // specific case for ReportAnd
            if(this.children[1].selector == "reportAnd") {
                var child = this.children[1];
                var left = getItem(child.children[1]);
                var mid = getItem(child.children[2]);
                var right = getItem(child.children[3]);

            } else {
                var child = this.children[1];
                var left = getItem(child.children[0]);
                var mid = getItem(child.children[1]);
                var right = getItem(child.children[2]);
            }

            // checks arguments types and arguments
            if (checkArgs(left, mid, right)) {
                if (checkTypes(left, mid, right, this.dataIn, this.schemaIn)) {
                    this.dataOut = [];
                    // go through the rows and push acceptable rows into dataOut
                    for (var i = 0; i < this.dataIn.length; i++) {
                        if (child.execute(left, mid, right, this.dataIn[i])) {
                            this.dataOut.push(this.dataIn[i]);
                        }
                    }
                }
            }
        }
        // display results
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaOut, this.dataOut, null, groupIndices);
    } else if (this.selector == "project") {
    //Process for a project
    // sets all columns to 0 except drop down's
        this.schemaOut = new Array(this.schemaIn.length);
        //for all children
            //if this children[x] is instanceof 
                //do the thing
        var projectThese = new Array();
        for(var i = 1; i < this.children[1].children.length; i++) {
            if (this.children[1].children[i] instanceof ReporterBlockMorph) {
                var input = this.children[1].children[i].children[0].evaluate();
                if (input != '') {
                    for(var j = 0; j < this.schemaIn.length; j++) {
                        if(this.schemaIn[j] != input && projectThese[j] != 1){
                            projectThese[j] = 0;
                        } else {
                            projectThese[j] = 1;
                        }
                    }
                }
            } else {
                var input = this.children[1].children[i].children[0].text;
                if (input != '') {
                    for(var j = 0; j < this.schemaIn.length; j++) {
                        if(this.schemaIn[j] != input && projectThese[j] != 1){
                            projectThese[j] = 0;
                        } else {
                            projectThese[j] = 1;
                        }
                    }
                }
            }
        }
        
        for(var i = 0; i < projectThese.length; i++) {
            if(projectThese[i] == 0) {
                this.schemaOut[i] = 0;
            }
            else if(projectThese[i] == 1) {
                this.schemaOut[i] = this.schemaIn[i];
            }
            else{}
        }
        // display results
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaOut, this.dataIn, null, groupIndices);
    } else if (this.selector == "rename") {
    //Process to rename a column
    this.schema = new Array();
        for (var t = 0; t < this.schemaIn.length; t++) {
            this.schema[t] = this.schemaIn[t];
        }
        
        var input = this.children[3].evaluate();
        
        if(input != ''){
            if(isIn(input, this.schemaIn)){
               alert("already exists");
            } else {
               var val;
               if( this.children[1].children[0] instanceof ReporterBlockMorph) {
                  val = this.children[1].children[0].evaluate();
               } else {
                  val = this.children[1].children[0].text;
               }
               
               this.schema[this.schemaIn.indexOf(val)] = input;
            }
        }
    this.schemaOut = this.schema;
        // display results
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaOut, this.dataIn, null, groupIndices);
    } else if (this.selector == "natural") {
    //Process to complete a natural join/////////////////////////////////////////////////////////////
        this.canJoin = false;            //Conditional Variable
        this.compA = new Array();        //Column number for comparison point in the first dataset
        this.compB = new Array();        //Column number for comparison point in the second dataset
        this.joinSchema = new Array();   //New array for the post join schema
        this.joinData = new Array();     //New array for the post join data
        
        //The sequence of blocks in the top c slot of the join block
        this.topBlocks = this.children[0].children[0].blockSequence();
        //The sequence of blocks in the bottom c slot of the join block
        this.bottomBlocks = this.children[3].children[0].blockSequence();
        
        //Execute the top series of blocks and placing the end result in the this.schemIn and this.dataIn 
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }
        
        //Execute the bottom series of blocks and placing the end result in the this.schemaOut and this.dataOut 
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        
        //Find the column name(s) that is/are the same
        var position = 0;
        for(var k = 0; k < this.schemaIn.length; k++) {
            if(isIn(this.schemaIn[k], this.schemaOut)) {
                this.compA[position] = k;
                this.compB[position] = isInPosition(this.schemaIn[k], this.schemaOut);
                this.canJoin = true;
                position++;
            }
        }
        
        //Executes the Join if applicable
        if(this.canJoin) {
            var index = 0;
            //Creates the new schema for the join
            for(var u = 0; u < this.schemaIn.length; u++) {
                this.joinSchema[u] = this.schemaIn[u];
            }
            for(var v = 0; v < this.schemaOut.length; v++) {
                //Places a 0 so when the table is displayed the
                // in common column will not be displayed
                if(isIn(v, this.compB)) {
                    this.joinSchema[u + v] = 0;
                } else {
                    this.joinSchema[u + v] = this.schemaOut[v];
                }
            }
            //Creates the data for the join
            for(var p = 0; p < Math.min(this.dataIn.length, this.dataOut.length); p++) {
                var count = 0;
                for(var que = 0; que < this.compA.length; que++) {
                    var a = this.dataIn[p][this.compA[que]];
                    var b = this.dataOut[p][this.compB[que]];
                    if(a == b) {
                        count++; 
                    }
                }
                if(count == this.compA.length) {
                    this.joinData[index] = new Array();
                    for(var u = 0; u < this.schemaIn.length; u++) {
                        this.joinData[index][u] = this.dataIn[p][u];
                    }
                    for(var v = 0; v < this.schemaOut.length; v++) {
                        this.joinData[index][u + v] = this.dataOut[p][v];
                    }
                    index++;
                }
            }
            this.schemaOut = this.joinSchema;
            this.dataOut = this.joinData;
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.joinSchema, this.joinData, null, groupIndices);
        } else {
            alert('Error: Natural Join Invalid');
        }
    } else if (this.selector == "theta") {
        this.joinSchema = new Array();   //New array for the post join schema
        this.joinData = new Array();     //New array for the post join data
        var indexTheta = 0;                 //Variable for position in join array
        
        this.topBlocks = this.children[0].children[0].blockSequence();
        this.bottomBlocks = this.children[5].children[0].blockSequence();
        
        //Get the data from the top set of blocks
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }
        
        //Get the data from the bottom set of blocks
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        
        //Create the new schema for the join
        for(var x = 0; x < this.schemaIn.length; x++) {
            this.joinSchema[x] = this.schemaIn[x];
        }
        for(var y = 0; y < this.schemaOut.length; y++) {
            this.joinSchema[x + y] = this.schemaOut[y];
        }
        
        if (this.children[4] instanceof ReporterBlockMorph) {
            // specific case for ReportAnd
            if(this.children[4].selector == "reportAnd") {
                var child = this.children[4];
                var left = getItem(child.children[1]);
                var mid = getItem(child.children[2]);
                var right = getItem(child.children[3]);

            } else {
                var child = this.children[4];
                var left = getItem(child.children[0]);
                var mid = getItem(child.children[1]);
                var right = getItem(child.children[2]);
            }

            // checks arguments types and arguments
            if (checkArgs(left, mid, right)) {
                if (checkTypesDual(left, mid, right, this.dataIn, this.schemaIn, this.dataOut, this.schemaOut)) {
                    for (var i = 0; i < this.dataIn.length; i++) {
                        for (var j = 0; j < this.dataOut.length; j++) {
                            if (child.execute(left, mid, right, this.dataIn[i], this.dataOut[j],this.schemaIn, this.schemaOut)) {
                                //Create a new array in the indexTheta position
                                this.joinData[indexTheta] = new Array();
                                for(var u = 0; u < this.schemaIn.length; u++) {
                                    this.joinData[indexTheta][u] = this.dataIn[i][u];
                                }
                                for(var v = 0; v < this.schemaOut.length; v++) {
                                    this.joinData[indexTheta][u + v] = this.dataOut[j][v];
                                }
                                indexTheta++;
                            }
                        }
                    }
                }
            }
        }
    
        this.schemaOut = this.joinSchema;
        this.dataOut = this.joinData;
        
        // display results
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.joinSchema, this.joinData, null, groupIndices);
        
    } else if (this.selector == "outer") {
        this.joinSchema = new Array();   //New array for the post join schema
        this.joinData = new Array();     //New array for the post join data
        var indexOuter = 0;                 //Variable for position in join array
            
        this.topBlocks = this.children[0].children[0].blockSequence();
        this.bottomBlocks = this.children[5].children[0].blockSequence();
        
        //Get the data from the top set of blocks
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }
        
        //Get the data from the bottom set of blocks
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        
        //Create the new schema for the join
        for(var x = 0; x < this.schemaIn.length; x++) {
            this.joinSchema[x] = this.schemaIn[x];
        }
        for(var y = 0; y < this.schemaOut.length; y++) {
            this.joinSchema[x + y] = this.schemaOut[y];
        }
        
        if (this.children[4] instanceof ReporterBlockMorph) {
            // specific case for ReportAnd
            if(this.children[4].selector == "reportAnd") {
                var child = this.children[4];
                var left = getItem(child.children[1]);
                var mid = getItem(child.children[2]);
                var right = getItem(child.children[3]);

            } else {
                var child = this.children[4];
                var left = getItem(child.children[0]);
                var mid = getItem(child.children[1]);
                var right = getItem(child.children[2]);
            }

            this.rowUsed = new Array(this.dataOut.length);         //New array to keep track of which rows of the inner loop data set are used
            var joinType = this.children[3].children[0].text;     //Variable for which type of outer join to complete
            
            // checks arguments types and arguments
            if (checkArgs(left, mid, right)) {
                if (checkTypesDual(left, mid, right, this.dataIn, this.schemaIn, this.dataOut, this.schemaOut)) {
                    for (var i = 0; i < this.dataIn.length; i++) {
                        var noJoin = true;
                        for (var j = 0; j < this.dataOut.length; j++) {
                            if (child.execute(left, mid, right, this.dataIn[i], this.dataOut[j],this.schemaIn, this.schemaOut)) {
                                //Create a new array in the indexTheta position
                                this.joinData[indexOuter] = new Array();
                                for(var u = 0; u < this.schemaIn.length; u++) {
                                    this.joinData[indexOuter][u] = this.dataIn[i][u];
                                }
                                for(var v = 0; v < this.schemaOut.length; v++) {
                                    this.joinData[indexOuter][u + v] = this.dataOut[j][v];
                                }
                                this.rowUsed[j] = true;
                                noJoin = false;
                                indexOuter++;
                            }
                        }
                        if(noJoin && (joinType == "left" || joinType == "full")) {
                            this.joinData[indexOuter] = new Array();
                            for(var u = 0; u < this.schemaIn.length; u++) {
                                this.joinData[indexOuter][u] = this.dataIn[i][u];
                            }
                            for(var v = 0; v < this.schemaOut.length; v++) {
                                this.joinData[indexOuter][u + v] = "NULL";
                            }
                            indexOuter++;
                        }
                    }
                    for (var g = 0; g < this.rowUsed.length; g++) {
                        if(!this.rowUsed[g] && (joinType == "right" || joinType == "full")) {
                            this.joinData[indexOuter] = new Array();
                            for(var u = 0; u < this.schemaIn.length; u++) {
                                this.joinData[indexOuter][u] = "NULL";
                            }
                            for(var v = 0; v < this.schemaOut.length; v++) {
                                this.joinData[indexOuter][u + v] = this.dataOut[g][v];
                            }
                            indexOuter++;
                        }
                    }
                }
            }
        }
    
        this.schemaOut = this.joinSchema;
        this.dataOut = this.joinData;
        
        // display results
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.joinSchema, this.joinData, null, groupIndices);
    } else if (this.selector == "union") {
        this.setData = new Array();     //New array for the post set data

        this.topBlocks = this.children[0].children[0].blockSequence();
        this.bottomBlocks = this.children[2].children[0].blockSequence();
        
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }    
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        if(this.schemaIn.length == this.schemaOut.length) {
            this.setData = setOps(this.selector, this.dataIn, this.dataOut);
        }
        this.schemaOut = this.schemaIn;
        this.dataOut = this.setData;
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaIn, this.setData, null, groupIndices);
    } else if (this.selector == "intersect") {
        this.setData = new Array();     //New array for the post set data

        this.topBlocks = this.children[0].children[0].blockSequence();
        this.bottomBlocks = this.children[2].children[0].blockSequence();
        
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }    
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        if(this.schemaIn.length == this.schemaOut.length) {
            this.setData = setOps(this.selector, this.dataIn, this.dataOut);
        }
        this.schemaOut = this.schemaIn;
        this.dataOut = this.setData;
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaIn, this.setData, null, groupIndices);
    } else if (this.selector == "difference") {
        this.setData = new Array();     //New array for the post set data

        this.topBlocks = this.children[0].children[0].blockSequence();
        this.bottomBlocks = this.children[2].children[0].blockSequence();
        
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }    
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        if(this.schemaIn.length == this.schemaOut.length) {
            this.setData = setOps(this.selector, this.dataIn, this.dataOut);
        }
        this.schemaOut = this.schemaIn;
        this.dataOut = this.setData;
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaIn, this.setData, null, groupIndices);
    } else if (this.selector == "cartesian") {
        this.cartProdSchema = new Array();   //New array for the post product schema
        this.cartProdData = new Array();     //New array for the post product data
        
        //The sequence of blocks in the top c slot of the product block
        this.topBlocks = this.children[0].children[0].blockSequence();
        //The sequence of blocks in the bottom c slot of the product block
        this.bottomBlocks = this.children[2].children[0].blockSequence();
        
        //Execute the top series of blocks and placing the end result in the this.schemIn and this.dataIn 
        for(var i = 0; i < this.topBlocks.length; i++) {
            this.topBlocks[i].execute();
            this.schemaIn = this.topBlocks[i].schemaOut;
            this.dataIn = this.topBlocks[i].dataOut;
        }
        
        //Execute the bottom series of blocks and placing the end result in the this.schemaOut and this.dataOut 
        for(var j = 0; j < this.bottomBlocks.length; j++) {
            this.bottomBlocks[j].execute();
            this.schemaOut = this.bottomBlocks[j].schemaOut;
            this.dataOut = this.bottomBlocks[j].dataOut;
        }
        var index = 0;
        //Creates the new schema for the product
        for(var u = 0; u < this.schemaIn.length; u++) {
            this.cartProdSchema[u] = this.schemaIn[u];
        }
        for(var v = 0; v < this.schemaOut.length; v++) {
            this.cartProdSchema[u + v] = this.schemaOut[v];
        }
        //Creates the data for the product
        for(var p = 0; p < this.dataIn.length; p++) {
            for(var q = 0; q < this.dataOut.length; q++) {
                this.cartProdData[index] = new Array();
                for(var u = 0; u < this.schemaIn.length; u++) {
                    this.cartProdData[index][u] = this.dataIn[p][u];
                }
                for(var v = 0; v < this.schemaOut.length; v++) {
                    this.cartProdData[index][u + v] = this.dataOut[q][v];
                }
                index++;
            }
        }
        this.schemaOut = this.cartProdSchema;
        this.dataOut = this.cartProdData;
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.cartProdSchema, this.cartProdData, null, groupIndices);

    } else if (this.selector == "dupElim") {
        var columns = new Array();
        for(var i = 0; i < this.schemaIn.length; i++) {
            columns.push(i);
        }
    
        this.dataOut = sortMultiple(this.dataIn, columns);
        this.dataOut = dupElim(this.dataOut);
        this.schemaOut = this.schemaIn;
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaOut, this.dataOut, limit);    
    
    } else if (this.selector == "limit") {
        var limit = this.children[1].children[0].text;
        
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
            
        alertContents(this.schemaOut, this.dataOut, limit, groupIndices);    
    
    } else if (this.selector == "order") {
        var columns = new Array();
        for(var i = 0; i < this.children[2].children.length; i++) {
        
            if (this.children[2].children[i] instanceof ReporterBlockMorph) {
                var input = this.children[2].children[i].children[0].children[0].text;
                
                if (input != '') {
                    columns.push(isInPosition(input, this.schemaIn));
                }
            }
            
            if (this.children[2].children[i] instanceof InputSlotMorph) {
                var input = this.children[2].children[i].children[0].text;
                
                if (input != '') {
                    columns.push(isInPosition(input, this.schemaIn));
                }
            }
            
        }
        
        this.dataOut = sortDataset(this.dataIn, columns);
        var groupIndices;
        if(this.groupColumns != null)
            groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaOut, this.dataOut, limit, groupIndices);
        
    } else if (this.selector == "group") {
        var columns = new Array();
        for(var i = 0; i < this.children[2].children.length; i++) {
        
            if (this.children[2].children[i] instanceof ReporterBlockMorph) {
                var input = this.children[2].children[i].children[0].children[0].text;
                
                if (input != '') {
                    columns.push(isInPosition(input, this.schemaIn));
                }
            }
            
            if (this.children[2].children[i] instanceof InputSlotMorph) {
                var input = this.children[2].children[i].children[0].text;
                
                if (input != '') {
                    columns.push(isInPosition(input, this.schemaIn));
                }
            }
        }
        
        this.dataOut = sortDataset(this.dataIn, columns);
        this.groupColumns = columns;
        var groupIndices = getGroupIndices(this.dataOut, this.groupColumns);
        alertContents(this.schemaOut, this.dataOut, limit, groupIndices);
        
    } else if (this.selector == "agg") {    
        var dataArray;
        var schemaAgg = new Array();
        var dataAgg = new Array();
        var columns = new Array();
        var fun = new Array();
		//Get the functions
        for (var i = 1; i < this.children[1].children.length; i++) {
            var input = this.children[1].children[i].children[0].text;
            if (input != '' && input != undefined) {
                fun.push(input);
            }
        }
		//Get the columns
        for (var i = 0; i < this.children[2].children.length; i++) {
            
            if (this.children[2].children[i] instanceof ReporterBlockMorph) {
                var input = this.children[2].children[i].children[0].children[0].text;
                
                if (input != '') {
                    columns.push(input);
                }
            }
            
            if (this.children[2].children[i] instanceof InputSlotMorph) {
                var input = this.children[2].children[i].children[0].text;
                
                if (input != '') {
                    columns.push(input);
                }
            }
        }
        if (this.groupColumns == null) {
            //Returns the schema, data and a function count in one array
            dataArray = aggrFuns(this.schemaIn, this.dataIn, fun, columns, this.groupColumns);
            dataAgg[0] = new Array();
            //Breaks the single array into schema and data for non grouped data
            for (var range = 0; range < dataArray.length; range++) {
                if(range < fun.length) {
                    schemaAgg[range] = dataArray[range];
                }
                else {
                    dataAgg[0][range - fun.length] = dataArray[range];
                }
            }
        } else {
            var groupIndices = getGroupIndices(this.dataIn, this.groupColumns);
            //Return the schema and data of the grouped and aggregated data
            dataArray = aggrGroups(this.schemaIn, this.dataIn, fun, columns, this.groupColumns, groupIndices);
            
            //var len = fun.length + this.groupColumns.length;
            //Get the new schema
            for (var l = 0; l < dataArray[0].length; l++) {
                schemaAgg[l] = dataArray[0][l];
            }
            //Get the new data
            for (var h = 0; h < (dataArray.length - 1); h++) {
                dataAgg[h] = new Array();
                for (var g = 0; g < dataArray[h].length; g++) {
                        dataAgg[h][g] = dataArray[h + 1][g];
                }
            }
        
        }
        this.schemaOut = schemaAgg;
        this.dataOut = dataAgg;
        this.groupColumns = null;
        alertContents(this.schemaOut, this.dataOut, null, null);
    }
};

// When a command block is clicked, it will display the data in the table
CommandBlockMorph.prototype.mouseClickLeft = function() {
    if(this.selector === "customData") {
       var text = this.children[0].children[0].text;
       this.schema = getCustomSchema(text);
       this.data = getCustomData(text);
       alertContents(this.schema, this.data, null, null);
    } else if(this.isData) {
       alertContents(this.schema, this.data, null, null);
       this.setRelation();
    } else {
       this.execute();
    }
    this.executeAlgebra();
};

// Method to bring in and push out schema and data from datasets
CommandBlockMorph.prototype.setRelation = function() {
    
    if(this.selector === "customData") {
        this.schemaOut = getCustomSchema( this.children[0].children[0].text );
        this.dataOut = getCustomData( this.children[0].children[0].text );
    } else if(this.isData) {
        this.schemaOut = this.schema;
        this.dataOut = this.data;
    } else {        
        this.schemaIn = this.parent.schemaOut;
        this.dataIn = this.parent.dataOut;
        this.schemaOut = this.parent.schemaOut;
        this.dataOut = this.parent.dataOut;
        this.groupColumns = this.parent.groupColumns;
        //for all children
            //if multiargmorph
                //child.schemaIn = blah
        for(var i = 0; i < this.children.length; i++) {
            if(this.children[i] instanceof MultiArgMorph) {
                this.children[i].schemaIn = this.schemaIn;
                this.children[i].dataIn = this.dataIn;
                this.children[i].schemaOut = this.schemaOut;
                this.children[i].dataOut = this.dataOut;
            }
        }
    }
};

// ReporterBlockMorph //////////////////////////////////////////////////

/*
    I am a block with a return value, either round-ish or diamond shaped
    I inherit all my important accessors from BlockMorph
*/

// ReporterBlockMorph inherits from BlockMorph:

ReporterBlockMorph.prototype = new BlockMorph();
ReporterBlockMorph.prototype.constructor = ReporterBlockMorph;
ReporterBlockMorph.uber = BlockMorph.prototype;

// ReporterBlockMorph instance creation:

function ReporterBlockMorph(isPredicate, isDropDown) {
        this.init(isPredicate, isDropDown);
}

ReporterBlockMorph.prototype.init = function (isPredicate, isDropDown) {
    ReporterBlockMorph.uber.init.call(this);
    this.isPredicate = isPredicate || false;
    this.isDropDown = isDropDown || false;
    this.setExtent(new Point(200, 80));
};

// ReporterBlockMorph drag & drop:

ReporterBlockMorph.prototype.snap = function (hand) {
    // passing the hand is optional (for when blocks are dragged & dropped)
    if (!this.parent instanceof ScriptsMorph) {
        return null;
    }

    var target = this.parent.closestInput(this, hand);

    if (target !== null) {
        target.parent.replaceInput(target, this);
        if (this.snapSound) {
            this.snapSound.play();
        }
    }
    this.startLayout();
    this.fixBlockColor();
    this.endLayout();
    // set the schema/data of the block
    // if this block is a dropdown, populate the list
    this.setRelation();
    if(this.isDropDown) {
        this.populateList();
    }
    ReporterBlockMorph.uber.snap.call(this);
};

ReporterBlockMorph.prototype.prepareToBeGrabbed = function (handMorph) {
    var oldPos = this.position();

    nop(handMorph);
    if ((this.parent instanceof BlockMorph)
            || (this.parent instanceof MultiArgMorph)
            || (this.parent instanceof ReporterSlotMorph)) {
        this.parent.revertToDefaultInput(this);
        this.setPosition(oldPos);
    }
    ReporterBlockMorph.uber.prepareToBeGrabbed.call(this, handMorph);
};

// ReporterBlockMorph enumerating

ReporterBlockMorph.prototype.blockSequence = function () {
    // reporters don't have a sequence, answer myself
    return this;
};

// ReporterBlockMorph evaluating

ReporterBlockMorph.prototype.isUnevaluated = function () {
/*
    answer whether my parent block's slot is designated to be of an
    'unevaluated' kind, denoting a spedial form
*/
    return contains(['%anyUE', '%boolUE', '%f'], this.getSlotSpec());
};

ReporterBlockMorph.prototype.isLocked = function () {
    // answer true if I can be exchanged by a dropped reporter
    return this.isStatic || (this.getSlotSpec() === '%t');
};

ReporterBlockMorph.prototype.getSlotSpec = function () {
    // answer the spec of the slot I'm in, if any
    var parts, idx;
    if (this.parent instanceof BlockMorph) {
        parts = this.parent.parts().filter(
            function (part) {
                return !(part instanceof BlockHighlightMorph);
            }
        );
        idx = parts.indexOf(this);
        if (idx !== -1) {
            if (this.parent.blockSpec) {
                return this.parseSpec(this.parent.blockSpec)[idx];
            }
        }
    }
    if (this.parent instanceof MultiArgMorph) {
        return this.parent.slotSpec;
    }
    if (this.parent instanceof TemplateSlotMorph) {
        return this.parent.getSpec();
    }
    return null;
};

// ReporterBlockMorph events

ReporterBlockMorph.prototype.mouseClickLeft = function (pos) {
    var isRing;
    if (this.parent instanceof BlockInputFragmentMorph) {
        return this.parent.mouseClickLeft();
    }
    if (this.parent instanceof TemplateSlotMorph) {
        isRing = this.parent.parent && this.parent.parent.parent &&
            this.parent.parent.parent instanceof RingMorph;
        new DialogBoxMorph(
            this,
            this.setSpec,
            this
        ).prompt(
            isRing ? "Input name" : "Script variable name",
            this.blockSpec,
            this.world()
        );
    } else {
        ReporterBlockMorph.uber.mouseClickLeft.call(this, pos);
    }
};

// ReporterBlockMorph deleting

ReporterBlockMorph.prototype.userDestroy = function () {
    this.prepareToBeGrabbed(); // restore default slot of parent block
    this.destroy();
};

ReporterBlockMorph.prototype.populateList = function() {
    if (this.schemaIn !== null) {
        var menu = [];
        for(var i = 0; i < this.schemaIn.length; i++){
            if(this.schemaIn[i] != 0){
              menu.push(this.schemaIn[i]);
            }
        }

        var part = new InputSlotMorph(null, false, menu);

        this.removeChild(this.children[0]);
        this.add(part);
        this.fixLayout();
    }
};

ReporterBlockMorph.prototype.setRelation = function () {
    if(this.parent.schemaIn !== null) {
        this.schemaIn = this.parent.schemaIn;
        this.dataIn = this.parent.dataIn;
    }
    else if(this.parent.parent.schemaIn !== null) {
        this.schemaIn = this.parent.parent.schemaIn;
        this.dataIn = this.parent.parent.dataIn;
    }
};

// ReporterBlockMorph drawing:

ReporterBlockMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    if (this.isPredicate) {
        this.drawDiamond(context);
    } else {
        this.drawRounded(context);
    }

    // erase CommandSlots
    this.eraseHoles(context);
};

ReporterBlockMorph.prototype.drawRounded = function (context) {
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        w = this.width(),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr;
    context.beginPath();

    // top left:
    context.arc(
        r,
        r,
        r,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    context.arc(
        w - r,
        r,
        r,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    context.arc(
        w - r,
        h - r,
        r,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    context.arc(
        r,
        h - r,
        r,
        radians(90),
        radians(180),
        false
    );

    context.closePath();
    context.fill();


    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottem left corner
    gradient = context.createRadialGradient(
        r,
        h - r,
        r - this.edge,
        r,
        h - r,
        r + this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    context.stroke();

    // top right corner
    gradient = context.createRadialGradient(
        w - r,
        r,
        r - this.edge,
        w - r,
        r,
        r + this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    context.stroke();

    // normal gradient edges

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, shift);
    context.lineTo(w - r + shift, shift);
    context.stroke();

    // top edge: left corner
    gradient = context.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    context.stroke();

    // bottom edge: right corner
    gradient = context.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, h - shift);
    context.lineTo(w - r + shift, h - shift);
    context.stroke();

    // left edge: straight vertical line
    gradient = context.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, r);
    context.lineTo(shift, h - r);
    context.stroke();

    // right edge: straight vertical line
    gradient = context.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, r + shift);
    context.lineTo(w - shift, h - r);
    context.stroke();

};

ReporterBlockMorph.prototype.drawDiamond = function (context) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = this.rounding,
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr;
    context.beginPath();

    context.moveTo(0, h2);
    context.lineTo(r, 0);
    context.lineTo(w - r, 0);
    context.lineTo(w, h2);
    context.lineTo(w - r, h);
    context.lineTo(r, h);

    context.closePath();
    context.fill();

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    gradient = context.createLinearGradient(
        -r,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, h - shift);
    context.closePath();
    context.stroke();

    // top right corner
    gradient = context.createLinearGradient(
        w - r,
        0,
        w + r,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, h2);
    context.lineTo(w - r, shift);
    context.closePath();
    context.stroke();

    // normal gradient edges
    // top edge: left corner
    gradient = context.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, shift);
    context.closePath();
    context.stroke();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r, shift);
    context.lineTo(w - r, shift);
    context.closePath();
    context.stroke();

    // bottom edge: right corner
    gradient = context.createLinearGradient(
        w - r,
        0,
        w,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - r, h - shift);
    context.lineTo(w - shift, h2);
    context.closePath();
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r + shift, h - shift);
    context.lineTo(w - r - shift, h - shift);
    context.closePath();
    context.stroke();
};

//Added method for ReporterBlockMorph -- Added to new code
ReporterBlockMorph.prototype.execute = function(left, mid, right, data, data2, schema, schema2) {
    // And/Or blocks will recursively call this statement until they do not reach another And/Or block

	// Conditional to handle the multi data functions
	if(data2 != null && schema != null && schema2 != null) {
		if(this.selector == "reportTrue") {
			return true;
		} else if(this.selector == "reportFalse") {
			return false;
		} else if (this.selector == "reportAnd") { 
			return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
			&& right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data2));
		} else if (this.selector == "reportOr") {
			return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
			|| right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data2));
		} else if (this.selector == "reportNot") {
			return (!mid.execute(getItem(mid.children[0]), getItem(mid.children[1]), getItem(mid.children[2]), data));
		} else if(this.selector == "reportIsNull") {
            if (isIn(left, this.schemaIn)){
                left = data[this.schemaIn.indexOf(left)];
            }
            return (left == '');
		} else if(this.selector == "reportIsNotNull") {
            if (isIn(left, this.schemaIn)){
                left = data[this.schemaIn.indexOf(left)];
            }
            return !(left == '');
		}
	  
		if (isIn(left, schema)){
			left = data[schema.indexOf(left)];
		}
		if (isIn(right, schema2)){
			right = data2[schema2.indexOf(right)];
		}
		// >, <, = will check if the data in rows are floats and convert them
		if (this.selector == "reportLessThan") {
			if(!isNaN(parseFloat(left))) {
				left = parseFloat(left);
			}
			if(!isNaN(parseFloat(right))) {
				right = parseFloat(right);
			}
			return (left < right);
		} else if (this.selector == "reportGreaterThan") {
			if(!isNaN(parseFloat(left))) {
				left = parseFloat(left);
			}
			if(!isNaN(parseFloat(right))) {
				right = parseFloat(right);
			}
			return (left > right);
		} else if (this.selector == "reportEquals") {
			if(!isNaN(parseFloat(left))) {
				left = parseFloat(left);
			}
			if(!isNaN(parseFloat(right))) {
				right = parseFloat(right);
			}
			if(left instanceof ReporterBlockMorph){
				left = left.toString();
			}
			if(right instanceof ReporterBlockMorph){
				right = right.toString();
			}
			
			return (left == right);
		}
	}
	// Single data functions
	else {
		if(this.selector == "reportTrue") {
			return true;
		} else if(this.selector == "reportFalse") {
			return false;
		} else if (this.selector == "reportAnd") { 
			return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
			&& right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data));
		} else if (this.selector == "reportOr") {
			return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
			|| right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data));
		} else if (this.selector == "reportNot") {
			return (!mid.execute(getItem(mid.children[0]), getItem(mid.children[1]), getItem(mid.children[2]), data));
		} else if(this.selector == "reportIsNull") {
            if (isIn(left, this.schemaIn)){
                left = data[this.schemaIn.indexOf(left)];
            }
            return (left == '');
		} else if(this.selector == "reportIsNotNull") {
            if (isIn(left, this.schemaIn)){
                left = data[this.schemaIn.indexOf(left)];
            }
            return !(left == '');
		}
	  
		if (isIn(left, this.schemaIn)){
			left = data[this.schemaIn.indexOf(left)];
		}
		if (isIn(right, this.schemaIn)){
			right = data[this.schemaIn.indexOf(right)];
		}
		// >, <, = will check if the data in rows are floats and convert them
		if (this.selector == "reportLessThan") {
			if(!isNaN(parseFloat(left))) {
				left = parseFloat(left);
			}
			if(!isNaN(parseFloat(right))) {
				right = parseFloat(right);
			}
			return (left < right);
		} else if (this.selector == "reportGreaterThan") {
			if(!isNaN(parseFloat(left))) {
				left = parseFloat(left);
			}
			if(!isNaN(parseFloat(right))) {
				right = parseFloat(right);
			}
			return (left > right);
		} else if (this.selector == "reportEquals") {
			if(!isNaN(parseFloat(left))) {
				left = parseFloat(left);
			}
			if(!isNaN(parseFloat(right))) {
				right = parseFloat(right);
			}
			if(left instanceof ReporterBlockMorph){
				left = left.toString();
			}
			if(right instanceof ReporterBlockMorph){
				right = right.toString();
			}
			
			return (left == right);
		}
	}
    // Conditional to handle the multi data functions
    if(data2 != null && schema != null && schema2 != null) {
        if(this.selector == "reportTrue") {
            return true;
        } else if(this.selector == "reportFalse") {
            return false;
        } else if (this.selector == "reportAnd") { 
            return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
            && right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data2));
        } else if (this.selector == "reportOr") {
            return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
            || right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data2));
        } else if (this.selector == "reportNot") {
            return (!mid.execute(getItem(mid.children[0]), getItem(mid.children[1]), getItem(mid.children[2]), data));
        } else if(this.selector == "reportIsNull") {
            return ;
        } else if(this.selector == "reportIsNotNull") {
            return ;
        }
      
        if (isIn(left, schema)){
            left = data[schema.indexOf(left)];
        }
        if (isIn(right, schema2)){
            right = data2[schema2.indexOf(right)];
        }
        // >, <, = will check if the data in rows are floats and convert them
        if (this.selector == "reportLessThan") {
            if(!isNaN(parseFloat(left))) {
                left = parseFloat(left);
            }
            if(!isNaN(parseFloat(right))) {
                right = parseFloat(right);
            }
            return (left < right);
        } else if (this.selector == "reportGreaterThan") {
            if(!isNaN(parseFloat(left))) {
                left = parseFloat(left);
            }
            if(!isNaN(parseFloat(right))) {
                right = parseFloat(right);
            }
            return (left > right);
        } else if (this.selector == "reportEquals") {
            if(!isNaN(parseFloat(left))) {
                left = parseFloat(left);
            }
            if(!isNaN(parseFloat(right))) {
                right = parseFloat(right);
            }
            if(left instanceof ReporterBlockMorph){
                left = left.toString();
            }
            if(right instanceof ReporterBlockMorph){
                right = right.toString();
            }
            
            return (left == right);
        }
    }
    // Single data functions
    else {
        if(this.selector == "reportTrue") {
            return true;
        } else if(this.selector == "reportFalse") {
            return false;
        } else if (this.selector == "reportAnd") { 
            return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
            && right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data));
        } else if (this.selector == "reportOr") {
            return (left.execute(getItem(left.children[0]), left.children[1], getItem(left.children[2]), data) 
            || right.execute(getItem(right.children[0]), right.children[1], getItem(right.children[2]), data));
        } else if (this.selector == "reportNot") {
            return (!mid.execute(getItem(mid.children[0]), getItem(mid.children[1]), getItem(mid.children[2]), data));
        } else if(this.selector == "reportIsNull") {
            return ;
        } else if(this.selector == "reportIsNotNull") {
            return ;
        }
      
        if (isIn(left, this.schemaIn)){
            left = data[this.schemaIn.indexOf(left)];
        }
        if (isIn(right, this.schemaIn)){
            right = data[this.schemaIn.indexOf(right)];
        }
        // >, <, = will check if the data in rows are floats and convert them
        if (this.selector == "reportLessThan") {
            if(!isNaN(parseFloat(left))) {
                left = parseFloat(left);
            }
            if(!isNaN(parseFloat(right))) {
                right = parseFloat(right);
            }
            return (left < right);
        } else if (this.selector == "reportGreaterThan") {
            if(!isNaN(parseFloat(left))) {
                left = parseFloat(left);
            }
            if(!isNaN(parseFloat(right))) {
                right = parseFloat(right);
            }
            return (left > right);
        } else if (this.selector == "reportEquals") {
            if(!isNaN(parseFloat(left))) {
                left = parseFloat(left);
            }
            if(!isNaN(parseFloat(right))) {
                right = parseFloat(right);
            }
            if(left instanceof ReporterBlockMorph){
                left = left.toString();
            }
            if(right instanceof ReporterBlockMorph){
                right = right.toString();
            }
            
            return (left == right);
        }
    }
};

// InputSlotMorph //////////////////////////////////////////////////////

/*
    I am an editable text input slot. I can be either rectangular or
    rounded, and can have an optional drop-down menu. If I'm set to
    read-only I must have a drop-down menu and will assume a darker
    shade of my    parent's color.

    my most important public attributes and accessors are:

    setContents(str/float)    - display the argument (string or float)
    contents().text            - get the displayed string
    choices                    - a key/value list for my optional drop-down
    isReadOnly                - governs whether I am editable or not
    isNumeric                - governs my outer shape (round or rect)

    my block specs are:

    %s        - string input, rectangular
    %n        - numerical input, semi-circular vertical edges
    %anyUE    - any unevaluated

    evaluate() returns my displayed string, cast to float if I'm numerical

    there are also a number of specialized drop-down menu presets, refer
    to BlockMorph for details.
*/

// InputSlotMorph inherits from ArgMorph:

InputSlotMorph.prototype = new ArgMorph();
InputSlotMorph.prototype.constructor = InputSlotMorph;
InputSlotMorph.uber = ArgMorph.prototype;

// InputSlotMorph preferences settings:

InputSlotMorph.prototype.executeOnSliderEdit = false;

// InputSlotMorph instance creation:

function InputSlotMorph(text, isNumeric, choiceDict, isReadOnly) {
    this.init(text, isNumeric, choiceDict, isReadOnly);
}

InputSlotMorph.prototype.init = function (
    text,
    isNumeric,
    choiceDict,
    isReadOnly
) {
    var contents = new StringMorph(''),
        arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1)
        );

    contents.fontSize = this.fontSize;
    contents.isShowingBlanks = true;
    contents.drawNew();

    this.isUnevaluated = false;
    this.choices = choiceDict || null; // object, function or selector
    this.oldContentsExtent = contents.extent();
    this.isNumeric = isNumeric || false;
    this.isReadOnly = isReadOnly || false;
    this.minWidth = 0; // can be chaged for text-type inputs ("landscape")
    this.constant = null;

    InputSlotMorph.uber.init.call(this);
    this.color = new Color(255, 255, 255);
    this.add(contents);
    this.add(arrow);
    contents.isEditable = true;
    contents.isDraggable = false;
    contents.enableSelecting();
    this.setContents(text);
};

// InputSlotMorph accessing:

InputSlotMorph.prototype.getSpec = function () {
    if (this.isNumeric) {
        return '%n';
    }
    return '%s'; // default
};

InputSlotMorph.prototype.contents = function () {
    return detect(
        this.children,
        function (child) {
            return (child instanceof StringMorph);
        }
    );
};

InputSlotMorph.prototype.arrow = function () {
    return detect(
        this.children,
        function (child) {
            return (child instanceof ArrowMorph);
        }
    );
};

InputSlotMorph.prototype.setContents = function (aStringOrFloat) {
    var cnts = this.contents(),
        dta = aStringOrFloat,
        isConstant = dta instanceof Array;
    if (isConstant) {
        dta = localize(dta[0]);
    } else { // assume dta is a localizable choice if it's a key in my choices
        if (this.choices !== null && this.choices[dta] instanceof Array) {
            return this.setContents(this.choices[dta]);
        }
    }
    cnts.text = dta;
    if (isNil(dta)) {
        cnts.text = '';
    } else if (dta.toString) {
        cnts.text = dta.toString();
    }
    cnts.drawNew();

    // adjust to zebra coloring:
    if (this.isReadOnly && (this.parent instanceof BlockMorph)) {
        this.parent.fixLabelColor();
    }

    // remember the constant, if any
    this.constant = isConstant ? aStringOrFloat : null;
};

// InputSlotMorph drop-down menu:

InputSlotMorph.prototype.dropDownMenu = function () {
    var choices = this.choices,
        key,
        menu = new MenuMorph(
            this.setContents,
            null,
            this,
            this.fontSize
        );

    if (choices instanceof Function) {
        choices = choices.call(this);
    } else if (isString(choices)) {
        choices = this[choices]();
    }
    if (!choices) {
        return null;
    }
    menu.addItem(' ', null);
    for (key in choices) {
        if (Object.prototype.hasOwnProperty.call(choices, key)) {
            if (key[0] === '~') {
                menu.addLine();
            } else {
                menu.addItem(choices[key], choices[key]);
            }
        }
    }
    if (menu.items.length > 0) {
        menu.popUpAtHand(this.world());
    } else {
        return null;
    }
};

InputSlotMorph.prototype.messagesMenu = function () {
    var dict = {},
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        myself = this,
        allNames = [];

    stage.children.concat(stage).forEach(function (morph) {
        if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
            allNames = allNames.concat(morph.allMessageNames());
        }
    });
    allNames.forEach(function (name) {
        dict[name] = name;
    });
    if (allNames.length > 0) {
        dict['~'] = null;
    }
    dict['new...'] = function () {

        new DialogBoxMorph(
            myself,
            myself.setContents,
            myself
        ).prompt(
            'Message name',
            null,
            myself.world()
        );
    };

    return dict;
};

InputSlotMorph.prototype.messagesReceivedMenu = function () {
    var dict = {'any message': ['any message']},
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        myself = this,
        allNames = [];

    stage.children.concat(stage).forEach(function (morph) {
        if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
            allNames = allNames.concat(morph.allMessageNames());
        }
    });
    allNames.forEach(function (name) {
        dict[name] = name;
    });
    dict['~'] = null;
    dict['new...'] = function () {

        new DialogBoxMorph(
            myself,
            myself.setContents,
            myself
        ).prompt(
            'Message name',
            null,
            myself.world()
        );
    };

    return dict;
};

InputSlotMorph.prototype.collidablesMenu = function () {
    var dict = {
            'mouse-pointer' : ['mouse-pointer'],
            edge : ['edge'],
            'pen trails' : ['pen trails']
        },
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.distancesMenu = function () {
    var dict = {
            'mouse-pointer' : ['mouse-pointer']
        },
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.clonablesMenu = function () {
    var dict = {},
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    if (rcvr instanceof SpriteMorph) {
        dict.myself = ['myself'];
    }
    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph && !morph.isClone) {
            allNames = allNames.concat(morph.name);
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.objectsMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        dict = {},
        allNames = [];

    dict[stage.name] = stage.name;
    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph) {
            allNames.push(morph.name);
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.attributesMenu = function () {
    var block = this.parentThatIsA(BlockMorph),
        objName = block.inputs()[1].evaluate(),
        rcvr = block.receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        obj,
        dict = {},
        varNames = [];

    if (objName === stage.name) {
        obj = stage;
    } else {
        obj = detect(
            stage.children,
            function (morph) {
                return morph.name === objName;
            }
        );
    }
    if (!obj) {
        return dict;
    }
    if (obj instanceof SpriteMorph) {
        dict = {
            'x position' : ['x position'],
            'y position' : ['y position'],
            'direction' : ['direction'],
            'costume #' : ['costume #'],
            'costume name' : ['costume name'],
            'size' : ['size']
        };
    } else { // the stage
        dict = {
            'costume #' : ['costume #'],
            'costume name' : ['costume name']
        };
    }
    varNames = obj.variables.names();
    if (varNames.length > 0) {
        dict['~'] = null;
        varNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.costumesMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).receiver(),
        dict,
        allNames = [];
    if (rcvr instanceof SpriteMorph) {
        dict = {Turtle : ['Turtle']};
    } else { // stage
        dict = {Empty : ['Empty']};
    }
    rcvr.costumes.asArray().forEach(function (costume) {
        allNames = allNames.concat(costume.name);
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.soundsMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).receiver(),
        allNames = [],
        dict = {};

    rcvr.sounds.asArray().forEach(function (sound) {
        allNames = allNames.concat(sound.name);
    });
    if (allNames.length > 0) {
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.getVarNamesDict = function () {
    var block = this.parentThatIsA(BlockMorph),
        rcvr,
        proto,
        rings,
        declarations,
        tempVars = [],
        dict;

    if (!block) {
        return {};
    }
    rcvr = block.receiver();

    proto = detect(block.allParents(), function (morph) {
        return morph instanceof PrototypeHatBlockMorph;
    });
    if (proto) {
        tempVars = proto.inputs()[0].inputFragmentNames();
    }

    rings = block.allParents().filter(function (block) {
        return block instanceof RingMorph;
    });
    rings.forEach(function (block) {
        tempVars = tempVars.concat(block.inputs()[1].evaluate());
    });

    declarations = block.allParents().filter(function (block) {
        return block.selector === 'doDeclareVariables';
    });
    declarations.forEach(function (block) {
        tempVars = tempVars.concat(block.inputs()[0].evaluate());
    });

    if (rcvr) {
        dict = rcvr.variables.allNamesDict();
        tempVars.forEach(function (name) {
            dict[name] = name;
        });
        return dict;
    }
    return {};
};

// InputSlotMorph layout:

InputSlotMorph.prototype.fixLayout = function () {
    var contents = this.contents(),
        arrow = this.arrow();

    contents.isNumeric = this.isNumeric;
    contents.isEditable = (!this.isReadOnly);
    if (this.isReadOnly) {
        contents.disableSelecting();
        contents.color = new Color(254, 254, 254);
    } else {
        contents.enableSelecting();
        contents.color = new Color(0, 0, 0);
    }

    if (this.choices) {
        arrow.setSize(this.fontSize);
        arrow.show();
    } else {
        arrow.setSize(0);
        arrow.hide();
    }
    this.setHeight(
        contents.height()
            + this.edge * 2
            // + this.typeInPadding * 2
    );
    if (this.isNumeric) {
        this.setWidth(contents.width()
            + Math.floor(arrow.width() * 0.5)
            + this.height()
            + this.typeInPadding * 2
            );
    } else {
        this.setWidth(Math.max(
            contents.width()
                + arrow.width()
                + this.edge * 2
                + this.typeInPadding * 2,
            contents.rawHeight() + arrow.width(),
            this.minWidth // for text-type slots
        ));
    }
    if (this.isNumeric) {
        contents.setPosition(new Point(
            Math.floor(this.height() / 2),
            this.edge
        ).add(new Point(this.typeInPadding, 0)).add(this.position()));
    } else {
        contents.setPosition(new Point(
            this.edge,
            this.edge
        ).add(new Point(this.typeInPadding, 0)).add(this.position()));
    }

    arrow.setPosition(new Point(
        this.right() - arrow.width() - this.edge,
        contents.top()
    ));

    if (this.parent) {
        if (this.parent.fixLayout) {
            if (this.world()) {
                this.startLayout();
                this.parent.fixLayout();
                this.endLayout();
            } else {
                this.parent.fixLayout();
            }
        }
    }
};

// InputSlotMorph events:

InputSlotMorph.prototype.mouseClickLeft = function (pos) {
    if (this.arrow().bounds.containsPoint(pos)) {
        this.dropDownMenu();
    } else if (this.isReadOnly) {
        this.dropDownMenu();
    } else {
        this.contents().edit();
        this.contents().selectAll();
    }
};

InputSlotMorph.prototype.reactToKeystroke = function () {
    this.constant = null;
};

InputSlotMorph.prototype.reactToEdit = function () {
    this.contents().clearSelection();
};

InputSlotMorph.prototype.reactToSliderEdit = function () {
/*
    directly execute the stack of blocks I'm part of if my
    "executeOnSliderEdit" setting is turned on, obeying the stage's
    thread safety setting. This feature allows for "Bret Victor" style
    interactive coding.
*/
    var block, top, receiver, stage;
    if (!this.executeOnSliderEdit) {return; }
    block = this.parentThatIsA(BlockMorph);
    if (block) {
        top = block.topBlock();
        receiver = top.receiver();
        if (top instanceof PrototypeHatBlockMorph) {
            return;
        }
        if (receiver) {
            stage = receiver.parentThatIsA(StageMorph);
            if (stage && stage.isThreadSafe) {
                stage.threads.startProcess(top, stage.isThreadSafe);
            } else {
                top.mouseClickLeft();
            }
        }
    }
};

// InputSlotMorph evaluating:

InputSlotMorph.prototype.evaluate = function () {
/*
    answer my content's text string. If I am numerical convert that
    string to a number. If the conversion fails answer the string
    (e.g. for special choices like 'any', 'all' or 'last') otherwise
    the numerical value.
*/
    var num,
        contents = this.contents();
    if (this.constant) {
        return this.constant;
    }
    if (this.isNumeric) {
        num = parseFloat(contents.text || '0');
        if (!isNaN(num)) {
            return num;
        }
    }
    return contents.text;
};

InputSlotMorph.prototype.isEmptySlot = function () {
    return this.contents().text === '';
};

// InputSlotMorph drawing:

InputSlotMorph.prototype.drawNew = function () {
    var context, borderColor, r;

    // initialize my surface property
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if (this.parent) {
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    context.fillStyle = this.color.toString();
    if (this.isReadOnly) {
        context.fillStyle = borderColor.darker().toString();
    }

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    if (!this.isNumeric) {
        context.fillRect(
            this.edge,
            this.edge,
            this.width() - this.edge * 2,
            this.height() - this.edge * 2
        );
        this.drawRectBorder(context);
    } else {
        r = (this.height() - (this.edge * 2)) / 2;
        context.fillStyle = this.color.toString();
        context.beginPath();
        context.arc(
            r + this.edge,
            r + this.edge,
            r,
            radians(90),
            radians(-90),
            false
        );
        context.arc(
            this.width() - r - this.edge,
            r + this.edge,
            r,
            radians(-90),
            radians(90),
            false
        );
        context.closePath();
        context.fill();
        this.drawRoundBorder(context);
    }
};

InputSlotMorph.prototype.drawRectBorder = function (context) {
    var shift = this.edge * 0.5,
        gradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.edge, shift);
    context.lineTo(this.width() - this.edge - shift, shift);
    context.stroke();

    context.shadowOffsetY = 0;

    gradient = context.createLinearGradient(
        0,
        0,
        this.edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, this.edge);
    context.lineTo(shift, this.height() - this.edge - shift);
    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    gradient = context.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.edge, this.height() - shift);
    context.lineTo(this.width() - this.edge, this.height() - shift);
    context.stroke();

    gradient = context.createLinearGradient(
        this.width() - this.edge,
        0,
        this.width(),
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.width() - shift, this.edge);
    context.lineTo(this.width() - shift, this.height() - this.edge);
    context.stroke();

};

InputSlotMorph.prototype.drawRoundBorder = function (context) {
    var shift = this.edge * 0.5,
        r = (this.height() - (this.edge * 2)) / 2,
        start,
        end,
        gradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // straight top edge:
    start = r + this.edge;
    end = this.width() - r - this.edge;
    if (end > start) {

        context.shadowOffsetX = shift;
        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.color.darker(80).toString();

        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();

        context.moveTo(start, shift);
        context.lineTo(end, shift);
        context.stroke();

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;
    }

    // straight bottom edge:
    gradient = context.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r + this.edge, this.height() - shift);
    context.lineTo(this.width() - r - this.edge, this.height() - shift);
    context.stroke();

    r = this.height() / 2;

    context.shadowOffsetX = shift;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    // top edge: left corner
    gradient = context.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );

    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createRadialGradient(
        this.width() - r,
        r,
        r - this.edge,
        this.width() - r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        this.width() - r,
        r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();
};

// MultiArgMorph ///////////////////////////////////////////////////////

/*
    I am an arity controlled list of input slots

    my block specs are

        %mult%x - where x is any single input slot
        %inputs - for an additional text label 'with inputs'

    evaluation is handles by the interpreter
*/

// MultiArgMorph  inherits from ArgMorph:

MultiArgMorph.prototype = new ArgMorph();
MultiArgMorph.prototype.constructor = MultiArgMorph;
MultiArgMorph.uber = ArgMorph.prototype;

// MultiArgMorph instance creation:

function MultiArgMorph(
    slotSpec,
    labelTxt,
    min,
    eSpec,
    arrowColor,
    labelColor,
    shadowColor,
    shadowOffset,
    isTransparent
) {
    this.init(
        slotSpec,
        labelTxt,
        min,
        eSpec,
        arrowColor,
        labelColor,
        shadowColor,
        shadowOffset,
        isTransparent
    );
}

MultiArgMorph.prototype.init = function (
    slotSpec,
    labelTxt,
    min,
    eSpec,
    arrowColor,
    labelColor,
    shadowColor,
    shadowOffset,
    isTransparent
) {
    var label,
        arrows = new FrameMorph(),
        leftArrow,
        rightArrow,
        i;

    this.slotSpec = slotSpec || '%s';
    this.labelText = localize(labelTxt || '');
    this.minInputs = min || 0;
    this.elementSpec = eSpec || null;
    this.labelColor = labelColor || null;
    this.shadowColor = shadowColor || null;
    this.shadowOffset = shadowOffset || null;

    this.canBeEmpty = true;
    MultiArgMorph.uber.init.call(this);

    // MultiArgMorphs are transparent by default b/c of zebra coloring
    this.alpha = isTransparent === false ? 1 : 0;
    arrows.alpha = isTransparent === false ? 1 : 0;
    arrows.noticesTransparentClick = true;
    this.noticesTransparentclick = true;

    // label text:
    label = this.labelPart(this.labelText);
    this.add(label);
    label.hide();

    // left arrow:
    leftArrow = new ArrowMorph(
        'left',
        this.fontSize,
        Math.max(Math.floor(this.fontSize / 6), 1),
        arrowColor
    );

    // right arrow:
    rightArrow = new ArrowMorph(
        'right',
        this.fontSize,
        Math.max(Math.floor(this.fontSize / 6), 1),
        arrowColor
    );

    // control panel:
    arrows.add(leftArrow);
    arrows.add(rightArrow);
    arrows.drawNew();
    arrows.acceptsDrops = false;

    this.add(arrows);

    // create the minimum number of inputs
    for (i = 0; i < this.minInputs; i += 1) {
        this.addInput();
    }
};

MultiArgMorph.prototype.label = function () {
    return this.children[0];
};

MultiArgMorph.prototype.arrows = function () {
    return this.children[this.children.length - 1];
};

MultiArgMorph.prototype.getSpec = function () {
    return '%mult' + this.slotSpec;
};

// MultiArgMorph defaults:

MultiArgMorph.prototype.setContents = function (anArray) {
    var inputs = this.inputs(), i;
    for (i = 0; i < anArray.length; i += 1) {
        if (anArray[i] !== null && (inputs[i])) {
            inputs[i].setContents(anArray[i]);
        }
    }
};

// MultiArgMorph hiding and showing:

/*
    override the inherited behavior to recursively hide/show all
    children, so that my instances get restored correctly when
    switching back out of app mode.
*/

MultiArgMorph.prototype.hide = function () {
    this.isVisible = false;
    this.changed();
};

MultiArgMorph.prototype.show = function () {
    this.isVisible = true;
    this.changed();
};

// MultiArgMorph coloring:

MultiArgMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    this.textColor = textColor;
    this.shadowColor = shadowColor;
    this.shadowOffset = shadowOffset;
    MultiArgMorph.uber.setLabelColor.call(
        this,
        textColor,
        shadowColor,
        shadowOffset
    );
};

// MultiArgMorph layout:

MultiArgMorph.prototype.fixLayout = function () {
    if (this.slotSpec === '%t') {
        this.isStatic = true; // in this case I cannot be exchanged
    }
    if (this.parent) {
        var label = this.label(), shadowColor, shadowOffset;
        this.color = this.parent.color;
        shadowColor = this.shadowColor ||
            this.parent.color.darker(this.labelContrast);
        shadowOffset = this.shadowOffset || label.shadowOffset;
        this.arrows().color = this.color;

        if (this.labelText !== '') {
            if (!label.shadowColor.eq(shadowColor)) {
                label.shadowColor = shadowColor;
                label.shadowOffset = shadowOffset;
                label.drawNew();
            }
        }

    }
    this.fixArrowsLayout();
    MultiArgMorph.uber.fixLayout.call(this);
    if (this.parent) {
        this.parent.fixLayout();
    }
};

MultiArgMorph.prototype.fixArrowsLayout = function () {
    var label = this.label(),
        arrows = this.arrows(),
        leftArrow = arrows.children[0],
        rightArrow = arrows.children[1],
        dim = new Point(rightArrow.width() / 2, rightArrow.height());
    if (this.inputs().length < (this.minInputs + 1)) {
        label.hide();
        leftArrow.hide();
        rightArrow.setPosition(
            arrows.position().subtract(new Point(dim.x, 0))
        );
        arrows.setExtent(dim);
    } else {
        if (this.labelText !== '') {
            label.show();
        }
        leftArrow.show();
        rightArrow.setPosition(leftArrow.topCenter());
        arrows.bounds.corner = rightArrow.bottomRight().copy();
    }
    arrows.drawNew();
};

MultiArgMorph.prototype.refresh = function () {
    this.inputs().forEach(function (input) {
        input.drawNew();
    });
};

MultiArgMorph.prototype.drawNew = function () {
    MultiArgMorph.uber.drawNew.call(this);
    this.refresh();
};

// MultiArgMorph arity control:

MultiArgMorph.prototype.addInput = function (contents) {
    var i, name,
        newPart = this.labelPart(this.slotSpec),
        idx = this.children.length - 1;
    // newPart.alpha = this.alpha ? 1 : (1 - this.alpha) / 2;
    if (contents) {
        newPart.setContents(contents);
    } else if (this.elementSpec === '%scriptVars') {
        name = '';
        i = idx;
        while (i > 0) {
            name = String.fromCharCode(97 + (i - 1) % 26) + name;
            i = Math.floor((i - 1) / 26);
        }
        newPart.setContents(name);
    } else if (contains(['%parms', '%ringparms'], this.elementSpec)) {
        newPart.setContents('#' + idx);
    }
    newPart.parent = this;
    this.children.splice(idx, 0, newPart);
    newPart.drawNew();
    this.fixLayout();
};

MultiArgMorph.prototype.removeInput = function () {
    var oldPart, scripts;
    if (this.children.length > 1) {
        oldPart = this.children[this.children.length - 2];
        this.removeChild(oldPart);
        if (oldPart instanceof BlockMorph) {
            scripts = this.parentThatIsA(ScriptsMorph);
            if (scripts) {
                scripts.add(oldPart);
            }
        }
    }
    this.fixLayout();
};

// MultiArgMorph events:

MultiArgMorph.prototype.mouseClickLeft = function (pos) {
    // if the <shift> key is pressed, repeat action 5 times
    var arrows = this.arrows(),
        leftArrow = arrows.children[0],
        rightArrow = arrows.children[1],
        repetition = this.world().currentKey === 16 ? 3 : 1,
        i;

    this.startLayout();
    if (rightArrow.bounds.containsPoint(pos)) {
        for (i = 0; i < repetition; i += 1) {
            if (rightArrow.isVisible) {
                this.addInput();
            }
        }
    } else if (leftArrow.bounds.containsPoint(pos)) {
        for (i = 0; i < repetition; i += 1) {
            if (leftArrow.isVisible) {
                this.removeInput();
            }
        }
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
    this.endLayout();
};

// MultiArgMorph arity evaluating:

MultiArgMorph.prototype.evaluate = function () {
/*
    this is usually overridden by the interpreter. This method is only
    called (and needed) for the variables menu.
*/
    var result = [];
    this.inputs().forEach(function (slot) {
        result.push(slot.evaluate());
    });
    return result;
};

MultiArgMorph.prototype.isEmptySlot = function () {
    return this.canBeEmpty ? this.inputs().length === 0 : false;
};

MultiArgMorph.prototype.setRelation = function() {
        this.schemaIn = this.parent.schemaOut;
        this.dataIn = this.parent.dataOut;
        this.schemaOut = this.parent.schemaOut;
        this.dataOut = this.parent.dataOut;
        this.groupColumns = this.parent.groupColumns;
};

BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        myself = this,
        blck;

    menu.addItem(
        "help...",
        'showHelp'
    );
    if (this.isTemplate) {
        if (!(this.parent instanceof SyntaxElementMorph)) {
            if (this.selector !== 'evaluateCustomBlock') {
                menu.addItem(
                    "hide",
                    'hidePrimitive'
                );
            }
            if (StageMorph.prototype.enableCodeMapping) {
                menu.addLine();
                menu.addItem(
                    'header mapping...',
                    'mapToHeader'
                );
                menu.addItem(
                    'code mapping...',
                    'mapToCode'
                );
            }
        }
        return menu;
    }
    menu.addLine();
    if (this.selector === 'reportGetVar') {
        blck = this.fullCopy();
        blck.addShadow();
        menu.addItem(
            'rename...',
            function () {
                new DialogBoxMorph(
                    myself,
                    myself.setSpec,
                    myself
                ).prompt(
                    "Variable name",
                    myself.blockSpec,
                    world,
                    blck.fullImage(), // pic
                    InputSlotMorph.prototype.getVarNamesDict.call(myself)
                );
            }
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            function () {
                myself.relabel(
                    SpriteMorph.prototype.blockAlternatives[myself.selector]
                );
            }
        );
    }

    menu.addItem(
        "duplicate",
        function () {
            this.fullCopy().pickUp(world);
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            this.thumbnail(0.5, 60, false),
            function () {
                var cpy = this.fullCopy(),
                    nb = cpy.nextBlock();
                if (nb) {nb.destroy(); }
                cpy.pickUp(world);
            },
            'only duplicate this block'
        );
    }
    menu.addItem(
        "delete",
        'userDestroy'
    );
    menu.addItem(
        "script pic...",
        function () {
            window.open(myself.topBlock().fullImage().toDataURL());
        },
        'open a new window\nwith a picture of this script'
    );
    if (this.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        return menu;
    }
    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (this.topBlock() instanceof HatBlockMorph))) {
        return menu;
    }
    menu.addLine();
    menu.addItem("ringify", 'ringify');
    if (StageMorph.prototype.enableCodeMapping) {
        menu.addLine();
        menu.addItem(
            'header mapping...',
            'mapToHeader'
        );
        menu.addItem(
            'code mapping...',
            'mapToCode'
        );
    }
    return menu;
};

ScriptsMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        ide = this.parentThatIsA(IDE_Morph),
        blockEditor,
        myself = this,
        obj = this.owner,
        stage = obj.parentThatIsA(StageMorph);

    if (!ide) {
        blockEditor = this.parentThatIsA(BlockEditorMorph);
        if (blockEditor) {
            ide = blockEditor.target.parentThatIsA(IDE_Morph);
        }
    }
    menu.addItem(
        "Import CSV",
        function () {
            var inp = document.createElement('input');
            if (myself.filePicker) {
                document.body.removeChild(myself.filePicker);
                myself.filePicker = null;
            }
            inp.type = 'file';
            inp.style.color = "transparent";
            inp.style.backgroundColor = "transparent";
            inp.style.border = "none";
            inp.style.outline = "none";
            inp.style.position = "absolute";
            inp.style.top = "0px";
            inp.style.left = "0px";
            inp.style.width = "0px";
            inp.style.height = "0px";
            inp.addEventListener(
                "change",
                function () {
                    document.body.removeChild(inp);
                    myself.filePicker = null;
                    world.hand.processDrop(inp.files);
                },
                false
            );
            document.body.appendChild(inp);
            myself.filePicker = inp;
            inp.click();
        }
    );
    menu.addLine();
    menu.addItem('clean up', 'cleanUp', 'arrange scripts\nvertically');
    menu.addItem('add comment', 'addComment');
    if (this.lastDroppedBlock) {
        menu.addItem(
            'undrop',
            'undrop',
            'undo the last\nblock drop\nin this pane'
        );
    }
    menu.addItem(
        'scripts pic...',
        'exportScriptsPicture',
        'open a new window\nwith a picture of all scripts'
    );
    if (ide) {
        menu.addLine();
        menu.addItem(
            'make a block...',
            function () {
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            if (definition.isGlobal) {
                                stage.globalBlocks.push(definition);
                            } else {
                                obj.customBlocks.push(definition);
                            }
                            ide.flushPaletteCache();
                            ide.refreshPalette();
                            new BlockEditorMorph(definition, obj).popUp();
                        }
                    },
                    myself
                ).prompt(
                    'Make a block',
                    null,
                    myself.world()
                );
            }
        );
    }
    return menu;
};
