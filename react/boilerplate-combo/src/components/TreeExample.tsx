import * as React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';

// Function to generate tree data recursively with a specified depth
const generateTree = (
    depth: number,
    breadth = 2,
    level = 1,
    prefix = ''
): React.ReactNode[] => {
    if (depth === 0) return [];

    return Array.from({ length: breadth }).map((_, i) => {
        const nodeId = `${prefix}${i + 1}`;
        console.log("Rendering Tree")
        return (
            <TreeItem key={nodeId} itemId={nodeId} label={`Node L${level}-${nodeId}`}>
                {generateTree(depth - 1, breadth, level + 1, `${nodeId}.`)}
            </TreeItem>
        );
    });
};

const TreeComponent: React.FC = () => {
    return (
        <div>
            Tree Interface
            <SimpleTreeView>
                {generateTree(7)} {/* 7 levels of depth */}
            </SimpleTreeView>
        </div>
    );
};

export default TreeComponent;
