import { useEffect, useState } from 'react';
import { User } from './Users';
import Search from './Search';

interface TableProps {
  data: User[];
  rowsPerPage?:number
}

export function Table({ data,rowsPerPage = 5 }: TableProps) {
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page,setPage] = useState(1);
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
   const totaPages = Math.ceil(data.length/rowsPerPage); 
   const handlePageChange = (dir:string)=>{
        
    if(dir === "next" && page<totaPages  ) setPage(prev=>prev+1);

    if(dir === "prev" && page>1) setPage(prev=>prev-1);
   }

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
  });

  const paginatedData = sortedData.filter((item,i)=>(i< (page * rowsPerPage)) && (i>=(page-1)*rowsPerPage))

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
          {paginatedData.map((row) => (
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
      <div className="page-container">
        <button disabled={page === 1} onClick={handlePageChange.bind(null,"prev")}>prev</button>
        <button disabled ={page === totaPages} onClick={handlePageChange.bind(null,"next")}>next</button>
        <p>page - {page}</p>
      </div>
    </div>
  );
}
