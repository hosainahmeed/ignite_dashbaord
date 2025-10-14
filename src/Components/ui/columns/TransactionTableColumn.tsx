import type { ColumnsType } from 'antd/es/table';
import UserInformation from '../reuseable/UserInformation';
import type { Itransaction } from '../../../types/transection';

export const transactionTableColumn = (): ColumnsType<Itransaction> => [
    {
        title: 'User Info',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => (
            <UserInformation name={record?.user?.name} profile_image={record?.user?.profile_image} email={record?.user?.email} />
        ),
    },
    {
        title: 'Date / Time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) =>
            new Date(createdAt).toLocaleString(),
    },
    {
        title: 'Transaction ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => `$ ${amount || 0}`,
    },
]
