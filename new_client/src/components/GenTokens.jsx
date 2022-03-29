import React from "react";
import { Table, Tag, Space } from 'antd';

const GenTokens = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      btn: <button>Generate Tokens</button>,
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      btn: <button>Generate Tokens</button>,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Generate Tokens",
      dataIndex: "btn"
    }
  ];
  

  return (<div>
    <h1>GenTokens</h1>
    <Table dataSource={dataSource} columns={columns} />;
  </div>);
};

export default GenTokens;
