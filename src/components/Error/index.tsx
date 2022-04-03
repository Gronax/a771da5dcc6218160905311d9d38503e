interface Props {
  error: any;
}

const Error = ({ error }: Props) => {
  return <div className="error">An error has occurred. {error}</div>;
};

export default Error;
