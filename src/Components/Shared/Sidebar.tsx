import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { SidebarLink } from './SidebarLink';

const Sidebar = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        if (ref.current.querySelector('.active')) {
            setOpen(true);
        }
    }, [ref, location.pathname]);

    const height = ref.current?.scrollHeight ?? 0;

    return (
        <div className=" px-4 pb-10 flex justify-start flex-col gap-3 sidebar">
            {SidebarLink?.map((item) => (
                <NavLink
                    onClick={() => {
                        setOpen(false);
                    }}
                    to={item?.path}
                    style={{
                        width: '100%',
                        justifyContent: 'start',
                        paddingLeft: '14px',
                        paddingRight: '14px',
                    }}
                    className={`button-white w-full ${(item?.path === '/' ? location.pathname === '/' : location.pathname.includes(item?.path))
                        ? '!bg-[var(--bg-red-high)] !text-[var(--text-light)]'
                        : '!bg-[var(--text-light)] !text-[var(--text-dark)]'
                        } whitespace-nowrap links`}
                    key={item?.path}
                >
                    {item?.path === location.pathname
                        ? item?.icon?.active
                        : item?.icon?.inactive}
                    {item?.label}
                </NavLink>
            ))}
            <div
                ref={ref}
                className={`flex justify-start flex-col gap-1 transition-all rounded-md duration-300 overflow-hidden`}
                style={{
                    height: open ? `${height}px` : '0',
                }}
            >
            </div>
        </div>
    );
};

export default Sidebar;
