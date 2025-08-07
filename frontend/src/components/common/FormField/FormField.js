import React from "react";
import styles from "./FormField.module.css";

const FormField = ({ id, label, children }) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {React.cloneElement(children, {
        id: id,
        className: `${styles.input} ${children.props.className || ""}`,
      })}
    </div>
  );
};

export default FormField;
