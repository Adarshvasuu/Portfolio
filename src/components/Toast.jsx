export default function Toast({ msg, icon }) {
  return (
    <div className="toast" role="alert" aria-live="polite">
      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
      <span>{msg}</span>
    </div>
  );
}
