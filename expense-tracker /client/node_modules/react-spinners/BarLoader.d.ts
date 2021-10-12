/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { LoaderHeightWidthProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderHeightWidthProps>> {
    static defaultProps: Required<LoaderHeightWidthProps>;
    style: (i: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
