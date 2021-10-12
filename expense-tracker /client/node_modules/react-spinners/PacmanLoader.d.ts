/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { Keyframes } from "@emotion/serialize";
import { LoaderSizeMarginProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderSizeMarginProps>> {
    static defaultProps: Required<LoaderSizeMarginProps>;
    ball: () => Keyframes;
    ballStyle: (i: number) => SerializedStyles;
    s1: () => string;
    s2: () => string;
    pacmanStyle: (i: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    pac: () => SerializedStyles;
    man: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
