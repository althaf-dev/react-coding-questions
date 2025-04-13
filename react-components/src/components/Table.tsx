import { User } from "./Users";


interface TableProps {
  data: User[];
}

export function Table({ data }: TableProps) {
  const columns = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  );
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td>{(typeof row[col] === "string" || typeof row[col] === "number" )  ?row[col]:"-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
