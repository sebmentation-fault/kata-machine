export default function post_order_search(head: BinaryNode<number>): number[] {
    return po(head, []);
}

function po(node: BinaryNode<number> | null, ns: number[]): number[] {
    if (!node) { return ns; }

    po(node.left, ns);
    po(node.right, ns);
    ns.push(node.value);

    return ns;
}
