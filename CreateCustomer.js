import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

const CreateCustomer = () => {
  let params = useParams();
  const [id, setId] = useState(params.id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(0);
  const history = useNavigate();
  const [token, setToken] = useState('');
  const [expired, setExpired] = useState('');
  const axiosJwt = axios.create();

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      // setName(decode.name);
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
      setExpired(decode.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
  );

  useEffect(() => {
    refreshToken();
    cekId();
    // eslint-disable-next-line
  }, []);

  const cekId = async () => {
    if (id === '_add') {
      setName('');
      setEmail(0);
      return
    } else {
      const res = await axiosJwt.get('http://localhost:5000/Customer' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let Customer = res.data;
      setId(Customer.id);
      setName(Customer.name);
      setEmail(Customer.email);
    }

  }

  const saveOrUpdateCustomer = async (e) => {
    e.preventDefault();
    let Customer = {
      name: name,
      email: email,
    }

    if (id === '_add') {
      await axios.post('http://localhost:5000/Customer', Customer,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          swal(res.data.msg);
          history('/customer');
        });
    } else {
      await axios.put('http://localhost:5000/Customer' + id, Customer,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          swal(res.data.msg);
          history('/customer');
        });

    }
  }


  function cancel() {
    history('/customer');
  }

  function getTitle() {
    if (id === "_add") {
      return <h3 className="text-center">Add Customer</h3>
    } else {
      return <h3 className="text-center">Update Customer</h3>
    }
  }

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Name </label>
                <input placeholder="Name" name="name" className="form-control"
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input placeholder="Email" name="email" type="text" className="form-control"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <br></br>
              <button className="btn btn-success" onClick={saveOrUpdateCustomer} >Simpan</button>
              <button className="btn btn-danger" onClick={cancel}>Batal</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCustomer
