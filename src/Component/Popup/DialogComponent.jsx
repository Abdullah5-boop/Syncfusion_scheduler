import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useRef, useState, useEffect } from "react";

export default function DialogComponentFun({handleUserChoice, conflictDialog }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [message, setMessage] = useState(
    "This booking overlaps with an existing event. Please choose how you want to proceed."
  );

  // Show or hide dialog when `conflictDialog` changes
  useEffect(() => {
    if (dialogRef.current) {
      conflictDialog ? dialogRef.current.show() : dialogRef.current.hide();
    }
  }, [conflictDialog]);

  // Handle Enter key in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateMessage();
    }
  };

  const updateMessage = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      setMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  // Custom header with icon
  const headerTemplate = () => (
    <div style={{ display: "flex", alignItems: "center", backgroundColor:'red', width:'50vw'}}>
      <div style={{ marginRight: 10 }}>⚠</div>
      <div>Scheduling Conflict</div>
    </div>
  );

  // Custom footer with input and buttons
  const footerTemplate = () => (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <button
        className="e-btn e-primary"
        onClick={() => handleUserChoice("override")}
      >
        Override
      </button>
      <button
        className="e-btn"
        onClick={() => handleUserChoice("cancel")}
      >
        Cancel
      </button>
    </div>
  );

  return (
    <DialogComponent
      ref={dialogRef}
      header={headerTemplate}
      footerTemplate={footerTemplate}
      cssClass="conflict-dialog"
      isModal={true}
      showCloseIcon={true}
      width="50vw"

    >
      <div className="conflict-content">
        <p>{message}</p>
      </div>
    </DialogComponent>
  );
}
