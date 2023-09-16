function ChevronDown({ classes }) {
    return (
        <svg
            width={17}
            height={6}
            viewBox='0 0 17 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={classes}
        >
            <path
                d='M1 1L9 5L17 1'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export default ChevronDown;
