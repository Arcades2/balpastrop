import { clsx } from "clsx";

export type ButtonProps = React.ComponentProps<"button">;

export function Button(props: ButtonProps) {
  const { className, children, ...rest } = props;
  return (
    <button
      type="button"
      className={clsx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-20 text-xl",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
