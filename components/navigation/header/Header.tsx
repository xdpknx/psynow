export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  return (
    <header
      {...headerProps}
      className={` bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex flex-row justify-between ${className}`}
    >
      <div className="space-x-5 m-5 ">
        <h2> PsyNow - Extro/Introversion Test v0.1.0</h2>
      </div>
    </header>
  );
};

export default Header;
