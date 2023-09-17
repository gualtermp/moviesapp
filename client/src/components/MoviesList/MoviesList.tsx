import {
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MoviesListProps } from "../../types/MoviesListProps";
import { useDispatch, useSelector } from "react-redux";
import { selectSortByRevenue, selectSortByRevenueForYear, setPage, setSelectedMovieID } from "../../store/moviesSlice";
import CustomMovieTableCell from "./CustomCells/CustomMovieTableCell";
import CustomMovieTableBodyCell from "./CustomCells/CustomMovieTableBodyCell";
import { useEffect, useRef } from "react";
import { columns } from "./columns";

export function MoviesList({ data, fetches }: MoviesListProps) {
  const dispatch = useDispatch();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const isSortByRevenue = useSelector(selectSortByRevenue)
  const isSortByRevenueForYear = useSelector(selectSortByRevenueForYear)

  const handleVisualizeMovieDetails = (id: string) => {
    dispatch(setSelectedMovieID(id));
  };

  // Detects we reached the table bottom and if so, new data should be fetched
  const handleScroll = () => {
    const tableContainer = tableRef.current;
    if (!fetches && tableContainer && (!isSortByRevenue || !isSortByRevenueForYear)) {
      const scrolledToBottom =
        tableContainer.scrollTop + tableContainer.clientHeight >=
        tableContainer.scrollHeight;
      if (scrolledToBottom) {
        dispatch(setPage());
      }
    }
  };

  // Adds scroll event listener to table
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div style={{ maxHeight: "80vh" }}>
      <TableContainer ref={tableRef} sx={{ height: "50vh", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, i) => (
                <CustomMovieTableCell
                  width={col.width}
                  key={`column-${col.label}`}
                  sx={{
                    textAlign: i === 0 ? "center" : "left",
                  }}
                >
                  {col.label.toUpperCase()}
                </CustomMovieTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={`movie-${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CustomMovieTableBodyCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {i + 1}
                </CustomMovieTableBodyCell>
                <CustomMovieTableBodyCell>{row.title}</CustomMovieTableBodyCell>
                <CustomMovieTableBodyCell>
                  {new Date(row.releaseDate).getFullYear()}
                </CustomMovieTableBodyCell>
                <CustomMovieTableBodyCell>
                  ${row.revenue?.toLocaleString("en-US")}
                </CustomMovieTableBodyCell>
                <CustomMovieTableBodyCell>
                  <IconButton
                    onClick={() => handleVisualizeMovieDetails(row.id)}
                  >
                    <VisibilityIcon
                      sx={{
                        color: "#9aaebb",
                      }}
                    />
                  </IconButton>
                </CustomMovieTableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
