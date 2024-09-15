import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "../TabPanel/TabPanel";
import BasicFilters from "../BasicFilters/BasicFilters";
import { useFiltersContext } from "../../contexts/Filters/FiltersContextProvider";
import { FilterTypeEnum } from "../../models/filters/filters";
import AdvancedFilters from "../AdvancedFilters/AdvancedFilters";

const Filters = () => {
  const { setFilterType } = useFiltersContext();
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setFilterType(newValue === 0 ? FilterTypeEnum.BASIC : FilterTypeEnum.ADVANCED);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="filter tabs">
          <Tab label="Basic filters" />
          <Tab label="Advanced filters" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <BasicFilters />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdvancedFilters />
      </TabPanel>
    </>
  );
};

export default Filters;
