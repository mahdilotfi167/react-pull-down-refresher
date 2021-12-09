import React from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

class PullDownRefresher extends React.Component {
  start = 0;
  pull = false;
  last = 0;

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
  }

  componentDidMount() {
    window.addEventListener("touchstart", this.handleTouchStart);
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleTouchEnd);
  }

  handleTouchStart(e) {
    const { clientY } = e.touches[0];
    if (window.scrollY === 0) {
      this.start = clientY;
      this.last = clientY;
      this.pull = true;
    }
  }

  handleTouchMove(e) {
    const { clientY } = e.touches[0];
    if (this.pull) {
      var delta =
        ((window.innerHeight / 80) * (clientY - this.last)) /
        Math.sqrt(clientY - this.start);
      if (delta < 0) {
        delta *= 2;
        window.scroll(window.scrollX, 0);
      }
      this.last = clientY;
      this.setState((prev) => ({ current: prev.current + delta }));
    } else {
      if (window.scrollY === 0) {
        this.start = clientY;
        this.last = this.start;
        this.pull = true;
      }
    }
  }

  handleTouchEnd(e) {
    this.start = 0;
    this.pull = false;
    this.last = 0;
    this.setState({ current: 0 });
  }

  render() {
    return (
      <div
        className={
          "pull-down-container" +
          (!this.pull ? " pull-down-container-transitioned" : "")
        }
        style={{ height: this.state.current - this.start }}
      >
        <ArrowCircleDownIcon
          className={
            "pull-down-arrow" +
            (this.state.current - this.start >= this.props.minPull
              ? " pull-down-arrow-accept"
              : "")
          }
        />
      </div>
    );
  }
}

export default PullDownRefresher;
