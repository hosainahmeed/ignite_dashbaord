import { useEffect, useState } from "react";
import { Button } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";
import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "../../redux/services/manageApis";

const PrivacyPolicy = () => {
  const { data: privacyPolicy, isLoading } = useGetPrivacyPolicyQuery(undefined);
  const [updatePrivacyPolicy, { isLoading: updateLoading }] = useUpdatePrivacyPolicyMutation();
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(privacyPolicy?.data?.description);
  }, [privacyPolicy]);
  const handleSubmit = async () => {
    try {
      if (!content) {
        throw new Error("Please enter privacy policy");
      }
      const data = {
        description: content,
      }
      await updatePrivacyPolicy(data).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message || "Privacy Policy updated successfully");
        } else {
          throw new Error(res?.message || "Failed to update Privacy Policy");
        }
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update Privacy Policy");
    }
  };
  return (
    <PageLayout title="Privacy Policy">
      <PageContent>
        <JoditComponent setContent={setContent} content={content} />
        <Button
          size="large"
          onClick={() => handleSubmit()}
          disabled={isLoading || updateLoading}
          loading={isLoading || updateLoading}
          style={primaryBtn}
        >
          Submit
        </Button>
      </PageContent>
    </PageLayout>
  );
};

export default PrivacyPolicy;
