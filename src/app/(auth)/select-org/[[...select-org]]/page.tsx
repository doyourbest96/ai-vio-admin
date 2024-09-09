import { OrganizationList } from "@clerk/nextjs";

const SelectOrganizationPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/"
      afterCreateOrganizationUrl="/"
    />
  );
};

export default SelectOrganizationPage;
