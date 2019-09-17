import React from "react";
import moment from "moment";
import styled from "styled-components";

const ClendarWrapper = styled.div`
  border: 1px solid black;
`;
const HeaderOuter = styled.div`
  background-color: #89c8ff;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  line-height: 33px;
`;
const MonthNav = styled.div`
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 33px;
  :hover {
    background-color: #0088ff;
    color: white;
  }
`;
const Cell = styled.div`
  width: 14.2%;
  height: 35px;
  line-height: 33px;
`;
const DatesCell = styled(Cell)`
  :hover {
    background-color: #0088ff;
    color: white;
  }
`;
const GrayCell = styled(DatesCell)`
  color: rgb(168, 168, 168);
`;
const RowCells = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const RowArray = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };
  renderHeader() {
    const headerMonthFormat = "MMM YYYY";
    return (
      <HeaderOuter>
        <MonthNav onClick={this.prevMonth}>{"<"}</MonthNav>
        <div>{moment(this.state.currentMonth).format(headerMonthFormat)}</div>
        <MonthNav onClick={this.nextMonth}>{">"}</MonthNav>
      </HeaderOuter>
    );
  }

  renderWeekdays() {
    const weekdaysFormat = "ddd";
    const startDay = moment(this.state.currentMonth).day(0);
    let weekdays = [];
    let day;
    for (let i = 0; i < 7; i++) {
      day = moment(startDay).add(i, "d");
      weekdays.push(<Cell key={i}>{moment(day).format(weekdaysFormat)}</Cell>);
    }
    return <RowCells>{weekdays}</RowCells>;
  }

  renderCells() {
    const cellsFormat = "D";
    const startOfMonth = moment(this.state.currentMonth).startOf("month");
    const endOfMonth = moment(this.state.currentMonth).endOf("month");
    const startDate = moment(startOfMonth).startOf("week");
    const endDate = moment(endOfMonth).endOf("week");
    console.log(startDate);
    console.log(endDate);
    let datesArr = [];
    let weeksArr = [];
    let date;
    let firstDayOfWeek = startDate;
    let i = 0;
    while (firstDayOfWeek < endDate) {
      for (let i = 0; i < 7; i++) {
        date = moment(firstDayOfWeek).add(i, "d");
        if (date < startOfMonth || date > endOfMonth) {
          datesArr.push(
            <GrayCell key={date}>{moment(date).format(cellsFormat)}</GrayCell>
          );
        } else {
          datesArr.push(
            <DatesCell key={date}>{moment(date).format(cellsFormat)}</DatesCell>
          );
        }
      }
      weeksArr.push(<RowCells>{datesArr}</RowCells>);
      datesArr = [];
      firstDayOfWeek = moment(date).add(1, "d");
      i++;
    }
    return <RowArray>{weeksArr}</RowArray>;
  }
  prevMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).subtract(1, "M"),
    });
  };
  nextMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).add(1, "M"),
    });
  };
  clickDate = () => {};
  render() {
    return (
      <ClendarWrapper>
        {this.renderHeader()}
        {this.renderWeekdays()}
        {this.renderCells()}
      </ClendarWrapper>
    );
  }
}

export default Calendar;
