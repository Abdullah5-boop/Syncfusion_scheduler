export default function AddEventPopup({ args }) {
  console.log("_".repeat(50), "\n", "props");
  console.log(args);
  console.log("_".repeat(50));

  const rows = [
    { label: "Person Name", value: "A" },
    { label: "DOB", value: "10/10/1900" },
    { label: "Gender", value: "Male" },
    { label: "Blood Group", value: "O+" },
    { label: "Nationality", value: "Bangladeshi" },
    { label: "Phone Number", value: "+880 1700 000000" },
    { label: "Email", value: "example@email.com" },
    { label: "Address", value: "Dhaka, Bangladesh" },
    { label: "Occupation", value: "Software Engineer" },
    { label: "Marital Status", value: "Single" },
  ];

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <th className="px-6 py-3 font-medium">Column</th>
            <th className="px-6 py-3 font-medium text-center">:</th>
            <th className="px-6 py-3 font-medium">Value</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {row.label}
              </th>
              <td className="px-6 py-4 text-center">:</td>
              <td className="px-6 py-4">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
