import { OrgControl } from "./_components/org-control"

const OrgaizationIdLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )

}
export default OrgaizationIdLayout;