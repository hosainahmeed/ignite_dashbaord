import { useEffect, useState } from "react";
import { Button } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";
import { useGetTermsAndConditionsQuery, useUpdateTermsAndConditionsMutation } from "../../redux/services/manageApis";

const TermsAndConditions = () => {
  const { data: terms, isLoading } = useGetTermsAndConditionsQuery(undefined);
  const [addTerms, { isLoading: addLoading }] = useUpdateTermsAndConditionsMutation();
  const [content, setContent] = useState("");
  
  useEffect(() => {
    setContent(terms?.data?.description);
  }, [terms]);

  const handleSubmit = async () => {
    try {
      if (!content) {
        throw new Error("Please enter terms and conditions");
      }
      const data = {
        description: content,
      }
      await addTerms(data).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message || "Terms and Conditions updated successfully");
        } else {
          throw new Error(res?.message || "Failed to update Terms and Conditions");
        }
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update Terms and Conditions");
    }
  };
  return (
    <PageLayout title="Terms and Conditions">
      <PageContent>
        <JoditComponent setContent={setContent} content={content} />
        <Button
          size="large"
          onClick={() => handleSubmit()}
          disabled={isLoading || addLoading}
          loading={isLoading || addLoading}
          style={primaryBtn}
        >
          Submit
        </Button>
      </PageContent>
    </PageLayout>
  );
};

export default TermsAndConditions;
