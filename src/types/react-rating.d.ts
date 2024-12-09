/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-rating" {
  import * as React from "react";

  export interface RatingProps {
    emptySymbol?: React.ReactNode;
    fullSymbol?: React.ReactNode;
    initialRating?: number;
    readonly?: boolean;
    onChange?: (rate: number) => void;
  }

  export default class Rating extends React.Component<RatingProps, any> {}
}
