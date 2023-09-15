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
import {
  selectPage,
  setPage,
  setSelectedMovieID,
} from "../../store/moviesSlice";
import CustomMovieTableCell from "./CustomCells/CustomMovieTableCell";
import CustomMovieTableBodyCell from "./CustomCells/CustomMovieTableBodyCell";
import { useEffect, useRef, useState } from "react";

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

export function MoviesList({ data, isFetching, loadMoreData }: MoviesListProps) {
  const dispatch = useDispatch();
  const tableRef = useRef<HTMLDivElement | null>(null);

  const handleVisualizeMovieDetails = (id: string) => {
    dispatch(setSelectedMovieID(id));
  };

  const handleScroll = () => {
    // Reached the bottom of the table
    if(tableRef.current) {
      const first = tableRef.current.scrollTop + tableRef.current.clientHeight
      const second = tableRef.current.scrollHeight
      console.log('first', first)
      console.log('second', second)
      if (
        tableRef.current &&
        !isFetching &&
        tableRef.current.scrollTop + tableRef.current.clientHeight >=
          tableRef.current.scrollHeight
      ) {
        loadMoreData()
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

  return (
    <div style={{maxHeight: '80vh'}}>
      <TableContainer
        ref={tableRef}
        sx={{ height: "50vh", overflowY: "auto" }}
      >
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
            {data?.map((row, i) => (
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
                  {new Date(row.release_date).getFullYear()}
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