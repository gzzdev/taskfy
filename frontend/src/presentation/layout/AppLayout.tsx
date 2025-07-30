import AppSidebar from "./AppSidebar";

const LayoutContent = () => {
    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AppSidebar />
            </div>
            <div className={`flex-1 transition-all duration-300 ease-in-out`}

        </div>

    );
}

const AppLayout = () => {
    return (<LayoutContent />);
}