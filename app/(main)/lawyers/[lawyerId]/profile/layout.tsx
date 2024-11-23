type props={
  children:React.ReactNode;
}

const Layout = async ({children}:props) => {


  return (
    <main>{children}</main>
  );
};

export default Layout;