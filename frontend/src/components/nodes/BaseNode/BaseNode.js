import { Handle } from "reactflow";
import styles from "./BaseNode.module.css";

const BaseNode = ({ title, icon: Icon, children, handles, selected }) => {
  const nodeClasses = `${styles.node} ${selected ? styles.selected : ""}`;

  return (
    <div className={nodeClasses}>
      <div className={styles.header}>
        {Icon && <Icon className={styles.icon} />}
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>{children}</div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={styles.handle}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export default BaseNode;
