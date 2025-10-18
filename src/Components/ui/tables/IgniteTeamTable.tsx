import { Form, Table } from "antd";
import type { IigniteTeam } from "../../../types/category";
import IgniteTeamTableColumns from "../columns/EventCategoryTableColumns";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import FormWithImage from "../modals/FormWithImage";
import { IMAGE } from "../../../assets/index.image";


function IgniteTeamTable() {
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [record, setRecord] = useState<IigniteTeam | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const categoryData: IigniteTeam[] = [
        {
            id: 1,
            name: "Neil Marshall",
            photo_url: IMAGE.brandLogo,
            position: "BOARD CHAIR",
        },
    ];


    const handleEditCategory = useCallback((record: IigniteTeam) => {
        setIsUpdate(true);
        setRecord(record);
        setModalVisible(true);
    }, []);

    const handleDeleteCategory = useCallback(async (id: number) => {
        try {
            console.log(id)
            toast.error("This function is on hold")
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete category")
        }
    }, []);

    const handleSubmit = () => { };

    return (
        <>
            <Table
                bordered
                columns={IgniteTeamTableColumns({ handleEditCategory, handleDeleteCategory })}
                dataSource={categoryData}
                pagination={false}
                rowKey="email"
            />

            <FormWithImage
                form={form}
                open={modalVisible}
                hide={setModalVisible}
                onFinish={handleSubmit}
                title={isUpdate ? "Update Ignite Team" : "Add Ignite Team"}
                record={record}
                btnText={isUpdate ? "Update" : "Add Ignite Team"}
            />
        </>
    );
}

export default IgniteTeamTable;
