/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import './upload.css';
import { Button, Form, Modal, Input, Upload, Table, Props, Popconfirm } from 'antd';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import Add from './add';
import Clock from 'react-live-clock';
import { LayoutContext } from 'antd/lib/layout/layout';

const Uploads = () => {
  const [showModal, setShowModal] = useState(false);

  const [values, setValues] = useState([]);
  const onCreate = (data) => {
    setValues([...values,
    {
      key: values.length + 1,
      ...data,
    }

    ]);
    setShowModal(false);
  };

  const columns = [
    {
      title: 'DocName',
      dataIndex: 'documentName',
      key: 'documentName',
      
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Time of issue',
      dataIndex: '',
      key: '',
      width: '15%',

    },
    {
      title: 'Date of issue',

      width: '20%',



      render: () =>
      (
        <Clock format={'HH:mm:ss-D/MM/YYYY'} />
      ),
    },
    {
      title: 'Edit',
      width: '18%',
      dataIndex: 'upload',
      key: 'upload',
      render: () => (
        <>
        </>
      ),
    },
    {
      title: 'Delete',
      width: '10%',
      dataIndex: 'operation',
       
       render: (_, record) => (
         
           <Button icon={<DeleteOutlined/>} type={"link"} 
             />
       ),  
    },
  ];
  


  return (
    <Fragment>

      <Button
        type="primary"
        style={{ marginBottom: 16, }}
        date


        onClick={() => {
          setShowModal(true);
        }}
      >
        Create Document
      </Button>

      <Table bordered dataSource={values} columns={columns} />



      <Add show={showModal}
        onCreate={onCreate}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </Fragment>

  );
};
export default Uploads;