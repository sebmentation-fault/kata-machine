export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    if (head.value === needle) { return true; }

    function ifExistsPursue(node: BinaryNode<number> | null): boolean {
        if (!node) { return false; }

        return bfs(node, needle);
    }

    if (head.value > needle) {
        return ifExistsPursue(head.left);
    }

    return ifExistsPursue(head.right);
}
