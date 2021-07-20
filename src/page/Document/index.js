/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import {  Table, Popconfirm, Badge, Form,Modal,Input} from 'antd';
import { FileAddOutlined, DeleteOutlined, MessageOutlined , EditOutlined, CloudDownloadOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getListDocument,deleteDocument, createDocument, editDocument } from '../../redux/action/doc';
import moment from "moment";
import Button from '../../component/Button/button'

const Document = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.document.items);
  const total = useSelector(state => state.document.total);
  const [model, setModel] = useState({
    page: 1,
    pageSize: 5,
    search: ""
});
const [action, setAction] = useState("add");
const [showModal, setShowModal] = useState(false);
const [form, setForm] = useState({
    id: "",
    docname: "",
    code: "",
     })
useEffect(() => {
  dispatch(getListDocument(model))
}, [model])

    const handleDelete = (id) => {
      dispatch(deleteDocument(id , {_id: true}, ()=> { dispatch(getListDocument(model))})) 
      console.log(id,"id")
  }
  const addItem = () => {
    setShowModal(true)
  }
const submit = () => {
    if (action == "add") {
        dispatch(createDocument(form))
          } else { 
      dispatch(editDocument(form.id , form , ()=> { dispatch(getListDocument(model))})) 
    }
    setShowModal(false);
    setAction("add");
    setForm({
        ...form,
        id: "",
        docname: "",
        code: "",
    })
}
  const columns = [
    {
      title: 'Tên Tài Liệu',
      dataIndex: 'docname',
      key: 'docname',
    },
    {
      title: 'Mã Tài Liệu',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Lần Ban Hành',
      dataIndex: 'time',
      key: 'time',
      width: '15%',
      render: (time) => (
        <>
          <Badge status="processing" color={"green"}  />
          {time}
        </>
      ),
    },
    {
      title: 'Ngày Ban Hành',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
      render: (date) =>
      (
          <Button icon={<ScheduleOutlined />}
            type="link"
            onClick={e => e.preventDefault()} >
           {moment(date).format('H:m:s MM/DD/YYYY')}
                </Button>
          ),
    },
    {
      title: 'Chức Năng',
      width: '18%',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <>
          <Button icon={<MessageOutlined />} type="link" 
            placement= "top" 
           tooltip="Lịch sử"/>
          <Button icon={<EditOutlined />}   type="link" 
            onClick={() => {
              setShowModal(true)
              setAction("edit")
              setForm({
                  ...form,
                  id: record.id,
                  docname: record.docname,
                  code: record.code,
              })}}
          placement="top"  tooltip="Sửa"/>
          <Button icon={<CloudDownloadOutlined />}  placement="top" tooltip="Tải xuống"type={"link"} />
        </>
      ),
    },
    {
      title: 'Xoá',
      width: '10%',
      dataIndex: 'id',
      key: 'id',
      render: (id) =>
      (
        <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(id)} >
                   <Button icon={<DeleteOutlined />} type={"link"} />
        </Popconfirm>
      )
    },
  ];

  return (
   <>
 
   <Button
        type="primary"
        style={{ marginBottom: 16, }}
        icon={<FileAddOutlined />}
        onClick={addItem}
        >
        Thêm Tài Liệu
      </Button>
         <Table  size="middle" dataSource={items} columns={columns} pagination={{ pageSize: 5 }} scroll={{ y: 330 }} />
         {
                showModal && (<Modal
                    title={action == "add" ? "Thêm Thẻ" : "Sửa Thẻ"}
                    visible={showModal}
                    footer ={null}
                    onCancel={() => {
                        setShowModal(false)
                        setAction("add");
                        setForm({
                            ...form,
                            id: "",
                            docname: "",
                            code: "",
                        })
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 50,
                        }}
                        wrapperCol={{
                            span: 30,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            label="tên"
                            name="docname"
                        >
                            <Input
                                defaultValue={form.docname}
                                value={form.docname}
                                name="docname"
                                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            label="mã"
                            name="code"
                        >
                            <Input
                                defaultValue={form.code}
                                value={form.code}
                                name="code"
                                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                            />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary"
                                text="Submit"
                                onClick={submit}
                                htmlType="submit">
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>)
            }
   

</>
  );
  
}
export default Document;

