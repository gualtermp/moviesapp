import { useDispatch } from "react-redux";
import { setYear } from "../../store/moviesSlice";

import './YearsSelector.scss'

const getYears = (startYear = 2000) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

export function YearsSelector({onClose}: any) {
  const dispatch = useDispatch();

  const handleYearClick = (year: number) => () => {
    dispatch(setYear(year));
    onClose(false)
  };

  return (
    <div className="years_container">
      <span className="years_title">Select a year</span>
      {getYears()
        .reverse()
        .map((year) => (
          <span
            key={`year-${year}`}
            className="years_label"
            onClick={handleYearClick(year)}
          >
            {year}
          </span>
        ))}
    </div>
  );
}
