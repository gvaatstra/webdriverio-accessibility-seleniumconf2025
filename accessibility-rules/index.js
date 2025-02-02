export default {
    rules: {
        'require-table-th': {
            meta: {
                type: 'suggestion',
                docs: {
                    description: 'Enforce table elements to have th elements (recursive)',
                },
                messages: {
                    missingTh: 'Tables that are not for layout and do contain data, must have th elements (recursive)',
                },
            },
            create(context) {
                function hasThRecursive(node) {
                    if (node.type === 'Tag' && node.name === 'th') {
                        return true;
                    }
                    if (node.children && node.children.length > 0) {
                        for (const child of node.children) {
                            if (hasThRecursive(child)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                return {
                    '*'(node) {
                        if (node.type === 'Tag' && node.name === 'table') {
                            if (!hasThRecursive(node)) {
                                context.report({
                                    node,
                                    messageId: 'missingTh',
                                });
                            }
                        }
                    }
                };
            }
        }
    }
}