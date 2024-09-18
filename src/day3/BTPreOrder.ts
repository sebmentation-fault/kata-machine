export default function pre_order_search(head: BinaryNode<number>): number[] {
    // pre order so we do it row by row as we come by them
    // sounds like breadth search to me
    return po(head, []);
}

function po(node: BinaryNode<number> | null, ns: number[]): number[] {
    if (!node) { return ns; }

    ns.push(node.value);
    po(node.left, ns);
    return po(node.right, ns);
}
