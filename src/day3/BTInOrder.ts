export default function in_order_search(head: BinaryNode<number>): number[] {
    // in order search so we need to return a list of the list from bottom left
    // to top to bottom right
    return in_order(head, []);
}

function in_order(node: BinaryNode<number> | null, ns: number[]): number[] {
    if (!node) return ns;

    in_order(node.left, ns);
    ns.push(node.value);
    return in_order(node.right, ns);
}
