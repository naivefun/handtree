import type { Story } from "@ladle/react";
import React, { useState } from "react";
import { ITreeContext, TreeContext } from "../TreeContext";
import TreeNode from "../TreeNode";

// Simple manual tree demo
export const Basic: Story = () => {
  const treeContext: ITreeContext = {
    indent: 20,
    ancestorLastTrail: [],
    classNames: {},
  };

  return (
    <TreeContext.Provider value={treeContext}>
      <div className="p-5 bg-white dark:bg-gray-900">
        <TreeNode level={0} expandable expanded title={<span>📁 src</span>}>
          <TreeNode
            level={1}
            expandable
            expanded
            title={<span>📁 components</span>}
          >
            <TreeNode level={2} title={<span>📄 Button.tsx</span>} />
            <TreeNode level={2} lastNode title={<span>📄 Input.tsx</span>} />
          </TreeNode>
          <TreeNode level={1} expandable expanded title={<span>📁 utils</span>}>
            <TreeNode level={2} lastNode title={<span>📄 helpers.ts</span>} />
          </TreeNode>
          <TreeNode level={1} lastNode title={<span>📄 App.tsx</span>} />
        </TreeNode>
      </div>
    </TreeContext.Provider>
  );
};

// Collapsible demo
export const Collapsible: Story = () => {
  const [expanded, setExpanded] = useState({
    components: true,
    utils: false,
  });

  const toggle = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const treeContext: ITreeContext = {
    indent: 24,
    ancestorLastTrail: [],
    classNames: {},
  };

  return (
    <TreeContext.Provider value={treeContext}>
      <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <TreeNode
          level={0}
          expandable
          expanded
          title={<span>🏠 Project Root</span>}
          details={
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Main project directory
            </div>
          }
        >
          <TreeNode
            level={1}
            expandable
            expanded={expanded.components}
            onToggleExpanded={() => toggle("components")}
            title={
              <span>
                📁 components ({expanded.components ? "expanded" : "collapsed"})
              </span>
            }
          >
            {expanded.components && (
              <>
                <TreeNode
                  level={2}
                  title={<span>⚛️ Button.tsx</span>}
                  details={
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Reusable button component
                    </div>
                  }
                />
                <TreeNode
                  level={2}
                  lastNode
                  title={<span>⚛️ Input.tsx</span>}
                />
              </>
            )}
          </TreeNode>
          <TreeNode
            level={1}
            expandable
            expanded={expanded.utils}
            onToggleExpanded={() => toggle("utils")}
            title={
              <span>
                🔧 utils ({expanded.utils ? "expanded" : "collapsed"})
              </span>
            }
          >
            {expanded.utils && (
              <TreeNode level={2} lastNode title={<span>🛠️ helpers.ts</span>} />
            )}
          </TreeNode>
          <TreeNode level={1} title={<span>📋 README.md</span>} />
          <TreeNode
            level={1}
            lastNode
            title={<span>⚙️ package.json</span>}
            details={
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Project configuration
              </div>
            }
          />
        </TreeNode>
      </div>
    </TreeContext.Provider>
  );
};


export default {
  title: "TreeNode",
};
