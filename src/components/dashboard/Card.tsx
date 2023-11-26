function Card(props: {
    variant?: string;
    extra?: string;
    children?: JSX.Element | any[];
    [x: string]: any;
  }) {
    const { variant, extra, children, ...rest } = props;
    return (
      <div
        className={`flex flex-col rounded-[12px] border-[2px] border-portal bg-portal bg-clip-border shadow-md shadow-[#27ff0059] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
  
  export default Card;
  