import { PropsWithChildren } from "react";

type InputLabelProps = PropsWithChildren<{
  name: string;
}>;

export const InputLabel = ({ name, children }: InputLabelProps) => {
  return (
    <div>
      <p>{name}</p>
      {children}
    </div>
  );
};
