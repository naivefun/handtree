import type { Story } from "@ladle/react";
import React, { useState } from "react";
import { ITreeContext, TreeContext } from "../TreeContext";
import TreeNode from "../TreeNode";

// Types for JSON Schema structure
interface SchemaProperty {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  properties?: SchemaProperty[];
}

// ObjectSchemaNode component that uses TreeNode
interface ObjectSchemaNodeProps {
  schema: SchemaProperty;
  level: number;
  lastNode?: boolean;
  expanded?: boolean;
  onToggleExpanded?: () => void;
}

function ObjectSchemaNode({
  schema,
  level,
  lastNode,
  expanded = true,
  onToggleExpanded,
}: ObjectSchemaNodeProps) {
  const hasProperties = schema.properties && schema.properties.length > 0;
  const isObject = schema.type === 'object';

  // Color mapping for types
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string': return '#d73a49';
      case 'number': return '#005cc5';
      case 'boolean': return '#e36209';
      case 'object': return '#0066cc';
      case 'array': return '#6f42c1';
      default: return '#6a737d';
    }
  };

  const title = (
    <span className="flex items-center gap-1 px-2">
      <span className={`text-blue-600 ${isObject ? 'font-bold' : 'font-normal'}`}>
        {schema.name}
      </span>
      <span className="text-gray-500">:</span>
      <span 
        className={`${isObject ? 'font-bold' : 'font-normal'}`}
        style={{ color: getTypeColor(schema.type) }}
      >
        {schema.type}
      </span>
      {!schema.required && <span className="text-gray-400 text-xs">optional</span>}
    </span>
  );

  const details = schema.description ? (
    <div className="text-xs text-gray-600 font-sans italic py-1">
      {schema.description}
    </div>
  ) : undefined;

  return (
    <TreeNode
      level={level}
      lastNode={lastNode}
      expandable={hasProperties}
      expanded={expanded}
      onToggleExpanded={onToggleExpanded}
      title={title}
      details={details}
    >
      {hasProperties && expanded && schema.properties?.map((property, index) => (
        <ObjectSchemaNode
          key={property.id}
          schema={property}
          level={level + 1}
          lastNode={index === schema.properties!.length - 1}
        />
      ))}
    </TreeNode>
  );
}

// Sample schema data
const userSchema: SchemaProperty = {
  id: 'user',
  name: 'User',
  type: 'object',
  description: 'User profile schema with personal information',
  properties: [
    {
      id: 'id',
      name: 'id',
      type: 'string',
      required: true,
      description: 'Unique user identifier'
    },
    {
      id: 'email',
      name: 'email',
      type: 'string',
      required: true,
      description: 'User email address'
    },
    {
      id: 'profile',
      name: 'profile',
      type: 'object',
      description: 'User profile information',
      properties: [
        {
          id: 'firstName',
          name: 'firstName',
          type: 'string',
          required: true
        },
        {
          id: 'lastName',
          name: 'lastName',
          type: 'string',
          required: true
        },
        {
          id: 'age',
          name: 'age',
          type: 'number',
          description: 'User age in years'
        },
        {
          id: 'address',
          name: 'address',
          type: 'object',
          description: 'User address information',
          properties: [
            {
              id: 'street',
              name: 'street',
              type: 'string',
              required: true
            },
            {
              id: 'city',
              name: 'city',
              type: 'string',
              required: true
            },
            {
              id: 'country',
              name: 'country',
              type: 'string',
              required: true
            },
            {
              id: 'zipCode',
              name: 'zipCode',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      id: 'settings',
      name: 'settings',
      type: 'object',
      description: 'User preferences and settings',
      properties: [
        {
          id: 'theme',
          name: 'theme',
          type: 'string',
          description: 'UI theme preference'
        },
        {
          id: 'notifications',
          name: 'notifications',
          type: 'boolean',
          description: 'Enable email notifications'
        }
      ]
    },
    {
      id: 'tags',
      name: 'tags',
      type: 'array',
      description: 'User tags for categorization'
    }
  ]
};

export const Basic: Story = () => {
  const treeContext: ITreeContext = {
    indent: 30,
    ancestorLastTrail: [],
    classNames: {},
  };

  return (
    <TreeContext.Provider value={treeContext}>
      <div className="p-5 font-mono text-sm bg-gray-50 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
        <ObjectSchemaNode
          schema={userSchema}
          level={0}
        />
      </div>
    </TreeContext.Provider>
  );
};

export const Interactive: Story = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    user: true,
    profile: true,
    address: false,
    settings: false
  });

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // Create interactive version of ObjectSchemaNode
  const InteractiveObjectSchemaNode = ({ 
    schema, 
    level, 
    lastNode 
  }: { 
    schema: SchemaProperty; 
    level: number; 
    lastNode?: boolean; 
  }) => {
    const hasProperties = schema.properties && schema.properties.length > 0;
    const isExpanded = expandedNodes[schema.id] ?? true;

    // Color mapping for types
    const getTypeColor = (type: string) => {
      switch (type) {
        case 'string': return '#d73a49';
        case 'number': return '#005cc5';
        case 'boolean': return '#e36209';
        case 'object': return '#0066cc';
        case 'array': return '#6f42c1';
        default: return '#6a737d';
      }
    };

    const isObject = schema.type === 'object';

    const title = (
      <span className="flex items-center gap-1 px-2">
        <span className={`text-blue-600 ${isObject ? 'font-bold' : 'font-normal'}`}>
          {schema.name}
        </span>
        <span className="text-gray-500">:</span>
        <span 
          className={`${isObject ? 'font-bold' : 'font-normal'}`}
          style={{ color: getTypeColor(schema.type) }}
        >
          {schema.type}
        </span>
        {!schema.required && <span className="text-gray-400 text-xs">optional</span>}
      </span>
    );

    const details = schema.description ? (
      <div className="text-xs text-gray-600 font-sans italic py-1">
        {schema.description}
      </div>
    ) : undefined;

    return (
      <TreeNode
        level={level}
        lastNode={lastNode}
        expandable={hasProperties}
        expanded={isExpanded}
        onToggleExpanded={hasProperties ? () => toggleExpanded(schema.id) : undefined}
        title={title}
        details={details}
      >
        {hasProperties && isExpanded && schema.properties?.map((property, index) => (
          <InteractiveObjectSchemaNode
            key={property.id}
            schema={property}
            level={level + 1}
            lastNode={index === schema.properties!.length - 1}
          />
        ))}
      </TreeNode>
    );
  };

  const treeContext: ITreeContext = {
    indent: 24,
    ancestorLastTrail: [],
    classNames: {},
  };

  return (
    <TreeContext.Provider value={treeContext}>
      <div className="p-5 font-mono text-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700">
        <div className="mb-4 font-sans text-base font-bold text-gray-900 dark:text-white">
          Interactive JSON Schema Explorer
        </div>
        <InteractiveObjectSchemaNode
          schema={userSchema}
          level={0}
          lastNode={true}
        />
        
        <div className="mt-5 p-3 bg-gray-50 rounded border font-sans text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
          <span className="font-semibold">Expanded nodes:</span> {Object.entries(expandedNodes)
            .filter(([, expanded]) => expanded)
            .map(([id]) => id)
            .join(', ') || 'none'}
        </div>
      </div>
    </TreeContext.Provider>
  );
};

export const Minimal: Story = () => {
  const simpleSchema: SchemaProperty = {
    id: 'api',
    name: 'API Response',
    type: 'object',
    properties: [
      {
        id: 'data',
        name: 'data',
        type: 'object',
        required: true,
        properties: [
          { id: 'id', name: 'id', type: 'string', required: true },
          { id: 'title', name: 'title', type: 'string', required: true },
          { id: 'completed', name: 'completed', type: 'boolean' }
        ]
      },
      {
        id: 'meta',
        name: 'meta',
        type: 'object',
        properties: [
          { id: 'timestamp', name: 'timestamp', type: 'string' },
          { id: 'version', name: 'version', type: 'string' }
        ]
      }
    ]
  };

  const treeContext: ITreeContext = {
    indent: 16,
    ancestorLastTrail: [],
    classNames: {},
  };

  return (
    <TreeContext.Provider value={treeContext}>
      <div className="p-4 font-mono text-xs">
        <ObjectSchemaNode
          schema={simpleSchema}
          level={0}
        />
      </div>
    </TreeContext.Provider>
  );
};

export default {
  title: "JSON Schema",
};