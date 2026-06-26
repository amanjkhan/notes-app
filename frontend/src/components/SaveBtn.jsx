export default function SaveBtn({ disabled }) {
  if (disabled) {
    return (
      <button type="submit" className="btn btn-disabled" disabled>
        <i className="fa-regular fa-floppy-disk"></i>
      </button>
    );
  }

  return (
    <button type="submit" className="btn btn-primary">
      <i className="fa-regular fa-floppy-disk"></i>
    </button>
  );
}
