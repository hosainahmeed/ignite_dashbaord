import { Table } from "antd";
import { transactionTableColumn } from "../columns/TransactionTableColumn";
import type { Itransaction } from "../../../types/transection";
import { getTablePagination } from "../../../utils/pagination";
import { renderField } from "../../../lib/renderField";
import { transactionSelectData } from "../../../constant/options";

const TransactionTable = () => {
  const transactionData: Itransaction[] = [
    {
      id: "112",
      amount: 33,
      createdAt: "2025-09-15T01:29:19.326Z",
      trasaction_id: "TXN001234567",
      user: {
        key: 1,
        name: "Wade Warren",
        email: "info@youthsportsclub.com",
        profile_image:
          "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000",
        location: "Suite 5B, San Diego, California, USA",
        contactNumber: "+1 (555) 123-4567",
        isBlock: false,
        subscription_prchase_date: "2025-09-15T01:29:19.326Z",
        subscription_expiry_date: "2025-09-15T01:29:19.326Z",
        createdAt: "2025-09-15T01:29:19.326Z",
      },
    },
    {
      id: "23112",
      amount: 33,
      createdAt: "2025-09-15T01:29:19.326Z",
      trasaction_id: "TXN001234567",
      user: {
        key: 1,
        name: "Wade Warren",
        email: "info@youthsportsclub.com",
        profile_image:
          "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000",
        location: "Suite 5B, San Diego, California, USA",
        contactNumber: "+1 (555) 123-4567",
        isBlock: false,
        subscription_prchase_date: "2025-09-15T01:29:19.326Z",
        subscription_expiry_date: "2025-09-15T01:29:19.326Z",
        createdAt: "2025-09-15T01:29:19.326Z",
      },
    },
  ];

  const meta = {
    page: 1,
    limit: 10,
    total: transactionData.length,
    totalPage: 1,
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 mb-2 justify-end">
        {renderField({
          field: {
            type: "select",
            key: "eventStatus",
            label: "Event Status",
            options: transactionSelectData,
            props: { placeholder: "All Transactions" }
          },
          className: "!w-[300px]"
        })}
        {renderField({
          field: {
            type: "text",
            key: "username",
            label: "Search By Transaction ID",
            props: { placeholder: "Search By Transaction ID", onChange: (e) => console.log(e.target.value) },
          },
          className: "!w-[300px]"
        })}

      </div>
      <Table
        columns={transactionTableColumn()}
        dataSource={transactionData}
        rowKey="id"
        bordered
        pagination={getTablePagination(meta)}
      />
    </div>
  );
};

export default TransactionTable;
