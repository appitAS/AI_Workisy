import SvgIcon from "@mui/material/SvgIcon";
const GoogleIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <defs>
          <radialGradient
            id="prefix__b"
            cx="1.479"
            cy="12.788"
            fx="1.479"
            fy="12.788"
            r="9.655"
            gradientTransform="matrix(.8032 0 0 1.0842 2.459 -.293)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".368" stop-color="#ffcf09" />
            <stop offset=".718" stop-color="#ffcf09" stop-opacity=".7" />
            <stop offset="1" stop-color="#ffcf09" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="prefix__c"
            cx="14.295"
            cy="23.291"
            fx="14.295"
            fy="23.291"
            r="11.878"
            gradientTransform="matrix(1.3272 0 0 1.0073 -3.434 -.672)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".383" stop-color="#34a853" />
            <stop offset=".706" stop-color="#34a853" stop-opacity=".7" />
            <stop offset="1" stop-color="#34a853" stop-opacity="0" />
          </radialGradient>
          <linearGradient
            id="prefix__d"
            x1="23.558"
            y1="6.286"
            x2="12.148"
            y2="20.299"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".671" stop-color="#4285f4" />
            <stop offset=".885" stop-color="#4285f4" stop-opacity="0" />
          </linearGradient>
          <clipPath id="prefix__a">
            <path
              d="M22.36 10H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53h-.013l.013-.01c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93v.01C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66 2.08-1.92 3.28-4.74 3.28-8.09 0-.78-.07-1.53-.2-2.25z"
              fill="none"
            />
          </clipPath>
        </defs>
        <path
          d="M22.36 10H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53h-.013l.013-.01c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93v.01C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66 2.08-1.92 3.28-4.74 3.28-8.09 0-.78-.07-1.53-.2-2.25z"
          fill="#fc4c53"
        />
        <g clip-path="url(#prefix__a)">
          <ellipse
            cx="3.646"
            cy="13.572"
            rx="7.755"
            ry="10.469"
            fill="url(#prefix__b)"
          />
          <ellipse
            cx="15.538"
            cy="22.789"
            rx="15.765"
            ry="11.965"
            transform="rotate(-7.12 15.539 22.789)"
            fill="url(#prefix__c)"
          />
          <path
            fill="url(#prefix__d)"
            d="M11.105 8.28l.491 5.596.623 3.747 7.362 6.848 8.607-15.897-17.083-.294z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default GoogleIcon;
