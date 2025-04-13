import { useEffect, useState } from 'react';
import { User } from './Users';
import Search from './Search';

interface TableProps {
  data: User[];
}

export function Table({ data }: TableProps) {
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [order, setOrder] = useState('asc');

  const columns = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  );

  const handleSort = () => {
    setOrder((prev) => (prev === 'asc' ? 'dsc' : 'asc'));
  };


  const searchedData = data.filter((item) =>
    item.name.includes(debouncedSearch)
  );

  const sortedData = searchedData.sort((a,b)=>{
    if(a.name>b.name && order === "asc"){
        return 1;
    }

    if(a.name<b.name && order === "asc"){
        return -1;
    }
  
    if(a.name>b.name && order === "dsc"){
        return -1;
    }

    if(a.name<b.name && order === "dsc"){
        return 1;
    }

    return 1;
  })

  return (
    <div className="table-container">
      <Search setDebouncedSearch={setDebouncedSearch} />
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>
                <span>{col}</span>
                {col === 'name' && (
                  <button onClick={handleSort}>
                    <span
                      style={{ color: order === 'asc' ? 'purple' : '#ddd' }}
                    >
                      {'\u2191'}
                    </span>
                    <span
                      style={{ color: order === 'dsc' ? 'purple' : '#ddd' }}
                    >
                      {'\u2193'}
                    </span>
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
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
