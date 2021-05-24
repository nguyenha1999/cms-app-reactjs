/* eslint-disable no-unused-vars */
import React,{useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input ,Upload,message} from 'antd';
import {  UploadOutlined } from '@ant-design/icons';




 const Add = ({ show, onCreate, onCancel  }) => {
    const [form] = Form.useForm();
    const initialValues={documentName:"",code:""};
    // const[, forceUpdate] =  useState();
     
    // useEffect(() => {
    //     forceUpdate({})
        
    // }, [])
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        progress: {
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
      };
   
    return (
        <Modal
      visible={show}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues} >
        <Form.Item
          name="documentName"
          label="DocumentName"
          rules={[
            {
              required: true,
              message: 'Please input a name !',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
         name="code" 
         label="Code"
         rules={[
            {
              required: true,
              message: 'Please input a code',
            },
          ]}>

            
          <Input  />
        </Form.Item>
        <Form.Item 
        name="upload"
        label="Upload" >
          <>
          <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
         </Upload>
         </>
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

Add.propTypes  = {
    show:PropTypes.bool.isRequired,
    handleOnclose:PropTypes.func.isRequired,
    onCancel:PropTypes.func.isRequired,
    onCreate:PropTypes.func.isRequired,
    

};

export default Add;