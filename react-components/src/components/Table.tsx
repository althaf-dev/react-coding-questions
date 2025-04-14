import { useEffect, useState } from 'react';
import { User } from './Users';
import Search from './Search';

interface TableProps {
  data: User[];
}

export function Table({ data }: TableProps) {
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortData, setSortData] = useState({
    order:"asc",
    fieldName:""
  });

  const columns = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  );

  const handleSort = (fieldName:string) => {
    setSortData((prev) => ({
      fieldName:fieldName,
      order:prev.order === "asc" ?"dsc":"asc"
    }));
  };


  const searchedData = data.filter((item) =>
    item.name.includes(debouncedSearch)
  );

  const sortedData = searchedData.sort((a,b)=>{
    if(a[sortData.fieldName]>b[sortData.fieldName] && sortData.order === "asc"){
        return 1;
    }

    if(a[sortData.fieldName]<b[sortData.fieldName] && sortData.order === "asc"){
        return -1;
    }
  
    if(a[sortData.fieldName]>b[sortData.fieldName] && sortData.order === "dsc"){
        return -1;
    }

    if(a[sortData.fieldName]<b[sortData.fieldName] && sortData.order === "dsc"){
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
                { (
                  <button onClick={handleSort.bind(null,col)}>
                    <span
                      style={{ color: (sortData.order === 'asc' && sortData.fieldName === col) ? 'purple' : '#ddd' }}
                    >
                      {'\u2191'}
                    </span>
                    <span
                      style={{ color: (sortData.order === 'dsc' && sortData.fieldName === col) ? 'purple' : '#ddd' }}
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
