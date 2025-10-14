import type { ReactNode } from "react";
import cn from "../lib/cn";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { primaryBtn } from "../constant/btnStyle";

interface PageContentProps {
    children: ReactNode;
}

interface NavigateButton {
    buttonText: string;
    type: "navigate";
    route: string;
    icon?: ReactNode;
}

interface ActionButton {
    buttonText: string;
    icon?: ReactNode;
    type: "action";
    onClick: () => void;
}

type PageButton = NavigateButton | ActionButton;

interface PageLayoutProps {
    title: string;
    children: ReactNode;
    className?: string;
    isButton?: PageButton;
}

export const PageLayout = ({
    title,
    children,
    className,
    isButton,
}: PageLayoutProps) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (!isButton) return;
        if (isButton.type === "navigate") {
            navigate(isButton.route);
        } else {
            isButton.onClick();
        }
    };

    return (
        <div className={cn("p-3 w-full bg-[#FFDAD9]/40 rounded", className)}>
            <div className="flex items-center justify-between">
                {title && (
                    <h1
                        onClick={() => navigate(-1)}
                        className="text-xl px-2 py-1 bg-white rounded shadow font-bold cursor-pointer flex items-center gap-2 w-fit text-gray-800 mb-4"
                    >
                        <FaLongArrowAltLeft />
                        {title}
                    </h1>
                )}

                {isButton && (
                    <Button size="large"
                        style={primaryBtn}
                        onClick={handleButtonClick} icon={isButton.icon}>{isButton.buttonText}</Button>
                )}
            </div>

            <div className="bg-white rounded shadow p-6">{children}</div>
        </div>
    );
};

export const PageContent = ({ children }: PageContentProps) => {
    return <div className="space-y-4">{children}</div>;
};
