/* Change set for objects.js */

SpriteMorph.prototype.categories = [
        'basics',
        'movies',
        'vlds',
        'custom',
        'operators',
        'sets',
        'relational',
        'extended'
    ];

SpriteMorph.prototype.blockColor = {
    basics : new Color(74, 108, 212),
    movies : new Color(74, 108, 212),
    vlds : new Color(74, 108, 212),
    custom : new Color(243, 118, 29),
    operators : new Color(143, 86, 227),
    sets : new Color(207, 74, 217),
    relational : new Color(230, 168, 34),
    extended : new Color(0, 161, 120)
};

SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype.blocks = {
        //movies
        movies_gross: {
            type: 'data',
            category: 'movies',
            spec: 'Grossing'
        },
        movies_heroes: {
            type: 'data',
            category: 'movies',
            spec: 'Heroes'
        },
        movies_leads: {
            type: 'data',
            category: 'movies',
            spec: 'Leads'
        },
        movies_quotes: {
            type: 'data',
            category: 'movies',
            spec: 'Quotes'
        },
        movies_top100: {
            type: 'data',
            category: 'movies',
            spec: 'Top 100'
        },
        movies_villains: {
            type: 'data',
            category: 'movies',
            spec: 'Villains'
        },
        //vlds
        vlds_membership: {
            type: 'data',
            category: 'vlds',
            spec: 'Membership'
        },
        vlds_testdata: {
            type: 'data',
            category: 'vlds',
            spec: 'Test Data'
        },
        vlds_graduate: {
            type: 'data',
            category: 'vlds',
            spec: 'Graduate'
        },
        vlds_postsec: {
            type: 'data',
            category: 'vlds',
            spec: 'Post Sec'
        },
        //basics
        basics_numbers: {
            type: 'data',
            category: 'basics',
            spec: '1-10'
        },
        basics_alphabet: {
            type: 'data',
            category: 'basics',
            spec: 'Alphabet'
        },
        music_songs: {
            type: 'data',
            category: 'basics',
            spec: 'Top Songs'
        },
        books_top100: {
            type: 'data',
            category: 'basics',
            spec: 'Top 100 Books'
        },
        books_top100children: {
            type: 'data',
            category: 'basics',
            spec: 'Top 100 Books (Children)'
        },
        chem_periodic: {
            type: 'data',
            category: 'basics',
            spec: 'Periodic Table'
        },
        history_pres: {
            type: 'data',
            category: 'basics',
            spec: 'US Presidents'
        },
        //dropdown
        theDropdown: {
            type: 'dropdown',
            category: 'movies',
            spec: '%schema'
        },
        //relational
        select: {
            type: 'command',
            category: 'relational',
            spec: 'select %b'
        },
        project: {
            type: 'command',
            category: 'relational',
            spec: 'project %mult%s'
        },
        rename: {
            type: 'command',
            category: 'relational',
            spec: 'rename %s as %s'
        },
        natural: {
            type: 'command',
            category: 'relational',
            spec: '%c natural join %c'
        },
        theta: {
            type: 'command',
            category: 'relational',
            spec: '%c  theta join %b %c'
        },
        outer: {
            type: 'command',
            category: 'relational',
            spec: '%c outer join %oj %b %c'
        },
        //set operations
        union: {
            type: 'command',
            category: 'sets',
            spec: '%c union %c'
        },
        intersect: {
            type: 'command',
            category: 'sets',
            spec: '%c intersect %c'
        },
        difference: {
            type: 'command',
            category: 'sets',
            spec: '%c difference %c'
        },
        cartesian: {
            type: 'command',
            category: 'sets',
            spec: '%c cartesian %c'
        },
        //operators
        reportLessThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s < %s'
        },
        reportEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s = %s'
        },
        reportGreaterThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s > %s'
        },
        reportAnd: {
            type: 'predicate',
            category: 'operators',
            spec: ' %b and %b'
        },
        reportOr: {
            type: 'predicate',
            category: 'operators',
            spec: '%b or %b'
        },
        reportNot: {
            type: 'predicate',
            category: 'operators',
            spec: 'not %b'
        },
        reportTrue: {
            type: 'predicate',
            category: 'operators',
            spec: 'true'
        },
        reportFalse: {
            type: 'predicate',
            category: 'operators',
            spec: 'false'
        },
        reportIsNull: {
            type: 'predicate',
            category: 'operators',
            spec: '%s is null'
        },
        reportIsNotNull: {
            type: 'predicate',
            category: 'operators',
            spec: '%s is not null'
        },
        //extended
        dupElim: {
            type: 'command',
            category: 'extended',
            spec: 'dup elim'
        },
        limit: {
            type: 'command',
            category: 'extended',
            spec: 'limit %n',
            defaults: [100]
        },
        order: {
            type: 'command',
            category: 'extended',
            spec: 'order by %mult%s'
        },
        group: {
            type: 'command',
            category: 'extended',
            spec: 'group by %mult%s'
        },
        agg: {
            type: 'command',
            category: 'extended',
            spec: 'aggregate %mult%agfun %mult%s'
        },
        //custom
        customData: {
            type: 'command',
            category: 'custom',
            spec: '%customData'
        }
    };
};

SpriteMorph.prototype.initBlocks();

SpriteMorph.prototype.blockForSelector = function (selector, setDefaults) {
    var info, block, defaults, inputs, i;
    info = this.blocks[selector];
    if (!info) {return null; }
    block = info.type === 'command' ? new CommandBlockMorph()
        : info.type === 'hat' ? new HatBlockMorph()
            : info.type === 'ring' ? new RingMorph()
            : info.type === 'data' ? new CommandBlockMorph(selector)
            : info.type === 'dropdown' ? new ReporterBlockMorph(false, true)
                : new ReporterBlockMorph(info.type === 'predicate', false);
    block.color = this.blockColor[info.category];
    block.category = info.category;
    block.selector = selector;
    if (contains(['reifyReporter', 'reifyPredicate'], block.selector)) {
        block.isStatic = true;
    }
    block.setSpec(localize(info.spec));
    if (setDefaults && info.defaults) {
        defaults = info.defaults;
        block.defaults = defaults;
        inputs = block.inputs();
        if (inputs[0] instanceof MultiArgMorph) {
            inputs[0].setContents(defaults);
            inputs[0].defaults = defaults;
        } else {
            for (i = 0; i < defaults.length; i += 1) {
                if (defaults[i] !== null) {
                    inputs[i].setContents(defaults[i]);
                }
            }
        }
    }
    return block;
};

SpriteMorph.prototype.variableBlock = function (varName) {
    var block = new ReporterBlockMorph(false, false);
    block.selector = 'reportGetVar';
    block.color = this.blockColor.variables;
    block.category = 'variables';
    block.setSpec(varName);
    block.isDraggable = true;
    return block;
};

SpriteMorph.prototype.blockTemplates = function (category) {
    var blocks = [], myself = this, varNames, button,
        cat = category || 'motion', txt;

    function block(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    function variableBlock(varName) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName);
        newBlock.isDraggable = false;
        newBlock.isTemplate = true;
        return newBlock;
    }

    function watcherToggle(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks[selector];
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleWatcher(
                    selector,
                    localize(info.spec),
                    myself.blockColor[info.category]
                );
            },
            null,
            function () {
                return myself.showingWatcher(selector);
            },
            null
        );
    }

    function variableWatcherToggle(varName) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName);
            },
            null
        );
    }

    function helpMenu() {
        var menu = new MenuMorph(this);
        menu.addItem('help...', 'showHelp');
        return menu;
    }

    if (cat === 'basics') {
        blocks.push(block('basics_numbers'));
        blocks.push(block('basics_alphabet'));
        blocks.push(block('music_songs'));
        blocks.push(block('books_top100'));
        blocks.push(block('books_top100children'));
        blocks.push(block('chem_periodic'));
        blocks.push(block('history_pres'));

    } else if (cat === 'movies') {
        blocks.push(block('movies_gross'));
        blocks.push(block('movies_heroes'));
        blocks.push(block('movies_leads'));
        blocks.push(block('movies_quotes'));
        blocks.push(block('movies_top100'));
        blocks.push(block('movies_villains'));

    } else if (cat === 'vlds') {
        blocks.push(block('vlds_membership'));
        blocks.push(block('vlds_testdata'));
        blocks.push(block('vlds_graduate'));
        blocks.push(block('vlds_postsec'));

    }  else if (cat === 'custom') {
    
        var button = new PushButtonMorph(
            null,
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
            },
            'Import CSV'
        );
        blocks.push(button);
    
        blocks.push(block('customData'));
        
    } else if (cat === 'operators') {
        blocks.push(block('theDropdown'));
        blocks.push(block('reportLessThan'));
        blocks.push(block('reportEquals'));
        blocks.push(block('reportGreaterThan'));
        blocks.push(block('reportAnd'));
        blocks.push(block('reportOr'));
        blocks.push(block('reportNot'));
        blocks.push(block('reportTrue'));
        blocks.push(block('reportFalse'));
        blocks.push(block('reportIsNull'));
        blocks.push(block('reportIsNotNull'));

    } else if (cat === 'sets') {
        blocks.push(block('theDropdown'));
        blocks.push(block('union'));
        blocks.push(block('intersect'));
        blocks.push(block('difference'));
        blocks.push(block('cartesian'));

    } else if (cat === 'relational') {
        blocks.push(block('theDropdown'));
        blocks.push(block('select'));
        blocks.push(block('project'));
        blocks.push(block('rename'));
        blocks.push(block('natural'));
        blocks.push(block('theta'));
        blocks.push(block('outer'));

    } else if (cat === 'extended') {
        blocks.push(block('theDropdown'));
        blocks.push(block('dupElim'));
        blocks.push(block('group'));
        blocks.push(block('agg'));
        blocks.push(block('order'));
        blocks.push(block('limit'));

    }
    return blocks;
};

SpriteMorph.prototype.booleanMorph = function (bool) {
    // answer a block which can be shown in watchers, speech bubbles etc.
    var block = new ReporterBlockMorph(true, false);
    block.color = SpriteMorph.prototype.blockColor.operators;
    block.setSpec(localize(bool.toString()));
    return block;
};
