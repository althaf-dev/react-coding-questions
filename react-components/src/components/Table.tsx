import { useEffect, useState } from 'react';
import { User } from './Users';
import Search from './Search';

interface TableProps {
  data: User[];
}

export function Table({ data }: TableProps) {

  const [debouncedSearch, setDebouncedSearch] = useState('');
 
  const columns = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  );


  const searchedData = data.filter((item) => item.name.includes(debouncedSearch));
  return (
    <div className="table-container">
     <Search setDebouncedSearch={setDebouncedSearch}/>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchedData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col}>
                  {typeof row[col] === 'string' || typeof row[col] === 'number'
                    ? row[col]
                    : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
