import { Position } from "reactflow";
import React, { useEffect, useRef } from "react";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { useStore } from "../../../store/pipelineStore";
import styles from "./TextNode.module.css";

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.text]);

  const variableRegex = /\{\{(\w+)\}\}/g;
  const variables = [
    ...new Set(Array.from(data.text.matchAll(variableRegex), (m) => m[1])),
  ];
  const wordCount = data.text.trim().split(/\s+/).filter(Boolean).length;

  const dynamicHandles = variables.map((variable, index) => ({
    type: "target",
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${30 + index * 25}px` },
  }));

  const handles = [
    ...dynamicHandles,
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      style: { top: "50%" },
    },
  ];

  return (
    <div className={wrapperStyles.wrapper}>
      <div id={`${id}-content`} label="Text Content">
        <textarea
          ref={textareaRef}
          value={data.text}
          onChange={(e) => updateNodeField(id, "text", e.target.value)}
          placeholder="Enter text with {{variables}} for dynamic inputs..."
          rows={4}
          className={styles.textarea}
          style={{ overflowY: "hidden" }}
        />
      </div>

      {/* Variable Detection Info */}
      {variables.length > 0 && (
        <div className={styles.variableInfo}>
          <strong>Variables detected:</strong>
          <div className={styles.variableTags}>
            {variables.map((variable) => (
              <span key={variable} className={styles.variableTag}>
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className={styles.stats}>
        <span>Words: {wordCount}</span>
        <span>Characters: {data.text.length}</span>
        <span>Variables: {variables.length}</span>
      </div>
    </div>
  );
};
