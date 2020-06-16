/* bags_util.js is a file that contains all the extra utility function we need. */
/** This function creates an html table
* schema - the relation's schema
* data - the relation's data
*/

//custom dataset arrays
var customDataNames = [];
var customDataSchemas = [];
var customDataDatas = [];

var copiedBlocks = [];

alertContents = function(schema, data, limit, groups) 
{
//Code for debugging/////////////////////////
/*     var result = "";
    for(var i = 0; i < schema.length; i++){
        if(schema[i] != 0)
            result += schema[i] + "\t";
    }
    result += "\n";
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < schema.length; j++){
            if(schema[j] != 0)
                result += data[i][j] + "\t\t";
        }
        result += "\n";
    }
    alert(result); */
    var num_rows_display;
    if (limit != null) {
        num_rows_display = limit;
    } else {
        num_rows_display = data.length;
    }
    var current = true;
    var element = document.getElementById("table");
    if(element){
        element.parentNode.removeChild(element);
    }
    var theTable = document.createElement('table');
    theTable.id = "table";
    
    var tableRow = document.createElement('tr');
    for (var i = 0, td; i < schema.length; i++){
        if(schema[i] != 0){
            td = document.createElement('td');
            td.style.backgroundColor = "#4A6CD4";
            td.style.fontWeight = "bold";
            td.style.color = "#FFFFFF";
            td.style.textAlign = "center";
            td.appendChild(document.createTextNode(schema[i]));
            tableRow.appendChild(td);
        }  
    }
    theTable.appendChild(tableRow);
    
    var color = 0;
    // Note, don't forget the var keyword!
    for (var i = 0, tr, td; i < num_rows_display; i++) {
        tr = document.createElement('tr');
        
        if(groups != null) {
            for(var k = 0; k < groups[groups.length - 1][k]; k++) {
                if(i == groups[groups.length - 1][k])
                    color++;
            }
        }
        
        for(var j = 0; j < schema.length; j++){
            if(schema[j] != 0) {
                td = document.createElement('td');
                if(groups == null) {
                    if(current)
                        td.style.backgroundColor = "#C6CDE5"; 
                    else 
                        td.style.backgroundColor = "#D7DAE5";
                } else {
                    var currentColor = color % 4;
                    switch(currentColor) {
                        case 0:
                            td.style.backgroundColor = "#E4ECFF";
                            break;
                        case 1:
                            td.style.backgroundColor = "#FFE1E3";
                            break;
                        case 2: 
                            td.style.backgroundColor = "#CBD8F7";
                            break;
                        case 3:
                            td.style.backgroundColor = "#F7C6C9";
                            break;
                        //case 4:
                        //    td.style.backgroundColor = "#93A6DD";
                        //    break;
                    }
                    
                    //if(color % 2 == 0)
                    //    td.style.backgroundColor = "#C6CDE5";
                    //else
                    //    td.style.backgroundColor = "#D7DAE5";
                }
                td.appendChild(document.createTextNode(data[i][j]));
                tr.appendChild(td);
            }
        }
        current = !current;
        theTable.appendChild(tr);
    }
    document.getElementById('result').appendChild(theTable);
}

alertAlgebra = function(algebraCode)
{
    var element = document.getElementById("algebraTable");
    if(element){
        element.parentNode.removeChild(element);
    }
    var theTable = document.createElement('algebraTable');
    theTable.id = 'algebraTable';
    
    var tableRow = document.createElement('tr');
    td = document.createElement('td');
    td.style.backgroundColor = "#C6CDE5"; 
    td.style.color = 'FFFFFF';
    td.style.textAlign = 'center';
    td.appendChild(document.createTextNode(algebraCode));
    tableRow.appendChild(td);
    theTable.appendChild(tableRow);
    
    document.getElementById('algebra').appendChild(theTable);
}

getItem = function(item) {
    if(item == null){
        return "bool";
    } else if(item instanceof ReporterBlockMorph && item.isDropDown){
        return item.children[0].evaluate();
    } else if(item instanceof ReporterBlockMorph){
        return item;
    } else if(item instanceof StringMorph){
        return item.toString();
    }
    return item.evaluate();
}

checkArgs = function(left, mid, right){   
    if(left != '' && right != ''){
        return true;
    } else if (mid instanceof ReporterBlockMorph){
        return true;
    } else {
        return false;
    }
}

/**Checks the argument type of a single data set function **/
checkTypes = function(left, mid, right, data, schema){
    if (mid instanceof ReporterBlockMorph || mid instanceof StringMorph){
        return true;
    }
    if(typeof left == "string" && typeof right == "string"){
        if(isIn(left, schema)){
            left = data[0][schema.indexOf(left)];
        }
        
        if(isIn(right, schema)){
            right = data[0][schema.indexOf(right)];
        }
        
        if(left && right){
            return true;
        } else if(left == "bool" || right == "bool"){
            return true;
        }
    } else if(left instanceof ReporterBlockMorph && right instanceof ReporterBlockMorph){
        return true;
    }
    return false;
}

/**Checks the argument type of a dual data set function **/
checkTypesDual = function(left, mid, right, dataT, schemaT, dataB, schemaB){
    if (mid instanceof ReporterBlockMorph || mid instanceof StringMorph){
        return true;
    }
    if(typeof left == "string" && typeof right == "string"){
        if(isIn(left, schemaT)){
            left = dataT[0][schemaT.indexOf(left)];
        }
        
        if(isIn(right, schemaB)){
            right = dataB[0][schemaB.indexOf(right)];
        }
        
        if(left && right){
            return true;
        } else if(left == "bool" || right == "bool"){
            return true;
        }
    } else if(left instanceof ReporterBlockMorph && right instanceof ReporterBlockMorph){
        return true;
    }
    return false;
}

/** Determines is a given item is in an array */
isIn = function(item, array){
    for(var i = 0; i < array.length; i++){
        if(array[i] == item){
            return true;
        }
    }
    return false;
}

/** Determines the position of a given item is in an array */
isInPosition = function(item, array){
    for(var i = 0; i < array.length; i++){
        if(array[i] == item){
            return i;
        }
    }
    return null;
}

/** Method to compare strings and make the process case insensitive **/
schemaStr = function(str1, str2){
    var s1 = str1.toString();
    var s2 = str2.toString();
    if (s1.equalsIgnoreCase(s2) == true) {
        return true;
    }
    return false;
}

/** Aggregate functions method **/
aggrFuns = function(schema, data, funType, col, groupCols) {
    var schemaNew = new Array();
    var dataNew = new Array();
    var flag = 0;
    var flag2 = 0;
    
    while (flag < funType.length) {
        if (funType[flag] == 'count *') {
            schemaNew.push('count(*)');
            dataNew.push(data.length);
        } else if (funType[flag] == 'count') {
            var position = isInPosition(col[flag2], schema);
            var count = 0;
            for (var r = 0; r < data.length; r++) {
                if(data[r][position] != null && data[r][position] != '') {
                    count++;
                }
            }
            schemaNew.push('count(' + col[flag2] + ')');
            dataNew.push(count);
            flag2++;
        } else if (funType[flag] == 'min') {
            var position = isInPosition(col[flag2], schema);
            var min = data[0][position];
            var test = checkNaN(min);
            if( test == "s") {
                for (var r = 0; r < data.length; r++) {
                    if(data[r][position].length < min.length) {
                        min = data[r][position];
                    }
                }
            }
            else {
                for (var r = 0; r < data.length; r++) {
                    if(data[r][position] < min) {
                        min = data[r][position];
                    }
                }
            }
            schemaNew.push('min(' + col[flag] + ')');
            dataNew.push(min);
            flag2++;
        } else if (funType[flag] == 'max') {
            var position = isInPosition(col[flag2], schema);
            var max = data[0][position];
            var test = checkNaN(max);
            if( test == "s") {
                for (var r = 0; r < data.length; r++) {
                    if(data[r][position].length > max.length) {
                        max = data[r][position];
                    }
                }
            }
            else {
                for (var r = 0; r < data.length; r++) {
                    if(data[r][position] > max) {
                        max = data[r][position];
                    }
                }
            }
            schemaNew.push('max(' + col[flag2] + ')');
            dataNew.push(max);
            flag2++;
        } else if (funType[flag] == 'sum' || funType[flag] == 'avg') {
            var position = isInPosition(col[flag2], schema);
            var sum = 0;
            var average = 0;
            for (var i = 0; i < data.length; i++) {
                sum += parseFloat(data[i][position]);
            }
            if (funType[flag] =='sum') {
                dataNew.push(sum.toFixed(2));
                schemaNew.push('sum(' + col[flag2] +')');
            }
            if (funType[flag] =='avg') {
                average = sum/(data.length + 1);
                dataNew.push(average.toFixed(2));
                schemaNew.push('average(' + col[flag2] +')');
            }
        flag2++;
        }
        flag++;
    }
    for (var c = 0; c < dataNew.length; c++) {
        schemaNew.push(dataNew[c]);
    }
    return schemaNew;
}

/** Aggregate function for Grouped tables **/
aggrGroups = function(schema, data, funType, col, groupCols, groupInds) {
    var schemaNew = new Array();
    var dataNew = new Array();
    var flag;
    var flag2;
    //var counted = false;
    var index = (groupCols.length - 1);
    schemaNew[0] = new Array();
    
    //Push the group schema into the new schema before adding functions to schema
    for (var k = 0; k < groupCols.length; k++) {
        schemaNew[0].push(schema[groupCols[k]]);
    }
    
    //Process for doing aggregates on groups
    for (var groupCount = 0; groupCount < groupInds[index].length; groupCount++) {
        dataNew[groupCount] = new Array();
        flag = 0;
        flag2 = 0;
        
        //Set the group start and end
        if (groupCount == 0) {
            var groupStart = 0;
            var groupEnd = groupInds[index][groupCount];
            var groupSize = groupEnd;
        } else {
            groupStart = groupEnd;
            groupEnd = groupInds[index][groupCount]
            groupSize = (groupEnd - groupStart);
        }
        
        //Push the group into the new data array
        for (var y = 0; y < groupCols.length; y++) {
            dataNew[groupCount].push(data[groupStart][groupCols[y]]);
        }
        
        //Perform aggregate functions on the group
        while (flag < funType.length) {
            if (funType[flag] == 'count *') {
                if(groupCount == 0) {
                    schemaNew[0].push('count(*)');
                }
                dataNew[groupCount].push(groupSize);
            } else if (funType[flag] == 'count') {
                var position = isInPosition(col[flag2], schema);
                var count = 0;
                for (var r = 0; r < groupEnd; r++) {
                    if(data[r][position] != null && data[r][position] != '') {
                        count++;
                    }
                }
                if(groupCount == 0) {
                    schemaNew[0].push('count(' + col[flag2] + ')');
                }
                dataNew[groupCount].push(count);
                flag2++;
            } else if (funType[flag] == 'min') {
                var position = isInPosition(col[flag2], schema);
                var min = data[0][position];
                var test = checkNaN(min);
                if( test == "s") {
                    for (var r = groupStart; r < groupEnd; r++) {
                        if(data[r][position].length < min.length) {
                            min = data[r][position];
                        }
                    }
                }
                else {
                    for (var r = groupStart; r < groupEnd; r++) {
                        if(data[r][position] < min) {
                            min = data[r][position];
                        }
                    }
                }
                if(groupCount == 0) {
                    schemaNew[0].push('min(' + col[flag] + ')');
                }
                dataNew[groupCount].push(min);
                flag2++;
            } else if (funType[flag] == 'max') {
                var position = isInPosition(col[flag2], schema);
                var max = data[0][position];
                var test = checkNaN(max);
                if( test == "s") {
                    for (var r = groupStart; r < groupEnd; r++) {
                        if(data[r][position].length > max.length) {
                            max = data[r][position];
                        }
                    }
                }
                else {
                    for (var r = groupStart; r < groupEnd; r++) {
                        if(data[r][position] > max) {
                            max = data[r][position];
                        }
                    }
                }
                if(groupCount == 0) {
                    schemaNew[0].push('max(' + col[flag2] + ')');
                }
                dataNew[groupCount].push(max);
                flag2++;
            } else if (funType[flag] == 'sum' || funType[flag] == 'avg') {
                var position = isInPosition(col[flag2], schema);
                var sum = 0;
                var average = 0;
                for (var i = groupStart; i < groupEnd; i++) {
                    sum += parseFloat(data[i][position]);
                }
                if (funType[flag] =='sum') {
                    dataNew[groupCount].push(sum.toFixed(2));
                    if(groupCount == 0) {
                        schemaNew[0].push('sum(' + col[flag2] +')');
                    }
                }
                if (funType[flag] =='avg') {
                    average = sum/groupSize;
                    dataNew[groupCount].push(average.toFixed(2));
                    if(groupCount == 0) {
                        schemaNew[0].push('average(' + col[flag2] +')');
                    }
                }
            flag2++;
            }
            flag++;
        }
    }
    for (var c = 0; c < dataNew.length; c++) {
        schemaNew[c + 1] = new Array();
        for (var d = 0; d < dataNew[c].length; d++) {
            schemaNew[c + 1].push(dataNew[c][d]);
        }
    }
    return schemaNew;
}

/** Set operations functions **/
setOps = function(setOp, topData, bottomData) {
    var setData = new Array();                  //Array for the new data
    var cols = new Array();                     //Array for sorting
    var numCols = topData[0].length;            //A var needed as a constant
    var count;                                  //A var for intersect and difference
    var count2;                                 //A var for set difference
    var pushed = false;                         //A var to make sure there is something in setData
    for(var i = 0; i < numCols; i++) {
            cols.push(i);
    }
    //Process for a set union
    if (setOp == "union") {
        for(var t = 0; t < topData.length; t++) {
           setData.push(topData[t]);
        }
        for(var u = 0; u < bottomData.length; u++) {
           setData.push(bottomData[u]); 
        }
        setData = dupElim(sortDataset(setData, cols));
    }
    //Process for a set intersection
    else if (setOp == "intersect") {
        for(var t = 0; t < topData.length; t++) {
            for(var u = 0; u < bottomData.length; u++) {
                count = 0;
                for(var v = 0; v < numCols; v++) {
                    if(topData[t][v] == bottomData[u][v]) {
                        count++;
                    }
                }
                if(count == numCols) {
                    setData.push(topData[t]);
                }
            }
        }
        if(setData[0] != null) {
            setData = dupElim(sortDataset(setData, cols));
        }
    }
    //Process for a set difference
    else if (setOp =="difference") {
        for(var t = 0; t < topData.length; t++) {
            count2 = 0;
            for(var u = 0; u < bottomData.length; u++) {
                count = 0;
                for(var v = 0; v < numCols; v++) {
                    if(topData[t][v] == bottomData[u][v]) {
                        count++;
                    }
                }
                if(count != numCols) {
                    count2++;
                }
            }
            if(count2 == bottomData.length) {
                setData.push(topData[t]);
                pushed = true;
            }
        }
        if(pushed) {
            setData = dupElim(sortDataset(setData, cols));
        }
    }
    return setData;
}

/** Clean up functions for future use  **/
joins = function(){}

relational = function(){}

/** dataset sorting function **/
sortDataset = function(dataset, columns) {
    var output;
    output = sortMultiple(dataset, columns);
    return output;
}

/** dataset helper function for single columns **/
sortSingle = function (dataset, column) {
    var output = dataset;
    if( !isNaN(parseFloat(dataset[0][column])) && isFinite(dataset[0][column]) ) {
        output.sort( function(a,b) {return a[column] - b[column];} );
    } else {
        output.sort(function(a, b) {
        return (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0;
        });
    }
    return output;
}

/** dataset helper function for multiple columns **/
sortMultiple = function (inDataset,columns) {

    var dataset = cloneDataset(inDataset);
    
    sortSingle(dataset, columns[0]);
    
    //return this array of sorted arrays
    
    
    //sort the rest of the selected columns
    for (var i = 1; i < columns.length; i++) {
        var outputDataset = new Array();
        //array of grouped rows to be sorted
        var groups = new Array();
        //pointer for iterating through dataset
        var ptr = 0;
        // start and end pointer to group
        var st_ptr = ptr;
        var end_ptr = ptr;
        // group pointer
        var grp_ptr = 0;
        //the column we are currently grouping by
        x = columns[i-1];
        
        //creating array groups
        while (ptr < dataset.length) {
            if ((dataset[ptr+1] != null) && dataset[ptr][x] == dataset[ptr+1][x]) {
                ptr++;
                end_ptr = ptr;
            } else { //group found
                groups[grp_ptr] = new Array();
                var num_rows = end_ptr - st_ptr + 1;
                var row = 0;
                    for(var k = st_ptr; k < end_ptr + 1; k++) {
                        groups[grp_ptr].push(new Array());
                        for(var l = 0; l < dataset[k].length; l++) {
                            groups[grp_ptr][row].push(dataset[k][l]);
                        }
                        row++;
                    }
                ptr++;
                grp_ptr++;
                st_ptr = ptr;
                end_ptr = ptr;
            }
        }
        
        //sorting each group of rows then pushing it into the set
        for(var l = 0; l < groups.length; l++) {
            sortSingle(groups[l], columns[i]);
            outputDataset = outputDataset.concat(groups[l]);
        }
        
        dataset = outputDataset;
    }
    
    return dataset;    
}

/** Duplicate Elimination function **/
dupElim = function(inDataset) {

    var dataset = cloneDataset(inDataset);
    
    for(var i = 0; i < dataset.length; i++) {
        for(var j = i + 1; j < dataset.length; ) {
            if(dataset[i][0] == dataset[j][0] && dataset[i][1] == dataset[j][1])
                dataset.splice(j, 1);
            else
                j++;
        }
    }
    
    return dataset;    
}

cloneDataset = function(dataset) {
    var output = new Array();
    
    for(var i = 0; i < dataset.length; i++) {
        output[i] = new Array();
        for(var j = 0; j < dataset[i].length; j++) {
            output[i].push(dataset[i][j]);
        }
    }

    return output;
}
/*
getGroupIndices = function(inDataset, column) {

    var dataset = cloneDataset(inDataset);
    var groupIndices = new Array();
    
    //sort the rest of the selected columns
    //for (var i = 1; i < columns.length; i++) {
        //pointer for iterating through dataset
    var ptr = 0;
    
    //creating array groups
    while (ptr < dataset.length) {
        if ((dataset[ptr+1] != null) && dataset[ptr][column] == dataset[ptr+1][column]) {
            ptr++;
        } else { //group found
            groupIndices.push(ptr+1);
            ptr++;
        }
    }
        
        //sorting each group of rows then pushing it into the set
        for(var l = 0; l < groups.length; l++) {
            sortSingle(groups[l], columns[i]);
            outputDataset = outputDataset.concat(groups[l]);
        }
        
        //dataset = outputDataset;
    //}
    
    return groupIndices;    
}
*/
getGroupIndices = function(inDataset, columns) {

    var dataset = cloneDataset(inDataset);
    var groupIndices = new Array();
        
    //creating array groups
    for(var i = 0; i < columns.length; i++) {
        var ptr = 0;
        groupIndices[i] = new Array();
        while (ptr < dataset.length) {
            if ((dataset[ptr+1] != null) && dataset[ptr][columns[i]] == dataset[ptr+1][columns[i]]) {
                ptr++;
            } else { //group found
                groupIndices[i].push(ptr+1);
                ptr++;
            }
        }
    }
    
    return groupIndices;    
}

/** Check to see if a data value is numeric or a string */
checkNaN = function(str) {
    var x = isNaN(parseFloat(str));
    if(x) {
        return "s";
    }
    else {
        return;
    }
}

function importCSV(import_file)
{
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) 
    {
        var import_reader = new FileReader();
        import_reader.onload = function(e) {
            parseImportFile( e.target.result );
        };
        import_reader.readAsText(import_file);
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }
};

function parseImportFile(import_text)
{    
    var csv_text = import_text.replace("\r", "");
    csv_text = csv_text.split("\n");
    
    var schema = [];
    var data = [];
    
    var schema_split_pts = [];
    var data_split_pts = [];
    var inside_quotes = false;
    
    var i,j;
    
    //schema splits
    for(i = 0; i < csv_text[0].length; i++)
    {
        if(csv_text[0].charAt(i) === '"')
        {
            if(inside_quotes === false)
                inside_quotes = true;
            else
                inside_quotes = false;
        }
        if(csv_text[0].charAt(i) === "," && inside_quotes === false)
            schema_split_pts.push(i);
    }
    //schema push
    schema.push( csv_text[0].substring(0, schema_split_pts[i-1] - 1) );
    for(i = 1; i < schema_split_pts.length; i++)
    {
        schema.push( csv_text[0].substring( schema_split_pts[i-1] + 1, schema_split_pts[i] ) );
    }
    schema.push( csv_text[0].substring(schema_split_pts[schema_split_pts.length-1] + 1, csv_text[0].length) );

    
    //////
    //////
    
    //data splits
    for(i = 1; i < csv_text.length; i++)
    {    
        data_split_pts[i] = new Array();
        
        for(j = 0; j < csv_text[i].length; j++)
        {
            if(csv_text[i].charAt(j) === '"')
            {
                if(inside_quotes === false)
                    inside_quotes = true;
                else
                    inside_quotes = false;
            }
            if(csv_text[i].charAt(j) === "," && inside_quotes === false)
            {
                data_split_pts[i].push(j);
            }
        }
    }
    //data push
    for(i = 1; i < csv_text.length; i++)
    {
        data[i] = new Array();
        //data.push( csv_text[i] );
        data[i].push( csv_text[i].substring( 0, data_split_pts[i][0] - 1) );
        
        for(j = 1; j < data_split_pts[i].length; j++)
        {
            data[i].push( csv_text[i].substring( data_split_pts[i][j-1] + 1, data_split_pts[i][j] ) );
        }
        
        data[i].push( csv_text[i].substring( data_split_pts[i][j-1] + 1, csv_text[i].length) );
    }
    data.shift();
    
    // TODO: what happens if there's an error? can we alert the user?  
    var name = prompt("Enter name for dataset:");
    
    addCustomBlock(name, schema, data);
    changeCustomBlock();
}

function getCustomData(text)
{
    return customDataDatas[ customDataNames.indexOf(text) ];
}

function getCustomSchema(text)
{
    return customDataSchemas[ customDataNames.indexOf(text) ];
}

function addCustomBlock(name, schema, data)
{
    var index = customDataNames.indexOf(name);
    //if name is already in the references, change it
    if( index > -1 )
    {
        customDataNames[index] = name;
        customDataSchemas[index] = schema;
        customDataDatas[index] = data;
    }
    //if name is not in references, create it
    else
    {
        customDataNames.push(name);
        customDataSchemas.push(schema);
        customDataDatas.push(data);
    }
}

function changeCustomBlock()
{
    var block = null;
    block = getBlockBySelector("customData");
    var part = new InputSlotMorph(null, false, customDataNames);

    block.removeChild(block.children[0]);
    block.add(part);
    block.fixLayout();
}

//iterate through copiedBlocks, look for selector
function getBlockBySelector(selector)
{
    for(var i = 0; i < copiedBlocks.length; i++)
    {
        for(var j = 0; j < copiedBlocks[i].length; j++)
        {
            if( copiedBlocks[i][j].selector == selector)
                return copiedBlocks[i][j];
        }
    }
    
    return null;
}

//get an array with all of the blocks
function initCopyBlocks()
{
    changeCategory("custom");
    copiedBlocks[0] = getPalette();
    changeCategory("basics");
}

function changeCategory(category)
{
    world.children[0].currentCategory = category;
    world.children[0].categories.children.forEach(function (each) {
        each.refresh();
    });
    world.children[0].refreshPalette(true);
}

function getPalette()
{
    return window.world.children[0].palette.contents.children;
}