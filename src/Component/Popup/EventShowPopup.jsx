


export default function AddEventPopup(props) {
  // ✅ Syncfusion event data lives here
  const data = props;

  // console.log("_".repeat(50));
  // console.log("AddEventPopup props:", data);
  // console.log("_".repeat(50));

  if (!data || typeof data !== "object") {
    return (
      <div className="p-4 text-sm text-gray-500">
        No event data available
      </div>
    );
  }

  // 🔹 Format column labels (START_DATE → Start Date)
  const formatLabel = (key) => {
    return key
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // 🔹 Format values safely
  const formatValue = (value) => {
    if (value === null || value === undefined) return "-";

    if (value instanceof Date) {
      return value.toLocaleString();
    }

    if (typeof value === "object") {
      return (
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    return String(value);
  };

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left text-body">
        <thead className="text-sm bg-neutral-secondary-soft border-b border-default">
          <tr>
            <th className="px-6 py-3 font-medium">Column</th>
            <th className="px-6 py-3 font-medium text-center">:</th>
            <th className="px-6 py-3 font-medium">Value</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr
              key={key}
              className="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {formatLabel(key)}
              </th>

              <td className="px-6 py-4 text-center">:</td>

              <td className="px-6 py-4">
                {formatValue(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
