export default function InputUnit(type: string, labelText: string) {
  return (
    <div className="col">
      <div className="form-outline">
        <input type={type} id={labelText} className="form-control" />
        <label className="form-label" htmlFor={labelText}>
          {labelText}
        </label>
      </div>
    </div>
  );
}
