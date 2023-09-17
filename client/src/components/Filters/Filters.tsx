import { useDispatch, useSelector } from "react-redux";
import {
  resetSorts,
  selectSortByRevenue,
  selectSortByRevenueForYear,
  selectYear,
  setSortByRevenue,
  setSortByRevenueForYear,
  setYear,
} from "../../store/moviesSlice";
import { IconButton, Modal, ToggleButton, styled } from "@mui/material";

import "./Filters.scss";
import { useState } from "react";
import { YearsSelector } from "../YearsSelector/YearsSelector";

const CustomToggleButton = styled(ToggleButton)({
  border: `1px solid #78849e66`,
  color: "#78849e",
  textTransform: "none",
  fontSize: 12,
  fontFamily: "'Robot Light', sans-serif",
  borderRadius: 20,
  lineHeight: 1,
  "&.Mui-selected,&.Mui-selected:hover": {
    backgroundColor: "#00BAFF",
  },
});

export function Filters() {
  const isSortByRevenue = useSelector(selectSortByRevenue);
  const isSortByRevenueForYear = useSelector(selectSortByRevenueForYear);
  const year = useSelector(selectYear);

  const dispatch = useDispatch();

  const [openYearsDropdownModal, setOpenYearsDropdownModal] =
    useState<boolean>(false);

  const handleTop10RevenueClick = () => {
    dispatch(setSortByRevenue(true));
    dispatch(setYear(undefined));
  };

  const handleTop10RevenueByYearClick =
    (year: number = 0) =>
    () => {
      setOpenYearsDropdownModal(true);
      if (!year) {
        dispatch(setYear(undefined));
      } else {
        dispatch(setSortByRevenueForYear(true));
        dispatch(setYear(year));
      }
    };

  const handleResetClick = () => {
    dispatch(resetSorts());
    dispatch(setYear(undefined));
  };

  return (
    <div className="filters_container">
      <CustomToggleButton
        value="top10Revenue"
        selected={isSortByRevenue}
        onClick={handleTop10RevenueClick}
      >
        Top 10 Revenue
      </CustomToggleButton>
      <CustomToggleButton
        value="top10RevenueByYear"
        selected={isSortByRevenueForYear}
        onClick={handleTop10RevenueByYearClick(year)}
      >
        {year ? `Top 10 Revenue ${year}` : "Top 10 Revenue by Year"}
      </CustomToggleButton>
      {isSortByRevenue || isSortByRevenueForYear ? (
        <div onClick={handleResetClick}>
          <IconButton disableRipple sx={{ padding: 0 }}>
            <img src="refresh.svg" alt="Refresh SVG" />
          </IconButton>
        </div>
      ) : null}
      <Modal open={openYearsDropdownModal}>
        <>
          <YearsSelector onClose={setOpenYearsDropdownModal} />
        </>
      </Modal>
    </div>
  );
}
