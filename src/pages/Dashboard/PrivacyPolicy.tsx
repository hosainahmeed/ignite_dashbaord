import { useEffect, useState } from "react";
import { Button } from "antd";
// import { useGetTermsQuery, useAddTermsMutation } from "../../RTK/services/dashboard/informationApis/termsApis";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";

const PrivacyPolicy = () => {
  // const { data: terms, isLoading } = useGetTermsQuery();
  // const [addTerms, { isLoading: addLoading }] = useAddTermsMutation();
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent("privacy policy");
  }, []);
  const handleSubmit = async () => {
    try {
      if (!content) {
        throw new Error("Please enter privacy policy");
      } 
      const data = {
        description: content,
      }
      console.log(data)
      // await addTerms(data).unwrap().then((res) => {
      //   if (res?.success) {
      //     toast.success(res?.message || "Terms and Conditions updated successfully");
      //   } else {
      //     throw new Error(res?.message || "Failed to update Terms and Conditions");
      //   }
      // });
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
          // disabled={isLoading || addLoading}
          // loading={isLoading || addLoading}
          style={primaryBtn}
        >
          Submit
        </Button>
      </PageContent>
    </PageLayout>
  );
};

export default PrivacyPolicy;
