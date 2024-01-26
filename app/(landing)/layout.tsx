
const landingLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="">
            <nav className="">
                
                <section className="">
                    {children}
                </section>
            </nav>       
        </div>
    );
};

export default landingLayout;