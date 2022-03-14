import React, { Component } from "react";

export class Button extends Component {
  state = {
    input: {
      username: "",
      password: "",
    },
    username: "",
    password: "",
  };
  //              mount                   update
  // willmount > render > didmount > willupdate > didupdate >
  //   unmount
  // willunmount

  // update ke trigger pada saat state berubah melaui setstate, dna perubahan props

  //   unmount ketrigger sesaat sebelum pindah page
  componentDidMount() {}
  componentDidUpdate(prevprops, prevstate) {}

  componentWillUnmount() {}
  //   click = (e) => {
  // this.setState({ username: e.target.value });
  // this.setState({ input: { ...this.state.input, username: e.target.value } });
  //   };
  render() {
    let type = this.props.type || "button";
    let className = this.props.className || "";
    return (
      <button
        disabled={this.props.loading || false}
        type={type}
        className={"rounded bg-matoa-text-primary text-white " + className}
      >
        {/* spread operator in props */}
        {/* <Text {...this.props} /> */}
        {/* <Text /> */}
        {this.props.children}
      </button>
    );
  }
}

export default Button;
