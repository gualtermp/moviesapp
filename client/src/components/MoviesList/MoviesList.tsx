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
import { useDispatch } from "react-redux";
import { setPage, setSelectedMovieID } from "../../store/moviesSlice";
import CustomMovieTableCell from "./CustomCells/CustomMovieTableCell";
import CustomMovieTableBodyCell from "./CustomCells/CustomMovieTableBodyCell";
import { useEffect, useRef } from "react";

const columns = [
  {
    label: "Ranking",
    width: "5%",
  },
  {
    label: "Title",
    width: "55%",
  },
  {
    label: "Year",
    width: "15%",
  },
  {
    label: "Revenue",
    width: "17.5%",
  },
  {
    label: "",
    width: "7.5%",
  },
];

export function MoviesList({ data, fetches }: MoviesListProps) {
  const dispatch = useDispatch();
  const tableRef = useRef<HTMLDivElement | null>(null);

  const handleVisualizeMovieDetails = (id: string) => {
    dispatch(setSelectedMovieID(id));
  };

  const handleScroll = () => {
    const tableContainer = tableRef.current;
    if (!fetches && tableContainer) {
      const scrolledToBottom =
        tableContainer.scrollTop + tableContainer.clientHeight >=
        tableContainer.scrollHeight;
      if (scrolledToBottom) {
        dispatch(setPage());
      }
    }
  };

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

  console.log(data[0].releaseDate)

  return (
    <div style={{ maxHeight: "80vh" }}>
      <TableContainer ref={tableRef} sx={{ height: "50vh", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((c, i) => (
                <CustomMovieTableCell
                  width={c.width}
                  key={`column-${c.label}`}
                  sx={{
                    textAlign: i === 0 ? "center" : "left",
                  }}
                >
                  {c.label.toUpperCase()}
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
