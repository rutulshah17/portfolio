interface ToastProps {
  message: string | null;
}

/** Visibility is derived from the message — no separate boolean state. */
export default function Toast({ message }: ToastProps) {
  return (
    <div className={`toast${message ? ' show' : ''}`} role="status" aria-live="polite">
      {message ?? ''}
    </div>
  );
}
