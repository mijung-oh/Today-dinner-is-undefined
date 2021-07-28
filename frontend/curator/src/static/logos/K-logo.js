import React, { Component } from "react";
import { SvgIcon } from "@material-ui/core";

class kakaoLogo extends Component {
  render() {
    return (
      <SvgIcon {...this.props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 99.61801 92.147011"
          height="24"
          width="24"
          id="svg2"
          version="1.1"
        >
          <defs id="defs6">
            <clipPath id="clipPath692" clipPathUnits="userSpaceOnUse">
              <path id="path690" d="m 0,595.28 841.89,0 L 841.89,0 0,0 Z" />
            </clipPath>
          </defs>
          <g id="g686" transform="matrix(1,0,0,-1,-362.26358,234.09895)">
            <g clipPath="url(#clipPath692)" id="g688">
              <g transform="translate(163.2612,376.6777)" id="g694">
                <path
                  id="path696"
                  d="m 248.81039,-143.57875 c -26.953,0 -48.80801,-17.256 -48.80801,-38.555 0,-13.68101 9.05201,-25.69301 22.64601,-32.54901 l -4.599,-17.167 c -0.176,-0.527 -0.03,-1.085 0.352,-1.465 0.263,-0.265 0.614,-0.411 0.995,-0.411 0.294,0 0.586,0.117 0.85,0.322 l 19.775,13.36 c 2.872,-0.41 5.802,-0.644 8.789,-0.644 26.953,0 48.81,17.255 48.81,38.55401 0,21.299 -21.857,38.555 -48.81,38.555"
                />
              </g>
            </g>
          </g>
        </svg>
      </SvgIcon>
    );
  }
}
export default kakaoLogo;
