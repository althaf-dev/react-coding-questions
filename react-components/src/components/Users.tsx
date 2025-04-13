import { useEffect, useState } from 'react';
import { Table } from './Table';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  [index: string]: string;
  id: string;
  name: string;
  userName: string;
  email: string;
}

interface UserState {
  loading: boolean;
  users: User[];
  error: null | string;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
};

export function Users() {
  const [state, setState] = useState(initialState);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        if (!res.ok) throw new Error('resource not found');
        const data = await res.json();
        setState({
          loading: false,
          error: null,
          users: data,
        });
      } catch (e) {
        if(e instanceof Error){
            setState({
                loading:false,
                users:[],
                error:e.message
            })
        }else {
            setState({
                loading:false,
                users:[],
                error:"something went wrong"
            })
        }
      }

      setState(prev=>({
        ...prev,
        error:null,
        loading:true
      }));

   
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>useres</h1>
      <Table data={state.users} />
    </div>
  );
}
