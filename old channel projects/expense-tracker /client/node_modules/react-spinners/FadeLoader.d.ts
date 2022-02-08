/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { LoaderHeightWidthRadiusProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderHeightWidthRadiusProps>> {
    static defaultProps: Required<LoaderHeightWidthRadiusProps>;
    radius: () => number;
    quarter: () => number;
    style: (i: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    a: () => SerializedStyles;
    b: () => SerializedStyles;
    c: () => SerializedStyles;
    d: () => SerializedStyles;
    e: () => SerializedStyles;
    f: () => SerializedStyles;
    g: () => SerializedStyles;
    h: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
