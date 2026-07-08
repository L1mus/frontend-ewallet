import { NavLink } from "react-router";
import cn from "../../utils/cn";
import Button from "../atoms/Button";

const SidebarNavItem = ({
  path,
  label,
  Icon,
  isDestructive = false,
  onClick,
}) => {
  if (path) {
    return (
      <NavLink
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            "group flex w-full items-center gap-3 rounded-md px-6 py-3",
            "text-sm font-semibold transition-colors duration-200",
            isActive
              ? "bg-primary text-white"
              : "text-black-light hover:text-primary",
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={cn(
                "h-6 w-6 shrink-0 transition-colors duration-200",
                isActive ? "text-white" : "text-grey group-hover:text-primary",
              )}
            />
            <span>{label}</span>
          </>
        )}
      </NavLink>
    );
  }

  return (
    <Button
      isHaveIcon={true}
      Icon={Icon}
      iconClassName={cn(
        "w-5 h-5 shrink-0",
        isDestructive ? "text-danger" : "text-grey",
      )}
      variant="rectangelWhite"
      isFullWidth={true}
      onClick={onClick}
      className={cn(
        "h-auto justify-start gap-3 rounded-md px-6 py-3 outline-none",
        "text-sm font-semibold",
        isDestructive
          ? "text-danger hover:text-danger/80 transition-none hover:scale-100"
          : "text-black-light",
      )}
    >
      {label}
    </Button>
  );
};

export default SidebarNavItem;
