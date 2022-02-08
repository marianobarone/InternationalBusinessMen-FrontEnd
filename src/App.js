import "./App.css";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";

function App() {
  const [transactions, setTransactions] = useState();
  const [rates, setRates] = useState();
  const [sku, setSku] = useState();

  useEffect(() => {
    setSku();
  }, []);

  async function getTransactions() {
    await axios
      .get(
        sku != undefined
          ? "http://localhost:3001/transactions/" + sku
          : "http://localhost:3001/transactions"
      )
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {});
  }

  async function getRates() {
    await axios
      .get("http://localhost:3001/rates")
      .then((response) => {
        setRates(response.data);
      })
      .catch((error) => {});
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Gloiath National Bank</p>
      </header>

      <body>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sx={{ mx: "auto" }}>
            <Stack spacing={2} direction="row" sx={{ my: 3 }}>
              <Button variant="contained" onClick={getTransactions}>
                Get All Transactions
              </Button>

              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search transactions by SKU"
                  onChange={(e) => setSku(e.target.value)}
                />

                <Button variant="contained" onClick={getTransactions}>
                  Search
                </Button>
              </Paper>
            </Stack>

            <TableContainer component={Paper} sx={{ maxHeight: 372 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Currency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions &&
                    transactions.map((row, i) =>
                      row.totalAmount != undefined ? (
                        <TableRow key={i} sx={{ background: "#73d387" }}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            {"Total"}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {row.totalAmount}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {row.currency}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow
                          key={i}
                          sx={
                            i % 2
                              ? { background: "#282c341a" }
                              : { background: "white" }
                          }
                        >
                          <TableCell component="th" scope="row">
                            {row.sku}
                          </TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell align="right">{row.currency}</TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={4} sx={{ mx: "auto" }}>
            <Stack spacing={2} direction="row" sx={{ my: 3 }}>
              <Button variant="contained" onClick={getRates}>
                Get Rates
              </Button>
            </Stack>

            <TableContainer component={Paper} sx={{ maxHeight: 380 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Currency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rates &&
                    rates.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={
                          i % 2
                            ? { background: "#282c341a" }
                            : { background: "white" }
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.from}
                        </TableCell>
                        <TableCell align="right">{row.to}</TableCell>
                        <TableCell align="right">{row.rate}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </body>
    </div>
  );
}

export default App;