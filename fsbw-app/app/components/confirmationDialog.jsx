export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
}
