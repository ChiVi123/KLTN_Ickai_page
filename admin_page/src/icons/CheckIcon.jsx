function CheckIcon({ classes }) {
    return (
        <svg
            width={11}
            height={8}
            viewBox='0 0 11 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={classes}
        >
            <path
                d='M1 4.6L3.4 7L9.4 1'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export default CheckIcon;
