function createTree(nodes) {
    var map = {}, node, roots = [], parent;
    for (var i = 0; i < nodes.length; i += 1) {
        node = nodes[i];
        //console.log("OBJETO:");
        //console.log(node);
        node.children = [];
        node.id = i;
        map[node.idEntidad] = i; // use map to look-up the parents
        if (node.idEntidadPadre != "0") {
            parent = nodes[map[node.idEntidadPadre]];
            //node.treeLevel = parent.treeLevel + 1;
            parent.children.push(node);
        } else {
            //node.treeLevel = 1;
            roots.push(node);
        }
    }

    return roots;
}


function treeFilter(list, labels) {
    var currentPath = [];

    function depthFirstTraversal(o, fn) {
        currentPath.push(o);
        if (o.children) {
            for (var i = 0, len = o.children.length; i < len; i++) {
                depthFirstTraversal(o.children[i], fn);
            }
        }
        fn.call(null, o, currentPath);
        currentPath.pop();
    }

    function shallowCopy(o) {
        console.log(JSON.stringify(o, null, 4));
        var result = {};
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                result[k] = o[k];
            }
        }
        return result;
    }

    function copyNode(node) {
        var n = shallowCopy(node);
        if (n.children) {
            n.children = [];
        }
        return n;
    }

    function filterTree(root, labels) {
        root.copied = copyNode(root); // create a copy of root
        var filteredResult = root.copied;

        depthFirstTraversal(root, function (node, branch) {
            //console.log("node.$$hashKey: " + node.$$hashKey);
            // if this is a leaf node _and_ we are looking for its ID
            //if( labels[0].toLowerCase().indexOf(node.descripcion.toLowerCase()) !== -1 ) {  // has the same description
            if (node.descripcion.toLowerCase().indexOf(labels[0].toLowerCase()) !== -1) {    // filter is content in any description
                // use the path that the depthFirstTraversal hands us that
                // leads to this leaf.  copy any part of this branch that
                // hasn't been copied, at minimum that will be this leaf
                for (var i = 0, len = branch.length; i < len; i++) {
                    if (branch[i].copied) {
                        continue;
                    } // already copied

                    branch[i].copied = copyNode(branch[i]);
                    // now attach the copy to the new 'parellel' tree we are building
                    branch[i - 1].copied.children.push(branch[i].copied);
                }
            }
        });

        depthFirstTraversal(root, function (node, branch) {
            delete node.copied; // cleanup the mutation of the original tree
        });
        return filteredResult;
    }

    var filteredList = [];
    for (var i = 0, len = list.length; i < len; i++) {
        var filtered = filterTree(list[i], labels);
        if ((filtered && filtered.children && filtered.children.length > 0) ||
            filtered.descripcion.toLowerCase() === labels[0].toLowerCase()) {
            filteredList.push(filtered);
        }
    }

    return filteredList;
}

Number.prototype.customRound = function (numberOfDecimal) {
    var number = this;
    if( !number ) {
        return number;
    }

    var round = Math.round( number * Math.pow(10, numberOfDecimal) ) / Math.pow(10, numberOfDecimal);

    if ( numberOfDecimal === 5 ) {
        var sRound = round+'',
          sLength = sRound.length;

        if( sRound.substring(sLength-5, sLength) === '99999' ){
            round = Math.ceil(round);
        }
    }

    return parseFloat(round);
};