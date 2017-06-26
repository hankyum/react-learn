import React from 'react';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import styles from './Users.css';
import { PAGE_SIZE } from '../../utils/constants';
import UserModal from './UserModal';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { canUseDOM } from "exenv";
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
    // console.log(canUseDOM ? "client " : "server ", " side no data");
    fetchUser();
  } else {
    // console.log(canUseDOM ? "client " : "server ", JSON.stringify(dataSource, null, 2));
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
        <span className="operation">
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
        <div className="create">
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
