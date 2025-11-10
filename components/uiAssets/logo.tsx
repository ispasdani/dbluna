import Link from "next/link";

export const LogoSVG = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_26_2)">
        <path
          d="M9.12011 16.5139C9.12011 19.0375 7.26001 21.0836 4.9659 21.0836C2.67171 21.0836 0.811684 19.0375 0.811684 16.5139M0.810791 16.5139C0.810791 13.9903 2.6709 11.9443 4.96501 11.9443C7.2592 11.9443 9.11922 13.9904 9.11922 16.5139M19.1327 0.93042L9.70256 11.3026"
          stroke="black"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.8335 11.0001L11.6202 15.6348M13.3335 0.916595L5.79517 9.20877"
          stroke="#F17463"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_26_2">
          <rect width="20" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoSVG />
      <span className="text-2xl font-medium">DBLuna</span>
    </Link>
  );
};
