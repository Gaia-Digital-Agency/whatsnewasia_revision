import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import FormLocations from "./FormLocations";
import TableLocations from "./TableLocations";
import { Location } from "../../../types/location.type";
// import FormLocations from "./FormLocations";
// import TableLocations from "./TableLocations";
// import { GetTagByIdResponse } from "../../../types/Locations.type";

export default function MstLocations() {
  const [selectedLocations, setSelectedLocations] = useState<Location>();
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <PageMeta
        title="Whats New Asia Admin Dashboard | Master Locations"
        description="This is Master Locations Dashboard page for Whats New Asia Admin Dashboard Template"
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          <PageBreadcrumb pageTitle="Locations" />
          <FormLocations
            selectedLocations={selectedLocations}
            onRefresh={handleRefresh}
          />
          <TableLocations
            onEditLocation={setSelectedLocations}
            refreshKey={refreshKey}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    </div>
  );
}
