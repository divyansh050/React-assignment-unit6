import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CustomizedTables() {
  const [fetching, setFetching] = React.useState(false);
  
  const [rows, setRows] = React.useState([]);


  const fetchData = () => {
    setFetching(true);
    axios.get("https://json-server-050.herokuapp.com/city").then((res) => {
      setRows([...res.data]);
      setFetching(false);
    });
  };

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = (id) => {
    setIsLoading(id);
    axios
      .delete(`https://json-server-050.herokuapp.com/city/${id}`)
      .then((res) => {
        setIsLoading(false);
        fetchData();

      });
  };



  const handleSort = (value) => {
    let sorted = [...rows];

    if (value === "asc") {
      sorted.sort((a, b) => +a.population - +b.population);
    } else {
      sorted.sort((a, b) => +b.population - +a.population);
    }

    setRows(sorted);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;

    const filtered = rows.filter((row) =>
      row.country.toLowerCase().includes(value.toLowerCase())
    );
    setRows(filtered);
  };


  return (
    <>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        <TextField
          type="text"
          onChange={handleFilterChange}
          placeholder="Search..."
        />
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => handleSort("asc")}
        >
          Sort Ascending
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => handleSort("dsc")}
        >
          Sort descending
        </Button>
        <Button sx={{ m: 1 }} variant="outlined" onClick={() => fetchData()}>
          Reset
        </Button>
      </div>
      {fetching ? (
        <div>Loading...</div>
      ) : rows[0] ?  (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, textTransform: "capitalize" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>ID </StyledTableCell>
                <StyledTableCell>Country</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell>Population</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.country}</StyledTableCell>
                  <StyledTableCell>{row.city}</StyledTableCell>
                  <StyledTableCell>{row.population}</StyledTableCell>

                  <StyledTableCell>
                    <Link to={`/add-city/${row.id}`}>{"Edit"}</Link>
                  </StyledTableCell>

                  <StyledTableCell onClick={() => handleDelete(row.id)}>
                    <LoadingButton loading={row.id==isLoading}>
                      {"Delete"}
                    </LoadingButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )  : (
        <div>No data</div>
      ) }
    </>
  );
}

