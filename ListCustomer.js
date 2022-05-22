import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';

const ListCustomer = () => {
  const [token, setToken] = useState('');
  const [expired, setExpired] = useState('');
  const [customer, setCustomer] = useState([]);
  const history = useNavigate();

  const axiosJwt = axios.create();

  useEffect(() => {
    refreshToken();
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      // setName(decode.name);
      setRole(decode.role);
      setExpired(decode.exp);
    } catch (error) {
      if (error.response) {
        history('/');
      }
    }
  }

  axiosJwt.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expired * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      // setName(decode.name);
      setRole(decode.role);
      setExpired(decode.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
  );

  const getCustomer = async () => {
    const response = await axiosJwt.get('http://localhost:5000/Customer', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCustomer(response.data);
  }

  function addCustomer() {
    history('/add-Customer/_add');
  }

  function editCustomer(id) {
    history(`/add-Customer/${id}`);
  }

  function viewCustomer(id) {
    history(`/view-Customer/${id}`);
  }

  const deleteCustomer = async (id) => {


    var proceed = window.confirm('Apakah anda yakin hapus?');
    if (proceed) {
      const response = await axiosJwt.delete('http://localhost:5000/Customer/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      swal(response.data.msg);
      const NewCustomer = customer.filter(Customer => Customer.id !== id);
      setCustomer(NewCustomer);
    } else {
      // swal('batal hapus');
    }
  }

  const columns = [
    {
      name: 'Id',
      width: '50px',
      cell: (row) => {
        return <div>{row.id}</div>;
      },
      shortable: true
    },
    {
      name: 'Name',
      selector: row => row.nama,
      width: '200px',
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.harga,
      width: '200px',
      sortable: true
    },
    {
      name: 'Action',
      width: '400px',
      cell: (row) =>
        <div>
          <button onClick={() => editCustomer(row.id)}
            className='button is-default'>Edit</button>
          <button style={{ marginleft: "10px" }}
            onClick={() => deleteCustomer(row.id)}
            className='button is-danger'>Delete</button>
          <button style={{ marginleft: "10px" }}
            onClick={() => viewCustomer(row.id)}
            className='button is-success'>View</button>

        </div>
      ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const data = customer;

  // const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  function MyComponent() {
      return (
        <div>
          <h3>Data Customer</h3>
          <button onClick={addCustomer} className='button is-info'>Add Customer</button>
          <DataTable
            columns={columns}
            data={data}
            pagination
          />
        </div>
      );
  };

  return (
    <div className='container mt-5'>
      <h1>Customer</h1>
      <hr></hr>
      {MyComponent()}


    </div>
  )
}

export default ListCustomer
