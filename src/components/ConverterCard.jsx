import React, { useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { useTable } from "react-table";
import { Web3Button } from "@thirdweb-dev/react";

export default function ConverterCard() {
  const [blcgAmount, setBlcgAmount] = useState("");
  const [convertedValues, setConvertedValues] = useState({
    usd: 0,
    eth: 0,
    btc: 0,
    gold: 0,
  });
  const [profits, setProfits] = useState({
    oneMonth: 0,
    fiveMonths: 0,
    twelveMonths: 0,
    oneYear: 0,
    fiveYears: 0,
  });

  const manualConversionRates = {
    usd: 19.95,
    eth: 0.005,
    btc: 0.00006,
    gold: 0.0008,
  };

  const calculateProfits = (amount, rate, period) => {
    return (amount * rate * period).toFixed(2);
  };

  const handleAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    setBlcgAmount(amount);

    if (!isNaN(amount)) {
      setConvertedValues({
        usd: (amount * manualConversionRates.usd).toFixed(2),
        eth: (amount * manualConversionRates.eth).toFixed(6),
        btc: (amount * manualConversionRates.btc).toFixed(8),
        gold: (amount * manualConversionRates.gold).toFixed(4),
      });

      setProfits({
        oneMonth: calculateProfits(amount, manualConversionRates.usd, 30),
        fiveMonths: calculateProfits(amount, manualConversionRates.usd, 150),
        twelveMonths: calculateProfits(amount, manualConversionRates.usd, 365),
        oneYear: calculateProfits(amount, manualConversionRates.usd, 365),
        fiveYears: calculateProfits(amount, manualConversionRates.usd, 1825),
      });
    } else {
      setConvertedValues({
        usd: 0,
        eth: 0,
        btc: 0,
        gold: 0,
      });

      setProfits({
        oneMonth: 0,
        fiveMonths: 0,
        twelveMonths: 0,
        oneYear: 0,
        fiveYears: 0,
      });
    }
  };

  // Define table data and columns
  const data = React.useMemo(
    () => [
      {
        currency: "USD",
        convertedValue: convertedValues.usd,
        oneMonthProfit: profits.oneMonth,
        fiveMonthsProfit: profits.fiveMonths,
        twelveMonthsProfit: profits.twelveMonths,
        oneYearProfit: profits.oneYear,
        fiveYearsProfit: profits.fiveYears,
      },
      // Add similar objects for other currencies (ETH, BTC, GOLD)
    ],
    [convertedValues, profits]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Currency",
        accessor: "currency",
      },
      {
        Header: "Converted Value",
        accessor: "convertedValue",
      },
      {
        Header: "1 Month Profit",
        accessor: "oneMonthProfit",
      },
      {
        Header: "5 Months Profit",
        accessor: "fiveMonthsProfit",
      },
      {
        Header: "12 Months Profit",
        accessor: "twelveMonthsProfit",
      },
      {
        Header: "1 Year Profit",
        accessor: "oneYearProfit",
      },
      {
        Header: "5 Years Profit",
        accessor: "fiveYearsProfit",
      },
    ],
    [convertedValues, profits]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Section>
      <div className="title">
        <p>BLCG Calculator and Profit Planner</p>
      </div>
      <div className="conversion-section">
        <input
          type="number"
          placeholder="Enter BLCG amount"
          value={blcgAmount}
          onChange={handleAmountChange}
          className="responsive-input"
        />
        <Web3Button>Buy
        </Web3Button>
        <div className="table-container">
          <table {...getTableProps()} className="data-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  background-color: #000;
  border-radius: 1rem;
  border: 3px solid #d4af37;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.5rem);
  }

  .title {
    h2 {
      color: #ffc107;
      font-family: "Vidaloka", cursive;
      letter-spacing: 0.3rem;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      text-transform: uppercase;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  .conversion-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .responsive-input {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      border: 1px solid gray;
      background-color: #1d2636;
      color: #ffffff;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: #ffc107;
      }
    }

    .table-container {
      overflow-x: auto;
      border: 1px solid #1d2636;
      border-radius: 4px;
      padding: 1rem;

      .data-table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 0.5rem;
          border-bottom: 1px solid #1d2636;
          text-align: center;
        }

        th {
          background-color: #1d2636;
          color: #fff;
        }
      }
    }
  }
`;
