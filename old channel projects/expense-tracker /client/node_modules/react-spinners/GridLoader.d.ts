/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { LoaderSizeMarginProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderSizeMarginProps>> {
    static defaultProps: Required<LoaderSizeMarginProps>;
    style: (rand: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
