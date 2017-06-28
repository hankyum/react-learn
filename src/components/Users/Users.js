import React from 'react';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import styles from './Users.css';
import { PAGE_SIZE } from '../../utils/constants';
import UserModal from './UserModal';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchUser, createUser, updateUser, deleteUser } from "../../redux/actions/counter-actions";

function Users({
                 list: dataSource,
                 loading,
                 fetch,
                 total = 10,
                 page: current,
                 fetchUser,
                 createUser,
                 updateUser,
                 deleteUser
               }) {
  if (!fetch) {
    fetchUser();
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={updateUser}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={() => deleteUser(record)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal
            visible={dataSource.length === 0 && fetch}
            record={{}}
            onOk={(values) => createUser({ ...values, id: dataSource.length + 1 })}
          >
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        {dataSource && dataSource.length > 0 && <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />}
        {dataSource && dataSource.length > PAGE_SIZE && <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={() => {

          }}
        />}
      </div>
    </div>
  );
}

export default connect(
  state => ({
    ...state.user
  }),
  (dispatch) => bindActionCreators({ fetchUser, createUser, updateUser, deleteUser }, dispatch)
)(Users);
