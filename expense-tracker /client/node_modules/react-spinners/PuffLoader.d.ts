/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { LoaderSizeProps, LengthType } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
    static defaultProps: Required<LoaderSizeProps>;
    getSize: () => LengthType;
    style: (i: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
